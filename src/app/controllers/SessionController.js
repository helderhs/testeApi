import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User";

import authConfig from "../../config/auth";

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    // Verificando se esse email existe
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: "Usuario não existe." });
    }
    console.log(user._id);

    //Verificar se a senha nao bate.
    const verificaPassword = await bcrypt.compare(password, user.password_hash);
    if (!verificaPassword)
      return res.status(401).json({ error: "Senha incorreta." });

    const { _id, nome } = user;

    return res.json({
      user: {
        nome,
        email
      },
      token: jwt.sign({ _id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      })
    });
  }
}

export default new SessionController();
