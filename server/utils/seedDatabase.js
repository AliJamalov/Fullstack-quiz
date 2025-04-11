import mongoose from "mongoose";
import Question from "../models/question.model.js";
import User from "../models/user.model.js";
import { connectDB } from "../lib/db.js";
import dotenv from "dotenv";

dotenv.config();

const data = [
  {
    username: "playerone",
    password: "hashedpassword1",
    role: "user",
    profilePic: "",
    coins: 100,
    experiences: 0,
    level: 1,
    wins: 10,
    losses: 20,
    rank: "Новичок",
    cards: [],
    deck: [],
    friends: [],
    quizProgress: [],
  },
  {
    username: "gamerqueen",
    password: "hashedpassword2",
    role: "user",
    profilePic: "",
    coins: 150,
    experiences: 50,
    level: 1,
    wins: 32,
    losses: 3,
    rank: "Новичок",
    cards: [],
    deck: [],
    friends: [],
    quizProgress: [],
  },
  {
    username: "codewarrior",
    password: "hashedpassword3",
    role: "admin",
    profilePic: "",
    coins: 1000,
    experiences: 400,
    level: 5,
    wins: 20,
    losses: 3,
    rank: "Мастер",
    cards: [],
    deck: [],
    friends: [],
    quizProgress: [],
  },
  {
    username: "casualguy",
    password: "hashedpassword4",
    role: "user",
    profilePic: "",
    coins: 85,
    experiences: 10,
    level: 1,
    wins: 11,
    losses: 21,
    rank: "Новичок",
    cards: [],
    deck: [],
    friends: [],
    quizProgress: [],
  },
  {
    username: "quizmaster",
    password: "hashedpassword5",
    role: "user",
    profilePic: "",
    coins: 300,
    experiences: 270,
    level: 3,
    wins: 5,
    losses: 2,
    rank: "Знаток",
    cards: [],
    deck: [],
    friends: [],
    quizProgress: [],
  },
  {
    username: "speedster",
    password: "hashedpassword6",
    role: "user",
    profilePic: "",
    coins: 120,
    experiences: 90,
    level: 1,
    wins: 3,
    losses: 4,
    rank: "Новичок",
    cards: [],
    deck: [],
    friends: [],
    quizProgress: [],
  },
  {
    username: "thinkbot",
    password: "hashedpassword7",
    role: "user",
    profilePic: "",
    coins: 250,
    experiences: 180,
    level: 2,
    wins: 7,
    losses: 2,
    rank: "Продвинутый",
    cards: [],
    deck: [],
    friends: [],
    quizProgress: [],
  },
];

const seedData = async () => {
  try {
    console.log("⏳ Подключение к базе данных...");
    await connectDB();

    console.log("📝 Добавление новых данных...");
    await User.insertMany(data);

    console.log("✅ Данные успешно добавлены!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Ошибка при добавлении данных:", error);
  }
};

seedData();
