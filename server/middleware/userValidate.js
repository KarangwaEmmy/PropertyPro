const UserValidate = {

  // eslint-disable-next-line consistent-return
  validateSignUp(req, res, next) {
    if (!req.body.email) {
      return res.status(400).json({
        status: 'error',
        error: 'Email required',
      });
    }
    if (!req.body.first_name) {
      return res.status(400).json({
        status: 'error',
        error: 'First name required',
      });
    }
    if (!req.body.last_name) {
      return res.status(400).json({
        status: 'error',
        error: 'Last name required',
      });
    }
    if (!req.body.password) {
      return res.status(400).json({
        status: 'error',
        error: 'Password required',
      });
    }
    if (!req.body.phoneNumber) {
      return res.status(400).json({
        status: 'error',
        error: 'Phone number required',
      });
    }
    if (!req.body.address) {
      return res.status(400).json({
        status: 'error',
        error: 'Address required',
      });
    }
    next();
  },

  // eslint-disable-next-line consistent-return
  validateSignIn(req, res, next) {
    if (!req.body.email) {
      return res.status(400).json({
        status: 'error',
        error: 'Email required',
      });
    }
    if (!req.body.password) {
      return res.status(400).json({
        status: 'error',
        error: 'Password required',
      });
    }
    next();
  },
};

export default UserValidate;