 
import dotenv from 'dotenv';
import moment from 'moment';
import properties from '../model/propertyModel';
import Respond from '../helpers/Response'

// getting all properties
export const getAllProperties = (req, res) => {
   return res.json(properties)
}

// Getting all users by id
export const getPropertyById = (req, res) => {
   let property = properties.find(properties => properties.id == req.params.id)
   if (property) {
    Respond.response(res, 200, property);
    return;
  }
  Respond.response(res, 404, 'No property found', true);

}
// Getting property by ID
export const getPropertyByType = (req, res) => {
   let property = properties.find(properties => properties.type == req.params.type)
   if(property){
    status: statusCode,
     Respond.response(res, 200, property);
     return;
   }else{
     Respond.response(res, 400, "Property type not found, try again")
   }
}

// Creating a new prperty
export const createProperty = (req, res) => {

  const {owner, status, Price, State, City, Address, type, created_on, image_url} = req.body; //get the body

  const searchProp = properties.filter(item => item.id == item); //search for duplicates

      if (searchProp.length > 0) {                     // if duplicates found return error message
      return res.status(401).json({
          "status": 'error',
          "message": 'property already registered'
          })
      }
      else{                                           // else create the property
      const newProperty = {
          id: properties.length + 1,
          owner,
          status,
          Price,
          State,
          City,
          Address,
          type,
          created_on,
          image_url
          };

      properties.push[newProperty];

      return res.status(201).json({
          "status": 'success',
          "data": newProperty
      });
      }
};

// updating property
export const updateProperty = (req, res) =>{
  const { id } = req.params;
  const property = properties.find(item => item.id === parseInt(id, 10));
  if (property) {
    const datas = Object.keys(req.body);
    datas.forEach(data => {
      property[data] = req.body[data];
    });
    Respond.response(res, 200, property);
    return;
  }
  Respond.response(res, 404, 'property your are trying to update is not available!', true);
}

// Delete property
export const deleteProperty = (req, res) => {
  const { id } = req.body;
  const property = properties.find((properties) => properties.id == req.params.id)
  if (propertyIndex !== -1) {
    property.splice(propertyIndex, 1);
    Respond.response(res, 200, { message: 'Property deleted successfully' });
    return;
  }
     Respond.response(res, 404, 'No available properties of such a type', true);
   }
 
