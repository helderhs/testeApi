/* eslint-disable prefer-destructuring */
import * as Yup from "yup";
import PedidoControllerApi from "./PedidoControllerApi";
import Pedido from "../models/Pedido";
import User from "../models/User";
import PedidoIten from "../models/PedidoIten";
import RabbitmqServer from "../../appConsumer/rabbitmq/RabbitmqServer";

class PedidoController {
  async index(req, res) {
    console.log(req.params.id_pedido);
    const result = {};
    await Pedido.findById(req.params.id_pedido)
      .populate("user_id")
      .then(pedido => {
        if (!pedido) {
          return res.status(400).json({ error: "Pedido não encontrado." });
        }
        result.pedido = pedido;
      })
      .catch(err => {
        console.log(err.message);
      });

    await PedidoIten.find({ pedido_id: result.pedido._id })
      .then(itens => {
        if (!itens) {
          return res.status(400).json({ error: "Pedido não encontrado." });
        }
        result.itens = itens;
      })
      .catch(err => {
        console.log(err.message);
      });

    return res.json(result);
  }

  async store(req, res) {
    const schema = Yup.object({
      carros: Yup.array()
        .min(1, "Pelo menos 1 carro é requerido")
        .required("Array de carro é requerido")
    });

    try {
      await schema.validate(req.body);
    } catch (err) {
      return res.status(500).json({ type: err.name, message: err.message });
    }

    const pedido = new Pedido({
      user_id: req.id_usuario
    });

    // Save Pedido in the database
    pedido
      .save()
      .then(data => {
        return res.json(data);
      })
      .catch(err => {
        console.log(err.message);
      });

    const carros = req.body.carros;

    carros.map(async x => {
      const result = await PedidoControllerApi.pegaCarro(x.carro);
      const pedidoIten = new PedidoIten({
        pedido_id: pedido._id,
        item_id: result._id,
        title: result.title,
        brand: result.brand,
        price: result.price,
        age: result.age
      });

      pedidoIten
        .save()
        .then(data => {
          return res.json(data);
        })
        .catch(err => {
          console.log(err.message);
        });
    });

    //const _user = await User.find({ _id: pedido.user_id }, 'nome email');

    const enviarRabbitMq = {};
    enviarRabbitMq.pedido = pedido;
    User.findOne({ _id: pedido.user_id }, "nome email")
      .then(user => {
        enviarRabbitMq.user = user;
      })
      .catch(err => {
        console.log(err.message);
      });
    //console.log(_user);
    /*const enviarFila = {};
    enviarFila.pedido = pedido;
    enviarFila.user = _user;
    console.log('enviar: ' + enviarFila);*/

    const server = new RabbitmqServer();
    await server.publishInQueue("vendas", enviarRabbitMq);

    return res.status(200).json(pedido);
  }
}

export default new PedidoController();
