import { useEffect, useState } from "react";
import { NavLink } from "react-router";

import "./Game.css";
import {
  type Answer as AnswerType,
  type Difficulty as DifficultyType,
  type Quizz,
} from "../modules/quizz/model";
import Answer from "../modules/quizz/components/Answer";
import useQuizz from "../modules/quizz/useQuizz";
import Difficulty from "../modules/quizz/components/Difficulty";
import { shuffleArray } from "../lib/random";
import EndQuizz from "../modules/quizz/components/EndQuizz";

export default function Game() {
  const [quizz, updateQuizz] = useState<Quizz>();

  const difficultyMap: Record<string, DifficultyType> = {
    facile: "easy",
    normal: "medium",
    difficile: "hard",
  };

  useEffect(() => {
    const loadQuizz = () => {
      fetch(
        "https://quizzapi.jomoreschi.fr/api/v1/quiz?limit=10&category=jeux_videos"
      )
        .then((res) => res.json())
        .then(
          (data: {
            quizzes: Array<{
              _id: string;
              answer: string;
              badAnswers: Array<string>;
              category: string;
              difficulty: string;
              question: string;
            }>;
          }) => {
            updateQuizz({
              questions: data.quizzes.map((q) => ({
                id: q._id,
                text: q.question,
                answers: shuffleArray(
                  [q.answer, ...q.badAnswers].map<AnswerType>((a, index) => ({
                    id: (index + 1).toString(),
                    text: a,
                    isCorrect: index === 0,
                  }))
                ),
                difficulty: difficultyMap[q.difficulty],
              })),
            });
          }
        );
    };

    loadQuizz();
  }, []);

  if (!quizz) return <div>Chargement du Quizz...</div>;

  return <Quizz data={quizz} />;
}

function Quizz({ data }: { data: Quizz }) {
  const {
    questionNumber,
    question,
    answers,
    questionAnswered,
    goodAnswerCount,
    isLastQuestion,
    nextQuestion,
    chooseAnswer,
  } = useQuizz(data.questions);

  const totalQuestion = data.questions.length;
  const showNextQuestionBtn = questionAnswered && !isLastQuestion;
  const isEndOfQuizz = questionAnswered && isLastQuestion;

  return (
    <>
      <h2 className="font-bold text-2xl mb-4">
        Question &nbsp;
        <span className="badge badge-accent badge-lg">
          {questionNumber} / {totalQuestion}
        </span>
      </h2>
      <h3 className="font-bold mb-4">{question.text}</h3>

      <Difficulty level={question.difficulty} />

      <div className="grid grid-cols-2 gap-4 quizz--answers">
        {answers.map((answer) => (
          <Answer
            key={answer.id}
            id={answer.id}
            text={answer.text}
            state={answer.state}
            onAnswerChoosed={chooseAnswer}
          />
        ))}
      </div>

      {showNextQuestionBtn && (
        <div className="flex justify-center mt-8">
          <button className="btn btn-primary" onClick={nextQuestion}>
            Prochaine question
          </button>
        </div>
      )}

      {isEndOfQuizz && (
        <div className="flex flex-col gap-2 mt-8 justify-center items-center align-center">
          <EndQuizz
            goodAnswerCount={goodAnswerCount}
            totalQuestion={totalQuestion}
          />

          <div className="flex gap-2">
            <button className="btn btn-primary">Rejouer</button>
            <NavLink className="btn btn-secondary" to="/" end>
              Revenir à la page d'accueil
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
}
