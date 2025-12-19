import React from "react";
import { StorageManager } from "./localStorage/storageFun";

const storage = new StorageManager("Quotly");

type ClearButtonProps = {
  onCleared?: () => void;
};

const ClearStorageButton: React.FC<ClearButtonProps> = ({ onCleared }) => {
  const handleClear = () => {
    const ok = window.confirm("Clear all saved data?");
    if (!ok) return;

    storage.clear();
    onCleared?.();
  };

  return (
    <button
      onClick={handleClear}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black shadow-lg hover:scale-105 active:scale-95 transition mr-24"
      aria-label="Clear local storage"
    >
      {/* trash icon */}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 6h18M8 6v12m8-12v12M10 3h4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      Clear
    </button>
  );
};

export default ClearStorageButton;
