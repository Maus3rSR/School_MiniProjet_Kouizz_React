export default function EndQuizz({
  goodAnswerCount,
  totalQuestion,
}: {
  goodAnswerCount: number;
  totalQuestion: number;
}) {
  return (
    <div>
      Fin du quizz ! Bonnes réponses :&nbsp;
      <span className="badge badge-primary badge-lg">
        {goodAnswerCount} / {totalQuestion}
      </span>
    </div>
  );
}
