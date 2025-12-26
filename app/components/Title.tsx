import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

interface ScrambledTextProps {
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const ScrambledText: React.FC<ScrambledTextProps> = ({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = '.:',
  className = '',
  style = {},
  children
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const charsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (!rootRef.current) return;

    const split = SplitText.create(rootRef.current.querySelector('p'), {
      type: 'chars',
      charsClass: 'char'
    });
    charsRef.current = split.chars as HTMLElement[];

    charsRef.current.forEach(c => {
      gsap.set(c, {
        display: 'inline-block',
        attr: { 'data-content': c.innerHTML }
      });
    });

    const handleMove = (e: PointerEvent) => {
      charsRef.current.forEach(c => {
        const { left, top, width, height } = c.getBoundingClientRect();
        const dx = e.clientX - (left + width / 2);
        const dy = e.clientY - (top + height / 2);
        const dist = Math.hypot(dx, dy);

        if (dist < radius) {
          gsap.to(c, {
            overwrite: true,
            duration: duration * (1 - dist / radius),
            scrambleText: {
              text: (c as HTMLElement).dataset.content || '',
              chars: scrambleChars,
              speed
            },
            ease: 'none'
          });
        }
      });
    };

    const el = rootRef.current;
    el.addEventListener('pointermove', handleMove);

    return () => {
      el.removeEventListener('pointermove', handleMove);
      split.revert();
    };
  }, [radius, duration, speed, scrambleChars]);

  return (
    <div ref={rootRef} className={className} style={style}>
      <p style={{ fontWeight: 100, margin: 0 }}>{children}</p>
    </div>
  );
};
interface TitleProps {
  onMyCardsClick?: () => void;
}

export default function Title({ onMyCardsClick }: TitleProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleMyCardsClick = () => {
    setIsMenuOpen(false);
    onMyCardsClick?.();
  };

  return (
    <div className="flex justify-between items-center w-full px-4 py-6">
      {/* BIG TITLE */}
      <ScrambledText
        radius={150}
        duration={1.5}
        speed={0.6}
        scrambleChars="!@#$%^&*()_+-=[]{}|;:,.<>?"
        className="text-6xl font-bold text-white"
      >
        Quotly
      </ScrambledText>

      {/* DESKTOP NAVBAR */}
      <div className="hidden md:flex gap-8 text-lg">
        <button className="hover:opacity-70 transition-opacity">Home</button>
        <button 
          onClick={handleMyCardsClick}
          className="hover:opacity-70 transition-opacity"
        >
          My Cards
        </button>
      </div>

      {/* MOBILE MENU BUTTON */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 transition-opacity hover:opacity-70 active:opacity-50"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* MOBILE DROPDOWN */}
        {isMenuOpen && (
          <div className="absolute right-4 top-20 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden z-50 min-w-[200px]">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Home
            </button>
            <button
              onClick={handleMyCardsClick}
              className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-t border-gray-200 dark:border-gray-700"
            >
              My Cards
            </button>
          </div>
        )}
      </div>
    </div>
  );
}