import { Router } from 'express';
import { UserController } from '../controllers';
import { userValidation, authentication } from "../middlewares";

export default ({ db }) => {
  // create new instance of router
  const router = Router();
  const userController = new UserController(db);

  // router
  router.route('/register').post(userValidation.register, (req, res, next) => userController.register(req, res, next));
  router.route('/login').post(userValidation.login, (req, res, next) => userController.login(req, res, next));
  router.route('/').get(authentication.jwtMiddleware, (req, res, next) => userController.getUser(req, res, next));
  return router;
}