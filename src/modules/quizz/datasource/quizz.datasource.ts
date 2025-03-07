import { Quizz } from "../model";

export interface QuizzDataSource {
  fetch(): Promise<Quizz>;
}
