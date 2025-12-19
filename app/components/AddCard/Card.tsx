"use client";
import { Card, CardHeader } from "@heroui/react";

type CardProps = {
  title: string;
  subtitle: string;
  date?: string;
};

export default function ModernCard({ title, subtitle, date }: CardProps) {
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

  if (words.length <= maxWords) {
    return text;
  }

  return words.slice(0, maxWords).join(" ") + " ...";
}

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl w-full gap-8">
      <p className="text-gray-600 mt-2">{title}</p>
      <h3 className="text-3xl">{truncateWords(subtitle)}</h3>

      {date && (
        <p className="text-sm text-gray-400 mt-4">
          {formatDate(date)}
        </p>
      )}
    </div>
  );
}

