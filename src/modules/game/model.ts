export type GameHistory = {
  id: string;
  player: string;
  score: {
    good: number;
    total: number;
  };
  date: Date;
};
