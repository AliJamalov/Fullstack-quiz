export const calculateStars = (score) => {
  if (score >= 10) return 3;
  if (score >= 5) return 2;
  if (score >= 1) return 1;
  return 0;
};

export const getRandomEmoji = () => {
  const damageEmojis = ["💥", "⚔️", "🔥", "⚡"];
  const randomEmoji = damageEmojis[Math.floor(Math.random() * damageEmojis.length)];
  return randomEmoji;
};
