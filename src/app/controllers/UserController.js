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

  async update(req, res) {
    const { userId: id } = req;
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(id);

    if (oldPassword && !(await user.passwordMatch(oldPassword))) {
      return this.responseError('Old pssword is invalid', 400, res);
    }

    if (email !== user.email) {
      const userWithEqualEmail = await User.findOne({ where: { email } });
      if (userWithEqualEmail) {
        return this.responseError(
          'Already exist an user with this email',
          400,
          res
        );
      }
    }
    const userUpdated = await user.update(req.body);
    return this.responseSuccess(userUpdated, res);
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
