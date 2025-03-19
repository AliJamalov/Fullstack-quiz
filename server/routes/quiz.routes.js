import express from "express";
import { addQuiz, getQuizes } from "../controllers/quiz.controller.js";

const router = express.Router();

router.post("/", addQuiz);

router.get("/", getQuizes);

export default router;
