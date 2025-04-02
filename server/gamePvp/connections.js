import { matchPlayers } from "./matchmaking.js";
import { getGameForPlayer } from "./game/gameManager.js";

export const clientConnections = {};
export const opponents = {};

const connectionHandler = (io, socket) => {
  const userId = socket.handshake.query.userId;
  console.log("Получен ID пользователя:", userId);

  // Сохраняем соединение
  clientConnections[userId] = socket.id;
  console.log(`Сохранено соединение для пользователя ${userId}: ${socket.id}`);

  // Уведомляем клиента, что соединение установлено
  socket.emit("connection_established", {
    userId,
    message: "Подключено к игровому серверу",
  });

  // Проверяем, не находится ли пользователь уже в игре
  const existingGame = getGameForPlayer(userId);
  if (existingGame) {
    console.log(`Пользователь ${userId} уже в игре ${existingGame.gameId}`);
    const opponentId = opponents[userId];

    socket.emit("game_started", {
      gameId: existingGame.gameId,
      gameData: existingGame.game,
      opponentId: opponentId,
      yourTurn: existingGame.game.players[userId].currentTurn,
    });

    return;
  }

  // Уведомляем клиента о поиске соперника
  socket.emit("looking_for_match", {
    message: "Поиск соперника...",
  });

  // Ищем соперника
  matchPlayers(io, userId, opponents)
    .then((matchResult) => {
      if (!matchResult) {
        console.log(`Пользователь ${userId} добавлен в очередь ожидания`);
        return;
      }

      if (matchResult.error) {
        console.error("Ошибка матча:", matchResult.error);
        socket.emit("match_error", { message: matchResult.error });
        return;
      }

      const { gameId, firstPlayerId, secondPlayerId } = matchResult;
      console.log(`Найден матч! Игра ${gameId}: ${firstPlayerId} vs ${secondPlayerId}`);
    })
    .catch((error) => {
      console.error("Ошибка при сопоставлении игроков:", error);
      socket.emit("match_error", { message: "Ошибка при поиске соперника" });
    });
};

export default connectionHandler;
