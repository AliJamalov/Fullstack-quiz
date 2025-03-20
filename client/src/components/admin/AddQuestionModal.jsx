import React, { useState } from "react";
import { axiosInstance } from "../../utils/axios";
import { PiSpinner } from "react-icons/pi";
import toast from "react-hot-toast";

const AddQuestionModal = ({ toggleQuestionModal, quizId }) => {
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const options = [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    options.push(option1, option2, option3, option4);
    setLoading(true);
    try {
      await axiosInstance.post("/questions", { question, options, correctAnswer, quizId });
      toast.success("question created successfuly!");
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setQuestion("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setCorrectAnswer("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add question</h2>
        <form onSubmit={handleSubmit}>
          {/* Question */}
          <div className="mb-4">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              type="text"
              placeholder="type question"
              className="w-full p-2 border rounded-lg"
            />
          </div>

          {/* Option 1 */}
          <div className="mb-4">
            <input
              value={option1}
              onChange={(e) => setOption1(e.target.value)}
              type="text"
              placeholder="Option 1"
              className="w-full p-2 border rounded-lg"
            />
          </div>

          {/* Option 2 */}
          <div className="mb-4">
            <input
              value={option2}
              onChange={(e) => setOption2(e.target.value)}
              type="text"
              placeholder="Option 2"
              className="w-full p-2 border rounded-lg"
            />
          </div>

          {/* Option 3 */}
          <div className="mb-4">
            <input
              value={option3}
              onChange={(e) => setOption3(e.target.value)}
              type="text"
              placeholder="Option 3"
              className="w-full p-2 border rounded-lg"
            />
          </div>

          {/* Option 4 */}
          <div className="mb-4">
            <input
              value={option4}
              onChange={(e) => setOption4(e.target.value)}
              type="text"
              placeholder="Option 4"
              className="w-full p-2 border rounded-lg"
            />
          </div>

          {/* Correct answer */}
          <div className="mb-4">
            <input
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              type="text"
              placeholder="add correct answer"
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={toggleQuestionModal}
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-lg cursor-pointer"
            >
              Close
            </button>
            <button
              disabled={loading}
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-lg cursor-pointer"
            >
              {loading ? <PiSpinner size={20} className="animate-spin" /> : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddQuestionModal;
