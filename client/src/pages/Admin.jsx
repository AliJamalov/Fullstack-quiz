import React, { useState, useEffect } from "react";
import AddQuizModal from "../components/admin/AddQuizModal";
import { axiosInstance } from "../utils/axios";
import Quiz from "../components/admin/Quiz";
import AddQuestionModal from "../components/admin/AddQuestionModal";
import Questions from "../components/admin/Questions";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Admin = () => {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenQuestionModal, setIsOpenQuestionModal] = useState(false);
  const [isOpenQuestions, setIsOpenQuestions] = useState(false);
  const [quizes, setQuizes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletLoading, setDeleteLoading] = useState(false);
  const [quizId, setQuizId] = useState(null);
  const [questionId, setQuestionId] = useState(null);

  const fetchQuizes = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/quizes");
      setQuizes(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuiz = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this quiz?");
    if (!isConfirmed) return;

    setDeleteLoading(true);
    try {
      await axiosInstance.delete(`/quizes/${id}`);
      toast.success("Quiz successfully deleted!");
      fetchQuizes();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete quiz.");
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizes();
  }, []);

  const toggleAddModal = () => {
    setIsOpenAddModal(!isOpenAddModal);
  };

  const toggleQuestionModal = () => {
    setIsOpenQuestionModal(!isOpenQuestionModal);
  };

  const toggleQuizQuestions = () => {
    setIsOpenQuestions(!isOpenQuestions);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-[50px] py-[30px]">
      <div className="flex justify-between items-center">
        <button onClick={toggleAddModal} className="bg-yellow-400 text-white rounded p-2 cursor-pointer">
          Add new quiz
        </button>
        <Link to={"/"}>
          <FaHome color="white" size={30} />
        </Link>
      </div>

      {loading && <p className="text-center text-white font-medium">Loading...</p>}

      {/* Add quiz modal */}
      {isOpenAddModal && <AddQuizModal fetchQuizes={fetchQuizes} toggleAddModal={toggleAddModal} />}

      {/* Add question modal */}
      {isOpenQuestionModal && (
        <AddQuestionModal
          setQuestionId={setQuestionId}
          questionId={questionId}
          quizId={quizId}
          toggleQuestionModal={toggleQuestionModal}
        />
      )}

      {/* Quiz questions */}
      {isOpenQuestions && (
        <Questions
          toggleQuestionModal={toggleQuestionModal}
          setQuestionId={setQuestionId}
          quizId={quizId}
          toggleQuizQuestions={toggleQuizQuestions}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
        {quizes?.map((quiz) => (
          <div key={quiz._id}>
            <Quiz
              toggleQuestionModal={toggleQuestionModal}
              toggleQuizQuestions={toggleQuizQuestions}
              image={quiz.image}
              description={quiz.description}
              title={quiz.title}
              id={quiz._id}
              setQuizId={setQuizId}
              handleDeleteQuiz={handleDeleteQuiz}
              deletLoading={deletLoading}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
