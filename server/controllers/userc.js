import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import users from '../model/userModel';
import validateRegInput from '../middleware/userValidate';
import validateLogin from '../middleware/loginValidation';
import responses from '../helpers/responses';

// Signup
export const createUser = (req, res) => {
  const { errors, isValid } = validateRegInput(req.body);
  // check fields validations
  if (!isValid) {
    responses.response(res,400,errors, true);
  }


  const {
    email, first_name, last_name, password, phoneNumber, address, is_admin,
  } = req.body;
  // check if user is not yet recorded
  const searchUser = users.filter(item => item.email === email);
  if (searchUser.length > 0) {
    responses.response(res,401,'User already registered',true);
  }

  // Add to object
  const addUser = {
    id: users.length + 1,
    email,
    first_name,
    last_name,
    password,
    phoneNumber,
    address,
    is_admin: false,
  };
  //Constant to be signed in payload without password
  const toBeSigned = {
    id: users.length + 1,
    email,
    first_name,
    last_name,
    phoneNumber,
    address,
    is_admin: false,
  };
  // Encrypt password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(addUser.password, salt, (err, hash) => {
      addUser.password = hash;
      users.push(addUser);
      //Token

      
      jwt.sign(toBeSigned, 'rugumbira', { expiresIn: 3600 }, (err, token) => {
        const payload= {
          token: 'Bearer ' + token,
          "firstname":addUser.first_name,
          "lastname":addUser.last_name,
          "email":addUser.email,
          "phoneNumber":addUser.phoneNumber,
          "address":addUser.address,
        }
        responses.response(res,201,payload,false);  
      });          
    });
  });
 
};
// Login
export const loginUser = (req, res) => {
  const { errors, isValid } = validateLogin(req.body);
  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email } = req.body;
  const { password } = req.body;


  // Login functionality
  // check for user
  const logUser = users.filter(user => user.email === email);
  console.log(logUser);

  if (logUser.length > 0) {
    // check password

    if (bcrypt.compareSync(password, logUser[0].password)) {
      // User matched
      // create JWT payload
            //Token      
            const toBeSignedLogin = {
              first_name:logUser[0].first_name,
              last_name:logUser[0].last_name,
              email:logUser[0].email,
              phoneNumber:logUser[0].phoneNumber,
              address:logUser[0].address,
              is_admin: logUser[0].is_admin,
            };
            jwt.sign(toBeSignedLogin, 'emmy', { expiresIn: 3600 }, (err, token) => {

              const payload= {
                token:'Bearer ' + token,
                "firstname":logUser[0].first_name,
                "lastname":logUser[0].last_name,
                "email":logUser[0].email,
                "phoneNumber":logUser[0].phoneNumber,
                "address":logUser[0].address,
              }
              responses.response(res,201,payload,false);  
            });
    } else {
      responses.response(res,401,'Wrong Password', true);
    }
  }
  else {
    responses.response(res,401,'User doesnt exist', true);
  }
};