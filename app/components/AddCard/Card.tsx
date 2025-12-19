"use client";
import { Card, CardHeader } from "@heroui/react";

interface ModernCardProps {
  title: string;
  subtitle: string;
}

export default function ModernCard({ title, subtitle }: ModernCardProps) {
  return (
    <Card
      isHoverable
      shadow="sm"
      className="w-full max-w-[550px] p-6 bg-white backdrop-blur-md rounded-3xl border border-gray-200 hover:shadow-xl transition-all duration-300"
    >
      <CardHeader className="flex flex-col items-start gap-1">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-500 " style={{fontWeight:100}}>
          {title}
        </h2>
        <p className="text-5xl text-gray-900 leading-tight" style={{fontWeight:200}}>
          {subtitle}
        </p>
      </CardHeader>
    </Card>
  );
}
