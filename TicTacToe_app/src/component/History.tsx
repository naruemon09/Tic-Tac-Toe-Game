import React, { useEffect, useState } from "react";
import type { IGameResponse, IReplay } from "../interface/game";
import { allGame } from "../api/game";

const History: React.FC<IReplay> = ({ setReplay, setGameId }) => {
  const [statistic, setStatistic] = useState<IGameResponse[]>([
    {
      id: 0,
      playerX: "",
      playerO: "",
      boardSize: 0,
      winner: "",
      createdAt: "",
      moves: [],
    },
  ]);

  useEffect(() => {
    const GameStats = async () => {
      try {
        const response = await allGame();

        console.log(response);
        setStatistic(response.data.games);
      } catch (error) {
        console.log(error);
      }
    };
    GameStats();
  }, []);

  const Replay = async (id: any) => {
    setReplay(true);
    setGameId(id);
  };

  return (
    <div className="p-4 flex flex-col">
      <h2 className="flex justify-center items-center gap-2 text-2xl font-bold mb-6 text-gray-700 tracking-wide">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 32 32"
        >
          <g fill="none">
            <path
              fill="#ffdea7"
              d="M23.51 2.01H8.6V2H4.45v3h2.5v22.07c0 1.62 1.32 2.94 2.94 2.94h15.67c.77 0 1.39-.62 1.39-1.39V5.45c0-1.9-1.54-3.44-3.44-3.44"
            />
            <path
              fill="#e19747"
              d="M10.86 29.99s2.24-.33 2.73-2.5c.07-.3.41-.52.81-.52h14.73c.52 0 .91.36.82.74c-.23.89-.6 2.29-4.37 2.29c-5.57 0-14.72-.01-14.72-.01"
            />
            <path
              fill="#d3883e"
              d="M6.95 5c0-1.66-1.12-3-2.5-3c-1.19 0-2.18 1-2.44 2.33c-.06.34.15.67.44.67zm3.47 6.87a.5.5 0 1 0 0 1H23.5a.5.5 0 0 0 0-1zm-.44 3.46a.5.5 0 0 1 .5-.5H23.5a.5.5 0 0 1 0 1H10.48a.5.5 0 0 1-.5-.5m.5 2.52a.5.5 0 1 0 0 1H23.5a.5.5 0 0 0 0-1zm.03 2.98a.5.5 0 1 0 0 1h7.96a.5.5 0 1 0 0-1z"
            />
          </g>
        </svg>
        ประวัติการเล่นเกม
      </h2>

      <div
        className="flex-1 space-y-3 pr-1 max-h-full overflow-y-auto
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:bg-gray-300"
      >
        {statistic.map((s) => (
          <div key={s.id}>
            <button
              type="button"
              onClick={() => Replay(s.id)}
              className="bg-blue-50 w-full border-l-4 border-blue-500 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <h1 className="text-lg font-bold text-gray-800">
                  {s.winner === "X"
                    ? "X ชนะ"
                    : s.winner === "O"
                    ? "O ชนะ"
                    : "เสมอ"}
                </h1>
                <span className="text-sm text-gray-500">
                  {new Date(s.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1 text-start">
                กระดาน:{" "}
                <span className="font-semibold">
                  {s.boardSize === 3
                    ? "3x3"
                    : s.boardSize === 4
                    ? "4x4"
                    : s.boardSize === 5
                    ? "5x5"
                    : s.boardSize === 6
                    ? "6x6"
                    : "7x7"}
                </span>
              </p>
              <p className="text-sm text-gray-600 text-start">
                โหมด:{" "}
                <span className="font-semibold">
                  {s.playerX} VS {s.playerO}
                </span>{" "}
                — <span className="italic"># {s.moves.length} ตา</span>
              </p>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
