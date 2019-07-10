import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middleware/auth';

const routes = new Router();

routes.get('/', (req, res) => {
  res.json({ api: 'gostack-meetup' });
});

routes.post('/auth', SessionController.store);

routes.post('/users', (req, res) => UserController.store(req, res));

routes.use(authMiddleware);

routes.put('/users', (req, res) => UserController.update(req, res));

export default routes;
