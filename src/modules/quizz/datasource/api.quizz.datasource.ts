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

// Import.meta.env contient vos variables d'environnement récupéré depuis le fichier .env
// VITE est configuré par défaut avec ce fonctionnement de chargement des variables d'environnement
//
// On ne souhaite pas que des valeurs, ou des mots de passes, soient en dur dans le code
// On les transmets avec des variables d'environnement qui ne sont pas versionnées
const API_URL = `${import.meta.env.VITE_QUIZZ_API_URL}/v1/quiz?limit=10&category=jeux_videos`;

export const apiQuizzDatasource: QuizzDataSource = {
  async fetch(): Promise<Quizz> {
    // fetch permet de récupérer des données venant d'un système externe
    // Il vous retourne un objet de la réponse HTTP
    const response = await fetch(API_URL);
    // .json() pour récupérer les données au format JSON (attention la méthode .json retourne une promesse)
    const data = await response.json();

    return mapApiToModel(data);
  },
};

// Cette fonction me permet de transformer un format de données provenant de l'API
// Vers un format de donnée utilisé dans mon application React
//
// Actuellement mes quizz proviennent de quizzapi.jomoreschi.fr
// Mais un jour cela pourrait provenir de ma propre API, dont le format pourrait être sensiblement différent
//
// Ici je transforme donc ApiResponse => Quizz
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
