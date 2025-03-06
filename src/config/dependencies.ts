import { apiQuizzDatasource } from "../modules/quizz/datasource/api.quizz.datasource";
import { fakeQuizzDatasource } from "../modules/quizz/datasource/fake.quizz.datasource";
import { QuizzDataSource } from "../modules/quizz/datasource/quizz.datasource";

export type Dependencies = {
  quizzDatasource: QuizzDataSource;
};

export const dependencies: Dependencies = {
  quizzDatasource: fakeQuizzDatasource,
};
