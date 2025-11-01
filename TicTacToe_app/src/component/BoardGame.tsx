import React, { useEffect, useState } from "react";
import type { IForm } from "../interface/game";
import Swal from "sweetalert2";
import { move, update } from "../api/game";

const BoardGame: React.FC<IForm> = ({ form, start, gameId }) => {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState<string[][]>([]);
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    const newBoard = Array.from({ length: form.boardSize }, () =>
      Array(form.boardSize).fill("")
    );
    setSquares(newBoard);
    setWinner(null);
    setXIsNext(true);
  }, [form.boardSize, start]);

  useEffect(() => {
    if (start && !xIsNext && !winner && form.mode !== "pvp") {
      const timer = setTimeout(() => {
        makeAIMove();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [xIsNext, start, winner, form.mode, squares]);

  const makeAIMove = () => {
    if (form.mode === "pve") {
      makeRandomMove();
    } else if (form.mode === "pvm") {
      makeMediumMove();
    } else if (form.mode === "pvh") {
      makeHardMove();
    }
  };

  const makeRandomMove = () => {
    const emptyCells: [number, number][] = [];
    squares.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (!cell) emptyCells.push([i, j]);
      });
    });

    if (emptyCells.length > 0) {
      const [row, col] =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      handleClick(row, col);
    }
  };

  const makeMediumMove = () => {
    if (Math.random() < 0.5) makeHardMove();
    else makeRandomMove();
  };

  const makeHardMove = () => {
    const bestMove = findBestMove(squares);
    if (bestMove) handleClick(bestMove[0], bestMove[1]);
  };

  const findBestMove = (board: string[][]): [number, number] | null => {
    const winningMove = findWinningMove(board, "O");
    if (winningMove) return winningMove;

    const blockingMove = findWinningMove(board, "X");
    if (blockingMove) return blockingMove;

    const center = Math.floor(form.boardSize / 2);
    if (!board[center][center]) return [center, center];

    const corners: [number, number][] = [
      [0, 0],
      [0, form.boardSize - 1],
      [form.boardSize - 1, 0],
      [form.boardSize - 1, form.boardSize - 1],
    ];
    for (const [row, col] of corners) {
      if (!board[row][col]) return [row, col];
    }

    for (let i = 0; i < form.boardSize; i++) {
      for (let j = 0; j < form.boardSize; j++) {
        if (!board[i][j]) return [i, j];
      }
    }
    return null;
  };

  const findWinningMove = (
    board: string[][],
    player: string
  ): [number, number] | null => {
    for (let i = 0; i < form.boardSize; i++) {
      for (let j = 0; j < form.boardSize; j++) {
        if (!board[i][j]) {
          const testBoard = board.map((r) => [...r]);
          testBoard[i][j] = player;
          if (calculateWinner(testBoard) === player) return [i, j];
        }
      }
    }
    return null;
  };

  const handleClick = async (row: number, col: number) => {
    if (!start || winner || squares[row][col]) return;

    const currentPlayer = xIsNext ? "X" : "O";
    const newBoard = squares.map((r) => [...r]);
    newBoard[row][col] = xIsNext ? "X" : "O";
    newBoard[row][col] = currentPlayer;
    setSquares(newBoard);
    setXIsNext(!xIsNext);

    await makeMove(row, col, currentPlayer);

    const result = calculateWinner(newBoard);
    if (result) {
      setWinner(result);
      await update({
        gameId: gameId,
        winner: result,
      });
      Swal.fire({
        title: "🎉 เกมจบแล้ว!",
        text: `ผู้ชนะคือ: ${result}`,
        imageUrl:
          "https://png.pngtree.com/png-vector/20190121/ourmid/pngtree-red-white-fireworks-blooming-fireworks-png-image_508107.png",
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: "Custom image",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        window.location.reload();
      });
    } else if (isBoardFull(newBoard)) {
      setWinner("เสมอ");
      await update({
        gameId: gameId,
        winner: "draw",
      });
      Swal.fire({
        title: "🤝 เสมอกัน!",
        text: "ไม่มีผู้ชนะในรอบนี้",
        icon: "info",
        confirmButtonColor: "#6c757d",
      }).then(() => {
        window.location.reload();
      });
    }
  };

  const isBoardFull = (board: string[][]): boolean =>
    board.every((row) => row.every((cell) => cell !== ""));

  const calculateWinner = (board: string[][]): string | null => {
    const n = form.boardSize;

    for (let i = 0; i < n; i++) {
      if (board[i][0] && board[i].every((c) => c === board[i][0]))
        return board[i][0];
    }

    for (let j = 0; j < n; j++) {
      const col = board.map((r) => r[j]);
      if (col[0] && col.every((c) => c === col[0])) return col[0];
    }

    const mainDiag = board.map((r, i) => r[i]);
    if (mainDiag[0] && mainDiag.every((c) => c === mainDiag[0]))
      return mainDiag[0];

    const antiDiag = board.map((r, i) => r[n - 1 - i]);
    if (antiDiag[0] && antiDiag.every((c) => c === antiDiag[0]))
      return antiDiag[0];

    return null;
  };

  const cellSize = Math.max(40, Math.min(70, 320 / form.boardSize));

  const makeMove = async (row: number, col: number, player: string) => {
    try {
      const response = await move({
        gameId: gameId,
        player: player,
        rowIndex: row,
        colIndex: col,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-[80vh] bg-gray-100 rounded-2xl shadow-inner">
      {start === false ? (
        <div className="bg-white border-l-4 border-blue-500 rounded-xl p-6 shadow-md">
          <h2 className="text-2xl font-bold text-blue-700">
            เริ่มเกมใหม่เพื่อเล่น
          </h2>
        </div>
      ) : (
        <>
          <div className="bg-white border-l-4 border-blue-500 rounded-xl p-6 shadow-md mb-6">
            <h2 className="text-2xl font-bold text-blue-700">
              {winner
                ? winner === "เสมอ"
                  ? "🤝 เสมอกัน!"
                  : `🏆 ผู้ชนะคือ: ${winner}`
                : `🎯 ตาของ: ${xIsNext ? "X" : "O"}${
                    !xIsNext && form.mode !== "pvp" ? " (AI 🤖)" : ""
                  }`}
            </h2>
          </div>

          <div
            className="inline-grid gap-3 justify-center bg-white p-6 rounded-2xl shadow-lg"
            style={{
              gridTemplateColumns: `repeat(${form.boardSize}, ${cellSize}px)`,
            }}
          >
            {squares.map((row, i) =>
              row.map((cell, j) => (
                <button
                  key={`${i}-${j}`}
                  onClick={() => handleClick(i, j)}
                  disabled={!xIsNext && form.mode !== "pvp"}
                  className={`flex items-center justify-center rounded-xl border-2 font-bold transition-all duration-200 ${
                    cell === "X"
                      ? "bg-blue-400 text-white border-blue-500 shadow-md"
                      : cell === "O"
                      ? "bg-pink-400 text-white border-pink-500 shadow-md"
                      : "bg-gray-100 hover:bg-gray-200 border-gray-300"
                  } ${
                    !xIsNext && form.mode !== "pvp"
                      ? "cursor-not-allowed opacity-60"
                      : ""
                  }`}
                  style={{
                    width: `${cellSize}px`,
                    height: `${cellSize}px`,
                    fontSize: `${cellSize * 0.5}px`,
                  }}
                >
                  {cell}
                </button>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BoardGame;
