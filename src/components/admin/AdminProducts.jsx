import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import AdminTable from './AdminTable';
import AdminModal from './AdminModal';
import DeleteConfirm from './DeleteConfirm';
import { Field, TextInput, TextareaInput, SelectInput, CheckboxInput, TagsInput, NumberInput } from './AdminField';

const CATEGORY_OPTIONS = [
  { value: 'marble', label: 'مرمر' },
  { value: 'onyx', label: 'اونیکس' },
  { value: 'granite', label: 'گرانیت' },
  { value: 'travertine', label: 'تراورتن' },
  { value: 'luxury_slab', label: 'لاکشری اسلب' },
];

const EMPTY = { name: '', name_en: '', slug: '', category: '', description: '', origin: '', color: '', finish_types: [], available_sizes: [], applications: [], water_absorption: '', compressive_strength: '', density: '', processing: '', image: '', gallery: [], installed_image: '', price_range: '', in_stock: true, featured: false, sort_order: 0 };

const COLUMNS = [
  { key: 'name', label: 'نام' },
  { key: 'category', label: 'دسته‌بندی', render: v => CATEGORY_OPTIONS.find(o => o.value === v)?.label || v || '—' },
  { key: 'price_range', label: 'بازه قیمت' },
  { key: 'in_stock', label: 'موجودی', render: v => v ? <span className="text-green-600 text-xs font-medium">موجود</span> : <span className="text-red-500 text-xs">ناموجود</span> },
  { key: 'featured', label: 'ویژه', render: v => v ? <span className="text-xs" style={{ color: 'var(--bekri-accent)' }}>★ ویژه</span> : '—' },
];

export default function AdminProducts() {
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
    base44.entities.Product.list('-sort_order', 100).then(setItems).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const openAdd = () => { setEditItem(null); setForm(EMPTY); setModalOpen(true); };
  const openEdit = (item) => { setEditItem(item); setForm({ ...EMPTY, ...item }); setModalOpen(true); };
  const set = (key) => (val) => setForm(f => ({ ...f, [key]: val }));

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editItem) await base44.entities.Product.update(editItem.id, form);
      else await base44.entities.Product.create(form);
      setModalOpen(false);
      load();
    } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await base44.entities.Product.delete(deleteTarget.id);
      setDeleteTarget(null);
      load();
    } finally { setDeleting(false); }
  };

  return (
    <>
      <AdminTable columns={COLUMNS} rows={items} loading={loading} onAdd={openAdd} onEdit={openEdit} onDelete={setDeleteTarget} addLabel="افزودن محصول" />
      {modalOpen && (
        <AdminModal title={editItem ? 'ویرایش محصول' : 'محصول جدید'} onClose={() => setModalOpen(false)} onSave={handleSave} saving={saving}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="نام محصول *"><TextInput value={form.name} onChange={set('name')} /></Field>
            <Field label="English Name"><TextInput value={form.name_en} onChange={set('name_en')} dir="ltr" /></Field>
            <Field label="Slug"><TextInput value={form.slug} onChange={set('slug')} dir="ltr" /></Field>
            <Field label="دسته‌بندی"><SelectInput value={form.category} onChange={set('category')} options={CATEGORY_OPTIONS} /></Field>
            <Field label="منشا / محل استخراج"><TextInput value={form.origin} onChange={set('origin')} /></Field>
            <Field label="رنگ"><TextInput value={form.color} onChange={set('color')} /></Field>
            <Field label="بازه قیمت"><TextInput value={form.price_range} onChange={set('price_range')} /></Field>
            <Field label="ترتیب نمایش"><NumberInput value={form.sort_order} onChange={set('sort_order')} /></Field>
            <Field label="جذب آب"><TextInput value={form.water_absorption} onChange={set('water_absorption')} /></Field>
            <Field label="مقاومت فشاری"><TextInput value={form.compressive_strength} onChange={set('compressive_strength')} /></Field>
            <Field label="چگالی"><TextInput value={form.density} onChange={set('density')} /></Field>
            <Field label="فرآوری"><TextInput value={form.processing} onChange={set('processing')} /></Field>
            <div className="md:col-span-2"><Field label="توضیحات"><TextareaInput value={form.description} onChange={set('description')} rows={3} /></Field></div>
            <div className="md:col-span-2"><Field label="تصویر اصلی (URL)"><TextInput value={form.image} onChange={set('image')} dir="ltr" /></Field></div>
            <div className="md:col-span-2"><Field label="تصویر نصب شده (URL)"><TextInput value={form.installed_image} onChange={set('installed_image')} dir="ltr" /></Field></div>
            <div className="md:col-span-2"><Field label="نوع فرآوری (تگ‌ها)"><TagsInput value={form.finish_types} onChange={set('finish_types')} placeholder="مثلاً: صیقلی" /></Field></div>
            <div className="md:col-span-2"><Field label="ابعاد موجود (تگ‌ها)"><TagsInput value={form.available_sizes} onChange={set('available_sizes')} placeholder="مثلاً: ۶۰×۶۰" /></Field></div>
            <div className="md:col-span-2"><Field label="کاربردها (تگ‌ها)"><TagsInput value={form.applications} onChange={set('applications')} placeholder="مثلاً: کف" /></Field></div>
            <div className="md:col-span-2"><Field label="گالری (URL‌ها)"><TagsInput value={form.gallery} onChange={set('gallery')} placeholder="آدرس تصویر را وارد کنید" /></Field></div>
            <div className="flex gap-6 md:col-span-2">
              <CheckboxInput label="موجود در انبار" value={form.in_stock} onChange={set('in_stock')} />
              <CheckboxInput label="محصول ویژه" value={form.featured} onChange={set('featured')} />
            </div>
          </div>
        </AdminModal>
      )}
      {deleteTarget && <DeleteConfirm label={deleteTarget.name} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} deleting={deleting} />}
    </>
  );
}