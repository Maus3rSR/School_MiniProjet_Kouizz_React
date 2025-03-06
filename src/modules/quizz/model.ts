export type Difficulty = "easy" | "medium" | "hard";

export type Question = {
  id: string;
  text: string;
  difficulty: Difficulty;
  answers: Answer[];
};

export type Answer = {
  id: string;
  text: string;
  isCorrect: boolean;
};

export type Quizz = {
  id: string;
  questions: Question[];
};
