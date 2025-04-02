import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useAuthStore } from "../store/authStore";
import RenderGameBoard from "../components/arena/RenderGameBoard";
import RenderSearchScreen from "../components/arena/RenderSearchScreen";
import RenderGameOver from "../components/arena/RenderGameOver";
import { getRandomEmoji } from "../utils/utils";

const Arena = () => {
  const audioRef = useRef();
  const audioRef2 = useRef();
  const SERVER_URL =
    window.location.hostname === "localhost" ? "http://localhost:5000" : "https://fullstack-quiz-xx4e.onrender.com";
  const [socket, setSocket] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [opponentId, setOpponentId] = useState(null);
  const [isYourTurn, setIsYourTurn] = useState(false);
  const [matchStatus, setMatchStatus] = useState("idle");
  const [battleMessage, setBattleMessage] = useState("");
  const [damageMessage, setDamageMessage] = useState("");
  const [winner, setWinner] = useState(null);
  const [targetHero, setTargetHero] = useState(null);

  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) return;

    const socketInstance = io(SERVER_URL, {
      query: { userId: user._id },
      autoConnect: false, // Отключаем автоматическое подключение
    });

    setSocket(socketInstance);

    return () => {
      if (socketInstance) socketInstance.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (!socket) return;

    // Connection established
    socket.on("connection_established", (data) => {
      console.log("Connected to game server:", data);
    });

    // Looking for match
    socket.on("looking_for_match", (data) => {
      setMatchStatus("searching");
      setBattleMessage(data.message);
    });

    // Match error
    socket.on("match_error", (data) => {
      console.error("Match error:", data);
      setMatchStatus("idle");
      setBattleMessage(data.message);
    });

    // Game started
    socket.on("game_started", (data) => {
      setGameId(data.gameId);
      setGameState(data.gameData);
      setOpponentId(data.opponentId);
      setIsYourTurn(data.yourTurn);
      setMatchStatus("playing");
      setBattleMessage(
        data.yourTurn ? "Ваш ход! Выберите героя противника для атаки." : "Ход противника. Ожидайте атаки."
      );
    });

    // Attack chosen
    socket.on("attack_chosen", (data) => {
      console.log("Attack chosen:", data);
      setBattleMessage(data.message);
      setTargetHero(data.targetHeroId);
    });

    // Defend request
    socket.on("defend_request", (data) => {
      setBattleMessage(`${data.message}.`);
    });

    // Battle result
    socket.on("battle_result", (data) => {
      setBattleMessage(data.message);
      setDamageMessage(`${getRandomEmoji()} -${data.damageMessage}`);

      if (data.gameOver) {
        setMatchStatus("gameOver");
        setWinner(data.winner);
      } else {
        setGameState(data.gameState);
        setIsYourTurn(data.yourTurn);
        setTimeout(() => {
          setBattleMessage(
            data.yourTurn ? "Ваш ход! Выберите героя противника для атаки." : "Ход противника. Ожидайте атаки."
          );
        }, 3000);
      }
    });

    // Opponent disconnected
    socket.on("opponent_disconnected", (data) => {
      setBattleMessage(data.message);
      setMatchStatus("gameOver");
      setWinner("Вы победили!");
    });

    socket.on("error", (data) => {
      console.error("Error:", data);
      setBattleMessage(data.message);
    });

    return () => {
      // Clean up all listeners
      socket.off("connection_established");
      socket.off("looking_for_match");
      socket.off("match_error");
      socket.off("game_started");
      socket.off("attack_chosen");
      socket.off("defend_request");
      socket.off("battle_result");
      socket.off("opponent_disconnected");
      socket.off("error");
    };
  }, [socket]);

  // Find opponent handler
  const handleFindOpponent = () => {
    if (!socket || !user) {
      setBattleMessage("Не удалось подключиться к серверу. Пожалуйста, войдите в аккаунт.");
      return;
    }

    // Подключаем сокет только при нажатии на кнопку
    if (!socket.connected) {
      socket.connect();
    }

    setMatchStatus("searching");
    setBattleMessage("Поиск соперника...");
  };

  const handleAttack = (targetHeroId) => {
    if (!socket || !gameId || !isYourTurn) return;

    socket.emit("attack", { gameId, targetHeroId });
    hideDamageMessage();
  };

  const handleDefend = (defendHeroId) => {
    if (!socket || !gameId || isYourTurn) return;

    socket.emit("defend", { gameId, defendHeroId });
    hideDamageMessage();
  };

  const getPlayerHeroes = () => {
    if (!gameState || !user) return [];
    return gameState.players[user._id]?.heroes || [];
  };

  const getOpponentHeroes = () => {
    if (!gameState || !opponentId) return [];
    return gameState.players[opponentId]?.heroes || [];
  };

  // Helper to determine if a hero is alive
  const isHeroAlive = (hero) => hero && hero.health > 0;

  const handleBackMenu = () => {
    setGameState(null);
    setGameId(null);
    setOpponentId(null);
    setIsYourTurn(false);
    setMatchStatus("idle");
    setBattleMessage("");
    setWinner(null);
    setTargetHero(null);

    // Отключаем сокет при выходе из игры
    if (socket) {
      socket.disconnect();
    }
  };

  if (matchStatus === "playing") {
    audioRef2.current.play();
  } else {
    audioRef2?.current?.pause();
  }

  const hideDamageMessage = () => {
    setTimeout(() => {
      setDamageMessage("");
    }, 4000);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-[10px] pt-[10px] pb-[100px] sm:pb-0 md:px-[80px] lg:px-[250px]">
      <audio src="/music/sword.mp3" ref={audioRef}></audio>
      <audio src="/music/bg.mpeg" ref={audioRef2} loop></audio>
      {damageMessage && <p className="absolute top-33 left-[10%] text-red-500 font-medium text-md">{damageMessage}</p>}
      {matchStatus === "idle" && (
        <div>
          <h1 className="text-center text-md text-white font-semibold sm:text-2xl">Арена</h1>
          <p className="text-white mt-3 text-center fonte-meduim text-md sm:text-lg">
            Испытай свои силы с реальными игроками
          </p>
        </div>
      )}
      {matchStatus === "idle" && (
        <div className="flex flex-col items-center">
          <button
            className="bg-gray-900 p-2 text-white rounded-md cursor-pointer mt-5 hover:bg-gray-800"
            onClick={handleFindOpponent}
          >
            Найти противника
          </button>
          <p className="text-white mt-3 text-center font-medium text-md sm:text-lg">
            Правила игры: игроки атакуют по очереди. Один игрок выбирает героя для атаки, а другой — героя для защиты.
            Если защищающийся угадает цель атаки, урон получает атакующий. Если нет, урон наносится защищающемуся.
          </p>
        </div>
      )}

      {matchStatus === "searching" && (
        <RenderSearchScreen handleBackMenu={handleBackMenu} battleMessage={battleMessage} />
      )}
      {matchStatus === "playing" && (
        <RenderGameBoard
          getPlayerHeroes={getPlayerHeroes}
          getOpponentHeroes={getOpponentHeroes}
          battleMessage={battleMessage}
          isHeroAlive={isHeroAlive}
          isYourTurn={isYourTurn}
          handleAttack={handleAttack}
          handleDefend={handleDefend}
          targetHero={targetHero}
          audioRef={audioRef}
        />
      )}
      {matchStatus === "gameOver" && (
        <RenderGameOver winner={winner} handleBackMenu={handleBackMenu} battleMessage={battleMessage} />
      )}
    </div>
  );
};

export default Arena;
