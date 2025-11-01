import React, { useEffect, useState } from "react";
import type { IGameResponse, ReplayProps } from "../interface/game";
import { allGame } from "../api/game";

const Replay: React.FC<ReplayProps> = ({ gameId, setReplay }) => {
  const [data, setData] = useState<IGameResponse | null>(null);
  const [squares, setSquares] = useState<string[][]>([]);
  const [playing, setPlaying] = useState(false);
  const [cellSize, setCellSize] = useState(60);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await allGame();
        const game = response.data.games.find(
          (r: any) => r.id === Number(gameId)
        );
        if (game) {
          setData(game);

          const newBoard = Array.from({ length: game.boardSize }, () =>
            Array(game.boardSize).fill("")
          );
          setSquares(newBoard);

          const size = Math.max(40, Math.min(70, 320 / game.boardSize));
          setCellSize(size);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchGame();
  }, [gameId]);

  const handleReplay = async () => {
    if (!data || !data.moves) return;
    setPlaying(true);

    const newBoard = Array.from({ length: data.boardSize }, () =>
      Array(data.boardSize).fill("")
    );
    setSquares(newBoard);

    let i = 0;
    const interval = setInterval(() => {
      if (i >= data.moves.length) {
        clearInterval(interval);
        setPlaying(false);
        return;
      }

      const { player, rowIndex, colIndex } = data.moves[i];
      newBoard[rowIndex][colIndex] = player;
      setSquares([...newBoard]);
      i++;
    }, 700);
  };

  if (!data) {
    return (
      <div className="p-6 text-center text-lg text-gray-600">
        กำลังโหลดข้อมูลเกม...
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-[80vh] bg-gray-100 rounded-2xl shadow-inner">
      <div className="bg-white border-l-4 border-blue-500 rounded-xl p-6 shadow-md mb-6 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-blue-700 mb-2">
          🎬 โหมด Replay
        </h2>
        <p>
          เกมของ {data.playerX} vs {data.playerO}
        </p>
        <p className="mt-1">
          ผลลัพธ์:{" "}
          {data.winner === "draw"
            ? "🤝 เสมอกัน"
            : data.winner
            ? `🏆 ผู้ชนะคือ ${data.winner}`
            : "⏳ ยังไม่จบ"}
        </p>
      </div>

      <div
        className="inline-grid gap-3 justify-center bg-white p-6 rounded-2xl shadow-lg"
        style={{
          gridTemplateColumns: `repeat(${data.boardSize}, ${cellSize}px)`,
        }}
      >
        {squares.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className={`flex items-center justify-center rounded-xl border-2 font-bold transition-all duration-200 ${
                cell === "X"
                  ? "bg-blue-400 text-white border-blue-500 shadow-md"
                  : cell === "O"
                  ? "bg-pink-400 text-white border-pink-500 shadow-md"
                  : "bg-gray-100 border-gray-300"
              }`}
              style={{
                width: `${cellSize}px`,
                height: `${cellSize}px`,
                fontSize: `${cellSize * 0.5}px`,
              }}
            >
              {cell}
            </div>
          ))
        )}
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleReplay}
          disabled={playing}
          className={`mt-6 px-6 py-4 rounded-lg shadow-md text-white font-semibold ${
            playing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          ▶️ {playing ? "กำลังเล่น..." : "ดู Replay"}
        </button>
        <button
          onClick={() => setReplay(false)}
          className="mt-6 px-6 py-4 rounded-lg shadow-md bg-red-500 hover:bg-red-600 text-white font-semibold"
        >
          ❌ ออก
        </button>
      </div>
    </div>
  );
};

export default Replay;
