import express from "express";
import { createHero } from "../controllers/hero.controller.js";
const router = express.Router();

router.post("/", createHero);

export default router;
