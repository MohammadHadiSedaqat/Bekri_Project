import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

export default function ConsultationCTA() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSubmitting(true);
    try {
      await base44.entities.Inquiry.create({
        name: name.trim(),
        phone: phone.trim(),
        message: message.trim(),
        type: 'consultation',
      });
      setSubmitted(true);
      toast({ title: 'درخواست شما ثبت شد', description: 'کارشناسان ما به زودی با شما تماس خواهند گرفت' });
    } catch {
      toast({ title: 'خطا', description: 'لطفا مجددا تلاش کنید', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-20 md:py-32">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-l from-[#1B1B1B] to-[#2A2520]" />
          <div className="relative z-10 p-8 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#C8A96A] text-sm font-medium tracking-widest mb-4 block">مشاوره تخصصی</span>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-snug">
                پروژه خاصی دارید؟
                <br />
                با ما مشورت کنید
              </h2>
              <p className="text-white/60 leading-8 text-sm md:text-base">
                کارشناسان سنگ بکری آماده ارائه مشاوره تخصصی رایگان برای انتخاب بهترین سنگ متناسب با پروژه شما هستند.
              </p>
            </div>

            {submitted ? (
              <div className="bg-white/5 rounded-xl p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-[#C8A96A]/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#C8A96A] text-2xl">✓</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">درخواست شما ثبت شد</h3>
                <p className="text-white/60 text-sm">تیم ما در اسرع وقت با شما تماس خواهد گرفت</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white/5 rounded-xl p-6 md:p-8 space-y-4">
                <input
                  type="text"
                  placeholder="نام و نام خانوادگی"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 text-sm focus:border-[#C8A96A]/50 focus:outline-none transition-colors"
                />
                <input
                  type="tel"
                  placeholder="شماره تماس"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  required
                  className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 text-sm focus:border-[#C8A96A]/50 focus:outline-none transition-colors"
                  dir="ltr"
                />
                <textarea
                  placeholder="توضیحات پروژه (اختیاری)"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  rows={3}
                  className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 text-sm focus:border-[#C8A96A]/50 focus:outline-none transition-colors resize-none"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-lg bg-[#C8A96A] text-white font-medium text-sm hover:bg-[#B8993A] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {submitting ? 'در حال ارسال...' : 'درخواست مشاوره رایگان'}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}