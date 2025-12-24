import React, { useEffect, useState, useRef } from "react";
import { gsap } from 'gsap';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface Item {
  title: string;
  subtitle: string;
  date?: string;
}

interface MenuItemProps {
  link: string;
  text: string;
  subtitles: string;
}

interface FlowingMenuProps {
  items?: MenuItemProps[];
}

type CardProps = {
  title: string;
  subtitle: string;
  date?: string;
};

// ============================================================================
// STORAGE MANAGER
// ============================================================================

class StorageManager {
  private storageKey: string;

  constructor(key: string) {
    this.storageKey = key;
  }

  getItems(): Item[] {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  clearItems() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.storageKey);
  }
}

// ============================================================================
// MODERN CARD COMPONENT
// ============================================================================

function ModernCard({ title, subtitle, date }: CardProps) {
  function formatDate(iso: string) {
    const d = new Date(iso);
    return d.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function truncateWords(text: string, maxWords = 5): string {
    if (!text) return "";
    const words = text.trim().split(/\s+/);
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + " ...";
  }

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl w-full">
      <p className="text-gray-600 text-sm sm:text-base mt-2">{title}</p>
      <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mt-1">
        {truncateWords(subtitle)}
      </h3>
      {date && (
        <p className="text-xs sm:text-sm text-gray-400 mt-3 sm:mt-4">
          {formatDate(date)}
        </p>
      )}
    </div>
  );
}

// ============================================================================
// CLEAR STORAGE BUTTON
// ============================================================================

function ClearStorageButton({ onCleared }: { onCleared: () => void }) {
  const handleClear = () => {
    const storage = new StorageManager("Quotly");
    storage.clearItems();
    onCleared();
  };

  return (
    <button
      onClick={handleClear}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
    >
      Clear All
    </button>
  );
}

// ============================================================================
// MY CARDS COMPONENT
// ============================================================================

function MyCards() {
  const [items, setItems] = useState<Item[]>([]);

  const loadItems = () => {
    const storage = new StorageManager("Quotly");
    setItems(storage.getItems());
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div className="relative min-h-screen px-4 sm:px-6 md:px-12 lg:px-24 py-12 sm:py-16 md:py-24 pt-24 sm:pt-32 md:pt-48">
      {/* Title */}
      <div className="absolute top-6 sm:top-8 md:top-12 left-4 sm:left-8 md:left-16 z-10">
        <p className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
          My Cards
        </p>
      </div>

      {/* Clear Button */}
      <div className="absolute top-6 sm:top-8 md:top-12 right-4 sm:right-6 z-10">
        {items.length > 0 && <ClearStorageButton onCleared={loadItems} />}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12 justify-items-center">
        {items.length === 0 ? (
          <p className="text-white text-xl sm:text-2xl md:text-3xl opacity-70 col-span-full text-center mt-12">
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
    </div>
  );
}

// ============================================================================
// FLOWING MENU - MENU ITEM
// ============================================================================

const MenuItem: React.FC<MenuItemProps> = ({ link, text, subtitles }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);

  const animationDefaults: gsap.TweenVars = { duration: 1, ease: 'expo' };

  const distMetric = (x: number, y: number, x2: number, y2: number): number => {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
  };

  const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number): 'top' | 'bottom' => {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    const tl = gsap.timeline({ defaults: animationDefaults });

    tl.set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    const tl = gsap.timeline({ defaults: animationDefaults });

    tl.to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0).to(
      marqueeInnerRef.current,
      { y: edge === 'top' ? '101%' : '-101%' },
      0
    );
  };

  const repeatedMarqueeContent = React.useMemo(() => {
    return Array.from({ length: 4 }).map((_, idx) => (
      <React.Fragment key={idx}>
        <span>{text}</span>
        <span>{subtitles}</span>
      </React.Fragment>
    ));
  }, [text, subtitles]);

  return (
    <div className="menu__item" ref={itemRef}>
      <a 
        className="menu__item-link flex-col gap-2 px-4" 
        href={link} 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
      >
        <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
          {text}
        </span>
        <p className="text-sm sm:text-base md:text-lg opacity-80 mt-2">
          {subtitles}
        </p>
      </a>
      <div className="marquee" ref={marqueeRef}>
        <div className="marquee__inner-wrap" ref={marqueeInnerRef}>
          <div className="marquee__inner" aria-hidden="true">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// FLOWING MENU COMPONENT
// ============================================================================

const FlowingMenu: React.FC<FlowingMenuProps> = ({ items = [] }) => {
  return (
    <div className="menu-wrap px-4 sm:px-6 md:px-8 py-4 sm:py-6">
      <nav className="menu grid-menu">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} />
        ))}
      </nav>
    </div>
  );
};

// ============================================================================
// DEMO COMPONENT
// ============================================================================

export default function ResponsiveDemo() {
  const [activeView, setActiveView] = useState<'cards' | 'menu'>('cards');

  const menuItems: MenuItemProps[] = [
    { link: "#", text: "Explore", subtitles: "Discover new quotes" },
    { link: "#", text: "Create", subtitles: "Make your own cards" },
    { link: "#", text: "Share", subtitles: "Connect with others" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Toggle Buttons */}
      <div className="flex justify-center gap-4 pt-6 pb-4">
        <button
          onClick={() => setActiveView('cards')}
          className={`px-4 sm:px-6 py-2 rounded-lg transition-colors text-sm sm:text-base ${
            activeView === 'cards'
              ? 'bg-white text-black'
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
        >
          My Cards View
        </button>
        <button
          onClick={() => setActiveView('menu')}
          className={`px-4 sm:px-6 py-2 rounded-lg transition-colors text-sm sm:text-base ${
            activeView === 'menu'
              ? 'bg-white text-black'
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
        >
          Flowing Menu View
        </button>
      </div>

      {/* Content */}
      {activeView === 'cards' ? (
        <MyCards />
      ) : (
        <FlowingMenu items={menuItems} />
      )}
    </div>
  );
}