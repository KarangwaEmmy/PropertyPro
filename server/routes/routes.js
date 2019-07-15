import express from 'express'
const router = express.Router()

import {createUser, loginUser, getAllUsers, getUserById} from "../controllers/userController";
import { getAllProperties, getPropertyById, createProperty, getPropertyByType,updateProperty,deleteProperty} from '../controllers/propertyController'

router.post("/signup", createUser);
router.post("/login", validateLogin, loginUser)
router.get('/user', getAllUsers)

router.get('/properties', getAllProperties);
router.get('/properties/:id', getPropertyById);
router.get('/properties/type/:type', getPropertyByType);
router.put('properties', updateProperty);
router.post('/properties', createProperty);
router.delete('properties', deleteProperty)

export default router;