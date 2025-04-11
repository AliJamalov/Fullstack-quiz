import { matchPlayers } from "./matchmaking.js";
import { getGameForPlayer } from "./game/gameManager.js";

export const clientConnections = {};
export const opponents = {};

const connectionHandler = (io, socket) => {
  const userId = socket.handshake.query.userId;

  clientConnections[userId] = socket.id;

  socket.emit("connection_established", {
    userId,
    message: "Подключено к игровому серверу",
  });

  const existingGame = getGameForPlayer(userId);
  if (existingGame) {
    const opponentId = opponents[userId];

    socket.emit("game_started", {
      gameId: existingGame.gameId,
      gameData: existingGame.game,
      opponentId: opponentId,
      yourTurn: existingGame.game.players[userId].currentTurn,
    });

    return;
  }

  socket.emit("looking_for_match", {
    message: "Поиск соперника...",
  });

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
    })
    .catch((error) => {
      console.error("Ошибка при сопоставлении игроков:", error);
      socket.emit("match_error", { message: "Ошибка при поиске соперника" });
    });
};

export default connectionHandler;
