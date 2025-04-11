import { games } from "./gameState.js";
import { checkGameOver, switchTurn } from "./gameState.js";
import { updatePlayerStats } from "../services/userManager.js";
import { clientConnections } from "../connections.js";

export const processBattle = (io, gameId, attackerId, defenderId, targetHeroId, defendHeroId) => {
  const game = games[gameId];

  const attackerHeroes = game.players[attackerId].heroes;
  const attackingHero = attackerHeroes.find((hero) => hero.health > 0);

  const defenderHeroes = game.players[defenderId].heroes;
  const targetHero = defenderHeroes.find((hero) => hero.id === targetHeroId);
  const defendHero = defenderHeroes.find((hero) => hero.id === defendHeroId);

  let message = "";
  let damageMessage = "";

  if (targetHeroId === defendHeroId) {
    const damage = Math.max(10, defendHero.attack - attackingHero.defense);
    attackingHero.health -= damage;

    message = `Защита успешна! ${defendHero.name} наносит ${damage} урона герою ${attackingHero.name} противника`;
    damageMessage = damage.toString();
  } else {
    const damage = Math.max(10, attackingHero.attack - targetHero.defense);
    targetHero.health -= damage;

    message = `Защита не удалась! ${attackingHero.name} наносит ${damage} урона герою ${targetHero.name}`;
    damageMessage = damage.toString();
  }

  const gameOverResult = checkGameOver(game);

  if (gameOverResult.isOver) {
    game.state = "GAME_OVER";

    updatePlayerStats(gameOverResult.winnerId, gameOverResult.winnerId === attackerId ? defenderId : attackerId);

    io.to(clientConnections[attackerId]).emit("battle_result", {
      gameId,
      message,
      gameOver: true,
      winner: gameOverResult.winnerId === attackerId ? "Вы победили!" : "Вы проиграли!",
    });

    io.to(clientConnections[defenderId]).emit("battle_result", {
      gameId,
      message,
      gameOver: true,
      winner: gameOverResult.winnerId === defenderId ? "Вы победили!" : "Вы проиграли!",
    });

    setTimeout(() => {
      delete games[gameId];
    }, 5000);

    return true;
  }

  switchTurn(game);

  io.to(clientConnections[attackerId]).emit("battle_result", {
    gameId,
    message,
    gameState: game,
    damageMessage,
    yourTurn: game.players[attackerId].currentTurn,
  });

  io.to(clientConnections[defenderId]).emit("battle_result", {
    gameId,
    message,
    damageMessage,
    gameState: game,
    yourTurn: game.players[defenderId].currentTurn,
  });

  return false;
};
