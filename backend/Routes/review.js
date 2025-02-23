import express from 'express';
import { getAllReviews, createReview } from '../Controllers/reviewController.js';
import { authenticate, restrict } from '../auth/verifyToken.js';

const router = express.Router({ mergeParams: true });
//mergeParams true makes sure the params from the parent route
//are accessible in the nested route

router
    .route("/")
    .get(getAllReviews)
    .post(authenticate, restrict("patient"), createReview);

export default router;