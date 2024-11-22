// import { getSession } from "@app/_lib/session";

export default async function Home() {
  // const session = await getSession();

  return (
    <div className="flex">
      <div className="p-10 items-center">
        <h1 className="text-center text-4xl font-bold text-white mb-8 drop-shadow-lg">
          Welcome to Shaiya M
        </h1>
        <div className="flex justify-center">
          <div className="w-1/2">
            <div className="text-white text-2xl mb-4">
              <p>
                Shaiya M is a free-to-play MMORPG game that is based on the
                popular Shaiya game. The game is set in a fantasy world where
                players can choose to play as either the Alliance of Light or the
                Union of Fury. Players can choose from a variety of classes and 
                can level up their characters by completing quests and defeating
                monsters. The game features a variety of dungeons, raids, and
                PvP battles for players to enjoy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}