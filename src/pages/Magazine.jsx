import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Clock, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { MAGAZINE_COVER, PRODUCT_KITCHEN, ABOUT_FACTORY, PROJECT_VILLA, PROJECT_PENTHOUSE } from '@/lib/constants';

const CATEGORIES = {
  all: 'همه',
  buying_guide: 'راهنمای خرید',
  comparison: 'مقایسه',
  trends: 'ترندها',
  projects: 'پروژه‌ها',
  maintenance: 'نگهداری',
};

const FALLBACK = [
  { id: 'fb1', title: 'راهنمای جامع انتخاب سنگ مرمر', excerpt: 'نکات کلیدی در خرید سنگ مرمر طبیعی برای پروژه‌های ساختمانی لوکس. آنچه قبل از خرید باید بدانید.', cover_image: MAGAZINE_COVER, category: 'buying_guide', read_time: 8, content: 'محتوای مقاله...' },
  { id: 'fb2', title: 'مقایسه مرمر و اونیکس در دکوراسیون داخلی', excerpt: 'تفاوت‌ها و کاربردهای هر یک در طراحی داخلی مدرن و نکات مهم انتخاب.', cover_image: PRODUCT_KITCHEN, category: 'comparison', read_time: 6, content: 'محتوای مقاله...' },
  { id: 'fb3', title: 'ترندهای معماری داخلی ۱۴۰۳', excerpt: 'جدیدترین روندهای طراحی داخلی با سنگ طبیعی در سال جدید.', cover_image: ABOUT_FACTORY, category: 'trends', read_time: 5, content: 'محتوای مقاله...' },
  { id: 'fb4', title: 'نگهداری و مراقبت از سنگ طبیعی', excerpt: 'آموزش کامل روش‌های صحیح نگهداری و تمیز کردن سنگ‌های طبیعی.', cover_image: PROJECT_VILLA, category: 'maintenance', read_time: 7, content: 'محتوای مقاله...' },
  { id: 'fb5', title: 'پروژه ویلای لواسان با مرمر کلکته', excerpt: 'گزارش تصویری از یکی از شاخص‌ترین پروژه‌های اخیر سنگ بکری.', cover_image: PROJECT_PENTHOUSE, category: 'projects', read_time: 4, content: 'محتوای مقاله...' },
];

export default function Magazine() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    base44.entities.BlogPost.list('-created_date', 30)
      .then(data => setPosts(data.length > 0 ? data : FALLBACK))
      .catch(() => setPosts(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  const display = loading ? FALLBACK : posts;
  const filtered = activeCategory === 'all' ? display : display.filter(p => p.category === activeCategory);

  return (
    <div className="pt-24 pb-16 md:pb-24">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-12">
          <span className="text-[var(--bekri-accent)] text-sm font-medium tracking-widest mb-3 block">مجله سنگ</span>
          <h1 className="text-3xl md:text-5xl font-bold text-[var(--bekri-text)] mb-4">دانش‌نامه سنگ طبیعی</h1>
          <p className="text-[var(--bekri-text-secondary)] text-base md:text-lg max-w-2xl leading-8">
            مقالات تخصصی در زمینه سنگ‌های طبیعی، معماری و دکوراسیون داخلی
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-12">
          {Object.entries(CATEGORIES).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === key
                  ? 'bg-[var(--bekri-accent)] text-white'
                  : 'border border-[var(--bekri-border)] text-[var(--bekri-text-secondary)] hover:border-[var(--bekri-accent)]/40'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {filtered.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-12">
            <Link
              to={filtered[0].id.startsWith('fb') ? '#' : `/magazine/${filtered[0].id}`}
              className="group grid grid-cols-1 md:grid-cols-2 gap-0 rounded-xl overflow-hidden bg-[var(--bekri-card)] border border-[var(--bekri-border)]"
            >
              <div className="relative h-[280px] md:h-[400px] overflow-hidden">
                <img src={filtered[0].cover_image} alt={filtered[0].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs text-[var(--bekri-accent)] font-medium">{CATEGORIES[filtered[0].category] || filtered[0].category}</span>
                  {filtered[0].read_time && (
                    <span className="flex items-center gap-1 text-xs text-[var(--bekri-text-secondary)]"><Clock className="w-3 h-3" />{filtered[0].read_time} دقیقه</span>
                  )}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--bekri-text)] mb-4 leading-snug group-hover:text-[var(--bekri-accent)] transition-colors">{filtered[0].title}</h2>
                <p className="text-[var(--bekri-text-secondary)] leading-7 mb-6">{filtered[0].excerpt}</p>
                <span className="inline-flex items-center gap-2 text-[var(--bekri-accent)] text-sm font-medium">
                  مطالعه مقاله
                  <ArrowLeft className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Grid */}
        {filtered.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.slice(1).map((post, i) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}>
                <Link
                  to={post.id.startsWith('fb') ? '#' : `/magazine/${post.id}`}
                  className="group block rounded-lg overflow-hidden bg-[var(--bekri-card)] border border-[var(--bekri-border)] hover:shadow-lg transition-shadow duration-500"
                >
                  <div className="h-[220px] overflow-hidden">
                    <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs text-[var(--bekri-accent)] font-medium">{CATEGORIES[post.category]}</span>
                      {post.read_time && <span className="flex items-center gap-1 text-xs text-[var(--bekri-text-secondary)]"><Clock className="w-3 h-3" />{post.read_time} دقیقه</span>}
                    </div>
                    <h3 className="text-base font-bold text-[var(--bekri-text)] mb-2 leading-7 group-hover:text-[var(--bekri-accent)] transition-colors">{post.title}</h3>
                    <p className="text-sm text-[var(--bekri-text-secondary)] leading-6 line-clamp-2">{post.excerpt}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}