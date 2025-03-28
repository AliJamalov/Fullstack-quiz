import express from "express";
import { updateUserProfile, savePassedQuizResult, fetchUserCards } from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.patch("/", protectRoute, updateUserProfile);

router.patch("/save-result", protectRoute, savePassedQuizResult);

router.get("/user-cards", protectRoute, fetchUserCards);

export default router;
