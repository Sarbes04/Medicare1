import express from "express";
import {authenticate} from './../auth/verifyToken.js';
import { getCheckoutSession } from '../Controllers/bookingController.js';

const router = express.Router();

router.post('/checkout-session/:doctorId', authenticate, getCheckoutSession);
router.get("/",getCheckoutSession);
export default router;