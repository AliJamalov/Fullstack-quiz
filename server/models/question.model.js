import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true,
  },
  options: {
    type: [String],
    required: true,
    trim: true,
  },
  correctAnswer: {
    type: String,
    required: true,
    trim: true,
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
});

const Question = mongoose.model("Question", questionSchema);

export default Question;
