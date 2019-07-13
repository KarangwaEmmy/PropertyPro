import Validator from 'validator';
import isEmpty from './isEmpty';

module.exports = function validatePropertyRegistration(data) {
  const errors = {};
  data.owner = !isEmpty(data.owner) ? data.owner : '';
  data.price = !isEmpty(data.price) ? data.price : '';
  data.state = !isEmpty(data.state) ? data.state : '';
  data.city = !isEmpty(data.city) ? data.city : '';
  data.address = !isEmpty(data.address) ? data.address : '';
  data.type = !isEmpty(data.type) ? data.type : '';

  if (Validator.isEmpty(data.owner)) {
    errors.owner = 'Owner Field is required';
  }
  if (Validator.isNumeric(data.owner)){
    errors.owner = 'Owner name must be a string';
  }
  if (Validator.isEmpty(data.price)) {
    errors.price = 'price Field is required';
  }
  if (!Validator.isNumeric(data.price)){
    errors.price = 'Price must be an integer value';
  }
  if(data.price<=0){
    errors.price = 'Price can not be less than or equal to 0';
  }
  if (Validator.isEmpty(data.state)) {
    errors.state = 'state Field is required';
  }
  if (Validator.isEmpty(data.city)) {
    errors.city = 'city Field is required';
  }
  if (Validator.isEmpty(data.address)) {
    errors.address = 'address Field is required';
  }
  if (Validator.isEmpty(data.type)) {
    errors.type = 'type Field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};