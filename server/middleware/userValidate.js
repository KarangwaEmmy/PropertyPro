import Validator from 'validator';
import isEmpty from './isEmpty';

module.exports = function validateRegInput(data) {
  const errors = {};
  data.email = !isEmpty(data.email) ? data.email : '';
  data.first_name = !isEmpty(data.first_name) ? data.first_name : '';
  data.last_name = !isEmpty(data.last_name) ? data.last_name : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : '';
  data.address = !isEmpty(data.address) ? data.address : '';
  if (!Validator.isLength(data.first_name, { min: 2, max: 30 })) {
    errors.first_name = 'First Name must be between 2 and 30 characters';
  }
  if (Validator.isNumeric(data.first_name)){
    errors.first_name = 'First name must be a string';
  }
  if (Validator.isEmpty(data.first_name)) {
    errors.first_name = 'First Name Field is required';
  }
  if (!Validator.isLength(data.last_name, { min: 2, max: 30 })) {
    errors.last_name = 'Last Name must be between 2 and 30 characters';
  }
  if (Validator.isEmpty(data.last_name)) {
    errors.first_name = 'Last Name Field is required';
  }
  if (Validator.isNumeric(data.last_name)){
    errors.last_name = 'Last name must be a string';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email Field is required';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password Field is required';
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }
  if (Validator.isEmpty(data.phoneNumber)) {
    errors.phoneNumber = 'Phone Number Field is required';
  }
  if (!Validator.isNumeric(data.phoneNumber)){
    errors.phoneNumber = 'Phone must be numeric';
  }
  if (Validator.isEmpty(data.address)) {
    errors.address = 'Address Field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};