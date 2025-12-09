"use client";
import BG from "./components/BG";
import Title from "./components/Title";
import Header from "./components/Header";
import MyCards from "./components/MyCards";
import StickyButton from "./components/AddCard/StickyButton";
import { useEffect, useState } from "react";
import Modal from "./components/AddCard/Modal";
import ModalContent from "./components/AddCard/ModalContent";
import { Options } from "./components/localStorage/storageFun";
import Cards from "./components/AddCard/Card";
export default function Home() {
  const [showModal, setShowModal] = useState(false);

  const [titles, setTitles] = useState<string[]>([]);

  useEffect(() => {
    const opt = new Options();
    setTitles(opt.getTitleOptions());   
  }, [showModal]);

  return (
    <div className="relative min-h-screen overflow-hidden">
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
        <Title />
      </main>
      <Header />
      <MyCards />
      <StickyButton onClick={() => {
        {
          setShowModal(prev => !prev)
        }
        console.log(showModal)
      }} />
      {/* <Cards title="Avish" subtitle="Avish Again!!!"/> */}
    </div>
  );
}
