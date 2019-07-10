import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.get('/', (req, res) => {
  res.json({ api: 'gostack-meetup' });
});

routes.post('/auth', SessionController.store);

routes.post('/users', (req, res) => UserController.store(req, res));

export default routes;
