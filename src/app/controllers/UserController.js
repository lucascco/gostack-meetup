import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExist = await User.findOne({ where: { email: req.body.email } });
    if (userExist) {
      return this.responseError('User already exist.', 400, res);
    }
    const userCreated = await User.create(req.body);
    return this.responseSuccess(userCreated, res);
  }

  // async update(req, res) {}

  responseError(msg, status, res) {
    return res.status(status).json({ error: msg });
  }

  responseSuccess({ id, name, email }, res) {
    return res.json({ id, name, email });
  }
}

export default new UserController();
