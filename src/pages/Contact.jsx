import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, Send, Clock, Loader2 } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '', type: 'general' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    setSubmitting(true);
    try {
      await base44.entities.Inquiry.create({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        type: form.type,
      });
      setSubmitted(true);
      toast({ title: 'پیام شما ارسال شد', description: 'به زودی با شما تماس خواهیم گرفت' });
    } catch {
      toast({ title: 'خطا در ارسال', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-16 md:pb-24">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-16">
          <span className="text-[var(--bekri-accent)] text-sm font-medium tracking-widest mb-3 block">تماس با ما</span>
          <h1 className="text-3xl md:text-5xl font-bold text-[var(--bekri-text)] mb-4">ارتباط با سنگ بکری</h1>
          <p className="text-[var(--bekri-text-secondary)] text-base md:text-lg max-w-2xl leading-8">
            برای مشاوره، استعلام قیمت یا بازدید از شوروم و کارخانه با ما تماس بگیرید
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-xl bg-[var(--bekri-card)] border border-[var(--bekri-border)]">
              <h3 className="text-sm font-bold text-[var(--bekri-text)] mb-4">دفتر مرکزی و شوروم</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-1 text-[var(--bekri-accent)] shrink-0" />
                  <span className="text-sm text-[var(--bekri-text-secondary)] leading-6">اصفهان، شهرک صنعتی محمودآباد، خیابان ۲۲</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[var(--bekri-accent)] shrink-0" />
                  <a href="tel:+983133456789" className="text-sm text-[var(--bekri-text-secondary)] hover:text-[var(--bekri-accent)] transition-colors" dir="ltr">031-3345-6789</a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[var(--bekri-accent)] shrink-0" />
                  <a href="tel:+989123456789" className="text-sm text-[var(--bekri-text-secondary)] hover:text-[var(--bekri-accent)] transition-colors" dir="ltr">0912-345-6789</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[var(--bekri-accent)] shrink-0" />
                  <a href="mailto:info@bekristone.com" className="text-sm text-[var(--bekri-text-secondary)] hover:text-[var(--bekri-accent)] transition-colors">info@bekristone.com</a>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[var(--bekri-card)] border border-[var(--bekri-border)]">
              <h3 className="text-sm font-bold text-[var(--bekri-text)] mb-4">ساعات کاری</h3>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 text-[var(--bekri-accent)] shrink-0" />
                <div className="text-sm text-[var(--bekri-text-secondary)] leading-7">
                  <p>شنبه تا چهارشنبه: ۸:۰۰ تا ۱۷:۰۰</p>
                  <p>پنجشنبه: ۸:۰۰ تا ۱۳:۰۰</p>
                  <p>جمعه: تعطیل</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[var(--bekri-card)] border border-[var(--bekri-border)]">
              <h3 className="text-sm font-bold text-[var(--bekri-text)] mb-4">راه‌های ارتباطی</h3>
              <div className="flex gap-3">
                <a href="https://wa.me/989123456789" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-green-600 text-white text-xs font-medium">
                  <MessageCircle className="w-3.5 h-3.5" />واتساپ
                </a>
                <a href="https://t.me/bekristone" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-500 text-white text-xs font-medium">
                  <Send className="w-3.5 h-3.5" />تلگرام
                </a>
                <a href="https://instagram.com/bekristone" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium">
                  اینستاگرام
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2"
          >
            {submitted ? (
              <div className="h-full flex items-center justify-center p-12 rounded-xl bg-[var(--bekri-card)] border border-[var(--bekri-border)]">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-[var(--bekri-accent)]/10 flex items-center justify-center mx-auto mb-6">
                    <span className="text-[var(--bekri-accent)] text-3xl">✓</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--bekri-text)] mb-3">پیام شما ارسال شد</h3>
                  <p className="text-[var(--bekri-text-secondary)] mb-6">کارشناسان ما در اسرع وقت با شما تماس خواهند گرفت</p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', message: '', type: 'general' }); }} className="text-[var(--bekri-accent)] text-sm font-medium">ارسال پیام جدید</button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 md:p-10 rounded-xl bg-[var(--bekri-card)] border border-[var(--bekri-border)]">
                <h3 className="text-lg font-bold text-[var(--bekri-text)] mb-6">فرم تماس</h3>

                {/* Type */}
                <div className="mb-6">
                  <label className="block text-xs text-[var(--bekri-text-secondary)] mb-2">نوع درخواست</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: 'general', label: 'سوال عمومی' },
                      { value: 'price_request', label: 'استعلام قیمت' },
                      { value: 'consultation', label: 'مشاوره پروژه' },
                      { value: 'sample_request', label: 'درخواست نمونه' },
                    ].map(opt => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, type: opt.value }))}
                        className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                          form.type === opt.value
                            ? 'bg-[var(--bekri-accent)] text-white'
                            : 'border border-[var(--bekri-border)] text-[var(--bekri-text-secondary)] hover:border-[var(--bekri-accent)]/40'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs text-[var(--bekri-text-secondary)] mb-2">نام و نام خانوادگی *</label>
                    <input type="text" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-[var(--bekri-border)] bg-[var(--bekri-surface)] text-[var(--bekri-text)] text-sm focus:border-[var(--bekri-accent)]/50 focus:outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--bekri-text-secondary)] mb-2">شماره تماس *</label>
                    <input type="tel" required value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-[var(--bekri-border)] bg-[var(--bekri-surface)] text-[var(--bekri-text)] text-sm focus:border-[var(--bekri-accent)]/50 focus:outline-none transition-colors" dir="ltr" />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-xs text-[var(--bekri-text-secondary)] mb-2">ایمیل</label>
                  <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-[var(--bekri-border)] bg-[var(--bekri-surface)] text-[var(--bekri-text)] text-sm focus:border-[var(--bekri-accent)]/50 focus:outline-none transition-colors" dir="ltr" />
                </div>
                <div className="mb-6">
                  <label className="block text-xs text-[var(--bekri-text-secondary)] mb-2">پیام</label>
                  <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={5} className="w-full px-4 py-3 rounded-lg border border-[var(--bekri-border)] bg-[var(--bekri-surface)] text-[var(--bekri-text)] text-sm focus:border-[var(--bekri-accent)]/50 focus:outline-none transition-colors resize-none" />
                </div>
                <button type="submit" disabled={submitting} className="w-full md:w-auto px-10 py-3 rounded-lg bg-[var(--bekri-accent)] text-white font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2">
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {submitting ? 'در حال ارسال...' : 'ارسال پیام'}
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-xl overflow-hidden border border-[var(--bekri-border)] h-[350px] md:h-[450px]"
        >
          <MapContainer center={[32.6546, 51.6680]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap" />
            <Marker position={[32.6546, 51.6680]}>
              <Popup>سنگ بکری — شوروم و کارخانه</Popup>
            </Marker>
          </MapContainer>
        </motion.div>
      </div>
    </div>
  );
}