import RabbitmqServer from './rabbitmq/RabbitmqServer';

const consumer = async () => {
  const server = new RabbitmqServer();

  //await server.publishInQueue('vendas', 'deu certo');
  await server.receiver('vendas');
};

consumer();
