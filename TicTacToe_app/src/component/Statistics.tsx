import React, { useEffect, useState } from "react";
import type { IAllGame } from "../interface/game";
import { allGame } from "../api/game";

const Statistics: React.FC = () => {
  const [statistic, setStatistic] = useState<IAllGame>({
    totalGames:0,
    playerXWins: 0,
    playerOWins: 0,
    draws: 0
  });

  useEffect(() => {
    const GameStats = async () => {
      try {
        const response = await allGame();

        console.log(response);
        setStatistic(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    GameStats();
  }, []);

  return (
    <div className="p-4">
      <h2 className="flex justify-center items-center gap-2 text-2xl font-bold mb-6 text-gray-700 tracking-wide">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 48 48"
        >
          <g fill="#37474f">
            <path d="M23 5h2v36h-2z" />
            <path d="m25.817 32.772l1.414 1.414l-10.04 10.04l-1.414-1.414z" />
            <path d="m32.259 42.824l-1.414 1.414l-10.04-10.04l1.414-1.414z" />
          </g>
          <path fill="#cfd8dc" d="M4 8h40v28H4z" />
          <g fill="#607d8b">
            <path d="M3 7h42v4H3zm0 28h42v2H3z" />
            <circle cx="31.5" cy="43.5" r="1.5" />
            <circle cx="16.5" cy="43.5" r="1.5" />
          </g>
          <g fill="#c51162">
            <path d="m31.9 18.9l-5.9 6l-6-6l-8.1 8l2.2 2.2l5.9-6l6 6l8.1-8z" />
            <path d="m36 24l-7-7h7z" />
          </g>
        </svg>
        สถิติ
      </h2>

      <div className="grid grid-cols-2  xl:grid-cols-4 gap-4 justify-items-center">
        <div className="bg-linear-to-br from-blue-400 to-cyan-400 rounded-2xl w-full p-2 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <h1 className="text-center text-5xl font-extrabold text-white drop-shadow-md">
            {statistic.totalGames}
          </h1>
          <h3 className="text-center text-white/90 font-semibold mt-2">
            ทั้งหมด
          </h3>
        </div>

        <div className="bg-linear-to-br from-blue-400 to-cyan-400 rounded-2xl w-full p-2 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <h1 className="text-center text-5xl font-extrabold text-white drop-shadow-md">
            {statistic.playerXWins}
          </h1>
          <h3 className="text-center text-white/90 font-semibold mt-2">
            X ชนะ
          </h3>
        </div>

        <div className="bg-linear-to-br from-blue-400 to-cyan-400 rounded-2xl w-full p-2 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <h1 className="text-center text-5xl font-extrabold text-white drop-shadow-md">
            {statistic.playerOWins}
          </h1>
          <h3 className="text-center text-white/90 font-semibold mt-2">
            O ชนะ
          </h3>
        </div>

        <div className="bg-linear-to-br from-blue-400 to-cyan-400 rounded-2xl w-full p-2 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <h1 className="text-center text-5xl font-extrabold text-white drop-shadow-md">
            {statistic.draws}
          </h1>
          <h3 className="text-center text-white/90 font-semibold mt-2">เสมอ</h3>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
