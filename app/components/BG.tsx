"use client";

import Aurora from "./Aurora";

export default function BG() {
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-black z-0">
      <Aurora
        colorStops={["#ea07fa", "#9a1fa3", "#f066fa"]}
        blend={0.8}
        amplitude={1.0}
        speed={0.8}
      />
    </div>
  );
}
