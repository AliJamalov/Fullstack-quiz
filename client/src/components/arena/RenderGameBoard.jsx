import Hero from "../common/Hero";

const RenderGameBoard = ({
  getPlayerHeroes,
  getOpponentHeroes,
  battleMessage,
  isHeroAlive,
  isYourTurn,
  handleAttack,
  handleDefend,
  targetHero,
  audioRef,
  hideDamageMessage,
}) => {
  const playerHeroes = getPlayerHeroes();
  const opponentHeroes = getOpponentHeroes();

  return (
    <div className="mt-2 pb-[40px]">
      <div className="flex justify-center text-white p-4 mb-3 rounded-lg">
        <p className="bg-gray-800 p-4 rounded-md">{battleMessage}</p>
      </div>

      <div className="mb-3">
        <h3 className="text-white text-lg mb-2 text-center">Герои противника:</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {opponentHeroes.map((hero, index) => (
            <div
              key={hero.id}
              className={`bg-gray-800 rounded-lg cursor-pointer border-2 p-2 mx-auto
                  ${isYourTurn && isHeroAlive(hero) ? "border-green-500 hover:bg-gray-700" : "border-gray-700"}
                  ${!isHeroAlive(hero) ? "opacity-50" : ""}
                  ${targetHero === hero.id ? "border-red-500" : ""}
                  ${index === 2 ? "col-span-2 col-start-1 md:col-span-1 md:col-start-auto" : ""}
                  `}
              onClick={() => {
                isYourTurn && isHeroAlive(hero) && handleAttack(hero.id);
              }}
            >
              <Hero
                name={hero.name}
                image={hero.image}
                health={hero.health}
                attack={hero.attack}
                defense={hero.defense}
                level={hero.level}
                rarity={hero.rarity}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-white text-lg mb-2 text-center">Ваши герои:</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {playerHeroes.map((hero, index) => (
            <div
              key={hero.id}
              className={`bg-gray-800 rounded-lg cursor-pointer border-2 p-2 mx-auto
                  ${!isYourTurn && isHeroAlive(hero) ? "border-blue-500 hover:bg-gray-700" : "border-gray-700"}
                  ${!isHeroAlive(hero) ? "opacity-50" : ""}
                  ${index === 2 ? "col-span-2 col-start-1 md:col-span-1 md:col-start-auto" : ""}
                  `}
              onClick={() => {
                !isYourTurn && isHeroAlive(hero) && handleDefend(hero.id);
                !isYourTurn && isHeroAlive(hero) && audioRef?.current.play();
              }}
            >
              <Hero
                name={hero.name}
                image={hero.image}
                health={hero.health}
                attack={hero.attack}
                defense={hero.defense}
                level={hero.level}
                rarity={hero.rarity}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RenderGameBoard;
