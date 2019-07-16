import UserModel from '../models/User';

const User = {

  create(req, res) {
    const user = UserModel.create(req.body);
    return res.status(201).json({
      status: 'success',
      data: user,
    });
  },

  getOne(req, res) {
    const user = UserModel.findOne(req.body);
    if (!user) {
      return res.status(400).json({
        status: 'error',
        error: 'Wrong credentials',
      });
    }
    return res.status(200).json({
      status: 'success',
      data: user,
    });
  },
};

export default User;