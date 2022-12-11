import RabbitmqServer from './src/appConsumer/rabbitmq/RabbitmqServer';

const consumer = async () => {
  const server = new RabbitmqServer();

  //await server.publishInQueue('vendas', '{"carro": "car1", "carro2":"car2"}');
  await server.receiver('vendas');
};
<<<<<<< HEAD
//rodar api
=======
//rodar api 2
>>>>>>> 0f3a8b30b6cd759514da1e2b15564138758b87ac
consumer();
