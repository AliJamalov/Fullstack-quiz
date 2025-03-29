import express from "express";
import {
  updateUserProfile,
  savePassedQuizResult,
  fetchUserCards,
  saveUserDeck,
  fetchUserDeck,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.patch("/", protectRoute, updateUserProfile);

router.patch("/save-result", protectRoute, savePassedQuizResult);

router.get("/user-cards", protectRoute, fetchUserCards);

router.post("/save-deck", protectRoute, saveUserDeck);

router.get("/get-deck", protectRoute, fetchUserDeck);

export default router;
