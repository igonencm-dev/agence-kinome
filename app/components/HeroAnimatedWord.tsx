"use client";

import { useEffect, useState } from "react";

const WORDS = ["animation", "identité", "émotion", "impact"];

export default function HeroAnimatedWord() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % WORDS.length);
        setVisible(true);
      }, 300);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className="italic text-white/80 transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {WORDS[index]}
    </span>
  );
}
