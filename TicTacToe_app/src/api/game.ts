import axios from "axios";
import type { IGame, IMove, IUpdateWinner } from "../interface/game";

export const game = async (form:IGame) => {
  return await axios.post(`http://localhost:8080/api/add`, form
  );
};

export const move = async (form:IMove) => {
  return await axios.post(`http://localhost:8080/api/move`, form
  );
};

export const update = async (form:IUpdateWinner) => {
  return await axios.put(`http://localhost:8080/api/winner`, form
  );
};

export const allGame = async () => {
  return await axios.get(`http://localhost:8080/api/stats`
  );
};