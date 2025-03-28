import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  hero: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hero",
    required: true,
  },
});

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
