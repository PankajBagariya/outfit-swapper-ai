import React from 'react';

export const OpeningAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-[#05020d] flex flex-col items-center justify-center z-50 animate-main-fadeOut">
      <div className="w-48 h-48 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-24 h-24 animate-svg-draw">
          <path d="M 20 20 L 50 50 L 80 20" stroke="url(#logoGradient)" fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 20 80 L 50 50 L 80 80" stroke="url(#logoGradient)" fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00ffff" />
              <stop offset="100%" stopColor="#d946ef" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {/* FIX: Cast style object to React.CSSProperties to allow for custom CSS property '--char-index'. This resolves multiple TypeScript errors below. */}
      <div className="mt-4 text-center text-lg font-medium text-neutral-400 animate-text-reveal" style={{ perspective: '500px' }}>
        <span className="char" style={{ '--char-index': 0 } as React.CSSProperties}>D</span>
        <span className="char" style={{ '--char-index': 1 } as React.CSSProperties}>e</span>
        <span className="char" style={{ '--char-index': 2 } as React.CSSProperties}>v</span>
        <span className="char" style={{ '--char-index': 3 } as React.CSSProperties}>e</span>
        <span className="char" style={{ '--char-index': 4 } as React.CSSProperties}>l</span>
        <span className="char" style={{ '--char-index': 5 } as React.CSSProperties}>o</span>
        <span className="char" style={{ '--char-index': 6 } as React.CSSProperties}>p</span>
        <span className="char" style={{ '--char-index': 7 } as React.CSSProperties}>e</span>
        <span className="char" style={{ '--char-index': 8 } as React.CSSProperties}>d</span>
        <span className="char" style={{ '--char-index': 9 } as React.CSSProperties}>&nbsp;</span>
        <span className="char" style={{ '--char-index': 10 } as React.CSSProperties}>b</span>
        <span className="char" style={{ '--char-index': 11 } as React.CSSProperties}>y</span>
        <span className="char" style={{ '--char-index': 12 } as React.CSSProperties}>&nbsp;</span>
        <span className="char" style={{ '--char-index': 13 } as React.CSSProperties}>P</span>
        <span className="char" style={{ '--char-index': 14 } as React.CSSProperties}>a</span>
        <span className="char" style={{ '--char-index': 15 } as React.CSSProperties}>n</span>
        <span className="char" style={{ '--char-index': 16 } as React.CSSProperties}>k</span>
        <span className="char" style={{ '--char-index': 17 } as React.CSSProperties}>a</span>
        <span className="char" style={{ '--char-index': 18 } as React.CSSProperties}>j</span>
        <span className="char" style={{ '--char-index': 19 } as React.CSSProperties}>&nbsp;</span>
        <span className="char" style={{ '--char-index': 20 } as React.CSSProperties}>B</span>
        <span className="char" style={{ '--char-index': 21 } as React.CSSProperties}>a</span>
        <span className="char" style={{ '--char-index': 22 } as React.CSSProperties}>g</span>
        <span className="char" style={{ '--char-index': 23 } as React.CSSProperties}>a</span>
        <span className="char" style={{ '--char-index': 24 } as React.CSSProperties}>r</span>
        <span className="char" style={{ '--char-index': 25 } as React.CSSProperties}>i</span>
        <span className="char" style={{ '--char-index': 26 } as React.CSSProperties}>y</span>
        <span className="char" style={{ '--char-index': 27 } as React.CSSProperties}>a</span>
      </div>
      <style>{`
        @keyframes main-fadeOut {
          0%, 80% { opacity: 1; }
          100% { opacity: 0; visibility: hidden; }
        }
        .animate-main-fadeOut {
          animation: main-fadeOut 3.5s ease-in-out forwards;
        }
        
        .animate-svg-draw path {
          stroke-dasharray: 150;
          stroke-dashoffset: 150;
          animation: draw 1.5s ease-in-out forwards 0.2s;
        }
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }

        .animate-text-reveal .char {
          display: inline-block;
          opacity: 0;
          transform: rotateX(-90deg);
          animation: reveal 1s ease-in-out forwards;
          animation-delay: calc(1.2s + var(--char-index) * 0.03s);
        }
        @keyframes reveal {
          from {
            opacity: 0;
            transform: rotateX(-90deg);
          }
          to {
            opacity: 1;
            transform: rotateX(0deg);
          }
        }
      `}</style>
    </div>
  );
};
