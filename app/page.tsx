import BG from "./components/BG";
import Title from "./components/Title";
import Header from "./components/Header";
export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Layer */}

      <BG />
      {/* Foreground Content */}
      <main className="relative z-10 p-8 text-white">
       <Title/>
      </main>
       <Header/>
    </div>
  );
}
