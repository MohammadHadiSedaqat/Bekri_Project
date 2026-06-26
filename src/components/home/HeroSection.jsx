import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { HERO_IMAGE } from '@/lib/constants';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0"
        style={{ transform: `scale(${1 + scrollY * 0.0003}) translateY(${scrollY * 0.3}px)` }}
      >
        <img
          src={HERO_IMAGE}
          alt="سنگ مرمر لوکس"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-32 px-4 md:px-8 max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-3xl"
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            سنگ‌هایی که معماری را
            <br />
            <span className="text-gradient-gold">به اثر هنری</span> تبدیل می‌کنند
          </h1>
          <p className="text-base md:text-lg text-white/80 leading-8 mb-10 max-w-xl">
            تأمین مستقیم سنگ‌های لوکس ساختمانی برای پروژه‌های خاص و معماری‌های ماندگار
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/collections"
              className="px-8 py-3.5 rounded-full bg-[#C8A96A] text-white font-medium text-sm hover:bg-[#B8993A] transition-colors"
            >
              مشاهده محصولات
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-full border border-white/30 text-white font-medium text-sm hover:bg-white/10 transition-colors"
            >
              مشاوره رایگان
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-white/50 text-xs tracking-widest">اسکرول</span>
        <ChevronDown className="w-5 h-5 text-white/50" />
      </motion.div>
    </section>
  );
}