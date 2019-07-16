import User from '../controllers/User';
import UserValidate from '../middleware/UserValidate';

export default function routeUser(app) {
  app.post('/api/v1/auth/signup', UserValidate.validateSignUp, User.create);
  app.post('/api/v1/auth/signin', UserValidate.validateSignIn, User.getOne);
}