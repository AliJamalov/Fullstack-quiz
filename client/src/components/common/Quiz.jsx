import React from "react";
import { FaTrash } from "react-icons/fa";
import { PiSpinner } from "react-icons/pi";
import { useLocation } from "react-router-dom";

const Quiz = ({
  title,
  description,
  image,
  toggleQuestionModal,
  toggleQuizQuestions,
  id,
  setQuizId,
  handleDeleteQuiz,
  deletLoading,
}) => {
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div
      className={`border relative border-gray-300 rounded-lg ${
        isAdminPage ? "h-[450px]" : "h-[350px]"
      } p-4 shadow-lg max-w-xs mx-auto`}
    >
      {isAdminPage && (
        <div className="flex justify-end">
          {deletLoading ? (
            <PiSpinner size={20} className="animate-spin" />
          ) : (
            <FaTrash onClick={() => handleDeleteQuiz(id)} className="mb-3 cursor-pointer" size={20} color="red" />
          )}{" "}
        </div>
      )}
      <img src={image} alt={title} className="w-full h-[150px] object-cover rounded-lg" />
      <div className="pt-4">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>

      {isAdminPage && (
        <button
          onClick={() => {
            toggleQuestionModal();
            setQuizId(id);
          }}
          className="bg-green-500 absolute bottom-3 right-4 text-white rounded p-2 cursor-pointer mt-2"
        >
          Add questions
        </button>
      )}
      {isAdminPage && (
        <button
          onClick={() => {
            toggleQuizQuestions();
            setQuizId(id);
          }}
          className="bg-black absolute bottom-3 left-4 text-white rounded p-2 cursor-pointer mt-2"
        >
          See questions
        </button>
      )}
    </div>
  );
};

export default Quiz;
