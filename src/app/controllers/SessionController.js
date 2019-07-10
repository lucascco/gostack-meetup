import jwt from 'jsonwebtoken';

import AuthConfig from '../../config/auth';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'email or password invalid.' });
    }

    if (!(await user.passwordMatch(password))) {
      return res.status(401).json({ error: 'email or password invalid.' });
    }
    const { id, name } = user;
    const payload = {
      id,
    };
    const token = jwt.sign(payload, AuthConfig.secret, {
      expiresIn: AuthConfig.expiresIn,
    });

    return res.json({ user: { email, id, name }, token });
  }
}

export default new SessionController();
