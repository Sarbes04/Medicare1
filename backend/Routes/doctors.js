import express from "express";
import { updateDoctor, deleteDoctor, getAllDoctor, getSingleDoctor, getDoctorProfile } from "../Controllers/doctorController.js";
const router = express.Router();
import { authenticate, restrict } from "../auth/verifyToken.js";
import reviewRouter from './review.js';

//nested route
router.use('/:doctorId/reviews', reviewRouter);
//in the review route we dont have access to the doctorId, so we
//write mergeParams: true


router.get("/:id", getSingleDoctor);
router.get("/", getAllDoctor);
router.put("/:id", authenticate, restrict(["doctor"]), updateDoctor);
router.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor);
router.get('/profile/me', authenticate, restrict(['doctor']), getDoctorProfile);

export default router;