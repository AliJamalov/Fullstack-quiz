import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

import authRouter from "./routes/auth.routes.js";
import questionRouter from "./routes/question.routes.js";
import quizRouter from "./routes/quiz.routes.js";
import userRouter from "./routes/user.routes.js";
import heroRouter from "./routes/hero.routes.js";
import storeRouter from "./routes/store.routes.js";

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://fullstack-quiz-bay.vercel.app"],
    methods: ["GET", "POST", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/questions", questionRouter);
app.use("/api/quizes", quizRouter);
app.use("/api/users", userRouter);
app.use("/api/heroes", heroRouter);
app.use("/api/store", storeRouter);

dotenv.config();

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
  connectDB();
});
