import ScrambledText from "./ScrambledText"

export default function Title() {
    return (
        <div>
            <ScrambledText
                className="scrambled-text-demo"
                radius={100}
                duration={1.2}
                speed={0.9}
                scrambleChars={'.:'}
            >
                Quotly
            </ScrambledText >
        </div>
    );
}