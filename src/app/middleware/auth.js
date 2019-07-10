import jwt from 'jsonwebtoken';

import { promisify } from 'util';
import AuthConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const dataToken = await promisify(jwt.verify)(token, AuthConfig.secret);
    req.userId = dataToken.id;
    return next();
  } catch (e) {
    return res.status(401).json({ error: 'token invalid' });
  }
};
