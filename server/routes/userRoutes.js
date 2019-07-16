import User from '../controllers/User';
import UserValidate from '../middleware/UserValidate';

import {createUser, loginUser, getAllUsers, getUserById} from "../controllers/userController";

router.post("/signup", createUser);
// router.post("/login", validateLogin, loginUser)
router.get('/user', getAllUsers)

export default function routeUser(app) {
  app.post('/api/v1/auth/signup', UserValidate.validateSignUp, User.create);
  app.post('/api/v1/auth/signin', UserValidate.validateSignIn, User.getOne);
}