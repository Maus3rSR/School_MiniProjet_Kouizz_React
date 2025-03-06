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
    state === "neutral" ? "neutral" : state === "right" ? "success" : "error";

  return (
    <div
      className={`card max-w-sm bg-${colorClass} text-${colorClass}-content`}
      onClick={() => onAnswerChoosed(id)}
    >
      <div className="card-body items-center text-center">{text}</div>
    </div>
  );
}
