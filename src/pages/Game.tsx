import { useEffect, useState } from "react";
import { NavLink } from "react-router";

import "./Game.css";

import { useDependencies } from "../context/DependenciesProvider";
import { useNickname } from "../context/NicknameProvider";

import { type Quizz } from "../modules/quizz/model";
import Answer from "../modules/quizz/components/Answer";
import useQuizz from "../modules/quizz/useQuizz";
import Difficulty from "../modules/quizz/components/Difficulty";
import EndQuizz from "../modules/quizz/components/EndQuizz";
import { QuestionCounter } from "../modules/quizz/components/QuestionCounter";

export default function Game() {
  const { quizzDatasource } = useDependencies();
  const { nickName } = useNickname();
  const [quizz, updateQuizz] = useState<Quizz>();
  const [seed, updateSeed] = useState(0);

  useEffect(() => {
    quizzDatasource
      .fetch()
      .then((quizz) => updateQuizz(quizz))
      .catch((error) => console.error(error));
  }, [quizzDatasource, seed]);

  if (!nickName)
    return (
      <div>
        Il vous faut un pseudo pour pouvoir jouer !
        <NavLink className="btn btn-primary" to="/">
          Retour à l'accueil
        </NavLink>
      </div>
    );
  if (!quizz) return <div>Chargement du Quizz...</div>;

  return (
    <>
      <div className="text-2xl font-bold mb-4">
        {nickName}, tu vas tout déchirer 🔥
      </div>
      <Quizz
        key={seed}
        data={quizz}
        onReplay={() => updateSeed(Math.random())}
      />
    </>
  );
}

function Quizz({ data, onReplay }: { data: Quizz; onReplay: () => void }) {
  const { gameHistoryDatasource } = useDependencies();
  const { nickName } = useNickname();
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

  if (isEndOfQuizz)
    gameHistoryDatasource.add({
      player: nickName,
      score: {
        good: goodAnswerCount,
        total: totalQuestion,
      },
    });

  return (
    <>
      <h2 className="font-bold text-2xl mb-4">
        <QuestionCounter current={questionNumber} total={totalQuestion} />
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
            <button className="btn btn-primary" onClick={onReplay}>
              Rejouer
            </button>
            <NavLink className="btn btn-secondary" to="/" end>
              Revenir à la page d'accueil
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
}
