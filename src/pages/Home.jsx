import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import TrustBar from '@/components/home/TrustBar';
import CollectionShowcase from '@/components/home/CollectionShowcase';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import ProjectsPreview from '@/components/home/ProjectsPreview';
import MagazinePreview from '@/components/home/MagazinePreview';
import ConsultationCTA from '@/components/home/ConsultationCTA';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <TrustBar />
      <CollectionShowcase />
      <FeaturedProducts />
      <ProjectsPreview />
      <MagazinePreview />
      <ConsultationCTA />
    </div>
  );
}