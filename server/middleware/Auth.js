import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const Auth = {

  // eslint-disable-next-line consistent-return
  verifyToken(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.userData = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        status: 'error',
        error: 'Authorization failed',
      });
    }
  },
};

export default Auth;