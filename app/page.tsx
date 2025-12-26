"use client";
import BG from "./components/BG";
import Title from "./components/Title";
import Header from "./components/Header";
import MyCards from "./components/MyCards";
import StickyButton from "./components/AddCard/StickyButton";
import { useEffect, useState, useRef } from "react";
import Modal from "./components/AddCard/Modal";
import ModalContent from "./components/AddCard/ModalContent";
import { Options } from "./components/localStorage/storageFun";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [titles, setTitles] = useState<string[]>([]);
  const myCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const opt = new Options();
    setTitles(opt.getTitleOptions());
  }, [showModal]);

  const scrollToMyCards = () => {
    myCardsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Background Layer */}
      <Modal open={showModal} onClose={() => { }}
        children={
          <ModalContent titles={titles}
            onSave={() => { setShowModal(prev => !prev) }}
            onClose={() => { setShowModal(prev => !prev) }} />}
      />
      <BG />
      {/* Foreground Content */}
      <main className="relative z-10 p-8 text-white">
        <Title onMyCardsClick={scrollToMyCards} />
      </main>
      <Header />
      <div ref={myCardsRef}>
        <MyCards />
      </div>
      <StickyButton onClick={() => {
        setShowModal(prev => !prev)
        console.log(showModal)
      }} />
      <footer className="footer">
        <p>© 2025 YourCompany. All rights reserved.</p>
      </footer>
    </div>
  );
}