import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Home, Zap, QrCode, MessageSquare, Bell, Flag, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const RailNavigation = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'Features', href: '#features', icon: Zap },
    { name: 'QR Scanner', href: '#scanner', icon: QrCode },
    { name: 'Flag Issue', href: '#flag-issue', icon: Flag },
    { name: 'AI Chatbot', href: '#chatbot', icon: MessageSquare },
    { name: 'AI Reminders', href: '#reminders', icon: Bell },
  ];

  const isActive = (href: string) => {
    return location.hash === href || window.location.hash === href;
  };

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen bg-card border-r border-border steel-shadow z-50 smooth-transition ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center space-x-2 animate-fade-in">
                <QrCode className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-foreground">Rail Pehchaan</span>
              </div>
            )}
            {isCollapsed && (
              <QrCode className="h-8 w-8 text-primary mx-auto animate-fade-in" />
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item, index) => (
            <a
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-3 rounded-lg smooth-transition hover-scale ${
                isActive(item.href)
                  ? 'bg-primary text-primary-foreground railway-shadow'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <item.icon className={`h-5 w-5 ${isCollapsed ? 'mx-auto' : ''}`} />
              {!isCollapsed && (
                <span className="font-medium animate-fade-in">{item.name}</span>
              )}
            </a>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-border space-y-2">
          {!isCollapsed && (
            <Link to="/" className="block animate-fade-in">
              <Button variant="outline" size="sm" className="w-full">
                Logout
              </Button>
            </Link>
          )}
          {!isCollapsed && (
            <Button variant="railway" size="sm" className="w-full animate-fade-in">
              Get Started
            </Button>
          )}
          
          {/* Collapse Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-muted smooth-transition hover-scale"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default RailNavigation;