import { clientConnections } from "./connections.js";
import { createGame } from "./game/gameManager.js";
import { games } from "./game/gameState.js";

let playerIdsWaitingMatch = [];

export const matchPlayers = async (io, playerId, opponents) => {
  if (playerIdsWaitingMatch.includes(playerId)) {
    console.log(`Игрок ${playerId} уже в очереди ожидания`);
    return null;
  }

  playerIdsWaitingMatch.push(playerId);

  if (playerIdsWaitingMatch.length < 2) {
    return null;
  }

  const firstPlayerId = playerIdsWaitingMatch.shift();
  const secondPlayerId = playerIdsWaitingMatch.shift();

  opponents[firstPlayerId] = secondPlayerId;
  opponents[secondPlayerId] = firstPlayerId;

  const result = await createGame(firstPlayerId, secondPlayerId);

  if (result.error) {
    console.error(`Ошибка при создании игры: ${result.error}`);
    playerIdsWaitingMatch.unshift(secondPlayerId);
    playerIdsWaitingMatch.unshift(firstPlayerId);
    return { error: result.error };
  }

  const firstPlayerSocket = clientConnections[firstPlayerId];
  const secondPlayerSocket = clientConnections[secondPlayerId];

  if (firstPlayerSocket) {
    io.to(firstPlayerSocket).emit("game_started", {
      gameId: result.gameId,
      gameData: games[result.gameId],
      opponentId: secondPlayerId,
      yourTurn: games[result.gameId].players[firstPlayerId].currentTurn,
    });
  } else {
    console.error(`Сокет для первого игрока ${firstPlayerId} не найден`);
  }

  if (secondPlayerSocket) {
    io.to(secondPlayerSocket).emit("game_started", {
      gameId: result.gameId,
      gameData: games[result.gameId],
      opponentId: firstPlayerId,
      yourTurn: games[result.gameId].players[secondPlayerId].currentTurn,
    });
  } else {
    console.error(`Сокет для второго игрока ${secondPlayerId} не найден`);
  }

  return {
    gameId: result.gameId,
    firstPlayerId,
    secondPlayerId,
  };
};

export const removePlayerFromWaitingQueue = (playerId) => {
  const indexInWaitingQueue = playerIdsWaitingMatch.indexOf(playerId);
  if (indexInWaitingQueue !== -1) {
    playerIdsWaitingMatch.splice(indexInWaitingQueue, 1);
  }
};
