import express from "express";
import {
  addQuestion,
  getQuestions,
  deleteQuestion,
  updateQuestion,
  getQuestionById,
} from "../controllers/question.controller.js";

const router = express.Router();

router.post("/", addQuestion);

router.get("/:quizId", getQuestions);

router.get("/question/:id", getQuestionById);

router.delete("/:id", deleteQuestion);

router.patch("/:id", updateQuestion);

export default router;
