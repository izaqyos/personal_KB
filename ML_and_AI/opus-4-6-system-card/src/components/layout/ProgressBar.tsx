interface Props {
  current: number;
  total: number;
  titles: string[];
  onGoTo: (index: number) => void;
}

export function ProgressBar({ current, total, titles, onGoTo }: Props) {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="h-1 bg-card-bg">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex items-center justify-center gap-1.5 py-2 px-4">
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            onClick={() => onGoTo(i)}
            className={`w-2 h-2 rounded-full transition-all duration-200 cursor-pointer hover:scale-150 ${
              i === current
                ? 'bg-primary scale-125'
                : i < current
                ? 'bg-primary/40'
                : 'bg-text-secondary/30'
            }`}
            title={titles[i]}
          />
        ))}
      </div>
      <div className="absolute top-1 right-4 text-xs text-text-secondary font-mono">
        {current + 1}/{total}
      </div>
    </div>
  );
}
