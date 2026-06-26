import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Layers } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { CATEGORY_NAMES } from '@/lib/constants';

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Product.filter({ featured: true }, '-created_date', 6)
      .then(setProducts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-20 md:py-32">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-[460px] rounded-lg bg-[var(--bekri-surface)] animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

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
            <span className="text-[var(--bekri-accent)] text-sm font-medium tracking-widest mb-3 block">محصولات ویژه</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--bekri-text)]">منتخب سنگ بکری</h2>
          </div>
          <Link to="/collections" className="mt-4 md:mt-0 inline-flex items-center gap-2 text-[var(--bekri-accent)] text-sm font-medium hover:gap-3 transition-all">
            مشاهده همه محصولات
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group block rounded-lg overflow-hidden bg-[var(--bekri-card)] border border-[var(--bekri-border)] hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20 transition-all duration-500"
    >
      <div className="relative h-[300px] overflow-hidden">
        <img
          src={product.image || product.gallery?.[0] || ''}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.installed_image && (
          <img
            src={product.installed_image}
            alt={`${product.name} نصب شده`}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          />
        )}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--bekri-accent)]/90 text-white">
            {CATEGORY_NAMES[product.category] || product.category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-[var(--bekri-text)] mb-2">{product.name}</h3>
        <div className="flex items-center gap-4 mb-4">
          {product.origin && (
            <span className="flex items-center gap-1.5 text-xs text-[var(--bekri-text-secondary)]">
              <MapPin className="w-3 h-3" />
              {product.origin}
            </span>
          )}
          {product.finish_types?.length > 0 && (
            <span className="flex items-center gap-1.5 text-xs text-[var(--bekri-text-secondary)]">
              <Layers className="w-3 h-3" />
              {product.finish_types[0]}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[var(--bekri-accent)] font-medium group-hover:underline">
            مشاهده جزئیات
          </span>
          <span className="text-xs px-3 py-1 rounded-full border border-[var(--bekri-border)] text-[var(--bekri-text-secondary)]">
            درخواست قیمت
          </span>
        </div>
      </div>
    </Link>
  );
}