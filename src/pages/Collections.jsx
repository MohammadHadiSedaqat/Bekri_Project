import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { COLLECTIONS } from '@/lib/constants';
import { motion } from 'framer-motion';

export default function Collections() {
  return (
    <div className="pt-24 pb-16 md:pb-24">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-[var(--bekri-accent)] text-sm font-medium tracking-widest mb-3 block">کالکشن‌ها</span>
          <h1 className="text-3xl md:text-5xl font-bold text-[var(--bekri-text)] mb-4">مجموعه سنگ‌های طبیعی</h1>
          <p className="text-[var(--bekri-text-secondary)] text-base md:text-lg max-w-2xl leading-8">
            کالکشن جامع سنگ‌های طبیعی لوکس، از مرمر و اونیکس تا گرانیت و تراورتن. هر سنگ، داستانی از میلیون‌ها سال تاریخ زمین.
          </p>
        </motion.div>

        {/* Collection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {COLLECTIONS.map((collection, i) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.7 }}
              className={i === 0 ? 'md:col-span-2' : ''}
            >
              <Link
                to={collection.path}
                className={`group block relative rounded-lg overflow-hidden ${i === 0 ? 'h-[400px] md:h-[550px]' : 'h-[350px] md:h-[450px]'}`}
              >
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 right-0 left-0 p-8 md:p-12">
                  <span className="text-white/50 text-xs tracking-widest uppercase block mb-2">
                    {collection.nameEn}
                  </span>
                  <h2 className={`text-white font-bold mb-3 ${i === 0 ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}`}>
                    {collection.name}
                  </h2>
                  <p className="text-white/70 text-sm mb-5 leading-7 max-w-md">{collection.desc}</p>
                  <span className="inline-flex items-center gap-2 text-[#C8A96A] text-sm font-medium group-hover:gap-3 transition-all">
                    مشاهده کالکشن
                    <ArrowLeft className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}