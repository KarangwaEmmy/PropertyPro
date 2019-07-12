import express from 'express'
import PropertyController from '../controllers/PropertyController';
const router = express.Router()

router.get('/properties', PropertyController.viewAllProperties);
router.get('/property/:id', PropertyController.viewPropertyById);
router.post('/property', PropertyController.addNewProperty);
router.delete('/property/:id', PropertyController.deleteProperty);

router.patch('/property/:id',PropertyController.updateProperty);
router.patch('/property/:id/sold', PropertyController.markPropertyAsSold);
router.get('/property/type/', PropertyController.viewPropertiesByType);

export default router;