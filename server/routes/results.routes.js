import express from "express";
import { getResults, addResult } from "../controllers/result.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, addResult);

router.get("/", getResults);

export default router;
