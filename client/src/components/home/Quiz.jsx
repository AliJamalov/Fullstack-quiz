import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoStarFill } from "react-icons/go";
import { CiLock } from "react-icons/ci";
import { useAuthStore } from "../../store/authStore.js";
import toast from "react-hot-toast";

const Quiz = ({ image, title, description, quizId, level }) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [isLocked, setIsLocked] = useState(true);
  const [stars, setStars] = useState(0);

  useEffect(() => {
    if (!user) return;

    if (level === 1) {
      setIsLocked(false);
    } else {
      const prevQuiz = user?.quizProgress?.find((quiz) => quiz.level === level - 1);
      if (prevQuiz?.passed) {
        setIsLocked(false);
      }
    }

    const curQuiz = user.quizProgress.find((quiz) => quiz.quizId.toString() === quizId);
    setStars(curQuiz?.stars || 0);
  }, [user, quizId, level]);

  const startQuiz = () => {
    if (!isLocked) {
      navigate(`/quiz/${quizId}`);
    } else {
      toast.error("You have to pass the previous quiz first!");
    }
  };

  return (
    <div
      onClick={startQuiz}
      className="max-w-xs mx-auto h-[330px] bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105 hover:shadow-xl"
    >
      <div className="relative">
        <img src={image} alt={title} className="w-full h-[200px] object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-white truncate">{title}</h3>
        <p className="text-sm text-gray-400 mt-2 truncate">{description}</p>
      </div>
      <div className="flex items-center gap-2 px-4 relative mt-[40px]">
        <GoStarFill className="absolute bottom-3" size={30} color="white" />
        <GoStarFill className="absolute bottom-3 left-[60px]" size={30} color="white" />
        <GoStarFill className="absolute bottom-3 left-[105px]" size={30} color="white" />
        {Array(stars)
          .fill()
          .map((_, index) => (
            <GoStarFill
              key={index}
              className={`${index === 1 && "left-[60px]"} ${index === 2 && "left-[105px]"} absolute bottom-3`}
              size={30}
              color="yellow"
            />
          ))}
      </div>
      <div className="flex justify-end relative">
        {isLocked && <CiLock className="absolute bottom-3 right-3" size={30} color="white" />}
      </div>
    </div>
  );
};

export default Quiz;
