import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { CATEGORY_NAMES } from '@/lib/constants';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { MapPin, Layers, Maximize2, ArrowRight, MessageCircle, FileText, Package, Download, ChevronDown, ChevronUp, Loader2, X } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [openSpec, setOpenSpec] = useState(null);
  const [showInquiry, setShowInquiry] = useState(false);
  const [inquiryData, setInquiryData] = useState({ name: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);
    base44.entities.Product.get(id)
      .then(setProduct)
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleInquiry = async (e) => {
    e.preventDefault();
    if (!inquiryData.name.trim() || !inquiryData.phone.trim()) return;
    setSubmitting(true);
    try {
      await base44.entities.Inquiry.create({
        ...inquiryData,
        type: 'price_request',
        product_name: product?.name,
      });
      toast({ title: 'درخواست شما ثبت شد' });
      setShowInquiry(false);
      setInquiryData({ name: '', phone: '', message: '' });
    } catch {
      toast({ title: 'خطا', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-28 pb-20 flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-[var(--bekri-surface)] border-t-[var(--bekri-accent)] rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-28 pb-20 text-center min-h-screen">
        <h1 className="text-2xl font-bold text-[var(--bekri-text)] mb-4">محصول یافت نشد</h1>
        <Link to="/collections" className="text-[var(--bekri-accent)]">بازگشت به کالکشن‌ها</Link>
      </div>
    );
  }

  const allImages = [product.image, ...(product.gallery || []), product.installed_image].filter(Boolean);
  const specs = [
    { key: 'water_absorption', label: 'جذب آب', value: product.water_absorption },
    { key: 'compressive_strength', label: 'مقاومت فشاری', value: product.compressive_strength },
    { key: 'density', label: 'چگالی', value: product.density },
    { key: 'processing', label: 'فرآوری', value: product.processing },
  ].filter(s => s.value);

  return (
    <div className="pt-20 pb-20 md:pb-32">
      {/* Fullscreen Viewer */}
      {fullscreen && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center" onClick={() => setFullscreen(false)}>
          <button className="absolute top-6 left-6 text-white/80 hover:text-white z-10"><X className="w-6 h-6" /></button>
          <img src={allImages[activeImage]} alt="" className="max-w-full max-h-full object-contain" />
        </div>
      )}

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 pt-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[var(--bekri-text-secondary)] mb-8">
          <Link to="/" className="hover:text-[var(--bekri-accent)] transition-colors">خانه</Link>
          <span>/</span>
          <Link to={`/collection/${product.category}`} className="hover:text-[var(--bekri-accent)] transition-colors">{CATEGORY_NAMES[product.category]}</Link>
          <span>/</span>
          <span className="text-[var(--bekri-text)]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Gallery */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="relative rounded-lg overflow-hidden mb-4 aspect-square lg:aspect-auto lg:h-[600px] cursor-pointer" onClick={() => setFullscreen(true)}>
              <img src={allImages[activeImage] || ''} alt={product.name} className="w-full h-full object-cover" />
              <button className="absolute top-4 left-4 w-10 h-10 rounded-full glass bg-black/20 flex items-center justify-center text-white">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-20 rounded-md overflow-hidden shrink-0 border-2 transition-colors ${
                      activeImage === i ? 'border-[var(--bekri-accent)]' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <span className="text-[var(--bekri-accent)] text-sm font-medium tracking-widest mb-2 block">
              {CATEGORY_NAMES[product.category]}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--bekri-text)] mb-4">{product.name}</h1>
            {product.name_en && <p className="text-sm text-[var(--bekri-text-secondary)] mb-6">{product.name_en}</p>}

            {product.description && (
              <p className="text-[var(--bekri-text-secondary)] leading-8 mb-8">{product.description}</p>
            )}

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {product.origin && (
                <div className="p-4 rounded-lg bg-[var(--bekri-surface)]">
                  <span className="text-xs text-[var(--bekri-text-secondary)] mb-1 block">محل استخراج</span>
                  <span className="text-sm font-medium text-[var(--bekri-text)] flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[var(--bekri-accent)]" />{product.origin}</span>
                </div>
              )}
              {product.color && (
                <div className="p-4 rounded-lg bg-[var(--bekri-surface)]">
                  <span className="text-xs text-[var(--bekri-text-secondary)] mb-1 block">رنگ</span>
                  <span className="text-sm font-medium text-[var(--bekri-text)]">{product.color}</span>
                </div>
              )}
            </div>

            {/* Applications */}
            {product.applications?.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-bold text-[var(--bekri-text)] mb-3">کاربردها</h3>
                <div className="flex flex-wrap gap-2">
                  {product.applications.map(a => (
                    <span key={a} className="px-3 py-1.5 rounded-full text-xs border border-[var(--bekri-border)] text-[var(--bekri-text-secondary)]">{a}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.available_sizes?.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-bold text-[var(--bekri-text)] mb-3">ابعاد موجود</h3>
                <div className="flex flex-wrap gap-2">
                  {product.available_sizes.map(s => (
                    <span key={s} className="px-3 py-1.5 rounded-full text-xs bg-[var(--bekri-surface)] text-[var(--bekri-text)]">{s}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Finish Types */}
            {product.finish_types?.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-bold text-[var(--bekri-text)] mb-3">نوع فرآوری</h3>
                <div className="flex flex-wrap gap-2">
                  {product.finish_types.map(f => (
                    <span key={f} className="px-3 py-1.5 rounded-full text-xs bg-[var(--bekri-surface)] text-[var(--bekri-text)]">{f}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Stock */}
            <div className="flex items-center gap-2 mb-8">
              <span className={`w-2 h-2 rounded-full ${product.in_stock ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm text-[var(--bekri-text-secondary)]">{product.in_stock ? 'موجود در انبار' : 'ناموجود'}</span>
            </div>

            {/* Technical Specs Accordion */}
            {specs.length > 0 && (
              <div className="mb-8 border border-[var(--bekri-border)] rounded-lg overflow-hidden">
                <h3 className="text-sm font-bold text-[var(--bekri-text)] px-4 py-3 bg-[var(--bekri-surface)]">مشخصات فنی</h3>
                {specs.map(spec => (
                  <div key={spec.key} className="border-t border-[var(--bekri-border)]">
                    <button
                      onClick={() => setOpenSpec(openSpec === spec.key ? null : spec.key)}
                      className="w-full flex items-center justify-between px-4 py-3 text-sm text-[var(--bekri-text)]"
                    >
                      {spec.label}
                      {openSpec === spec.key ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {openSpec === spec.key && (
                      <div className="px-4 pb-3 text-sm text-[var(--bekri-text-secondary)]">{spec.value}</div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* CTAs */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <a
                href={`https://wa.me/989123456789?text=${encodeURIComponent(`سلام، درباره ${product.name} اطلاعات می‌خواهم`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                واتساپ
              </a>
              <button
                onClick={() => setShowInquiry(true)}
                className="flex items-center justify-center gap-2 py-3 rounded-lg bg-[var(--bekri-accent)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <FileText className="w-4 h-4" />
                درخواست قیمت
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowInquiry(true)}
                className="flex items-center justify-center gap-2 py-3 rounded-lg border border-[var(--bekri-border)] text-[var(--bekri-text-secondary)] text-sm font-medium hover:border-[var(--bekri-accent)]/40 transition-colors"
              >
                <Package className="w-4 h-4" />
                درخواست نمونه
              </button>
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 py-3 rounded-lg border border-[var(--bekri-border)] text-[var(--bekri-text-secondary)] text-sm font-medium hover:border-[var(--bekri-accent)]/40 transition-colors"
              >
                <Download className="w-4 h-4" />
                دانلود کاتالوگ
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Inquiry Modal */}
      {showInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowInquiry(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md mx-4 p-6 md:p-8 rounded-xl bg-[var(--bekri-card)] shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[var(--bekri-text)]">درخواست قیمت — {product.name}</h3>
              <button onClick={() => setShowInquiry(false)} className="text-[var(--bekri-text-secondary)]"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleInquiry} className="space-y-4">
              <input type="text" placeholder="نام و نام خانوادگی" required value={inquiryData.name} onChange={e => setInquiryData(d => ({...d, name: e.target.value}))} className="w-full px-4 py-3 rounded-lg border border-[var(--bekri-border)] bg-[var(--bekri-surface)] text-[var(--bekri-text)] text-sm placeholder:text-[var(--bekri-text-secondary)]/50 focus:border-[var(--bekri-accent)]/50 focus:outline-none" />
              <input type="tel" placeholder="شماره تماس" required value={inquiryData.phone} onChange={e => setInquiryData(d => ({...d, phone: e.target.value}))} className="w-full px-4 py-3 rounded-lg border border-[var(--bekri-border)] bg-[var(--bekri-surface)] text-[var(--bekri-text)] text-sm placeholder:text-[var(--bekri-text-secondary)]/50 focus:border-[var(--bekri-accent)]/50 focus:outline-none" dir="ltr" />
              <textarea placeholder="توضیحات (اختیاری)" value={inquiryData.message} onChange={e => setInquiryData(d => ({...d, message: e.target.value}))} rows={3} className="w-full px-4 py-3 rounded-lg border border-[var(--bekri-border)] bg-[var(--bekri-surface)] text-[var(--bekri-text)] text-sm placeholder:text-[var(--bekri-text-secondary)]/50 focus:border-[var(--bekri-accent)]/50 focus:outline-none resize-none" />
              <button type="submit" disabled={submitting} className="w-full py-3 rounded-lg bg-[var(--bekri-accent)] text-white font-medium text-sm disabled:opacity-50 flex items-center justify-center gap-2">
                {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {submitting ? 'در حال ارسال...' : 'ارسال درخواست'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}