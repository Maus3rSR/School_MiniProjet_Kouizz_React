import { useEffect, useState } from "react";
import { NavLink } from "react-router";

import "./Game.css";
import { type Quizz } from "../modules/quizz/model";
import Difficulty from "../modules/quizz/components/Difficulty";
import Answer from "../modules/quizz/components/Answer";
import useQuizz from "../modules/quizz/useQuizz";

export default function Game() {
  const [quizz, updateQuizz] = useState<Quizz>();

  useEffect(() => {
    const loadQuizz = () => {
      fetch(
        "https://quizzapi.jomoreschi.fr/api/v1/quiz?limit=10&category=jeux_videos"
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          updateQuizz({
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
                    id: "bobo2",
                    isCorrect: false,
                    text: "BWOOOOOOH",
                  },
                  {
                    id: "bibi2",
                    isCorrect: false,
                    text: "BWUUUUUUUUUH",
                  },
                  {
                    id: "baba2",
                    isCorrect: false,
                    text: "Baba",
                  },
                  {
                    id: "bubu2",
                    isCorrect: true,
                    text: "BWEEEEEEEEEH",
                  },
                ],
              },
            ],
          });
        });
    };

    loadQuizz();
  }, []);

  if (!quizz) return <div>Aucune question... :(</div>;

  const {
    questionNumber,
    question,
    answers,
    questionAnswered,
    goodAnswerCount,
    isLastQuestion,
    nextQuestion,
    chooseAnswer,
  } = useQuizz(quizz.questions);

  const totalQuestion = quizz.questions.length;
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
          <div>
            Fin du quizz ! Bonnes réponses :&nbsp;
            <span className="badge badge-primary badge-lg">
              {goodAnswerCount} / {totalQuestion}
            </span>
          </div>

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
