import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../utils/axios";
import QuizTitleAndImage from "../components/quiz/QuizTitleAndImage";
import Question from "../components/quiz/Question";
import Options from "../components/quiz/Options";
import Progressbar from "../components/quiz/Progressbar";
import Result from "../components/quiz/Result";

const Quiz = () => {
  const { quizId } = useParams();

  const [quizTitle, setQuizTitle] = useState("");
  const [quizImage, setQuizImage] = useState(null);
  const [isQuizEnd, setIsQuizEnd] = useState(false);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [curQuestion, setCurQuestion] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeProgress, setTimeProgress] = useState(0);

  const fetchQuizById = async () => {
    try {
      const response = await axiosInstance.get(`/quizes/${quizId}`);
      setQuizTitle(response.data.title);
      setQuizImage(response.data.image);
    } catch (error) {
      console.error(error.response?.message || "Error fetching quiz");
    }
  };

  const fetchQuizesQuestions = async () => {
    try {
      const response = await axiosInstance.get(`/questions/${quizId}`);
      setQuestions(response.data);
      if (response.data.length > 0) {
        setCurQuestion(response.data[0]);
      }
    } catch (error) {
      console.log(error.response?.message || "Error fetching questions");
    }
  };

  useEffect(() => {
    fetchQuizById();
    fetchQuizesQuestions();
  }, [quizId]);

  const startQuiz = () => {
    setIsQuizStarted(true);
    setCurQuestion(questions[0]);
  };

  const checkSelectedOption = (option) => {
    if (option === curQuestion.correctAnswer) {
      setCorrectAnswers(correctAnswers + 1);
    }
  };

  const nextQuestion = (option) => {
    if (index + 1 < questions.length) {
      setTimeout(() => {
        setIndex((prevIndex) => prevIndex + 1);
        setCurQuestion(questions[index + 1]);
        setTimeProgress(0);
        checkSelectedOption(option);
      }, 500);
    } else {
      setIsQuizEnd(true);
      saveResultToDB();
    }
  };

  useEffect(() => {
    if (isQuizStarted && timeProgress < 300) {
      const interval = setTimeout(() => setTimeProgress((t) => t + 1), 100);
      return () => clearTimeout(interval);
    }

    if (timeProgress === 300) nextQuestion();
  }, [timeProgress, isQuizStarted]);

  const restartQuiz = () => {
    setIsQuizStarted(true);
    setIsQuizEnd(false);
    setCurQuestion(questions[0]);
    setTimeProgress(0);
    setIndex(0);
    setCorrectAnswers(0);
  };

  const saveResultToDB = async () => {
    try {
      await axiosInstance.post("/results", { quizId, score: correctAnswers });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-[50px] py-[10px] flex justify-center">
      {isQuizStarted && !isQuizEnd && curQuestion && (
        <div className="flex flex-col items-center">
          <QuizTitleAndImage title={quizTitle} image={quizImage} />
          <Question curQuestion={curQuestion?.question} length={questions.length} index={index} />
          <Progressbar timeProgress={timeProgress} />
          <Options nextQuestion={nextQuestion} options={curQuestion?.options} />
        </div>
      )}
      {!isQuizStarted && (
        <div className="flex justify-center mt-[200px]">
          <button onClick={startQuiz} className="text-white bg-yellow-500 py-3 px-5 cursor-pointer rounded">
            Start quiz
          </button>
        </div>
      )}
      {isQuizEnd && (
        <Result restartQuiz={restartQuiz} correctAnswers={correctAnswers} length={questions.length} quizId={quizId} />
      )}
    </div>
  );
};

export default Quiz;
