import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import PedidoController from './app/controllers/PedidoController';
import SessionController from './app/controllers/SessionController';

//const express = require('express');

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Todas rotas abaixo desse middleware precisa estar autenticado
routes.use(authMiddleware);

routes.get('/users/:id_usuario', UserController.index);
routes.post('/pedido', PedidoController.store);
routes.get('/pedido/:id_pedido', PedidoController.index);
export default routes;
