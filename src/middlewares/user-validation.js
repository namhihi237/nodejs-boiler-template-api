import Joi from 'joi';
import { validateRequest } from "../utils";

class UserValidate {
  register(req, res, next) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().alphanum().required().min(6).max(50),
      fullName: Joi.string().required(),
    });
    validateRequest(req, next, schema);
  }

  login(req, res, next) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().alphanum().required().min(6).max(50),
    });
    validateRequest(req, next, schema);
  }
}

export default new UserValidate();