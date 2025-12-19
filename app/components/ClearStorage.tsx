import React from "react";
import { StorageManager } from "./localStorage/storageFun";

const storage = new StorageManager("Quotly");

type StickyButtonProps = {
  size?: number;
  glowColor?: string;
  className?: string;
  ariaLabel?: string;
};

const StickyClearButton: React.FC<StickyButtonProps> = ({
  size = 124,
  glowColor = "#ff6b6b",
  className = "",
  ariaLabel = "Clear local storage",
}) => {
  const handleClear = () => {
    const ok = window.confirm("Clear all saved data?");
    if (!ok) return;

    storage.clear();
    alert("Local storage cleared");
  };

  const style: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "50%",
  };

  return (
    <div className={`__sticky_button_root ${className}`}>
      {/* glow */}
      <span
        className="__sticky_glow"
        aria-hidden
        style={{
          width: `${size * 1.5}px`,
          height: `${size * 1.5}px`,
          marginRight: `-${(size * 1.5 - size) / 2}px`,
          marginTop: `-${(size * 1.5 - size) / 2}px`,
          background: `radial-gradient(circle, ${glowColor}33 0%, ${glowColor}11 20%, transparent 50%)`,
        }}
      />

      {/* button */}
      <button
        className="__sticky_button"
        onClick={handleClear}
        aria-label={ariaLabel}
        style={style}
        type="button"
      >
        {/* trash / X icon */}
        <svg
          width={Math.round(size * 0.45)}
          height={Math.round(size * 0.45)}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M3 6h18M8 6v12m8-12v12M10 3h4"
            stroke="#111827"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* styles */}
      <style>{`
        .__sticky_button_root {
          position: fixed;
          right: 24px;
          bottom: 24px;
          z-index: 9999;
          pointer-events: none;
        }

        .__sticky_glow {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          filter: blur(12px);
          animation: __sb_pulse 2.6s infinite ease-in-out;
          pointer-events: none;
        }

        .__sticky_button {
          background: #ffffff;
          border: none;
          display: grid;
          place-items: center;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(0,0,0,0.18);
          transition: transform 160ms ease, box-shadow 160ms;
          pointer-events: auto;
        }

        .__sticky_button:hover {
          transform: translateY(-3px) scale(1.02);
        }

        .__sticky_button:active {
          transform: scale(0.95);
        }

        @keyframes __sb_pulse {
          0% { transform: translate(-50%, -50%) scale(0.92); opacity: 0.7; }
          50% { transform: translate(-50%, -50%) scale(1.06); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(0.92); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
};

export default StickyClearButton;
