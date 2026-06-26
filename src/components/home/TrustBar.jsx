import React from 'react';
import { Factory, Globe, Award, Building2, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';

const TRUST_ITEMS = [
  { icon: Factory, label: 'کارخانه مستقیم' },
  { icon: Globe, label: 'صادرات بین‌المللی' },
  { icon: Award, label: 'بیش از ۲۰ سال تجربه' },
  { icon: Building2, label: 'پروژه‌های شاخص' },
  { icon: Headphones, label: 'مشاوره تخصصی' },
];

export default function TrustBar() {
  return (
    <section className="py-10 md:py-14 border-b border-[var(--bekri-border)]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
          {TRUST_ITEMS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <item.icon className="w-5 h-5 text-[var(--bekri-accent)]" />
              <span className="text-sm text-[var(--bekri-text-secondary)] font-medium whitespace-nowrap">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}