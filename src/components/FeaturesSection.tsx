import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  QrCode, 
  Brain, 
  Shield, 
  Smartphone, 
  Zap, 
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: QrCode,
      title: 'Laser QR Marking',
      description: 'Durable laser-engraved QR codes on railway components for permanent identification and tracking.',
      badge: 'Hardware',
      benefits: ['Permanent marking', 'Weather resistant', 'Unique identification']
    },
    {
      icon: Brain,
      title: 'AI Analytics',
      description: 'Advanced machine learning algorithms for quality control, anomaly detection, and performance analysis.',
      badge: 'AI/ML',
      benefits: ['Predictive insights', 'Anomaly detection', 'Quality control']
    },
    {
      icon: Smartphone,
      title: 'Mobile Scanning',
      description: 'Easy-to-use mobile application for scanning components and accessing complete lifecycle data.',
      badge: 'Mobile',
      benefits: ['Real-time scanning', 'Offline capability', 'User-friendly interface']
    },
    {
      icon: Shield,
      title: 'Complete Traceability',
      description: 'Full tracking from manufacturing to deployment with detailed history and maintenance records.',
      badge: 'Security',
      benefits: ['Full lifecycle tracking', 'Maintenance history', 'Accountability']
    },
    {
      icon: Zap,
      title: 'Real-time Monitoring',
      description: 'Live status updates and instant notifications for critical component conditions.',
      badge: 'IoT',
      benefits: ['Live updates', 'Instant alerts', '24/7 monitoring']
    },
    {
      icon: AlertTriangle,
      title: 'Predictive Maintenance',
      description: 'AI-powered predictions for component maintenance needs and failure prevention.',
      badge: 'Predictive',
      benefits: ['Prevent failures', 'Optimize maintenance', 'Reduce costs']
    }
  ];

  return (
    <section id="features" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="secondary" className="mb-4">
            Core Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Revolutionary Railway Technology
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive AI-powered solution for tracking, monitoring, and maintaining 
            railway components with unprecedented accuracy and reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="group hover:railway-shadow smooth-transition border-border hover:border-primary/20 hover-lift animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 smooth-transition">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary smooth-transition">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Integration Section */}
        <div className="mt-20 text-center animate-fade-in">
          <h3 className="text-2xl md:text-3xl font-bold mb-8">
            Seamless Integration
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { title: 'UDM Portal', desc: 'Direct integration with Unified Data Management system', icon: Clock },
              { title: 'TMS System', desc: 'Compatible with Track Management System protocols', icon: Shield },
              { title: 'Offline Mode', desc: 'Works without internet connectivity in remote areas', icon: Zap }
            ].map((integration, index) => {
              const IconComponent = integration.icon;
              return (
                <div key={index} className="text-center animate-slide-up hover-scale" style={{ animationDelay: `${index * 0.15}s` }}>
                  <div className="inline-flex p-4 bg-accent/10 rounded-full mb-4 smooth-transition">
                    <IconComponent className="w-8 h-8 text-accent" />
                  </div>
                  <h4 className="font-semibold mb-2">{integration.title}</h4>
                  <p className="text-sm text-muted-foreground">{integration.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;