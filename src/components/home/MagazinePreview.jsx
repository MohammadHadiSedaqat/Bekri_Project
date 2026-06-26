import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { MAGAZINE_COVER, PRODUCT_KITCHEN, ABOUT_FACTORY } from '@/lib/constants';

const BLOG_CATEGORIES = {
  buying_guide: 'راهنمای خرید',
  comparison: 'مقایسه',
  trends: 'ترندها',
  projects: 'پروژه‌ها',
  maintenance: 'نگهداری',
};

const FALLBACK_POSTS = [
  { id: 'fb1', title: 'راهنمای جامع انتخاب سنگ مرمر', excerpt: 'نکات کلیدی در خرید سنگ مرمر طبیعی برای پروژه‌های ساختمانی لوکس', cover_image: MAGAZINE_COVER, category: 'buying_guide', read_time: 8 },
  { id: 'fb2', title: 'مقایسه مرمر و اونیکس در دکوراسیون داخلی', excerpt: 'تفاوت‌ها و کاربردهای هر یک در طراحی داخلی مدرن', cover_image: PRODUCT_KITCHEN, category: 'comparison', read_time: 6 },
  { id: 'fb3', title: 'ترندهای معماری داخلی ۱۴۰۳', excerpt: 'جدیدترین روندهای طراحی داخلی با سنگ طبیعی', cover_image: ABOUT_FACTORY, category: 'trends', read_time: 5 },
];

export default function MagazinePreview() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.BlogPost.list('-created_date', 3)
      .then(data => setPosts(data.length > 0 ? data : FALLBACK_POSTS))
      .catch(() => setPosts(FALLBACK_POSTS))
      .finally(() => setLoading(false));
  }, []);

  const display = loading ? FALLBACK_POSTS : posts;

  return (
    <section className="py-20 md:py-32 bg-[var(--bekri-surface)]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
        >
          <div>
            <span className="text-[var(--bekri-accent)] text-sm font-medium tracking-widest mb-3 block">مجله سنگ</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--bekri-text)]">دانش‌نامه سنگ</h2>
          </div>
          <Link to="/magazine" className="mt-4 md:mt-0 inline-flex items-center gap-2 text-[var(--bekri-accent)] text-sm font-medium hover:gap-3 transition-all">
            مشاهده همه مقالات
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {display.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <Link
                to={post.id.startsWith('fb') ? '/magazine' : `/magazine/${post.id}`}
                className="group block rounded-lg overflow-hidden bg-[var(--bekri-card)] border border-[var(--bekri-border)] hover:shadow-lg transition-shadow duration-500"
              >
                <div className="relative h-[220px] overflow-hidden">
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs text-[var(--bekri-accent)] font-medium">
                      {BLOG_CATEGORIES[post.category] || post.category}
                    </span>
                    {post.read_time && (
                      <span className="flex items-center gap-1 text-xs text-[var(--bekri-text-secondary)]">
                        <Clock className="w-3 h-3" />
                        {post.read_time} دقیقه
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-[var(--bekri-text)] mb-2 leading-7 group-hover:text-[var(--bekri-accent)] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[var(--bekri-text-secondary)] leading-6 line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}