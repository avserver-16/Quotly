// import React, { useState } from "react";

type Props = {
  onClick?: (e?: React.MouseEvent) => void;
  size?: number; // diameter in px
  glowColor?: string;
  className?: string;
  ariaLabel?: string;
};

const StickyButton: React.FC<Props> = ({
  onClick,
  size = 124,
  glowColor = "#8be9fd",
  className = "",
  ariaLabel = "Add",
}) => {
  const half = size / 2;
  const style = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "50%",
  } as React.CSSProperties;
  return (
    <div className={`__sticky_button_root ${className}`}>
      {/* glow layer */}
      <span
        className="__sticky_glow"
        aria-hidden
        style={{
          width: `${size * 1.5}px`,
          height: `${size * 1.5}px`,
          marginLeft: `-${(size * 1.5 - size) / 2}px`,
          marginTop: `-${(size * 1.5 - size) / 2}px`,
          background: `radial-gradient(circle at 50% 50%, ${glowColor}33 0%, ${glowColor}11 20%, transparent 50%)`,
        }}
      />

      {/* main button */}
      <button
        className="__sticky_button"
        onClick={onClick}
        aria-label={ariaLabel}
        style={style}
        type="button"
      >
        {/* plus icon (SVG) */}
        <svg
          width={Math.round(size * 0.5)}
          height={Math.round(size * 0.5)}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path
            d="M12 5v14M5 12h14"
            stroke="#111827"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* component-scoped styles */}
      <style>{`
        .__sticky_button_root {
          position: fixed;
          right: 24px;
          bottom: 24px;
          z-index: 9999;
          display: inline-block;
          pointer-events: none; /* let the button handle events */
        }

        .__sticky_button_root .__sticky_glow {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          filter: blur(10px);
          opacity: 0.95;
          animation: __sb_pulse 2.6s infinite ease-in-out;
          pointer-events: none;
        }

        .__sticky_button_root .__sticky_button {
          background: #ffffff;
          border: none;
          display: inline-grid;
          place-items: center;
          cursor: pointer;
          box-shadow: 0 6px 18px rgba(15, 23, 42, 0.18), 0 2px 6px rgba(15,23,42,0.12);
          transition: transform 160ms cubic-bezier(.2,.9,.2,1), box-shadow 160ms;
          pointer-events: auto;
          -webkit-tap-highlight-color: transparent;
        }

        .__sticky_button_root .__sticky_button:active {
          transform: scale(0.96);
          box-shadow: 0 4px 12px rgba(15,23,42,0.14);
        }

        .__sticky_button_root .__sticky_button:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 10px 30px rgba(15,23,42,0.20);
        }

        @keyframes __sb_pulse {
          0% { transform: translate(-50%, -50%) scale(0.92); opacity: 0.75; }
          50% { transform: translate(-50%, -50%) scale(1.06); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(0.92); opacity: 0.75; }
        }

        /* Responsive smaller offset on very small screens */
        @media (max-width: 420px) {
          .__sticky_button_root { right: 16px; bottom: 16px; }
        }
      `}</style>
    </div>
  );
};

export default StickyButton;
