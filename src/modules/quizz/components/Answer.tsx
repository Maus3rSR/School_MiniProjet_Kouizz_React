import { AnswerState } from "../useQuizz";

type Props = {
  id: string;
  text: string;
  state?: AnswerState;
  onAnswerChoosed: (id: string) => void;
};

export default function Answer({
  id,
  text,
  state = "neutral",
  onAnswerChoosed,
}: Props) {
  const colorClass =
    state === "neutral"
      ? "bg-neutral text-neutral-content"
      : state === "right"
      ? "bg-success text-success-content"
      : "bg-error text-error-content";

  return (
    <div
      className={`card max-w-sm ${colorClass}`}
      onClick={() => onAnswerChoosed(id)}
    >
      <div className="card-body items-center text-center">{text}</div>
    </div>
  );
}
