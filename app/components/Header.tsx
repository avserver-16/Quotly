import GridMotion from "./GridMotion";

export default function Header() {
    return <GridMotion
        gradientColor="rgba(255,255,255,0.1)"
        items={[
  { title: "C++ Snippets", subtitle: "Efficient STL patterns & memory-safe templates" },
  { title: "Java Utilities", subtitle: "Daily helper classes & OOP design patterns" },
  { title: "Python Scripts", subtitle: "Automation, data tasks, and quick prototypes" },
  { title: "TS Components", subtitle: "Reusable TypeScript UI and logic components" },
  { title: "Start Documenting *Click Me*", subtitle: "Let's start adding notes" },
  { title: "Java Build Tools", subtitle: "Maven & Gradle shortcuts for smooth builds" },
  { title: "Python Packages", subtitle: "Discover and manage essential libraries" },
  { title: "TS Type Engine", subtitle: "Advanced typings and interface generators" },
  { title: "No Authentication", subtitle: "Your device exclusive note-taker!!!" },
  { title: "Your Notes", subtitle: "Safe keep your notes!!!" },
  { title: "Cue Cards", subtitle: "Keep a habit of journalling an important fact daily!!!" },
  { title: "Safe Keep it", subtitle: "Your secrets/notes are safe here...hehe!" },
  { title: "C++ Performance", subtitle: "Low-level tuning and optimization tips" },
  { title: "Java Concurrency", subtitle: "Threading, executors & async patterns" },
  { title: "Python Regex", subtitle: "Instant pattern testing and generators" },
  { title: "TS APIs", subtitle: "REST + GraphQL request builders" },
  { title: "Zero user data", subtitle: "No need to think about creating your login credentials" },
  { title: "*Future*", subtitle: "Thinking about adding some user interactions in some way" },
  { title: "Just Start Documenting", subtitle: "Let's start adding notes" },
  { title: "TS Projects", subtitle: "Starter setups for React/Node workflows" },
  { title: "C++ Math", subtitle: "Fast math utilities for simulations" },
  { title: "Java UI", subtitle: "Swing/JavaFX quick component library" },
  { title: "Python CLI", subtitle: "Build interactive CLI tools easily" },
  { title: "TS Animation", subtitle: "Smooth web animations with TS logic" },
  { title: "C++ Tools", subtitle: "Compile, run, and format with ease" },
  { title: "Java Testing", subtitle: "JUnit shortcuts & testing templates" },
  { title: "Python AI", subtitle: "AI utilities using TensorFlow/PyTorch" },
  { title: "TS Utils", subtitle: "Handy TypeScript helpers & wrappers" },
  { title: "Java Docs", subtitle: "Generate clean Javadoc automatically" },
  { title: "Python Web", subtitle: "FastAPI & Django quick-start modules" },
  { title: "C++ System", subtitle: "OS-level utilities & process tools" }
]}

    />
}