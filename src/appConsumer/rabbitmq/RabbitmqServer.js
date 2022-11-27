import amqp from "amqplib/callback_api";
import SendMail from "./SendMail";
import "dotenv/config";

export default class RabbitmqServer {
  //const URL = 'amqp://admin:123456@localhost:5672';
  async publishInQueue(fila, mensagem) {
    amqp.connect(process.env.RABBITMQ_URL, (connError, connection) => {
      if (connError) {
        throw connError;
      }
      // Step 2: Create Channel
      connection.createChannel((channelError, channel) => {
        if (channelError) {
          throw channelError;
        }
        // Step 3: Assert Queue
        const QUEUE = fila;
        channel.assertQueue(QUEUE);
        // Step 4: Send message to queue
        //channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(mensagem)));
        channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(mensagem)));
        console.log(`Message send ${QUEUE}`);
      });
    });
  }

  async receiver(fila) {
    amqp.connect(process.env.RABBITMQ_URL, (connError, connection) => {
      if (connError) {
        throw connError;
      }
      // Step 2: Create Channel
      connection.createChannel((channelError, channel) => {
        if (channelError) {
          throw channelError;
        }
        // Step 3: Assert Queue
        const QUEUE = fila;
        channel.assertQueue(QUEUE);
        // Step 4: Receive Messages
        channel.consume(
          QUEUE,
          msg => {
            //SendMail.execute(email.assunto, email.email);
            //console.log(`Message received: ${msg.content.toString()}`);
            const result = JSON.parse(msg.content);
            console.log(result);
            console.log("funcionaaaa" + result.user.nome);
            SendMail.execute(
              "Novo Pedido",
              "helder.hs@gmail.com",
              result.user.nome,
              result.pedido._id
            );
          },
          {
            noAck: true
          }
        );
      });
    });
  }
}
