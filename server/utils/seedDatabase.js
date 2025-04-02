import mongoose from "mongoose";
import Question from "../models/question.model.js";
import { connectDB } from "../lib/db.js";
import dotenv from "dotenv";

dotenv.config();

const quizId = "67e599d29500a6624a6d4e53";

const data = [
  {
    question: "Как называется главный бог славянской мифологии?",
    options: ["Перун", "Сварог", "Велес", "Даждьбог"],
    correctAnswer: "Перун",
    quizId,
  },
  {
    question: "Как звали богиню любви и красоты в славянской мифологии?",
    options: ["Мокошь", "Лада", "Рада", "Жива"],
    correctAnswer: "Лада",
    quizId,
  },
  {
    question: "Как называется славянский бог подземного мира?",
    options: ["Велес", "Чур", "Сварог", "Мокошь"],
    correctAnswer: "Велес",
    quizId,
  },
  {
    question: "Кто является богом грома и молний у славян?",
    options: ["Перун", "Ярило", "Даждьбог", "Леший"],
    correctAnswer: "Перун",
    quizId,
  },
  {
    question: "Как зовут богиню земли и плодородия в славянской мифологии?",
    options: ["Мокошь", "Жива", "Рода", "Лада"],
    correctAnswer: "Мокошь",
    quizId,
  },
  {
    question: "Какой дух в славянской мифологии отвечает за леса и диких животных?",
    options: ["Леший", "Русалка", "Домовой", "Водяной"],
    correctAnswer: "Леший",
    quizId,
  },
  {
    question: "Что такое Домовой в славянской мифологии?",
    options: ["Дух-хранитель дома", "Лесной дух", "Бог дождя", "Дух воды"],
    correctAnswer: "Дух-хранитель дома",
    quizId,
  },
  {
    question: "Какая богиня у славян была связана с жизненной силой и плодородием?",
    options: ["Мокошь", "Жива", "Лада", "Рода"],
    correctAnswer: "Жива",
    quizId,
  },
  {
    question: "Как назывался славянский бог веселья и праздников?",
    options: ["Ярило", "Даждьбог", "Кострома", "Перун"],
    correctAnswer: "Ярило",
    quizId,
  },
  {
    question: "Как называется русалка в славянской мифологии?",
    options: ["Русалка", "Жрица", "Леший", "Баба-яга"],
    correctAnswer: "Русалка",
    quizId,
  },
];

const seedData = async () => {
  try {
    console.log("⏳ Подключение к базе данных...");
    await connectDB();

    console.log("📝 Добавление новых данных...");
    await Question.insertMany(data);

    console.log("✅ Данные успешно добавлены!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Ошибка при добавлении данных:", error);
  }
};

seedData();
