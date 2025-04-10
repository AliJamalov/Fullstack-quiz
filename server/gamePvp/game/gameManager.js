import { v4 as uuidv4 } from "uuid";
import { getUserDeck } from "../services/userManager.js";
import { validateUserDeck } from "../utils/validations.js";
import { games } from "./gameState.js";

export const createGame = async (player1Id, player2Id) => {
  const gameId = uuidv4();

  try {
    const player1Heroes = await getUserDeck(player1Id);
    const player2Heroes = await getUserDeck(player2Id);

    const player1DeckValidation = validateUserDeck(player1Heroes);
    const player2DeckValidation = validateUserDeck(player2Heroes);

    if (!player1DeckValidation.valid) {
      return { error: `Игрок 1: ${player1DeckValidation.message}` };
    }

    if (!player2DeckValidation.valid) {
      return { error: `Игрок 2: ${player2DeckValidation.message}` };
    }

    const player1GameHeroes = player1Heroes.slice(0, 3);
    const player2GameHeroes = player2Heroes.slice(0, 3);

    games[gameId] = {
      players: {
        [player1Id]: {
          heroes: player1GameHeroes,
          currentTurn: true,
        },
        [player2Id]: {
          heroes: player2GameHeroes,
          currentTurn: false,
        },
      },
      state: "ATTACK_PHASE",
      currentAttack: {
        attackerId: null,
        targetHeroId: null,
        defenderChoice: null,
      },
      turnNumber: 1,
      gameId,
    };

    return { gameId };
  } catch (error) {
    return { error: "Ошибка при создании игры" };
  }
};

export const getGameForPlayer = (playerId) => {
  for (const gameId in games) {
    if (games[gameId].players[playerId]) {
      return { gameId, game: games[gameId] };
    }
  }
  return null;
};

export const removeGame = (gameId) => {
  if (games[gameId]) {
    delete games[gameId];
    return true;
  }
  return false;
};
