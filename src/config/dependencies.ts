import { GameHistoryDataSource } from "../modules/game/datasource/game.datasource";
import { inMemoryGameHistoryDatasource } from "../modules/game/datasource/inMemory.game.datasource";
import { apiQuizzDatasource } from "../modules/quizz/datasource/api.quizz.datasource";
import { fakeQuizzDatasource } from "../modules/quizz/datasource/fake.quizz.datasource";
import { QuizzDataSource } from "../modules/quizz/datasource/quizz.datasource";

export type Dependencies = {
  quizzDatasource: QuizzDataSource;
  gameHistoryDatasource: GameHistoryDataSource;
};

export const dependencies: Dependencies = {
  quizzDatasource: fakeQuizzDatasource,
  gameHistoryDatasource: inMemoryGameHistoryDatasource,
};
