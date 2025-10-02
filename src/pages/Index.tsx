import React, { lazy, Suspense } from 'react';
import RailNavigation from '@/components/RailNavigation';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';

const QRScannerComponent = lazy(() => import('@/components/QRScanner'));
const AIChatbot = lazy(() => import('@/components/AIChatbot'));
const AIReminders = lazy(() => import('@/components/AIReminders'));
const IssueFlagging = lazy(() => import('@/components/IssueFlagging'));

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <RailNavigation />
      <main className="flex-1 ml-64 smooth-transition">
        <HeroSection />
        <FeaturesSection />
        <Suspense fallback={<div className="py-16 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
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
        </Suspense>
      </main>
    </div>
  );
};

export default Index;