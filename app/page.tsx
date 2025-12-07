"use client";
import BG from "./components/BG";
import Title from "./components/Title";
import Header from "./components/Header";
import MyCards from "./components/MyCards";
import StickyButton from "./components/AddCard/StickyButton";
import { useState } from "react";
import Modal from "./components/AddCard/Modal";
import ModalContent from "./components/AddCard/ModalContent";
export default function Home() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Layer */}
      <Modal open={showModal} onClose={() => { }}
        children={
          <ModalContent titles={["Avish", "Ram"]}
            onSave={() => {setShowModal(prev=>!prev) }}
            onClose={() => {setShowModal(prev=>!prev)}} />}
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
    </div>
  );
}
