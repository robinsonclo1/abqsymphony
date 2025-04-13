import './ZiaSymbol.css';

interface ZiaSymbolProps {
  showNotes?: boolean;
  useLongRight?: boolean;
}

export default function ZiaSymbol({ showNotes = false, useLongRight = false }: ZiaSymbolProps) {
  return (
    <div className="zia">
      <div className="arm top" />
      <div className={`arm ${useLongRight ? 'long-right' : 'right'}`} />
      <div className="arm bottom" />
      <div className="arm left" />
      <div className="center" />
      {showNotes &&
        ['♪', '♩', '♫', '♪', '♩', '♫', '♪', '♩', '♫'].map((note, i) => {
          const offset = Math.floor(Math.random() * 20) - 5;
          return (
            <span
              key={i}
              className="note"
              style={{
                left: `${130 + i * 60}%`,
                transform: `translateY(${offset}px)`,
              }}
            >
              {note}
            </span>
          );
        })}
    </div>
  );
}
