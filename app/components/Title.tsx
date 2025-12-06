import ScrambledText from "./ScrambledText";

export default function Title() {
    return (
        <div style={{ display: "flex", flexDirection: "row", gap: 20, justifyContent: 'space-between' }}>

            {/* BIG TITLE */}
            <ScrambledText
                className="scrambled-text-demo"
                radius={100}
                duration={1.2}
                speed={0.9}
                scrambleChars=".:"
                style={{ fontSize: "124px" }}   // ← Bigger
            >
                Quotly
            </ScrambledText>

            {/* SMALLER TEXTS */}
            <div style={{ display: "flex", flexDirection: "row", marginRight: 24, marginTop: 0 }}>
                <button><ScrambledText
                    className="scrambled-text-demo"
                    radius={100}
                    duration={1.2}
                    speed={0.9}
                    scrambleChars=".:"
                    style={{ fontSize: "32px" }}   // ← Smaller
                >
                    Home
                </ScrambledText>
                </button>
                <button><ScrambledText
                    className="scrambled-text-demo"
                    radius={100}
                    duration={1.2}
                    speed={0.9}
                    scrambleChars=".:"
                    style={{ fontSize: "32px" }}   // ← Smaller
                >
                    My Cards
                </ScrambledText>
                </button>
            </div>
        </div>
    );
}
