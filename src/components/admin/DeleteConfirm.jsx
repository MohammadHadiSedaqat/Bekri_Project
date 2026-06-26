import React from 'react';
import { Loader2, AlertTriangle } from 'lucide-react';

export default function DeleteConfirm({ label, onConfirm, onCancel, deleting }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="w-full max-w-sm rounded-xl p-6 shadow-2xl" style={{ background: 'var(--bekri-card)', border: '1px solid var(--bekri-border)' }}>
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
          <h3 className="font-bold text-base" style={{ color: 'var(--bekri-text)' }}>تأیید حذف</h3>
        </div>
        <p className="text-sm mb-6" style={{ color: 'var(--bekri-text-secondary)' }}>
          آیا مطمئنید که می‌خواهید «{label}» را حذف کنید؟ این عمل قابل بازگشت نیست.
        </p>
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className="px-4 py-2 rounded-lg text-sm border" style={{ borderColor: 'var(--bekri-border)', color: 'var(--bekri-text-secondary)' }}>
            لغو
          </button>
          <button onClick={onConfirm} disabled={deleting} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 disabled:opacity-50 hover:opacity-90 transition-opacity">
            {deleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}