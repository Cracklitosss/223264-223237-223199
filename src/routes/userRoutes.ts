import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

// Rutas para Usuarios
router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.get('/sensordata/:userId/', userController.getUserWithSensorData);
router.delete('/:userId', userController.deleteUser);

export default router;
