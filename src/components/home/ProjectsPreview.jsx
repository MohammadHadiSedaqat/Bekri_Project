import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { PROJECT_VILLA, PROJECT_HOTEL, PROJECT_PENTHOUSE } from '@/lib/constants';

const FALLBACK_PROJECTS = [
  { id: 'f1', title: 'ویلای لاکچری لواسان', location: 'تهران، لواسان', architect: 'گروه معماری آرک', hero_image: PROJECT_VILLA, year: '۱۴۰۲' },
  { id: 'f2', title: 'هتل بین‌المللی کیش', location: 'جزیره کیش', architect: 'دفتر معماری نیو ویژن', hero_image: PROJECT_HOTEL, year: '۱۴۰۱' },
  { id: 'f3', title: 'پنت‌هاوس الهیه', location: 'تهران، الهیه', architect: 'استودیو معماری مینیمال', hero_image: PROJECT_PENTHOUSE, year: '۱۴۰۳' },
];

export default function ProjectsPreview() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Project.filter({ featured: true }, '-created_date', 3)
      .then(data => setProjects(data.length > 0 ? data : FALLBACK_PROJECTS))
      .catch(() => setProjects(FALLBACK_PROJECTS))
      .finally(() => setLoading(false));
  }, []);

  const display = loading ? FALLBACK_PROJECTS : projects;

  return (
    <section className="py-20 md:py-32">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
        >
          <div>
            <span className="text-[var(--bekri-accent)] text-sm font-medium tracking-widest mb-3 block">پروژه‌ها</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--bekri-text)]">پروژه‌های شاخص</h2>
          </div>
          <Link to="/projects" className="mt-4 md:mt-0 inline-flex items-center gap-2 text-[var(--bekri-accent)] text-sm font-medium hover:gap-3 transition-all">
            مشاهده همه پروژه‌ها
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {display.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
            >
              <Link
                to={project.id.startsWith('f') ? '/projects' : `/project/${project.id}`}
                className="group block relative h-[400px] md:h-[500px] rounded-lg overflow-hidden"
              >
                <img
                  src={project.hero_image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 right-0 left-0 p-6">
                  {project.location && (
                    <span className="flex items-center gap-1.5 text-white/60 text-xs mb-2">
                      <MapPin className="w-3 h-3" />
                      {project.location}
                    </span>
                  )}
                  <h3 className="text-white font-bold text-xl mb-1">{project.title}</h3>
                  {project.architect && <p className="text-white/60 text-sm">{project.architect}</p>}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}