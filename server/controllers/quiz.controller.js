import Quiz from "../models/quiz.model.js";

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

    if (!quizes) {
      return res.status(404).json({ message: "quizes not found" });
    }

    return res.status(200).json(quizes);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
