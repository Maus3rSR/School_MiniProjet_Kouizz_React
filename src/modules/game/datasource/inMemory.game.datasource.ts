import { GameHistory } from "../model";
import { GameHistoryDataSource } from "./game.datasource";

const gameHistory: GameHistory[] = [
  {
    id: "1",
    player: "Mario Bros",
    score: {
      good: 6,
      total: 10,
    },
    date: new Date("2025-03-06T21:30:10"),
  },
  {
    id: "2",
    player: "Sarah Pixel",
    score: {
      good: 8,
      total: 10,
    },
    date: new Date("2025-03-06T21:30:10"),
  },
  {
    id: "3",
    player: "Jack Sparrow",
    score: {
      good: -10,
      total: 10,
    },
    date: new Date("2025-03-06T21:30:10"),
  },
];

export const inMemoryGameHistoryDatasource: GameHistoryDataSource = {
  async fetch(): Promise<GameHistory[]> {
    return gameHistory;
  },
  async add(history: GameHistory): Promise<void> {
    gameHistory.push(history);
  },
};
