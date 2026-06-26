import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { CATEGORY_NAMES, CATEGORY_IMAGES, PRODUCT_COLORS, PRODUCT_FINISHES } from '@/lib/constants';
import ProductCard from '@/components/products/ProductCard';
import { motion } from 'framer-motion';
import { Filter, ArrowLeft } from 'lucide-react';

export default function CollectionDetail() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [colorFilter, setColorFilter] = useState('');
  const [finishFilter, setFinishFilter] = useState('');

  const categoryName = CATEGORY_NAMES[category] || category;
  const categoryImage = CATEGORY_IMAGES[category];

  useEffect(() => {
    setLoading(true);
    base44.entities.Product.filter({ category }, '-sort_order', 50)
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [category]);

  const filtered = products.filter(p => {
    if (colorFilter && p.color !== colorFilter) return false;
    if (finishFilter && !p.finish_types?.includes(finishFilter)) return false;
    return true;
  });

  return (
    <div className="pt-20">
      {/* Hero Banner */}
      <div className="relative h-[300px] md:h-[450px] overflow-hidden">
        <img src={categoryImage} alt={categoryName} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 right-0 left-0 p-8 md:p-16 max-w-[1440px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Link to="/collections" className="inline-flex items-center gap-2 text-white/60 text-sm mb-4 hover:text-white transition-colors">
              کالکشن‌ها
              <ArrowLeft className="w-3 h-3" />
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold text-white">{categoryName}</h1>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-12 md:py-20">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-[var(--bekri-text-secondary)]">
            {loading ? '...' : `${filtered.length} محصول`}
          </p>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--bekri-border)] text-sm text-[var(--bekri-text-secondary)] hover:border-[var(--bekri-accent)]/40 transition-colors"
          >
            <Filter className="w-4 h-4" />
            فیلترها
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-8 p-6 rounded-lg bg-[var(--bekri-card)] border border-[var(--bekri-border)]"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-[var(--bekri-text)]">فیلترها</h3>
              <button onClick={() => { setColorFilter(''); setFinishFilter(''); }} className="text-xs text-[var(--bekri-accent)]">پاک کردن</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs text-[var(--bekri-text-secondary)] mb-2">رنگ</label>
                <div className="flex flex-wrap gap-2">
                  {PRODUCT_COLORS.map(c => (
                    <button
                      key={c}
                      onClick={() => setColorFilter(colorFilter === c ? '' : c)}
                      className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                        colorFilter === c
                          ? 'bg-[var(--bekri-accent)] text-white border-[var(--bekri-accent)]'
                          : 'border-[var(--bekri-border)] text-[var(--bekri-text-secondary)] hover:border-[var(--bekri-accent)]/40'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs text-[var(--bekri-text-secondary)] mb-2">فرآوری</label>
                <div className="flex flex-wrap gap-2">
                  {PRODUCT_FINISHES.map(f => (
                    <button
                      key={f}
                      onClick={() => setFinishFilter(finishFilter === f ? '' : f)}
                      className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                        finishFilter === f
                          ? 'bg-[var(--bekri-accent)] text-white border-[var(--bekri-accent)]'
                          : 'border-[var(--bekri-border)] text-[var(--bekri-text-secondary)] hover:border-[var(--bekri-accent)]/40'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Products */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[420px] rounded-lg bg-[var(--bekri-surface)] animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[var(--bekri-text-secondary)] text-lg mb-4">محصولی یافت نشد</p>
            <p className="text-[var(--bekri-text-secondary)] text-sm">محصولات به زودی اضافه خواهند شد</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}