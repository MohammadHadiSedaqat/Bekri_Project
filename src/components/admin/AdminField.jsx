import React, { useState } from 'react';

const inputClass = "w-full px-3 py-2 rounded-lg text-sm border focus:outline-none transition-colors";
const inputStyle = { background: 'var(--bekri-surface)', borderColor: 'var(--bekri-border)', color: 'var(--bekri-text)' };

export function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs mb-1.5 font-medium" style={{ color: 'var(--bekri-text-secondary)' }}>{label}</label>
      {children}
    </div>
  );
}

export function TextInput({ value, onChange, placeholder, dir }) {
  return (
    <input
      type="text"
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      dir={dir}
      className={inputClass}
      style={inputStyle}
    />
  );
}

export function TextareaInput({ value, onChange, rows = 3 }) {
  return (
    <textarea
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      rows={rows}
      className={`${inputClass} resize-none`}
      style={inputStyle}
    />
  );
}

export function SelectInput({ value, onChange, options }) {
  return (
    <select
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      className={inputClass}
      style={inputStyle}
    >
      <option value="">انتخاب کنید</option>
      {options.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

export function CheckboxInput({ label, value, onChange }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={!!value}
        onChange={e => onChange(e.target.checked)}
        className="w-4 h-4 rounded"
        style={{ accentColor: 'var(--bekri-accent)' }}
      />
      <span className="text-sm" style={{ color: 'var(--bekri-text)' }}>{label}</span>
    </label>
  );
}

export function TagsInput({ value = [], onChange, placeholder }) {
  const [input, setInput] = React.useState('');
  const add = () => {
    const v = input.trim();
    if (v && !value.includes(v)) onChange([...value, v]);
    setInput('');
  };
  return (
    <div>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
          placeholder={placeholder || 'تایپ کنید و Enter بزنید'}
          className={inputClass}
          style={inputStyle}
        />
        <button type="button" onClick={add} className="px-3 py-2 rounded-lg text-sm text-white" style={{ background: 'var(--bekri-accent)' }}>+</button>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {value.map((tag, i) => (
          <span key={i} className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs" style={{ background: 'var(--bekri-accent)20', color: 'var(--bekri-accent)' }}>
            {tag}
            <button type="button" onClick={() => onChange(value.filter((_, j) => j !== i))} className="ml-0.5 font-bold hover:opacity-60">×</button>
          </span>
        ))}
      </div>
    </div>
  );
}

export function NumberInput({ value, onChange }) {
  return (
    <input
      type="number"
      value={value ?? ''}
      onChange={e => onChange(e.target.value === '' ? undefined : Number(e.target.value))}
      className={inputClass}
      style={inputStyle}
    />
  );
}