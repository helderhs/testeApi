import * as Yup from "yup";
import User from "../models/User";

class UserController {
  async index(req, res) {
    const Users = await User.findOne({
      where: { id: req.params.id_usuario }
    });
    return res.json(Users);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required("Nome nescessario"),
      email: Yup.string()
        .email("Email inválido")
        .required("Email nescessario"),
      password: Yup.string()
        .required("Password é obrigatório")
        .min(6, "Password precisa ter pelo menos 6 digitos")
    });

    try {
      await schema.validate(req.body);
    } catch (err) {
      return res.status(500).json({ type: err.name, message: err.message });
    }

    const userExists = await User.find({ email: req.body.email });
    if (userExists.length !== 0) {
      return res.status(400).json({ error: "Usuario já existe." });
    }

    req.body.password_hash = req.body.password;
    const user = new User(req.body);

    user
      .save()
      .then(data => {
        return res.json(data);
      })
      .catch(err => {
        console.log(err.message);
      });
  }
}

export default new UserController();
