import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Loader2 } from 'lucide-react';

const TYPE_MAP = { price_request: 'استعلام قیمت', consultation: 'مشاوره', sample_request: 'درخواست نمونه', general: 'عمومی' };
const STATUS_OPTIONS = [
  { value: 'new', label: 'جدید', color: 'text-blue-600' },
  { value: 'in_progress', label: 'در حال بررسی', color: 'text-yellow-600' },
  { value: 'completed', label: 'انجام شده', color: 'text-green-600' },
];

export default function AdminInquiries() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  const load = () => {
    setLoading(true);
    base44.entities.Inquiry.list('-created_date', 100).then(setItems).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const markStatus = async (item, status) => {
    setUpdating(item.id);
    try {
      await base44.entities.Inquiry.update(item.id, { status });
      setItems(prev => prev.map(i => i.id === item.id ? { ...i, status } : i));
    } finally { setUpdating(null); }
  };

  if (loading) return (
    <div className="flex justify-center py-16">
      <Loader2 className="w-6 h-6 animate-spin" style={{ color: 'var(--bekri-accent)' }} />
    </div>
  );

  return (
    <div className="rounded-xl border overflow-x-auto" style={{ borderColor: 'var(--bekri-border)', background: 'var(--bekri-card)' }}>
      <table className="w-full text-sm">
        <thead>
          <tr style={{ borderBottom: '1px solid var(--bekri-border)' }}>
            {['نام', 'تلفن', 'ایمیل', 'نوع درخواست', 'پیام', 'تاریخ', 'وضعیت'].map(h => (
              <th key={h} className="text-right px-4 py-3 font-medium text-xs" style={{ color: 'var(--bekri-text-secondary)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr><td colSpan={7} className="text-center py-12 text-sm" style={{ color: 'var(--bekri-text-secondary)' }}>استعلامی یافت نشد</td></tr>
          ) : items.map((item, i) => {
            const statusInfo = STATUS_OPTIONS.find(s => s.value === item.status) || STATUS_OPTIONS[0];
            return (
              <tr key={item.id} style={{ borderBottom: i < items.length - 1 ? '1px solid var(--bekri-border)' : 'none' }}>
                <td className="px-4 py-3 font-medium" style={{ color: 'var(--bekri-text)' }}>{item.name}</td>
                <td className="px-4 py-3" style={{ color: 'var(--bekri-text-secondary)' }} dir="ltr">{item.phone}</td>
                <td className="px-4 py-3 text-xs" style={{ color: 'var(--bekri-text-secondary)' }}>{item.email || '—'}</td>
                <td className="px-4 py-3 text-xs" style={{ color: 'var(--bekri-text-secondary)' }}>{TYPE_MAP[item.type] || item.type || '—'}</td>
                <td className="px-4 py-3 text-xs max-w-[200px] truncate" style={{ color: 'var(--bekri-text-secondary)' }}>{item.message || '—'}</td>
                <td className="px-4 py-3 text-xs" style={{ color: 'var(--bekri-text-secondary)' }}>
                  {item.created_date ? new Date(item.created_date).toLocaleDateString('fa-IR') : '—'}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    {updating === item.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" style={{ color: 'var(--bekri-accent)' }} />
                    ) : (
                      <select
                        value={item.status || 'new'}
                        onChange={e => markStatus(item, e.target.value)}
                        className={`text-xs px-2 py-1 rounded-lg border focus:outline-none cursor-pointer font-medium ${statusInfo.color}`}
                        style={{ background: 'var(--bekri-surface)', borderColor: 'var(--bekri-border)' }}
                      >
                        {STATUS_OPTIONS.map(s => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}