import { GameHistory } from "../model";

export type GameHistoryDataSource = {
  fetch(): Promise<GameHistory[]>;
  add(history: GameHistory): Promise<void>;
};

export type PlayerDataSource = {
  updateNickName(pseudo: string): Promise<void>;
};
