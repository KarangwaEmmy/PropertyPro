import { v4 } from 'uuid';
import Helper from '../helpers/Helper';

const User = {

  // array that will be our temporary storage for added property adverts
  users: [],

  create(data) {
    const uniqueId = v4();
    const token = Helper.generateToken(uniqueId);
    const newUser = {
      id: uniqueId,
      token,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      password: data.password,
      phoneNumber: data.phoneNumber,
      address: data.address,
      is_admin: false,
    };
    this.users.push(newUser);
    return {
      token: newUser.token,
      id: newUser.id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
    };
  },

  // For sign-in
  findOne(data) {
    // check if any user has an email and password equal to the one passed
    const foundUser = this.users.find(user => user.email === data.email
      && user.password === data.password);
    if (foundUser) {
      return {
        token: foundUser.token,
        id: foundUser.id,
        first_name: foundUser.first_name,
        last_name: foundUser.last_name,
        email: foundUser.email,
      };
    }
    return false;
  },

  // For verifying user validity
  findOneWithId(id) {
    // check if any user has an email and password equal to the one passed
    const foundUserWithId = this.users.find(user => user.id === id);
    if (foundUserWithId) {
      return {
        email: foundUserWithId.email,
        phoneNumber: foundUserWithId.phoneNumber,
      };
    }
    return false;
  },
};

export default User;