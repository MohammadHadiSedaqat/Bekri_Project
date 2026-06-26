import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, FileText, Headphones } from 'lucide-react';

export default function FloatingActions() {
  return (
    <>
      {/* Desktop floating WhatsApp */}
      <a
        href="https://wa.me/989123456789"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:flex fixed bottom-8 left-8 z-40 w-14 h-14 rounded-full bg-green-600 text-white items-center justify-center shadow-lg shadow-green-600/30 hover:scale-110 transition-transform"
        aria-label="واتساپ"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* Mobile bottom bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass bg-[var(--bekri-bg)]/95 border-t border-[var(--bekri-border)]">
        <div className="grid grid-cols-4 h-14">
          <a href="tel:+983133456789" className="flex flex-col items-center justify-center gap-0.5 text-[var(--bekri-text-secondary)]">
            <Phone className="w-4 h-4" />
            <span className="text-[10px]">تماس</span>
          </a>
          <a href="https://wa.me/989123456789" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-0.5 text-green-600">
            <MessageCircle className="w-4 h-4" />
            <span className="text-[10px]">واتساپ</span>
          </a>
          <Link to="/contact" className="flex flex-col items-center justify-center gap-0.5 text-[var(--bekri-accent)]">
            <FileText className="w-4 h-4" />
            <span className="text-[10px]">استعلام قیمت</span>
          </Link>
          <Link to="/contact" className="flex flex-col items-center justify-center gap-0.5 text-[var(--bekri-text-secondary)]">
            <Headphones className="w-4 h-4" />
            <span className="text-[10px]">مشاوره</span>
          </Link>
        </div>
      </div>
    </>
  );
}