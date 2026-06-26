import React from 'react';
import { Pencil, Trash2, Plus, Loader2 } from 'lucide-react';

export default function AdminTable({ columns, rows, onEdit, onDelete, onAdd, addLabel = 'افزودن', loading }) {
  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ background: 'var(--bekri-accent)' }}
        >
          <Plus className="w-4 h-4" />
          {addLabel}
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="w-6 h-6 animate-spin" style={{ color: 'var(--bekri-accent)' }} />
        </div>
      ) : (
        <div className="rounded-xl border overflow-x-auto" style={{ borderColor: 'var(--bekri-border)', background: 'var(--bekri-card)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--bekri-border)' }}>
                {columns.map(col => (
                  <th key={col.key} className="text-right px-4 py-3 font-medium text-xs" style={{ color: 'var(--bekri-text-secondary)' }}>
                    {col.label}
                  </th>
                ))}
                <th className="px-4 py-3 w-20" />
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="text-center py-12 text-sm" style={{ color: 'var(--bekri-text-secondary)' }}>
                    رکوردی یافت نشد
                  </td>
                </tr>
              ) : rows.map((row, i) => (
                <tr
                  key={row.id || i}
                  style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--bekri-border)' : 'none' }}
                >
                  {columns.map(col => (
                    <td key={col.key} className="px-4 py-3" style={{ color: 'var(--bekri-text)' }}>
                      {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => onEdit(row)} className="p-1.5 rounded hover:opacity-70 transition-opacity" style={{ color: 'var(--bekri-accent)' }}>
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => onDelete(row)} className="p-1.5 rounded hover:opacity-70 transition-opacity text-red-500">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}