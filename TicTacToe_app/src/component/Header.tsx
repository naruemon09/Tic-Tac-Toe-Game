import React, { useState } from "react";
import SetUp from "./SetUp";
import BoardGame from "./BoardGame";
import Statistics from "./Statistics";
import History from "./History";
import type { IGame } from "../interface/game";
import { game } from "../api/game";
import Replay from "./Replay";

const Header: React.FC = () => {
  const [form, setForm] = useState<IGame>({
    boardSize: 3,
    mode: "pve",
    playerX: "",
    playerO: "",
  });

  const [gameId, setGameId] = useState<number>(0);

  const [start, setStart] = useState(false);

  const [repley, setReplay] = useState(false);

  const boardSize = [
    { id: 3, board: "3x3 (คลาสสิค)" },
    { id: 4, board: "4x4" },
    { id: 5, board: "5x5" },
    { id: 6, board: "6x6" },
    { id: 7, board: "7x7" },
  ];
  const gameMode = [
    { code: "pvp", mode: "ผู้เล่น 2 คน" },
    { code: "pve", mode: "VS AI (ง่าย)" },
    { code: "pvm", mode: "VS AI (ปานกลาง)" },
    { code: "pvh", mode: "VS AI (ยาก)" },
  ];

  const startGame = async () => {
    try {
      let updatedForm = { ...form };

      if (form.mode === "pvp") {
        updatedForm = { ...form, playerX: "person", playerO: "person" };
      } else if (form.mode === "pve") {
        updatedForm = { ...form, playerX: "person", playerO: "AI (easy)" };
      } else if (form.mode === "pvm") {
        updatedForm = { ...form, playerX: "person", playerO: "AI (medium)" };
      } else if (form.mode === "pvh") {
        updatedForm = { ...form, playerX: "person", playerO: "AI (hard)" };
      }

      setForm(updatedForm);

      const response = await game(updatedForm);
      console.log(response);
      setStart(true);
      setGameId(response.data.id);
      console.log(updatedForm);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-cyan-100 via-sky-200 to-blue-300 flex flex-col overflow-hidden">
      <div className="relative flex flex-col items-center justify-center py-10 text-center shadow-lg bg-linear-to-r from-cyan-400 to-blue-500 rounded-b-3xl">
        <header className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-md tracking-wide animate-bounce">
          Tic Tac Toe Game
        </header>
        <p className="text-lg text-white/90 mt-3 italic font-light flex items-center justify-center gap-2">
          Play, Challenge, and Have Fun
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 128 128"
          >
            <path
              fill="#464c4f"
              d="M19.64 35.33c.09-.26-.09-4.82 2.45-8.41s5.87-4.12 8.33-4.56c2.98-.53 10.17-1.4 11.31 1.05s.26 3.77 2.1 4.47s-1.49 4.82-1.49 4.82zm88.25-.09s.72-4.43-1.81-7.42c-3.8-4.51-9.75-5.97-15.38-5.97c-1.81 0-3.98.35-4.68 2.51c-.4 1.25-.68 2.77-1.56 2.94c-.87.18 17.73 5.93 23.43 7.94"
            />
            <path
              fill="#5e6268"
              d="M39.04 81.29c-2.99 2.32-6.96 18.32-13.17 22.55s-20.28 1.97-21.34-6.66c-.93-7.61.76-23.61 5-39.96s7.5-24.45 17.41-27.1c7.95-2.13 23.53-3.63 38.66-3.48c15.14.15 28.39.15 36.72 3.33c7.47 2.85 12.56 10.6 16.05 25.73c3.48 15.14 6.17 33.34 5.75 39.36c-.61 8.78-13.02 14.38-22.25 7.57c-7.35-5.42-8.78-19.22-12.56-21.19s-47.55-2.27-50.27-.15"
            />
            <path
              fill="#9e9e9e"
              d="M93.25 77.17c-.72.9.94 2.24 2.12 5.17s4.22 12.63 7.17 15.34c3.68 3.37 6.55 2.74 7.11 1.68s-2.62-3.8-6.36-9.91s-8.54-14.15-10.04-12.28m-82.73-2.49c-1.11.2-4.05 14.96-1.87 21.2c1.82 5.2 8.79 5.49 11.41 4.74c5.22-1.49 6.86-6.55 5.67-7.11c-1.18-.56-5.32 3.4-9.23 1.56c-4.36-2.06-4.3-7.86-4.86-13.72c-.5-5.28-.06-6.86-1.12-6.67m27.49-32.73c-.41 0-4.01-.02-4.01-.02l.02-4.35s.08-3.51-3.68-3.43c-3.37.07-3.3 2.88-3.3 3.43s-.02 4.32-.02 4.32s-3.82-.04-4.53-.02s-3.37.06-3.37 3.49c0 3.24 2.75 3.47 3.37 3.49s4.51.02 4.51.02s-.03 3.63-.02 4.22s.12 3.37 3.49 3.37c3.68 0 3.49-3.37 3.49-3.37l.02-4.19s3.44.03 4.04.02c.86-.02 3.39-.25 3.43-3.68c.03-3.39-3.02-3.3-3.44-3.3"
            />
            <circle cx="48.4" cy="62.42" r="8.54" fill="#afafaf" />
            <circle cx="77.75" cy="62.55" r="8.54" fill="#afafaf" />
            <circle cx="48.39" cy="62.21" r="5.71" fill="#c8c8c8" />
            <circle cx="77.75" cy="62.4" r="5.71" fill="#c8c8c8" />
            <circle cx="85.82" cy="45.67" r="4.6" fill="#2086fa" />
            <circle cx="94.94" cy="54.48" r="4.6" fill="#06ac48" />
            <circle cx="104.12" cy="46.4" r="4.6" fill="#f72e26" />
            <circle cx="95.02" cy="37.01" r="4.6" fill="#fdb700" />
          </svg>
        </p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-4 p-4 overflow-y-auto">
        <div className="w-full md:w-2/3 flex-1 flex flex-col gap-4">
          <div className="bg-white rounded-xl shadow-md p-4">
            <SetUp
              form={form}
              setForm={setForm}
              boardSize={boardSize}
              gameMode={gameMode}
              startGame={() => startGame()}
            />
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 flex-1">
            {repley === false ? (
              <BoardGame form={form} start={start} gameId={gameId} />
            ) : (
              <Replay gameId={gameId} setReplay={setReplay}/>
            )}
          </div>
        </div>

        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <div className="bg-white rounded-xl shadow-md p-4">
            <Statistics />
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 flex-1">
            <History setReplay={setReplay} setGameId={setGameId}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
