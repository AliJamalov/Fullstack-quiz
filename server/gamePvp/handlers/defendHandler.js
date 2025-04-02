import { opponents } from "../connections.js";
import { games } from "../game/gameState.js";
import { processBattle } from "../game/gameLogic.js";

const defendHandler = (io, socket, { gameId, defendHeroId }) => {
  console.log(`Получено событие защиты: gameId=${gameId}, defendHeroId=${defendHeroId}`);

  // Получаем ID пользователя из сокета
  const userId = socket.handshake.query.userId;

  const game = games[gameId];

  if (!game) {
    console.error(`Игра ${gameId} не найдена`);
    socket.emit("error", { message: "Игра не найдена" });
    return;
  }

  // Проверяем, что сейчас фаза защиты
  if (game.state !== "DEFENSE_PHASE") {
    console.error(`Неверная фаза игры: ${game.state}`);
    socket.emit("error", { message: "Сейчас не фаза защиты" });
    return;
  }

  // Находим игрока, который защищается
  const defenderId = userId;
  const attackerId = opponents[defenderId];

  console.log(`Защищающийся: ${defenderId}, атакующий: ${attackerId}`);

  // Проверяем, что защитник вообще может защищаться (не его ход)
  if (game.players[defenderId].currentTurn) {
    console.error(`Сейчас ход игрока ${defenderId}, он не может защищаться`);
    socket.emit("error", { message: "Сейчас ваш ход атаковать, а не защищаться" });
    return;
  }

  // Проверяем, что защищаемый герой существует
  const defenderHeroes = game.players[defenderId].heroes;
  const defendHero = defenderHeroes.find((hero) => hero.id === defendHeroId);

  if (!defendHero) {
    console.error(`Герой ${defendHeroId} не найден`);
    socket.emit("error", { message: "Выбранный герой для защиты не существует" });
    return;
  }

  // Проверяем, что герой жив
  if (defendHero.health <= 0) {
    console.error(`Герой ${defendHeroId} уже побежден`);
    socket.emit("error", { message: "Выбранный герой для защиты уже побежден" });
    return;
  }

  // Сохраняем выбор защищающегося
  game.currentAttack.defenderChoice = defendHeroId;

  // Обрабатываем бой
  processBattle(io, gameId, attackerId, defenderId, game.currentAttack.targetHeroId, defendHeroId);
};

export default defendHandler;
