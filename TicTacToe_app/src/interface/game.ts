export interface IGame {
    boardSize: number;
    mode: string;
    playerX: string;
    playerO: string;
}

export interface IGameResponse {
    id: number;
    playerX: string;
    playerO: string;
    boardSize: number;
    winner: string;
    createdAt: string;
    moves: Array<IMoveResponse>;
}

export interface IMove {
    gameId: number;
    player: string;
    rowIndex: number;
    colIndex: number;
}

export interface IMoveResponse {
    id: number;
    moveNumber: number;
    player: string;
    rowIndex: number;
    colIndex: number;
}

export interface ISetUpProps {
  form: IGame;
  setForm: React.Dispatch<React.SetStateAction<IGame>>;
  boardSize: { id: number; board: string }[];
  gameMode: { code: string; mode: string }[];
  startGame: () => void;
}

export interface IForm {
  form: IGame;
  start: boolean;
  gameId: number;
}

export interface IUpdateWinner{
  gameId:number;
  winner: string;
}

export interface IReplay{
  setGameId:React.Dispatch<React.SetStateAction<number>>;
  setReplay: (value: boolean) => void;
}

export interface ReplayProps {
  gameId: number;
  setReplay: (value: boolean) => void;
}

export interface IAllGame{
  totalGames:number;
  playerXWins: number;
  playerOWins:number;
  draws:number;
}

