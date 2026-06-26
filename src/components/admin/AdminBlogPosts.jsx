import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import AdminTable from './AdminTable';
import AdminModal from './AdminModal';
import DeleteConfirm from './DeleteConfirm';
import { Field, TextInput, TextareaInput, SelectInput, CheckboxInput, NumberInput } from './AdminField';

const CATEGORY_OPTIONS = [
  { value: 'buying_guide', label: 'راهنمای خرید' },
  { value: 'comparison', label: 'مقایسه' },
  { value: 'trends', label: 'ترندها' },
  { value: 'projects', label: 'پروژه‌ها' },
  { value: 'maintenance', label: 'نگهداری' },
];

const EMPTY = { title: '', slug: '', excerpt: '', content: '', cover_image: '', category: '', read_time: 5, featured: false };

const COLUMNS = [
  { key: 'title', label: 'عنوان' },
  { key: 'category', label: 'دسته‌بندی', render: v => CATEGORY_OPTIONS.find(o => o.value === v)?.label || v || '—' },
  { key: 'read_time', label: 'زمان مطالعه', render: v => v ? `${v} دقیقه` : '—' },
  { key: 'featured', label: 'ویژه', render: v => v ? <span className="text-xs" style={{ color: 'var(--bekri-accent)' }}>★ ویژه</span> : '—' },
];

export default function AdminBlogPosts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const load = () => {
    setLoading(true);
    base44.entities.BlogPost.list('-created_date', 100).then(setItems).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const openAdd = () => { setEditItem(null); setForm(EMPTY); setModalOpen(true); };
  const openEdit = (item) => { setEditItem(item); setForm({ ...EMPTY, ...item }); setModalOpen(true); };
  const set = (key) => (val) => setForm(f => ({ ...f, [key]: val }));

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editItem) await base44.entities.BlogPost.update(editItem.id, form);
      else await base44.entities.BlogPost.create(form);
      setModalOpen(false);
      load();
    } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await base44.entities.BlogPost.delete(deleteTarget.id);
      setDeleteTarget(null);
      load();
    } finally { setDeleting(false); }
  };

  return (
    <>
      <AdminTable columns={COLUMNS} rows={items} loading={loading} onAdd={openAdd} onEdit={openEdit} onDelete={setDeleteTarget} addLabel="افزودن مقاله" />
      {modalOpen && (
        <AdminModal title={editItem ? 'ویرایش مقاله' : 'مقاله جدید'} onClose={() => setModalOpen(false)} onSave={handleSave} saving={saving}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2"><Field label="عنوان *"><TextInput value={form.title} onChange={set('title')} /></Field></div>
            <Field label="Slug"><TextInput value={form.slug} onChange={set('slug')} dir="ltr" /></Field>
            <Field label="دسته‌بندی"><SelectInput value={form.category} onChange={set('category')} options={CATEGORY_OPTIONS} /></Field>
            <Field label="زمان مطالعه (دقیقه)"><NumberInput value={form.read_time} onChange={set('read_time')} /></Field>
            <Field label="تصویر کاور (URL)"><TextInput value={form.cover_image} onChange={set('cover_image')} dir="ltr" /></Field>
            <div className="md:col-span-2"><Field label="خلاصه"><TextareaInput value={form.excerpt} onChange={set('excerpt')} rows={2} /></Field></div>
            <div className="md:col-span-2"><Field label="متن کامل مقاله"><TextareaInput value={form.content} onChange={set('content')} rows={8} /></Field></div>
            <CheckboxInput label="مقاله ویژه" value={form.featured} onChange={set('featured')} />
          </div>
        </AdminModal>
      )}
      {deleteTarget && <DeleteConfirm label={deleteTarget.title} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} deleting={deleting} />}
    </>
  );
}