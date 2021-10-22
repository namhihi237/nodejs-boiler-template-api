import { Router } from 'express';
import { UserController } from '../controllers';

export default ({ db }) => {
  // create new instance of router
  const router = Router();
  const userController = new UserController(db);

  // router
  router.route('/register').post((req, res, next) => userController.register(req, res, next));

  return router;
}