import Quiz from "../models/quiz.model.js";
import Question from "../models/question.model.js";
import cloudinary from "../lib/cloudinary.js";

export const addQuiz = async (req, res) => {
  const { title, description, image } = req.body;
  try {
    if (!title || !description || !image) {
      return res.status(404).json({ message: "invalid data" });
    }

    const createdQuiz = new Quiz({
      title,
      description,
      image,
    });

    await createdQuiz.save();

    return res.status(201).json({ message: "Quiz created successfuly!", createdQuiz });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

export const getQuizes = async (req, res) => {
  try {
    const quizes = await Quiz.find({});

    if (quizes.length === 0) {
      return res.status(404).json({ message: "quizes not found" });
    }

    return res.status(200).json(quizes);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

export const deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;

    const [deletedQuiz] = await Promise.all([Quiz.findByIdAndDelete(id), Question.deleteMany({ quizId: id })]);

    if (!deletedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    if (deletedQuiz.image) {
      // const publicId = deletedQuiz.image.replace(/^.*\/([^/]+)\..*$/, "$1"); another way
      const publicId = deletedQuiz.image.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(`quiz/${publicId}`);
        console.log("deleted image from cloduinary");
      } catch (error) {
        console.log("error deleting image from cloduinary", error);
      }
    }

    return res.status(200).json({
      message: "Quiz and related questions successfully deleted!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getQuizById = async (req, res) => {
  const { id } = req.params;

  try {
    const quiz = await Quiz.findById(id);

    if (!quiz) {
      return res.status(404).json({ message: "quiz not found" });
    }

    return res.status(200).json(quiz);
  } catch (error) {
    console.error(error);
  }
};
