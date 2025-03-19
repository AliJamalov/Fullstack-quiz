import express from "express";
import { addQuestion, getQuestions } from "../controllers/quiestion.controller.js";

const router = express.Router();

router.post("/", addQuestion);

router.get("/:quizId", getQuestions);

export default router;
