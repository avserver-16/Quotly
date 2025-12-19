"use client";

import React, { useEffect, useState } from "react";
import ModernCard from "./AddCard/Card";
import { StorageManager, Item } from "./localStorage/storageFun";
import ClearStorageButton from "./ClearStorage";
export default function MyCards() {
  const [items, setItems] = useState<Item[]>([]);

  const loadItems = () => {
    const storage = new StorageManager("Quotly");
    setItems(storage.getItems());
  };

  useEffect(() => {
    loadItems();
  }, []);
  console.log("Loaded items:", items);

  return (
    <div
      className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-24 py-24 pt-48 justify-items-center"
      style={{ backgroundColor: "transparent" }}
    >
      <div className="absolute top-12 left-16 z-10">
       <p style={{fontSize:64,color:'white'}}>My Cards</p>
      </div>
      {/* 🔝 Top-right clear button */}
      <div className="absolute top-12 right-6 z-10">
        {items.length > 0 && (
          <ClearStorageButton onCleared={loadItems} />
        )}
      </div>

      {/* Cards */}
      {items.length === 0 ? (
        <p className="text-white text-3xl opacity-70 col-span-full">
          No cards saved yet.
        </p>
      ) : (
        items.map((item, index) => (
          <ModernCard
            key={index}
            title={item.title}
            subtitle={item.subtitle}
            date={item.date}
          />
        ))
      )}
    </div>
  );
}
