import mongoose from "mongoose";

const heroSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  mythology: {
    type: String,
    required: true,
  },
  heroClass: {
    type: String,
    enum: ["Воин", "Маг", "Жрец"],
    required: true,
  },
  race: {
    type: String,
    enum: ["Бог", "Полубог", "Человек", "Демон", "Дух", "Дракон"],
    required: true,
  },
  level: {
    type: Number,
    default: 1,
  },
  health: {
    type: Number,
    required: true,
    default: 100,
  },
  attack: {
    type: Number,
    required: true,
    default: 10,
  },
  defense: {
    type: Number,
    required: true,
    default: 5,
  },
  rarity: {
    type: String,
    enum: ["Обычная", "Редкая", "Эпическая", "Легендарная"],
    default: "Обычная",
  },
  cost: {
    type: Number,
    default: 0,
  },
});

const Hero = mongoose.model("Hero", heroSchema);

export default Hero;
