import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { COLLECTIONS } from '@/lib/constants';
import { motion } from 'framer-motion';

export default function CollectionShowcase() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-24"
        >
          <span className="text-[var(--bekri-accent)] text-sm font-medium tracking-widest mb-3 block">
            کالکشن‌ها
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--bekri-text)] mb-4">
            شاهکارهای طبیعت
          </h2>
          <p className="text-[var(--bekri-text-secondary)] text-base md:text-lg max-w-xl leading-8">
            مجموعه‌ای منتخب از نفیس‌ترین سنگ‌های طبیعی جهان، برای معماری‌های استثنایی
          </p>
        </motion.div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          {/* Large Left */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-7 md:row-span-2"
          >
            <CollectionCard collection={COLLECTIONS[0]} large />
          </motion.div>

          {/* Top Right */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="md:col-span-5"
          >
            <CollectionCard collection={COLLECTIONS[1]} />
          </motion.div>

          {/* Bottom Right */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="md:col-span-5"
          >
            <CollectionCard collection={COLLECTIONS[2]} />
          </motion.div>

          {/* Bottom Row */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="md:col-span-6"
          >
            <CollectionCard collection={COLLECTIONS[3]} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="md:col-span-6"
          >
            <CollectionCard collection={COLLECTIONS[4]} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CollectionCard({ collection, large = false }) {
  return (
    <Link
      to={collection.path}
      className={`group relative block overflow-hidden rounded-lg ${large ? 'h-[400px] md:h-full min-h-[500px]' : 'h-[280px] md:h-[320px]'}`}
    >
      <img
        src={collection.image}
        alt={collection.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-500" />
      <div className="absolute bottom-0 right-0 left-0 p-6 md:p-8">
        <span className="text-white/60 text-xs tracking-widest uppercase mb-2 block">
          {collection.nameEn}
        </span>
        <h3 className={`text-white font-bold mb-2 ${large ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}`}>
          {collection.name}
        </h3>
        <p className="text-white/70 text-sm mb-4 leading-6">
          {collection.desc}
        </p>
        <span className="inline-flex items-center gap-2 text-[#C8A96A] text-sm font-medium group-hover:gap-3 transition-all">
          مشاهده کالکشن
          <ArrowLeft className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}