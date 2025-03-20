import React from "react";

const Quiz = ({ title, description, image, toggleQuestionModal, toggleQuizQuestions, id, setQuizId }) => {
  return (
    <div className="border relative border-gray-300 rounded-lg h-[410px] p-4 shadow-lg max-w-xs mx-auto">
      <img src={image} alt={title} className="w-full h-[150px] object-cover rounded-t-lg" />
      <div className="pt-4">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
      <button
        onClick={() => {
          toggleQuestionModal();
          setQuizId(id);
        }}
        className="bg-green-500 absolute bottom-3 right-4 text-white rounded p-2 cursor-pointer mt-2"
      >
        Add questions
      </button>
      <button
        onClick={() => {
          toggleQuizQuestions();
          setQuizId(id);
        }}
        className="bg-black absolute bottom-3 left-4 text-white rounded p-2 cursor-pointer mt-2"
      >
        See questions
      </button>
    </div>
  );
};

export default Quiz;
