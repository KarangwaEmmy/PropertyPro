
import properties from '../model/propertyModel';

export const getAllProperties = (req, res) => {
   return res.send(properties)
}

export const getPropertyById = (req, res) => {
   let property = properties.find(properties => properties.id == req.params.id)
   return res.send(property)
}

export const getPropertyByType = (req, res) => {
   let property = properties.find(properties => properties.type == req.params.type)
   return res.send(property)
}

export const createProperty = (req, res) => {
   const {body} = req;
   users.push[body];
   return res.status(201).json({
       status: 201,
       message: 'created',
       user: body
   })
}
export const index = (req, res) => {}