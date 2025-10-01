import React from 'react';
import RailNavigation from '@/components/RailNavigation';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import QRScannerComponent from '@/components/QRScanner';
import AIChatbot from '@/components/AIChatbot';
import AIReminders from '@/components/AIReminders';
import IssueFlagging from '@/components/IssueFlagging';

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <RailNavigation />
      <main className="flex-1 ml-64 smooth-transition">
        <HeroSection />
        <FeaturesSection />
        <section id="scanner" className="scroll-mt-16">
          <QRScannerComponent />
        </section>
        <section id="chatbot" className="scroll-mt-16">
          <AIChatbot />
        </section>
        <section id="reminders" className="scroll-mt-16">
          <AIReminders />
        </section>
        <section id="flag-issue" className="scroll-mt-16">
          <IssueFlagging />
        </section>
      </main>
    </div>
  );
};

export default Index;