import { opponents } from "../connections.js";
import { games } from "../game/gameState.js";
import { clientConnections } from "../connections.js";

const attackHandler = (io, socket, { gameId, targetHeroId }) => {
  const userId = socket.handshake.query.userId;

  const game = games[gameId];

  if (!game) {
    socket.emit("error", { message: "Игра не найдена" });
    return;
  }

  if (game.state !== "ATTACK_PHASE") {
    socket.emit("error", { message: "Сейчас не фаза атаки" });
    return;
  }

  const attackerId = userId;
  const defenderId = opponents[attackerId];

  if (!game.players[attackerId].currentTurn) {
    socket.emit("error", { message: "Сейчас не ваш ход" });
    return;
  }

  const defenderHeroes = game.players[defenderId].heroes;
  const targetHero = defenderHeroes.find((hero) => hero.id === targetHeroId);

  if (!targetHero) {
    socket.emit("error", { message: "Выбранный герой не существует" });
    return;
  }

  if (targetHero.health <= 0) {
    socket.emit("error", { message: "Выбранный герой уже побежден" });
    return;
  }

  game.currentAttack.attackerId = attackerId;
  game.currentAttack.targetHeroId = targetHeroId;

  game.state = "DEFENSE_PHASE";

  io.to(clientConnections[attackerId]).emit("attack_chosen", {
    gameId,
    targetHeroId,
    message: "Вы выбрали цель для атаки",
  });

  io.to(clientConnections[defenderId]).emit("defend_request", {
    gameId,
    targetHeroId,
    message: "Противник атакует, выберите героя для защиты",
  });
};

export default attackHandler;
