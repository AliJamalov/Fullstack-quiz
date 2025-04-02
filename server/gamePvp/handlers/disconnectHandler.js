import { clientConnections, opponents } from "../connections.js";
import { getGameForPlayer, removeGame } from "../game/gameManager.js";
import { updatePlayerStats } from "../services/userManager.js";
import { removePlayerFromWaitingQueue } from "../matchmaking.js";

const disconnectHandler = (io, socket) => {
  console.log("Пользователь отключился", socket.id);

  const userId = socket.handshake.query.userId;

  if (!userId) {
    return;
  }

  // Находим игру, в которой участвует игрок
  const gameData = getGameForPlayer(userId);

  if (gameData) {
    const { gameId } = gameData;
    const opponentId = opponents[userId];

    console.log(`Игрок ${userId} отключился во время игры ${gameId} с противником ${opponentId}`);

    // Уведомляем оппонента о победе из-за отключения
    if (opponentId && clientConnections[opponentId]) {
      // Обновляем статистику игроков (победа засчитывается оппоненту)
      updatePlayerStats(opponentId, userId);

      io.to(clientConnections[opponentId]).emit("opponent_disconnected", {
        gameId,
        message: "Ваш противник отключился. Вы победили!",
        gameOver: true,
        winner: "Вы победили!",
      });
    }

    // Удаляем игру
    removeGame(gameId);
    console.log(`Игра ${gameId} удалена из-за отключения игрока ${userId}`);
  }

  // Удаляем связи игрока
  delete clientConnections[userId];
  delete opponents[userId];

  // Удаляем из очереди на матч, если был там
  removePlayerFromWaitingQueue(userId);

  console.log(`Игрок ${userId} удален из всех соединений и очередей`);
};

export default disconnectHandler;
