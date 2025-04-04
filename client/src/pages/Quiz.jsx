import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../utils/axios";
import QuizTitleAndImage from "../components/quiz/QuizTitleAndImage";
import QuizDescription from "../components/quiz/QuizDescription";
import Question from "../components/quiz/Question";
import Options from "../components/quiz/Options";
import Progressbar from "../components/quiz/Progressbar";
import Hero from "../components/common/Hero";
import Result from "../components/quiz/Result";
import { useAuthStore } from "../store/authStore";
import { ImSpinner9 } from "react-icons/im";

const Quiz = () => {
  const { quizId } = useParams();

  const { updateGameData } = useAuthStore();
  const { user } = useAuthStore();

  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [quizImage, setQuizImage] = useState(null);
  const [isQuizEnd, setIsQuizEnd] = useState(false);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [curQuestion, setCurQuestion] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeProgress, setTimeProgress] = useState(0);
  const [hero, setHero] = useState({});
  const [level, setLevel] = useState(0);
  const [isUserHasHero, setIsUserHasHero] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchQuizById = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/quizes/${quizId}`);
      setQuizTitle(response.data.title);
      setQuizDescription(response.data.description);
      setQuizImage(response.data.image);
      setHero(response.data.hero);
      setLevel(response.data.level);
    } catch (error) {
      console.error(error.response?.message || "Error fetching quiz");
    } finally {
      setLoading(false);
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
  }, [quizId]);

  const startQuiz = () => {
    setIsQuizStarted(true);
    setCurQuestion(questions[0]);
  };

  const checkSelectedOption = (option) => {
    if (option === curQuestion.correctAnswer) {
      setCorrectAnswers((prevState) => prevState + 1);
    }
  };

  const nextQuestion = (option) => {
    checkSelectedOption(option);
    if (index + 1 < questions.length) {
      setTimeout(() => {
        setIndex((prevIndex) => prevIndex + 1);
        setCurQuestion(questions[index + 1]);
        setTimeProgress(0);
      }, 500);
    } else {
      setIsQuizEnd(true);
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
      const response = await axiosInstance.patch("/users/save-result", {
        quizId,
        score: correctAnswers,
        heroId: hero._id,
        level: level,
      });
      updateGameData({
        quizProgress: response.data.quizProgress,
        coins: response.data.coins,
        experiences: response.data.experiences,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isQuizEnd) {
      saveResultToDB();
      const usersHeroes = user?.cards.some((heroId) => String(heroId) === String(hero._id));
      setIsUserHasHero(usersHeroes);
    }
  }, [isQuizEnd]);

  return (
    <div className="max-w-[1440px] mx-auto px-[50px] pt-[10px] flex justify-center min-h-screen">
      {isQuizStarted && !isQuizEnd && curQuestion && (
        <div className="flex flex-col items-center">
          <QuizTitleAndImage title={quizTitle} image={quizImage} />
          <Question curQuestion={curQuestion?.question} length={questions.length} index={index} />
          <Progressbar timeProgress={timeProgress} />
          <Options nextQuestion={nextQuestion} options={curQuestion?.options} />
        </div>
      )}
      {loading ? (
        <div className="flex items-center justify-center">
          <ImSpinner9 size={35} className="animate-spin" />
        </div>
      ) : (
        <QuizDescription
          isQuizStarted={isQuizStarted}
          quizTitle={quizTitle}
          quizDescription={quizDescription}
          startQuiz={startQuiz}
          fetchQuizesQuestions={fetchQuizesQuestions}
        />
      )}
      <div className="flex flex-col items-center gap-4">
        {isQuizEnd && (
          <Result
            restartQuiz={restartQuiz}
            correctAnswers={correctAnswers}
            length={questions.length}
            isUserHasHero={isUserHasHero}
          />
        )}
        {isQuizEnd && correctAnswers === 10 && !isUserHasHero && (
          <Hero
            name={hero.name}
            image={hero.image}
            health={hero.health}
            attack={hero.attack}
            defense={hero.defense}
            level={hero.level}
          />
        )}
      </div>
    </div>
  );
};

export default Quiz;
