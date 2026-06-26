import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import AdminTable from './AdminTable';
import AdminModal from './AdminModal';
import DeleteConfirm from './DeleteConfirm';
import { Field, TextInput, TextareaInput, CheckboxInput, TagsInput } from './AdminField';

const EMPTY = { title: '', slug: '', location: '', architect: '', area: '', stones_used: [], description: '', hero_image: '', gallery: [], year: '', featured: false };

const COLUMNS = [
  { key: 'title', label: 'عنوان' },
  { key: 'location', label: 'موقعیت' },
  { key: 'architect', label: 'معمار' },
  { key: 'year', label: 'سال' },
  { key: 'featured', label: 'ویژه', render: v => v ? <span className="text-xs" style={{ color: 'var(--bekri-accent)' }}>★ ویژه</span> : '—' },
];

export default function AdminProjects() {
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
    base44.entities.Project.list('-created_date', 100).then(setItems).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const openAdd = () => { setEditItem(null); setForm(EMPTY); setModalOpen(true); };
  const openEdit = (item) => { setEditItem(item); setForm({ ...EMPTY, ...item }); setModalOpen(true); };
  const set = (key) => (val) => setForm(f => ({ ...f, [key]: val }));

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editItem) await base44.entities.Project.update(editItem.id, form);
      else await base44.entities.Project.create(form);
      setModalOpen(false);
      load();
    } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await base44.entities.Project.delete(deleteTarget.id);
      setDeleteTarget(null);
      load();
    } finally { setDeleting(false); }
  };

  return (
    <>
      <AdminTable columns={COLUMNS} rows={items} loading={loading} onAdd={openAdd} onEdit={openEdit} onDelete={setDeleteTarget} addLabel="افزودن پروژه" />
      {modalOpen && (
        <AdminModal title={editItem ? 'ویرایش پروژه' : 'پروژه جدید'} onClose={() => setModalOpen(false)} onSave={handleSave} saving={saving}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="عنوان پروژه *"><TextInput value={form.title} onChange={set('title')} /></Field>
            <Field label="Slug"><TextInput value={form.slug} onChange={set('slug')} dir="ltr" /></Field>
            <Field label="موقعیت"><TextInput value={form.location} onChange={set('location')} /></Field>
            <Field label="معمار"><TextInput value={form.architect} onChange={set('architect')} /></Field>
            <Field label="متراژ"><TextInput value={form.area} onChange={set('area')} /></Field>
            <Field label="سال"><TextInput value={form.year} onChange={set('year')} /></Field>
            <div className="md:col-span-2"><Field label="توضیحات"><TextareaInput value={form.description} onChange={set('description')} rows={3} /></Field></div>
            <div className="md:col-span-2"><Field label="تصویر اصلی (URL)"><TextInput value={form.hero_image} onChange={set('hero_image')} dir="ltr" /></Field></div>
            <div className="md:col-span-2"><Field label="سنگ‌های استفاده شده"><TagsInput value={form.stones_used} onChange={set('stones_used')} placeholder="نام سنگ" /></Field></div>
            <div className="md:col-span-2"><Field label="گالری (URL‌ها)"><TagsInput value={form.gallery} onChange={set('gallery')} placeholder="آدرس تصویر" /></Field></div>
            <CheckboxInput label="پروژه ویژه" value={form.featured} onChange={set('featured')} />
          </div>
        </AdminModal>
      )}
      {deleteTarget && <DeleteConfirm label={deleteTarget.title} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} deleting={deleting} />}
    </>
  );
}