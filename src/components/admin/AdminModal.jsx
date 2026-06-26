import React from 'react';
import { X, Loader2 } from 'lucide-react';

export default function AdminModal({ title, onClose, onSave, saving, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-10 overflow-y-auto" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="w-full max-w-2xl rounded-xl shadow-2xl" style={{ background: 'var(--bekri-card)', border: '1px solid var(--bekri-border)' }}>
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--bekri-border)' }}>
          <h3 className="font-bold text-base" style={{ color: 'var(--bekri-text)' }}>{title}</h3>
          <button onClick={onClose} className="p-1 hover:opacity-70 transition-opacity" style={{ color: 'var(--bekri-text-secondary)' }}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {children}
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 border-t" style={{ borderColor: 'var(--bekri-border)' }}>
          <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm border transition-colors hover:opacity-80" style={{ borderColor: 'var(--bekri-border)', color: 'var(--bekri-text-secondary)' }}>
            لغو
          </button>
          <button onClick={onSave} disabled={saving} className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium text-white disabled:opacity-50 hover:opacity-90 transition-opacity" style={{ background: 'var(--bekri-accent)' }}>
            {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            ذخیره
          </button>
        </div>
      </div>
    </div>
  );
}