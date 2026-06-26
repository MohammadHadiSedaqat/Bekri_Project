import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShieldAlert, Loader2 } from 'lucide-react';
import AdminProducts from '@/components/admin/AdminProducts';
import AdminProjects from '@/components/admin/AdminProjects';
import AdminBlogPosts from '@/components/admin/AdminBlogPosts';
import AdminInquiries from '@/components/admin/AdminInquiries';

export default function Admin() {
  const { user, isAuthenticated, isLoadingAuth } = useAuth();

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bekri-bg)' }}>
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--bekri-accent)' }} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.is_admin) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bekri-bg)' }}>
        <div className="text-center p-10 rounded-xl border" style={{ background: 'var(--bekri-card)', borderColor: 'var(--bekri-border)' }}>
          <ShieldAlert className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--bekri-accent)' }} />
          <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--bekri-text)' }}>دسترسی مجاز نیست</h2>
          <p className="text-sm" style={{ color: 'var(--bekri-text-secondary)' }}>شما دسترسی به پنل مدیریت را ندارید.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 md:pt-32 pb-16 px-4 md:px-8" style={{ background: 'var(--bekri-bg)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--bekri-text)' }}>پنل مدیریت</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--bekri-text-secondary)' }}>مدیریت محتوا و داده‌های سایت</p>
        </div>

        <Tabs defaultValue="products" dir="rtl">
          <TabsList className="mb-6 flex gap-1 p-1 rounded-xl w-full md:w-auto" style={{ background: 'var(--bekri-surface)' }}>
            <TabsTrigger value="products" className="flex-1 md:flex-none text-xs md:text-sm">محصولات</TabsTrigger>
            <TabsTrigger value="projects" className="flex-1 md:flex-none text-xs md:text-sm">پروژه‌ها</TabsTrigger>
            <TabsTrigger value="blog" className="flex-1 md:flex-none text-xs md:text-sm">مجله</TabsTrigger>
            <TabsTrigger value="inquiries" className="flex-1 md:flex-none text-xs md:text-sm">استعلام‌ها</TabsTrigger>
          </TabsList>
          <TabsContent value="products"><AdminProducts /></TabsContent>
          <TabsContent value="projects"><AdminProjects /></TabsContent>
          <TabsContent value="blog"><AdminBlogPosts /></TabsContent>
          <TabsContent value="inquiries"><AdminInquiries /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}