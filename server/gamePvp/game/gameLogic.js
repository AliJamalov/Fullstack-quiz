import { games } from "./gameState.js";
import { checkGameOver, switchTurn } from "./gameState.js";
import { updatePlayerStats } from "../services/userManager.js";
import { clientConnections } from "../connections.js";

// Обработка боя
export const processBattle = (io, gameId, attackerId, defenderId, targetHeroId, defendHeroId) => {
  const game = games[gameId];

  // Находим атакующего героя (выбираем первого живого для простоты)
  const attackerHeroes = game.players[attackerId].heroes;
  const attackingHero = attackerHeroes.find((hero) => hero.health > 0);

  // Находим цель атаки и героя защиты
  const defenderHeroes = game.players[defenderId].heroes;
  const targetHero = defenderHeroes.find((hero) => hero.id === targetHeroId);
  const defendHero = defenderHeroes.find((hero) => hero.id === defendHeroId);

  let message = "";
  let damageMessage = "";

  // Если защищающийся угадал цель атаки - урон наносится атакующему с учетом защиты
  if (targetHeroId === defendHeroId) {
    // Урон с учетом защиты атакующего
    const damage = Math.max(10, defendHero.attack - attackingHero.defense);
    attackingHero.health -= damage;

    console.log(`Успешная защита: ${defendHero.name} наносит ${damage} урона герою ${attackingHero.name}`);
    message = `Защита успешна! ${defendHero.name} наносит ${damage} урона герою ${attackingHero.name} противника`;
    damageMessage = damage.toString();
  } else {
    // Если не угадал - урон наносится цели атаки с учетом защиты
    const damage = Math.max(10, attackingHero.attack - targetHero.defense);
    targetHero.health -= damage;

    console.log(`Неуспешная защита: ${attackingHero.name} наносит ${damage} урона герою ${targetHero.name}`);
    message = `Защита не удалась! ${attackingHero.name} наносит ${damage} урона герою ${targetHero.name}`;
    damageMessage = damage.toString();
  }

  // Проверяем окончание игры
  const gameOverResult = checkGameOver(game);

  if (gameOverResult.isOver) {
    game.state = "GAME_OVER";
    console.log(`Игра ${gameId} завершена. Победитель: ${gameOverResult.winnerId}`);

    // Обновляем статистику игроков
    updatePlayerStats(gameOverResult.winnerId, gameOverResult.winnerId === attackerId ? defenderId : attackerId);

    // Уведомляем игроков о результате битвы и окончании игры
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

    // Удаляем игру после окончания через небольшую задержку
    setTimeout(() => {
      console.log(`Удаляем игру ${gameId} из памяти`);
      delete games[gameId];
    }, 5000);

    return true; // Игра завершена
  }

  // Переключаем ход и обновляем состояние игры
  switchTurn(game);
  console.log(`Ход переключен, теперь ход игрока: ${game.players[attackerId].currentTurn ? attackerId : defenderId}`);

  // Уведомляем игроков о результате битвы
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

  return false; // Игра продолжается
};
