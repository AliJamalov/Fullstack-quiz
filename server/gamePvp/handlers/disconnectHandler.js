import { clientConnections, opponents } from "../connections.js";
import { getGameForPlayer, removeGame } from "../game/gameManager.js";
import { updatePlayerStats } from "../services/userManager.js";
import { removePlayerFromWaitingQueue } from "../matchmaking.js";

const disconnectHandler = (io, socket) => {
  const userId = socket.handshake.query.userId;

  if (!userId) {
    return;
  }

  const gameData = getGameForPlayer(userId);

  if (gameData) {
    const { gameId } = gameData;
    const opponentId = opponents[userId];

    if (opponentId && clientConnections[opponentId]) {
      updatePlayerStats(opponentId, userId);

      io.to(clientConnections[opponentId]).emit("opponent_disconnected", {
        gameId,
        message: "Ваш противник отключился. Вы победили!",
        gameOver: true,
        winner: "Вы победили!",
      });
    }

    removeGame(gameId);
  }

  delete clientConnections[userId];
  delete opponents[userId];

  removePlayerFromWaitingQueue(userId);
};

export default disconnectHandler;
