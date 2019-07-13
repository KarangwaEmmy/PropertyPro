import Validator from 'validator';
import isEmpty from './isEmpty';
const isEmail = (input) => {
   return /S+/.test(input)
}
const isName = (input) => {
    return [A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$.test(inpurt)
}
module.exports = function validateLogin(req, res, next) {
  const {email, password} = req.body;

  if (!isEmail(email)) {
      return res.status(400).json({
          message:'no an email'
      })
  }
  next();
};