import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axios";

const Questions = ({ toggleQuizQuestions, quizId }) => {
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

  useEffect(() => {
    fetchQuizQuestions();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[500px] overflow-y-scroll">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-4">Quiz Questions</h2>
          <p className="text-lg font-medium mb-4">Questions: {questions.length}</p>
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
