# API EM NODEJS
API desenvolvido com nodejs, com autenticação JWT, MongoDB e RabbitQ para gerenciamento de filas.

Tambem foi desenvolvido um consumer, que verifica novos pedidos, e envia um email para o mesmo com o codigo do pedido dentre outros.

# To run this project
## DOCKER COMPOSE
Executar: docker-compose up

Irá subir 2 containers.
- Banco de dados MongoDB
- RabbitMQ para gerenciamento de fila

## NODE
- npm i

- Para rodar API: npm run api
- Para rodar consummer: npm run consumer



# Helder H Salvalaio

helder.hs@gmail.com

19 991717150
