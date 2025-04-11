import { opponents } from "../connections.js";
import { games } from "../game/gameState.js";
import { processBattle } from "../game/gameLogic.js";

const defendHandler = (io, socket, { gameId, defendHeroId }) => {
  const userId = socket.handshake.query.userId;

  const game = games[gameId];

  if (!game) {
    socket.emit("error", { message: "Игра не найдена" });
    return;
  }

  if (game.state !== "DEFENSE_PHASE") {
    socket.emit("error", { message: "Сейчас не фаза защиты" });
    return;
  }

  const defenderId = userId;
  const attackerId = opponents[defenderId];

  if (game.players[defenderId].currentTurn) {
    socket.emit("error", { message: "Сейчас ваш ход атаковать, а не защищаться" });
    return;
  }

  const defenderHeroes = game.players[defenderId].heroes;
  const defendHero = defenderHeroes.find((hero) => hero.id === defendHeroId);

  if (!defendHero) {
    socket.emit("error", { message: "Выбранный герой для защиты не существует" });
    return;
  }

  if (defendHero.health <= 0) {
    socket.emit("error", { message: "Выбранный герой для защиты уже побежден" });
    return;
  }

  game.currentAttack.defenderChoice = defendHeroId;

  processBattle(io, gameId, attackerId, defenderId, game.currentAttack.targetHeroId, defendHeroId);
};

export default defendHandler;
