import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, SlidersHorizontal, X } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import ProductCard from '@/components/products/ProductCard';
import { COLLECTIONS, PRODUCT_COLORS, PRODUCT_FINISHES } from '@/lib/constants';
import { searchProducts } from '@/lib/product-search';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [inputValue, setInputValue] = useState(searchParams.get('q') || '');

  const query = searchParams.get('q') || '';
  const categoryFilter = searchParams.get('category') || '';
  const colorFilter = searchParams.get('color') || '';
  const finishFilter = searchParams.get('finish') || '';
  const hasActiveSearch = Boolean(query || categoryFilter || colorFilter || finishFilter);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    base44.entities.Product.list('-sort_order', 100)
      .then(setProducts)
      .catch(() => {
        setProducts([]);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const results = useMemo(() => searchProducts(products, query, {
    category: categoryFilter,
    color: colorFilter,
    finish: finishFilter,
  }), [products, query, categoryFilter, colorFilter, finishFilter]);

  const updateParams = (updates) => {
    const next = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        next.set(key, value);
      } else {
        next.delete(key);
      }
    });

    setSearchParams(next);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateParams({ q: inputValue.trim() });
  };

  const clearAll = () => {
    setInputValue('');
    setSearchParams({});
  };

  return (
    <div className="pt-20">
      <section className="bg-[var(--bekri-surface)] border-b border-[var(--bekri-border)]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-12 md:py-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[var(--bekri-accent)]/10 text-[var(--bekri-accent)] mb-4">
            <SearchIcon className="w-3.5 h-3.5" />
            جستجوی سنگ بکری
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-[var(--bekri-text)] mb-4">
            {query ? `نتایج جستجو برای «${query}»` : 'همه محصولات'}
          </h1>
          <p className="text-[var(--bekri-text-secondary)] max-w-2xl leading-8">
            نام سنگ، رنگ، نوع فرآوری، کاربرد یا دسته‌بندی مورد نظر را جستجو کنید و سریع‌تر به محصول مناسب برسید.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col md:flex-row gap-3 max-w-3xl">
            <div className="relative flex-1">
              <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--bekri-text-secondary)]" />
              <input
                type="search"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder="مثلاً مرمر سفید، تراورتن، صیقلی..."
                className="w-full h-12 pr-12 pl-4 rounded-full bg-[var(--bekri-card)] border border-[var(--bekri-border)] text-[var(--bekri-text)] placeholder:text-[var(--bekri-text-secondary)] focus:outline-none focus:border-[var(--bekri-accent)] transition-colors"
              />
            </div>
            <button type="submit" className="h-12 px-8 rounded-full bg-[var(--bekri-accent)] text-white font-medium hover:opacity-90 transition-opacity">
              جستجو
            </button>
          </form>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-10 md:py-14">
        <div className="mb-8 p-5 md:p-6 rounded-xl bg-[var(--bekri-card)] border border-[var(--bekri-border)]">
          <div className="flex items-center justify-between gap-4 mb-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-[var(--bekri-text)]">
              <SlidersHorizontal className="w-4 h-4" />
              فیلتر نتایج
            </h2>
            {hasActiveSearch && (
              <button onClick={clearAll} className="flex items-center gap-1 text-xs text-[var(--bekri-accent)] hover:opacity-80 transition-opacity">
                <X className="w-3 h-3" />
                پاک کردن همه
              </button>
            )}
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-xs text-[var(--bekri-text-secondary)] mb-2">دسته‌بندی</label>
              <div className="flex flex-wrap gap-2">
                {COLLECTIONS.map((collection) => (
                  <button
                    key={collection.id}
                    onClick={() => updateParams({ category: categoryFilter === collection.id ? '' : collection.id })}
                    className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                      categoryFilter === collection.id
                        ? 'bg-[var(--bekri-accent)] text-white border-[var(--bekri-accent)]'
                        : 'border-[var(--bekri-border)] text-[var(--bekri-text-secondary)] hover:border-[var(--bekri-accent)]/40'
                    }`}
                  >
                    {collection.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs text-[var(--bekri-text-secondary)] mb-2">رنگ</label>
                <div className="flex flex-wrap gap-2">
                  {PRODUCT_COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => updateParams({ color: colorFilter === color ? '' : color })}
                      className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                        colorFilter === color
                          ? 'bg-[var(--bekri-accent)] text-white border-[var(--bekri-accent)]'
                          : 'border-[var(--bekri-border)] text-[var(--bekri-text-secondary)] hover:border-[var(--bekri-accent)]/40'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs text-[var(--bekri-text-secondary)] mb-2">فرآوری</label>
                <div className="flex flex-wrap gap-2">
                  {PRODUCT_FINISHES.map((finish) => (
                    <button
                      key={finish}
                      onClick={() => updateParams({ finish: finishFilter === finish ? '' : finish })}
                      className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                        finishFilter === finish
                          ? 'bg-[var(--bekri-accent)] text-white border-[var(--bekri-accent)]'
                          : 'border-[var(--bekri-border)] text-[var(--bekri-text-secondary)] hover:border-[var(--bekri-accent)]/40'
                      }`}
                    >
                      {finish}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-[var(--bekri-text-secondary)]">
            {loading ? 'در حال جستجو...' : `${results.length} محصول یافت شد`}
          </p>
          {hasActiveSearch && <Link to="/collections" className="text-sm text-[var(--bekri-accent)] hover:opacity-80 transition-opacity">مشاهده کالکشن‌ها</Link>}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[420px] rounded-lg bg-[var(--bekri-surface)] animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 rounded-xl bg-[var(--bekri-card)] border border-[var(--bekri-border)]">
            <p className="text-[var(--bekri-text)] text-lg font-bold mb-3">خطا در دریافت محصولات</p>
            <p className="text-[var(--bekri-text-secondary)] text-sm mb-6">لطفاً دوباره تلاش کنید یا با ما تماس بگیرید.</p>
            <Link to="/contact" className="inline-flex px-5 py-2.5 rounded-full bg-[var(--bekri-accent)] text-white text-sm font-medium">درخواست مشاوره</Link>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-20 rounded-xl bg-[var(--bekri-card)] border border-[var(--bekri-border)]">
            <p className="text-[var(--bekri-text)] text-lg font-bold mb-3">محصولی مطابق جستجوی شما یافت نشد</p>
            <p className="text-[var(--bekri-text-secondary)] text-sm mb-6">عبارت دیگری را امتحان کنید یا از کالکشن‌ها بازدید کنید.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link to="/collections" className="px-5 py-2.5 rounded-full bg-[var(--bekri-accent)] text-white text-sm font-medium">مشاهده کالکشن‌ها</Link>
              <Link to="/contact" className="px-5 py-2.5 rounded-full border border-[var(--bekri-border)] text-[var(--bekri-text)] text-sm font-medium hover:border-[var(--bekri-accent)]/40 transition-colors">درخواست مشاوره</Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
