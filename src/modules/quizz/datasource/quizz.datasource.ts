import { Quizz } from "../model";

export type QuizzDataSource = {
  fetch(): Promise<Quizz>;
};
