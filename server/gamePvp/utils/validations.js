export const validateUserDeck = (heroes) => {
  if (!heroes) {
    return {
      valid: false,
      message: "Колода не найдена",
    };
  }

  if (heroes.length < 3) {
    return {
      valid: false,
      message: "В колоде должно быть минимум 3 героя",
    };
  }

  return { valid: true };
};
