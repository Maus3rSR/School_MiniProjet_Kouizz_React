import { Quizz } from "../model";
import { QuizzDataSource } from "./quizz.datasource";

export const fakeQuizzDatasource: QuizzDataSource = {
  async fetch(): Promise<Quizz> {
    return {
      questions: [
        {
          id: "1",
          text: "Bibi bubu ?",
          difficulty: "easy",
          answers: [
            {
              id: "bobo",
              isCorrect: false,
              text: "Bobo",
            },
            {
              id: "bibi",
              isCorrect: true,
              text: "Bibi",
            },
            {
              id: "baba",
              isCorrect: false,
              text: "Baba",
            },
          ],
        },
        {
          id: "2",
          text: "BWAAAAAAAAH ?",
          difficulty: "hard",
          answers: [
            {
              id: "bwaaa1",
              isCorrect: false,
              text: "BWOOOOOOH",
            },
            {
              id: "bwaaa2",
              isCorrect: false,
              text: "BWUUUUUUUUUH",
            },
            {
              id: "bwaaa3",
              isCorrect: false,
              text: "Baba",
            },
            {
              id: "bwaaa4",
              isCorrect: true,
              text: "BWEEEEEEEEEH",
            },
          ],
        },
      ],
    };
  },
};
