import React, { useState } from "react";
import { X } from "lucide-react";
import { StorageManager } from "../localStorage/storageFun";


const storage=new StorageManager("Quotly");

// Props
interface ModalContentProps {
  titles: string[];
  onSave: (data: { title: string; subtitle: string }) => void;
  onClose: () => void;
}

export default function ModalContent({ titles, onSave, onClose }: ModalContentProps) {
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");


const handleSave = (data: { title: string; subtitle: string }) => {
  storage.addItem(data.title, data.subtitle, new Date());
  console.log("Saved:", storage.getItems());
  onClose();
};

  const filteredTitles = titles.filter((t) =>
    t.toLowerCase().includes(search.toLowerCase())
  );

//   const handleSave = () => {
//     if (!selectedTitle || !subtitle) return;
//     onSave({ title: selectedTitle, subtitle });
//     onClose();
//   };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-white w-[95%] max-w-2xl rounded-3xl p-20 shadow-2xl relative">

        {/* Close */}
        <button className="absolute right-8 top-8 scale-150" onClick={onClose}>
          <X />
        </button>

        {/* Heading */}
        <h2 className="text-6xl font-bold mb-16 tracking-tight">Add New Item</h2>

        {/* Title Dropdown */}
        <div className="mb-10">
          <label className="block text-3xl font-semibold text-gray-700 mb-3">Title</label>
          <div className="relative mt-1">
            <input
              type="text"
              value={selectedTitle}
              onFocus={() => setDropdownOpen(true)}
              onChange={(e) => {
                setSelectedTitle(e.target.value);
                setSearch(e.target.value);
                setDropdownOpen(true);
              }}
              placeholder="Search or create title..."
              className="w-full border-2 text-2xl rounded-2xl px-5 py-4 focus:outline-none focus:ring"
            />

            {dropdownOpen && (
              <div className="absolute mt-2 w-full bg-white border-2 rounded-2xl max-h-60 overflow-auto shadow-xl z-20 text-2xl">
                {filteredTitles.length > 0 ? (
                  filteredTitles.map((title, index) => (
                    <div
                      key={index}
                      className="p-4 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelectedTitle(title);
                        setDropdownOpen(false);
                      }}
                    >
                      {title}
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-gray-500">No matches. Add new title.</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Subtitle Input */}
        <div className="mb-10">
          <label className="block text-3xl font-semibold text-gray-700 mb-3">Subtitle</label>
          <textarea
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Enter description..."
            className="w-full border-2 text-2xl rounded-2xl px-5 py-4 h-40 focus:outline-none focus:ring"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={()=>handleSave({title:selectedTitle,subtitle})}
          className="w-full bg-black text-white py-6 rounded-2xl text-3xl font-semibold hover:opacity-80 transition"
        >
          Save
        </button>
      </div>
    </div>
  );
}
