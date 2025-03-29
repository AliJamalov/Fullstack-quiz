import React, { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axios";
import Quiz from "../components/home/Quiz";
import Topbar from "../components/home/Topbar";

const Home = () => {
  const [quizes, setQuizes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchQuizes = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance("/quizes");
      setQuizes(response.data);
    } catch (error) {
      console.error(error.response.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizes();
  }, []);

  return (
    <div
      className="max-w-[1440px] mx-auto px-[50px] pt-[20px] bg-cover bg-center min-h-screen"
      style={{ backgroundImage: "url('/images/castle-bg.svg')" }}
    >
      <Topbar />
      <div>
        <h1 className="text-2xl font-bold text-yellow-500 my-4">Мифическая Арена</h1>
        <p className="text-md font-medium text-yellow-500 text-center w-full md:w-[500px] bg-white p-2 rounded-md">
          Выберите викторину, чтобы начать путешествие в мир мифов
        </p>
        {loading && <p className="text-lg font-medium text-white text-center">Загрузка...</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5 pb-[120px] sm:pb-0">
          {quizes?.map((quiz) => (
            <div key={quiz._id}>
              <Quiz
                key={quiz._id}
                quizId={quiz._id}
                image={quiz.image}
                title={quiz.title}
                description={quiz.description}
                level={quiz.level}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
