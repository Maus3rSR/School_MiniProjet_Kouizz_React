import { type Difficulty } from "../model";

type Props = {
  level: Difficulty;
};

export default function Difficulty({ level }: Props) {
  return (
    <div className="badge badge-primary badge-lg mb-4">
      {level === "easy" && "Facile 🐤"}
      {level === "medium" && "Moyen 💪"}
      {level === "hard" && "Difficile 💀"}
    </div>
  );
}
