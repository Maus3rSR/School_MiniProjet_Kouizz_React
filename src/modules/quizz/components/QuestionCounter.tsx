export function QuestionCounter({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <>
      Question &nbsp;
      <span className="badge badge-accent badge-lg">
        {current} / {total}
      </span>
    </>
  );
}
