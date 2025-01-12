import express from 'express';
import { internValidation } from '../middleware/Auth.js';
import {register} from "../controllers/internController.js"


const router = express.Router();

router.post('/intern', internValidation, register);

export default router; 
