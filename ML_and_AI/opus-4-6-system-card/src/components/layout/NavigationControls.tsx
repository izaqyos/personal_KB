import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export function NavigationControls({ onPrev, onNext, hasPrev, hasNext }: Props) {
  return (
    <>
      {hasPrev && (
        <button
          onClick={onPrev}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-40 p-2 rounded-full bg-card-bg/80 text-text-secondary hover:text-text-primary hover:bg-card-bg transition-all opacity-30 hover:opacity-100 cursor-pointer"
        >
          <ChevronLeft size={28} />
        </button>
      )}
      {hasNext && (
        <button
          onClick={onNext}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-40 p-2 rounded-full bg-card-bg/80 text-text-secondary hover:text-text-primary hover:bg-card-bg transition-all opacity-30 hover:opacity-100 cursor-pointer"
        >
          <ChevronRight size={28} />
        </button>
      )}
    </>
  );
}
