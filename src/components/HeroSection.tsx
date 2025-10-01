import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import railwayHero from '@/assets/railway-hero.jpg';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={railwayHero} 
          alt="Railway tracks with AI technology overlay"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Rail <span className="hero-gradient bg-clip-text text-transparent">Pehchaan</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Revolutionary AI-powered QR code tracking system for Indian Railways. 
            Smart laser marking, real-time monitoring, and predictive maintenance for railway components.
          </p>

          {/* Features List */}
          <div className="flex flex-wrap justify-center gap-4 mb-10 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            {[
              'AI-Powered Analytics',
              'Real-time Tracking', 
              'Predictive Maintenance',
              'Laser QR Marking'
            ].map((feature, idx) => (
              <div key={feature} className="flex items-center gap-2 bg-card px-4 py-2 rounded-full steel-shadow hover-scale smooth-transition" style={{ animationDelay: `${0.4 + idx * 0.1}s` }}>
                <CheckCircle className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <Button variant="railway" size="lg" className="text-lg px-8 hover-lift">
              Start Tracking
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="steel" size="lg" className="text-lg px-8 hover-lift">
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.6s' }}>
            {[
              { value: '1M+', label: 'Components Tracked' },
              { value: '99.9%', label: 'Accuracy Rate' },
              { value: '24/7', label: 'Monitoring' },
              { value: '50+', label: 'Railway Stations' }
            ].map((stat, index) => (
              <div key={index} className="text-center hover-scale smooth-transition">
                <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;