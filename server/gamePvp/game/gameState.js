export const games = {};

export const checkAllHeroesDead = (heroes) => {
  return heroes.every((hero) => hero.health <= 0);
};

export const checkGameOver = (game) => {
  const playerIds = Object.keys(game.players);

  for (const playerId of playerIds) {
    if (checkAllHeroesDead(game.players[playerId].heroes)) {
      return {
        isOver: true,
        winnerId: playerIds.find((id) => id !== playerId),
      };
    }
  }

  return { isOver: false };
};

export const switchTurn = (game) => {
  const playerIds = Object.keys(game.players);

  playerIds.forEach((playerId) => {
    game.players[playerId].currentTurn = !game.players[playerId].currentTurn;
  });

  game.turnNumber++;
  game.state = "ATTACK_PHASE";
  game.currentAttack = {
    attackerId: null,
    targetHeroId: null,
    defenderChoice: null,
  };

  return game;
};
