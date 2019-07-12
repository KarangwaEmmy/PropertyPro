import express from 'express'
const router = express.Router()

import { createUser } from '../controllers/userController'
import { getAllProperties, getPropertyById, createProperty, getPropertyByType } from '../controllers/propertyController'

router.post('/user', createUser);

router.get('/properties', getAllProperties);
router.get('/properties/:id', getPropertyById);
router.get('/properties/type/:type', getPropertyByType);
router.post('/proprties', createProperty);

export default router;