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

export default function Title() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex flex-row items-center justify-between gap-4">
        {/* BIG TITLE */}
        <div className="flex-shrink-0">
          <ScrambledText
            className="scrambled-text-demo"
            radius={100}
            duration={1.2}
            speed={0.9}
            scrambleChars=".:"
            style={{ 
              fontSize: 'clamp(48px, 8vw, 124px)',
              fontWeight: 100,
              lineHeight: 1
            }}
          >
            Quotly
          </ScrambledText>
        </div>

        {/* DESKTOP NAVBAR */}
        <nav className="hidden sm:flex flex-row gap-3 sm:gap-4 md:gap-6">
          <button className="transition-opacity hover:opacity-70 active:opacity-50">
            <ScrambledText
              className="scrambled-text-demo"
              radius={80}
              duration={1.2}
              speed={0.9}
              scrambleChars=".:"
              style={{ 
                fontSize: 'clamp(20px, 4vw, 64px)',
                fontWeight: 100
              }}
            >
              Home
            </ScrambledText>
          </button>
          <button className="transition-opacity hover:opacity-70 active:opacity-50 ml-8">
            <ScrambledText
              className="scrambled-text-demo"
              radius={80}
              duration={1.2}
              speed={0.9}
              scrambleChars=".:"
              style={{ 
                fontSize: 'clamp(20px, 4vw, 64px)',
                fontWeight: 100
              }}
            >
              My Cards
            </ScrambledText>
          </button>
        </nav>

        {/* MOBILE MENU BUTTON */}
        <div className="sm:hidden relative">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 transition-opacity hover:opacity-70 active:opacity-50"
            aria-label="Toggle menu"
          >
            <svg 
              className="w-8 h-8" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </button>

          {/* MOBILE DROPDOWN */}
          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 min-w-[150px] overflow-hidden z-50">
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <ScrambledText
                  className="scrambled-text-demo"
                  radius={60}
                  duration={1.2}
                  speed={0.9}
                  scrambleChars=".:"
                  style={{ 
                    fontSize: '20px',
                    fontWeight: 100
                  }}
                >
                  Home
                </ScrambledText>
              </button>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-t border-gray-200 dark:border-gray-700"
              >
                <ScrambledText
                  className="scrambled-text-demo"
                  radius={60}
                  duration={1.2}
                  speed={0.9}
                  scrambleChars=".:"
                  style={{ 
                    fontSize: '20px',
                    fontWeight: 100
                  }}
                >
                  My Cards
                </ScrambledText>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}