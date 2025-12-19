"use client";

import React, { useEffect, useState } from "react";
import ModernCard from "./AddCard/Card";
import { StorageManager,Item } from "./localStorage/storageFun";
import StickyClearButton from "./ClearStorage";
export default function MyCards() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const storage = new StorageManager("Quotly");
    const savedItems = storage.getItems();
    setItems(savedItems);
  }, []);

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-24 py-10 justify-items-center"
      style={{
        position: "relative",
        backgroundColor: "transparent",
      }}
    >
      {items.length === 0 ? (
        <p className="text-white text-3xl opacity-70">No cards saved yet.</p>
      ) : (
        items.map((item, index) => (
          <ModernCard
          key={index}
          title={item.title}
          subtitle={item.subtitle}
          />
        ))
      )}
      <StickyClearButton/>
    </div>
  );
}
