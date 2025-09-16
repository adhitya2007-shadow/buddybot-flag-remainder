import React from 'react';
import RailNavigation from '@/components/RailNavigation';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import AIChatbot from '@/components/AIChatbot';
import AIReminders from '@/components/AIReminders';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <RailNavigation />
      <main>
        <HeroSection />
        <FeaturesSection />
        <AIChatbot />
        <AIReminders />
      </main>
    </div>
  );
};

export default Index;