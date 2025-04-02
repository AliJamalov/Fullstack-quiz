import { opponents } from "../connections.js";
import { games } from "../game/gameState.js";
import { clientConnections } from "../connections.js";

const attackHandler = (io, socket, { gameId, targetHeroId }) => {
  console.log(`Получено событие атаки: gameId=${gameId}, targetHeroId=${targetHeroId}`);

  // Получаем ID пользователя из сокета
  const userId = socket.handshake.query.userId;

  const game = games[gameId];

  if (!game) {
    console.error(`Игра ${gameId} не найдена`);
    socket.emit("error", { message: "Игра не найдена" });
    return;
  }

  // Проверяем, что сейчас фаза атаки
  if (game.state !== "ATTACK_PHASE") {
    console.error(`Неверная фаза игры: ${game.state}`);
    socket.emit("error", { message: "Сейчас не фаза атаки" });
    return;
  }

  // Находим игрока, который делает атаку
  const attackerId = userId;
  const defenderId = opponents[attackerId];

  console.log(`Атакующий: ${attackerId}, защищающийся: ${defenderId}`);

  // Проверяем, что сейчас ход атакующего
  if (!game.players[attackerId].currentTurn) {
    console.error(`Сейчас не ход игрока ${attackerId}`);
    socket.emit("error", { message: "Сейчас не ваш ход" });
    return;
  }

  // Проверяем, что атакуемый герой существует
  const defenderHeroes = game.players[defenderId].heroes;
  const targetHero = defenderHeroes.find((hero) => hero.id === targetHeroId);

  if (!targetHero) {
    console.error(`Герой ${targetHeroId} не найден`);
    socket.emit("error", { message: "Выбранный герой не существует" });
    return;
  }

  // Проверяем, что герой жив
  if (targetHero.health <= 0) {
    console.error(`Герой ${targetHeroId} уже побежден`);
    socket.emit("error", { message: "Выбранный герой уже побежден" });
    return;
  }

  // Сохраняем информацию об атаке
  game.currentAttack.attackerId = attackerId;
  game.currentAttack.targetHeroId = targetHeroId;

  // Переходим к фазе защиты
  game.state = "DEFENSE_PHASE";

  console.log(`Игра ${gameId} перешла в фазу защиты`);

  // Уведомляем игроков о выборе цели атаки
  io.to(clientConnections[attackerId]).emit("attack_chosen", {
    gameId,
    targetHeroId,
    message: "Вы выбрали цель для атаки",
  });

  io.to(clientConnections[defenderId]).emit("defend_request", {
    gameId,
    targetHeroId, // Дополнительно отправляем ID атакуемого героя
    message: "Противник атакует, выберите героя для защиты",
  });
};

export default attackHandler;
