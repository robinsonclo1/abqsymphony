import './ZiaSymbol.css';
import { useEffect, useRef, useState } from 'react';

interface ZiaSymbolProps {
  showNotes?: boolean;
  useLongRight?: boolean;
}

export default function ZiaSymbol({ showNotes = false, useLongRight = false }: ZiaSymbolProps) {
  const longRightRef = useRef<HTMLDivElement>(null);
  const [noteCount, setNoteCount] = useState(3);

  useEffect(() => {
    const calculateNoteCount = () => {
      const width = longRightRef.current?.offsetWidth ?? 0;
      const count = Math.max(3, Math.min(12, Math.floor(width / 70)));
      setNoteCount(count);
    };

    const timer = setTimeout(calculateNoteCount, 10);

    window.addEventListener('resize', calculateNoteCount);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateNoteCount);
    };
  }, []);

  return (
    <div className="zia">
      <div className="arm top" />
      <div
        ref={useLongRight ? longRightRef : undefined}
        className={`arm ${useLongRight ? 'long-right' : 'right'}`}
      />
      <div className="arm bottom" />
      <div className="arm left" />
      <div className="center" />
      {showNotes &&
        Array.from({ length: noteCount }).map((_, i) => {
          const symbols = ['♪', '♩', '♫'];
          const offset = Math.floor(Math.random() * 20) - 5;
          const left = `${130 + i * 60}px`;
          return (
            <span
              key={i}
              className="note"
              style={{
                left,
                transform: `translateY(${offset}px)`,
              }}
            >
              {symbols[i % symbols.length]}
            </span>
          );
        })}
    </div>
  );
}
