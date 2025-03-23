import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axios";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const Questions = ({ toggleQuizQuestions, quizId, setQuestionId, toggleQuestionModal }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchQuizQuestions = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/questions/${quizId}`);
      setQuestions(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuestion = async (id) => {
    try {
      const deleteConfirm = window.confirm("are you sure?");
      if (!deleteConfirm) return;
      await axiosInstance.delete(`/questions/${id}`);
      fetchQuizQuestions();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchQuizQuestions();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[500px] overflow-y-scroll">
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-medium">Questions: {questions.length}</p>
          <IoClose onClick={toggleQuizQuestions} size={25} className="cursor-pointer" />
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <div className="space-y-6">
            {questions.length > 0 ? (
              questions.map((question) => (
                <div key={question._id} className="p-4 border rounded-lg bg-gray-100">
                  <h3 className="text-lg font-medium">{question.question}</h3>
                  <ul className="mt-2 space-y-1">
                    {question.options.map((option, index) => (
                      <li key={index} className="p-2 bg-white rounded-lg shadow text-gray-700">
                        {option}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-sm text-green-600">
                    ✅ Correct Answer: <strong>{question.correctAnswer}</strong>
                  </p>
                  <div className="flex items-center justify-end gap-6 mt-3">
                    <CiEdit
                      onClick={() => {
                        setQuestionId(question._id);
                        toggleQuestionModal();
                        toggleQuizQuestions();
                      }}
                      color="blue"
                      size={25}
                      className="cursor-pointer"
                    />
                    <MdDelete
                      onClick={() => handleDeleteQuestion(question._id)}
                      color="red"
                      size={25}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No questions available.</p>
            )}
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={toggleQuizQuestions}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questions;
