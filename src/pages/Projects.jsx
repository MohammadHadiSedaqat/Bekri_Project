import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { MapPin, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { PROJECT_VILLA, PROJECT_HOTEL, PROJECT_PENTHOUSE } from '@/lib/constants';

const FALLBACK = [
  { id: 'f1', title: 'ویلای لاکچری لواسان', location: 'تهران، لواسان', architect: 'گروه معماری آرک', area: '۱۲۰۰ متر مربع', hero_image: PROJECT_VILLA, year: '۱۴۰۲', stones_used: ['مرمر کلکته', 'تراورتن عسلی'], description: 'پروژه ویلایی لوکس با استفاده گسترده از سنگ مرمر کلکته طلایی در لابی و فضاهای اصلی' },
  { id: 'f2', title: 'هتل بین‌المللی کیش', location: 'جزیره کیش', architect: 'دفتر معماری نیو ویژن', area: '۸۵۰۰ متر مربع', hero_image: PROJECT_HOTEL, year: '۱۴۰۱', stones_used: ['مرمر سفید', 'گرانیت مشکی'], description: 'هتل پنج ستاره با طراحی معاصر و استفاده از بهترین سنگ‌های طبیعی' },
  { id: 'f3', title: 'پنت‌هاوس الهیه', location: 'تهران، الهیه', architect: 'استودیو معماری مینیمال', area: '۴۵۰ متر مربع', hero_image: PROJECT_PENTHOUSE, year: '۱۴۰۳', stones_used: ['اونیکس عسلی', 'مرمر کلکته'], description: 'پنت‌هاوس مدرن با نورپردازی خیره‌کننده از اونیکس طبیعی' },
];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Project.list('-created_date', 20)
      .then(data => setProjects(data.length > 0 ? data : FALLBACK))
      .catch(() => setProjects(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  const display = loading ? FALLBACK : projects;

  return (
    <div className="pt-24 pb-16 md:pb-24">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-16">
          <span className="text-[var(--bekri-accent)] text-sm font-medium tracking-widest mb-3 block">پورتفولیو</span>
          <h1 className="text-3xl md:text-5xl font-bold text-[var(--bekri-text)] mb-4">پروژه‌های شاخص</h1>
          <p className="text-[var(--bekri-text-secondary)] text-base md:text-lg max-w-2xl leading-8">
            نگاهی به پروژه‌های معماری برجسته‌ای که با سنگ‌های طبیعی بکری به زیبایی و شکوه رسیده‌اند
          </p>
        </motion.div>

        <div className="space-y-8">
          {display.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
            >
              <div className="group grid grid-cols-1 md:grid-cols-2 gap-0 rounded-xl overflow-hidden bg-[var(--bekri-card)] border border-[var(--bekri-border)]">
                <div className="relative h-[300px] md:h-[450px] overflow-hidden">
                  <img src={project.hero_image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    {project.location && (
                      <span className="flex items-center gap-1.5 text-xs text-[var(--bekri-text-secondary)]">
                        <MapPin className="w-3 h-3 text-[var(--bekri-accent)]" />
                        {project.location}
                      </span>
                    )}
                    {project.year && <span className="text-xs text-[var(--bekri-text-secondary)]">{project.year}</span>}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[var(--bekri-text)] mb-3">{project.title}</h2>
                  {project.architect && <p className="text-sm text-[var(--bekri-text-secondary)] mb-2">معمار: {project.architect}</p>}
                  {project.area && <p className="text-sm text-[var(--bekri-text-secondary)] mb-4">متراژ: {project.area}</p>}
                  {project.description && <p className="text-sm text-[var(--bekri-text-secondary)] leading-7 mb-6">{project.description}</p>}
                  {project.stones_used?.length > 0 && (
                    <div className="mb-6">
                      <span className="text-xs text-[var(--bekri-text-secondary)] mb-2 block">سنگ‌های استفاده شده:</span>
                      <div className="flex flex-wrap gap-2">
                        {project.stones_used.map(s => (
                          <span key={s} className="px-3 py-1 rounded-full text-xs bg-[var(--bekri-accent)]/10 text-[var(--bekri-accent)]">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  <Link to="/contact" className="inline-flex items-center gap-2 text-[var(--bekri-accent)] text-sm font-medium hover:gap-3 transition-all">
                    درخواست مشاوره برای پروژه مشابه
                    <ArrowLeft className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}