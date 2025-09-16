import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, QrCode } from 'lucide-react';

const RailNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'QR Scanner', href: '#scanner' },
    { name: 'AI Chatbot', href: '#chatbot' },
    { name: 'AI Reminders', href: '#reminders' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border steel-shadow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <QrCode className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">Rail Pehchaan</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-primary smooth-transition font-medium"
              >
                {item.name}
              </a>
            ))}
            <div className="flex items-center space-x-2 ml-6 border-l border-border pl-6">
              <Button variant="outline" size="sm" asChild>
                <a href="/login">Sign In</a>
              </Button>
              <Button variant="railway" size="sm">
                Get Started
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-muted-foreground hover:text-primary smooth-transition font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <div className="pt-4 border-t border-border flex flex-col space-y-2">
                  <Button variant="outline" size="sm" className="w-fit" asChild>
                    <a href="/login">Sign In</a>
                  </Button>
                  <Button variant="railway" size="sm" className="w-fit">
                    Get Started
                  </Button>
                </div>
              </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default RailNavigation;