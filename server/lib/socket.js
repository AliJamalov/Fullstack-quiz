import { Server } from "socket.io";
import http from "http";
import express from "express";
import connectionHandler from "../gamePvp/connections.js";

// Импорт обработчиков событий
import attackHandler from "../gamePvp/handlers/attackHandler.js";
import defendHandler from "../gamePvp/handlers/defendHandler.js";
import disconnectHandler from "../gamePvp/handlers/disconnectHandler.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://fullstack-quiz-bay.vercel.app"],
  },
});

io.on("connection", (socket) => {
  console.log("Пользователь подключен", socket.id);

  connectionHandler(io, socket);

  socket.on("attack", (data) => attackHandler(io, socket, data));
  socket.on("defend", (data) => defendHandler(io, socket, data));
  socket.on("disconnect", () => disconnectHandler(io, socket));
});

export { app, server, io };
