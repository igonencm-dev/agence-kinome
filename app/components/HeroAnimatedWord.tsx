"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getLocaleFromPath, t } from "../lib/i18n";

const WORD_KEYS = [
  "hero_word_1",
  "hero_word_2",
  "hero_word_3",
  "hero_word_4",
] as const;

export default function HeroAnimatedWord() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const locale = getLocaleFromPath(usePathname() ?? "/");

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % WORD_KEYS.length);
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
      {t(WORD_KEYS[index], locale)}
    </span>
  );
}
