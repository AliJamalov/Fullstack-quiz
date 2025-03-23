import express from "express";
import { addQuiz, getQuizes, deleteQuiz, getQuizById } from "../controllers/quiz.controller.js";

const router = express.Router();

router.post("/", addQuiz);

router.get("/", getQuizes);

router.get("/:id", getQuizById);

router.delete("/:id", deleteQuiz);

export default router;
