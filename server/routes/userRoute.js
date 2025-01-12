import express from 'express';
import { register } from '../controllers/userController.js';
import { registerValidation } from '../middleware/Auth.js';

const router = express.Router();

router.post('/submit-form', registerValidation, register);

export default router; 
