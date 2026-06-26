import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layers, MapPin } from 'lucide-react';

export default function ProductCard({ product, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
    >
      <Link
        to={`/product/${product.id}`}
        className="group block rounded-lg overflow-hidden bg-[var(--bekri-card)] border border-[var(--bekri-border)] hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20 transition-all duration-500"
      >
        <div className="relative h-[280px] overflow-hidden bg-[var(--bekri-surface)]">
          <img src={product.image || ''} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          {product.installed_image && (
            <img src={product.installed_image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          )}
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold text-[var(--bekri-text)] mb-2">{product.name}</h3>
          <div className="flex items-center gap-3 mb-3">
            {product.origin && <span className="flex items-center gap-1 text-xs text-[var(--bekri-text-secondary)]"><MapPin className="w-3 h-3" />{product.origin}</span>}
            {product.finish_types?.[0] && <span className="flex items-center gap-1 text-xs text-[var(--bekri-text-secondary)]"><Layers className="w-3 h-3" />{product.finish_types[0]}</span>}
          </div>
          {product.available_sizes?.length > 0 && (
            <p className="text-xs text-[var(--bekri-text-secondary)] mb-3">ابعاد: {product.available_sizes.join(' · ')}</p>
          )}
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--bekri-accent)] font-medium">مشاهده جزئیات</span>
            <span className="text-xs px-3 py-1 rounded-full border border-[var(--bekri-border)] text-[var(--bekri-text-secondary)]">درخواست قیمت</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
