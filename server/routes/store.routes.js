import express from "express";
import { fetchHeroes, buyHero } from "../controllers/store.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, buyHero);

router.get("/", protectRoute, fetchHeroes);

export default router;
