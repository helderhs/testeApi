import RabbitmqServer from './src/appConsumer/rabbitmq/RabbitmqServer';

const consumer = async () => {
  const server = new RabbitmqServer();

  //await server.publishInQueue('vendas', '{"carro": "car1", "carro2":"car2"}');
  await server.receiver('vendas');
};

consumer();

//fonte code
