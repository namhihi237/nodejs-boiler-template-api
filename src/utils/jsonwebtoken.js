import jwt from 'jsonwebtoken';
import { envVariable } from '../configs/env';

class JWTUtils {
  // encode the payload
  encodeToken(data) {
    return jwt.sign({ exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, data }, envVariable.JWT_SECRET);
  }

  // decode the payload
  verify(token) {
    return jwt.verify(token, envVariable.JWT_SECRET);
  }
}

export default new JWTUtils();