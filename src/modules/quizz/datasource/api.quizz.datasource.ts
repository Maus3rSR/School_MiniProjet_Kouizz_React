import { shuffleArray } from "../../../lib/random";
import { Answer, Difficulty, Quizz } from "../model";
import { QuizzDataSource } from "./quizz.datasource";

type ApiResponse = {
  quizzes: Array<{
    _id: string;
    answer: string;
    badAnswers: Array<string>;
    category: string;
    difficulty: string;
    question: string;
  }>;
};

const difficultyMap: Record<string, Difficulty> = {
  facile: "easy",
  normal: "medium",
  difficile: "hard",
};

const API_URL = `${
  import.meta.env.VITE_QUIZZ_API_URL
}/v1/quiz?limit=10&category=jeux_videos`;

export const apiQuizzDatasource: QuizzDataSource = {
  async fetch(): Promise<Quizz> {
    const response = await fetch(API_URL);
    const data = await response.json();

    return mapApiToModel(data);
  },
};

export function mapApiToModel(data: ApiResponse): Quizz {
  return {
    questions: data.quizzes.map((q) => ({
      id: q._id,
      text: q.question,
      answers: shuffleArray(
        [q.answer, ...q.badAnswers].map<Answer>((a, index) => ({
          id: (index + 1).toString(),
          text: a,
          isCorrect: index === 0,
        }))
      ),
      difficulty: difficultyMap[q.difficulty],
    })),
  };
}
