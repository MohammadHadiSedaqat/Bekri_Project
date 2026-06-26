import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Globe, Factory, Users, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { ABOUT_FACTORY, PROJECT_HOTEL } from '@/lib/constants';

const STATS = [
  { value: '۲۰+', label: 'سال تجربه', icon: Award },
  { value: '۲۰+', label: 'کشور صادرات', icon: Globe },
  { value: '۵۰۰+', label: 'پروژه موفق', icon: Factory },
  { value: '۱۰۰+', label: 'همکار و مشتری', icon: Users },
];

export default function About() {
  return (
    <div className="pt-24 pb-16 md:pb-24">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20 md:mb-32">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex flex-col justify-center">
            <span className="text-[var(--bekri-accent)] text-sm font-medium tracking-widest mb-4 block">درباره ما</span>
            <h1 className="text-3xl md:text-5xl font-bold text-[var(--bekri-text)] mb-6 leading-snug">
              داستان سنگ بکری
            </h1>
            <p className="text-[var(--bekri-text-secondary)] leading-8 mb-6">
              سنگ بکری با بیش از دو دهه تجربه در صنعت سنگ‌های طبیعی، یکی از معتبرترین تأمین‌کنندگان سنگ‌های لوکس ساختمانی در ایران و خاورمیانه است. ما از معادن برتر ایران و جهان، نفیس‌ترین سنگ‌های مرمر، اونیکس، گرانیت و تراورتن را استخراج و فرآوری می‌کنیم.
            </p>
            <p className="text-[var(--bekri-text-secondary)] leading-8 mb-8">
              تعهد ما به کیفیت بین‌المللی، نوآوری در فرآوری و خدمات مشاوره تخصصی، ما را به انتخاب اول معماران، طراحان داخلی و سازندگان پروژه‌های لوکس تبدیل کرده است.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 text-[var(--bekri-accent)] text-sm font-medium hover:gap-3 transition-all">
              تماس با ما
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative">
            <img src={ABOUT_FACTORY} alt="کارخانه سنگ بکری" className="w-full h-[400px] md:h-[550px] object-cover rounded-xl" />
            <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 bg-[var(--bekri-accent)] text-white p-6 md:p-8 rounded-xl shadow-xl hidden md:block">
              <span className="text-3xl font-bold block">۱۳۸۲</span>
              <span className="text-sm">سال تأسیس</span>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 md:mb-32"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center p-6 md:p-8 rounded-xl bg-[var(--bekri-card)] border border-[var(--bekri-border)]"
            >
              <stat.icon className="w-6 h-6 text-[var(--bekri-accent)] mx-auto mb-4" />
              <span className="text-3xl md:text-4xl font-bold text-[var(--bekri-text)] block mb-2">{stat.value}</span>
              <span className="text-sm text-[var(--bekri-text-secondary)]">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Values */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img src={PROJECT_HOTEL} alt="پروژه لوکس" className="w-full h-[400px] object-cover rounded-xl" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--bekri-text)] mb-6">ارزش‌های ما</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[var(--bekri-text)] mb-2">کیفیت بین‌المللی</h3>
                <p className="text-sm text-[var(--bekri-text-secondary)] leading-7">تمامی محصولات ما مطابق با استانداردهای بین‌المللی و با تجهیزات مدرن اروپایی فرآوری می‌شوند.</p>
              </div>
              <div className="vein-line" />
              <div>
                <h3 className="text-lg font-bold text-[var(--bekri-text)] mb-2">مشاوره تخصصی</h3>
                <p className="text-sm text-[var(--bekri-text-secondary)] leading-7">تیم متخصص ما آماده ارائه مشاوره رایگان در انتخاب بهترین سنگ متناسب با پروژه شما هستند.</p>
              </div>
              <div className="vein-line" />
              <div>
                <h3 className="text-lg font-bold text-[var(--bekri-text)] mb-2">تحویل به‌موقع</h3>
                <p className="text-sm text-[var(--bekri-text-secondary)] leading-7">با ظرفیت تولید بالا و لجستیک قوی، سفارشات شما در کمترین زمان ممکن آماده و ارسال می‌شوند.</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center py-16 md:py-20 rounded-2xl bg-[var(--bekri-card)] border border-[var(--bekri-border)]"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--bekri-text)] mb-4">آماده همکاری هستیم</h2>
          <p className="text-[var(--bekri-text-secondary)] mb-8 max-w-lg mx-auto leading-7">
            برای مشاوره رایگان یا بازدید از شوروم و کارخانه با ما تماس بگیرید
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="px-8 py-3 rounded-full bg-[var(--bekri-accent)] text-white font-medium text-sm hover:opacity-90 transition-opacity">
              تماس با ما
            </Link>
            <Link to="/collections" className="px-8 py-3 rounded-full border border-[var(--bekri-border)] text-[var(--bekri-text-secondary)] font-medium text-sm hover:border-[var(--bekri-accent)]/40 transition-colors">
              مشاهده محصولات
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}