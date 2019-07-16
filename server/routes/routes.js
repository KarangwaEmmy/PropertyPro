import express from 'express'
const router = express.Router()

import { getAllProperties, getPropertyById, createProperty, getPropertyByType,updateProperty,deleteProperty} from '../controllers/propertyController'


router.get('/properties', getAllProperties);
router.get('/properties/:id', getPropertyById);
router.get('/properties/type/:type', getPropertyByType);
router.put('properties', updateProperty);
router.post('/properties', createProperty);
router.delete('properties', deleteProperty)

export default router;