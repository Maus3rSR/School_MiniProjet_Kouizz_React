import { useState } from "react";
import { Answer, Question } from "./model";

export type AnswerState = "neutral" | "right" | "wrong";
export type QuestionViewModel = Omit<Question, "answers">;
export type AnswerViewModel = Pick<Answer, "id" | "text"> & {
  state: AnswerState;
};
export type QuizzHookProps = {
  questionNumber: number;
  question: QuestionViewModel;
  answers: AnswerViewModel[];
  isLastQuestion: boolean;
  questionAnswered: boolean;
  goodAnswerCount: number;
  nextQuestion: () => void;
  chooseAnswer: (id: string) => void;
};

function mapAnswerViewModel(answer: Answer): AnswerViewModel {
  return {
    id: answer.id,
    text: answer.text,
    state: "neutral",
  };
}

function shouldDisplayAnswerAsRight(
  answer: AnswerViewModel,
  theRightAnswer: Answer
) {
  return answer.id === theRightAnswer.id;
}

function shouldDisplayAnswerAsWrong(
  answer: AnswerViewModel,
  answerChoosedId: string,
  foundRightAnswer: boolean
) {
  return !foundRightAnswer && answer.id === answerChoosedId;
}

export default function useQuizz(questions: Question[]): {
  questionNumber: number;
  question: QuestionViewModel;
  answers: AnswerViewModel[];
  isLastQuestion: boolean;
  questionAnswered: boolean;
  goodAnswerCount: number;
  nextQuestion: () => void;
  chooseAnswer: (id: string) => void;
} {
  const [questionIndex, updateCurrentQuestionIndex] = useState(0);
  const [goodAnswerCount, updateGoodAnswerCount] = useState(0);
  const question = questions[questionIndex];
  const isLastQuestion = questionIndex === questions.length - 1;
  const [answers, updateAnswers] = useState<AnswerViewModel[]>(
    question.answers.map(mapAnswerViewModel)
  );
  const questionAnswered = answers.some((answer) => answer.state !== "neutral");

  function chooseAnswer(answerChoosedId: string) {
    if (questionAnswered) return;

    const theRightAnswer = question.answers.find((answer) => answer.isCorrect);
    const foundRightAnswer = theRightAnswer?.id === answerChoosedId;

    if (foundRightAnswer) updateGoodAnswerCount(goodAnswerCount + 1);

    updateAnswers(
      answers.map((a) => {
        if (shouldDisplayAnswerAsRight(a, theRightAnswer!))
          return { ...a, state: "right" };

        if (shouldDisplayAnswerAsWrong(a, answerChoosedId, foundRightAnswer))
          return { ...a, state: "wrong" };

        return a;
      })
    );
  }

  function nextQuestion() {
    const nextQuestionIndex = questionIndex + 1;
    const nextQuestion = questions[nextQuestionIndex];

    updateCurrentQuestionIndex(nextQuestionIndex);
    updateAnswers(nextQuestion.answers.map(mapAnswerViewModel));
  }

  return {
    questionNumber: questionIndex + 1,
    question: { ...question },
    answers,
    isLastQuestion,
    questionAnswered,
    goodAnswerCount,
    nextQuestion,
    chooseAnswer,
  };
}
