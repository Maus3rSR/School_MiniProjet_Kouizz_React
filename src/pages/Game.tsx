import { useEffect, useState } from "react";
import { NavLink } from "react-router";

import "./Game.css";
import { type Quizz } from "../modules/quizz/model";
import Answer from "../modules/quizz/components/Answer";
import useQuizz from "../modules/quizz/useQuizz";
import Difficulty from "../modules/quizz/components/Difficulty";
import EndQuizz from "../modules/quizz/components/EndQuizz";
import { useDependencies } from "../components/DependenciesProvider";

export default function Game() {
  const { quizzDatasource } = useDependencies();
  const [quizz, updateQuizz] = useState<Quizz>();

  useEffect(() => {
    const loadQuizz = () => {
      quizzDatasource
        .fetch()
        .then((data) => updateQuizz(data))
        .catch((error) => console.error(error));
    };

    loadQuizz();
  }, [quizzDatasource]);

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
