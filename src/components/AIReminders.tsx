import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  Calendar, 
  AlertTriangle, 
  Clock, 
  CheckCircle,
  Wrench,
  TrendingUp,
  MapPin,
  QrCode
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Component {
  id: string;
  name: string;
  location: string;
  installDate: Date;
  expectedLife: number; // in months
  currentCondition: number; // percentage
  lastMaintenance: Date;
  nextMaintenance: Date;
  priority: 'critical' | 'high' | 'medium' | 'low';
  qrCode: string;
  status: 'active' | 'warning' | 'critical';
}

// Helper functions
const getStatusColor = (status: string) => {
  switch (status) {
    case 'critical':
      return 'bg-destructive';
    case 'warning':
      return 'bg-yellow-500';
    default:
      return 'bg-green-500';
  }
};

const getPriorityVariant = (priority: string) => {
  switch (priority) {
    case 'critical':
      return 'destructive' as const;
    case 'high':
      return 'destructive' as const;
    case 'medium':
      return 'secondary' as const;
    default:
      return 'outline' as const;
  }
};

const getDaysUntilMaintenance = (nextMaintenance: Date) => {
  const today = new Date();
  const diffTime = nextMaintenance.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const AIReminders = () => {
  const [components, setComponents] = useState<Component[]>([]);
  const [activeTab, setActiveTab] = useState('upcoming');
  const { toast } = useToast();

  // Generate sample data
  useEffect(() => {
    const sampleComponents: Component[] = [
      {
        id: '1',
        name: 'Elastic Rail Clip - EC57',
        location: 'Delhi Junction - Track 3, KM 45.2',
        installDate: new Date('2023-03-15'),
        expectedLife: 24,
        currentCondition: 75,
        lastMaintenance: new Date('2024-08-15'),
        nextMaintenance: new Date('2024-09-20'),
        priority: 'critical',
        qrCode: 'RC-EC57-2023-001',
        status: 'warning'
      },
      {
        id: '2',
        name: 'Rail Pad - RP40',
        location: 'Mumbai Central - Track 1, KM 12.8',
        installDate: new Date('2023-06-10'),
        expectedLife: 18,
        currentCondition: 45,
        lastMaintenance: new Date('2024-07-20'),
        nextMaintenance: new Date('2024-09-18'),
        priority: 'critical',
        qrCode: 'RC-RP40-2023-002',
        status: 'critical'
      },
      {
        id: '3',
        name: 'Concrete Sleeper - CS80',
        location: 'Chennai Express - Track 2, KM 78.5',
        installDate: new Date('2022-11-20'),
        expectedLife: 36,
        currentCondition: 88,
        lastMaintenance: new Date('2024-08-01'),
        nextMaintenance: new Date('2024-10-15'),
        priority: 'low',
        qrCode: 'RC-CS80-2022-003',
        status: 'active'
      },
      {
        id: '4',
        name: 'Rail Liner - RL25',
        location: 'Bangalore Metro - Track 4, KM 23.1',
        installDate: new Date('2023-01-05'),
        expectedLife: 12,
        currentCondition: 30,
        lastMaintenance: new Date('2024-06-10'),
        nextMaintenance: new Date('2024-09-16'),
        priority: 'critical',
        qrCode: 'RC-RL25-2023-004',
        status: 'critical'
      }
    ];
    setComponents(sampleComponents);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'bg-destructive';
      case 'warning':
        return 'bg-yellow-500';
      default:
        return 'bg-green-500';
    }
  };

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'destructive' as const;
      case 'high':
        return 'destructive' as const;
      case 'medium':
        return 'secondary' as const;
      default:
        return 'outline' as const;
    }
  };

  const getDaysUntilMaintenance = (nextMaintenance: Date) => {
    const today = new Date();
    const diffTime = nextMaintenance.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleSetReminder = (component: Component) => {
    toast({
      title: "Reminder Set",
      description: `You'll be notified about ${component.name} maintenance.`,
    });
  };

  const upcomingComponents = components.filter(c => getDaysUntilMaintenance(c.nextMaintenance) <= 30);
  const criticalComponents = components.filter(c => c.status === 'critical');
  const allComponents = components.sort((a, b) => getDaysUntilMaintenance(a.nextMaintenance) - getDaysUntilMaintenance(b.nextMaintenance));

  return (
    <section id="reminders" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="secondary" className="mb-4">
            AI Reminders
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Predictive Maintenance Alerts
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            AI-powered system monitors component lifecycle and sends intelligent 
            reminders for maintenance, replacement, and inspections.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Total Components', value: components.length.toString(), icon: QrCode, color: 'text-primary' },
              { label: 'Upcoming Maintenance', value: upcomingComponents.length.toString(), icon: Calendar, color: 'text-yellow-500' },
              { label: 'Critical Alerts', value: criticalComponents.length.toString(), icon: AlertTriangle, color: 'text-destructive' },
              { label: 'This Month', value: components.filter(c => getDaysUntilMaintenance(c.nextMaintenance) <= 30).length.toString(), icon: Clock, color: 'text-accent' }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="steel-shadow animate-slide-up hover-lift" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                      <IconComponent className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Tabs for different views */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upcoming">Upcoming (30 days)</TabsTrigger>
              <TabsTrigger value="critical">Critical Alerts</TabsTrigger>
              <TabsTrigger value="all">All Components</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              <div className="grid gap-4">
                {upcomingComponents.map((component) => (
                  <ComponentCard key={component.id} component={component} onSetReminder={handleSetReminder} />
                ))}
                {upcomingComponents.length === 0 && (
                  <Card className="p-8 text-center">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">All Clear!</h3>
                    <p className="text-muted-foreground">No maintenance required in the next 30 days.</p>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="critical" className="space-y-4">
              <div className="grid gap-4">
                {criticalComponents.map((component) => (
                  <ComponentCard key={component.id} component={component} onSetReminder={handleSetReminder} />
                ))}
                {criticalComponents.length === 0 && (
                  <Card className="p-8 text-center">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Critical Issues!</h3>
                    <p className="text-muted-foreground">All components are in acceptable condition.</p>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="all" className="space-y-4">
              <div className="grid gap-4">
                {allComponents.map((component) => (
                  <ComponentCard key={component.id} component={component} onSetReminder={handleSetReminder} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

// Component Card Component
const ComponentCard = ({ 
  component, 
  onSetReminder 
}: { 
  component: Component; 
  onSetReminder: (component: Component) => void; 
}) => {
  const daysUntil = getDaysUntilMaintenance(component.nextMaintenance);
  const isOverdue = daysUntil < 0;
  const isUrgent = daysUntil <= 7;

  return (
    <Card className="railway-shadow hover:steel-shadow smooth-transition hover-lift animate-fade-in">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <CardTitle className="text-lg">{component.name}</CardTitle>
              <Badge variant={getPriorityVariant(component.priority)}>
                {component.priority.toUpperCase()}
              </Badge>
              <div className={`w-3 h-3 rounded-full ${getStatusColor(component.status)}`}></div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{component.location}</span>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            {component.qrCode}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Condition Progress */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Condition</span>
              <span>{component.currentCondition}%</span>
            </div>
            <Progress value={component.currentCondition} className="h-2" />
          </div>

          {/* Maintenance Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-foreground">Next Maintenance:</p>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className={isOverdue ? 'text-destructive font-medium' : 'text-muted-foreground'}>
                  {component.nextMaintenance.toLocaleDateString()}
                </span>
              </div>
              {isOverdue ? (
                <Badge variant="destructive" className="text-xs mt-1">
                  {Math.abs(daysUntil)} days overdue
                </Badge>
              ) : isUrgent ? (
                <Badge variant="secondary" className="text-xs mt-1 bg-yellow-500 text-white">
                  {daysUntil} days remaining
                </Badge>
              ) : (
                <span className="text-xs text-muted-foreground">
                  {daysUntil} days remaining
                </span>
              )}
            </div>
            
            <div>
              <p className="font-medium text-foreground">Last Maintenance:</p>
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {component.lastMaintenance.toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button 
              variant="railway" 
              size="sm"
              onClick={() => onSetReminder(component)}
            >
              <Bell className="w-4 h-4 mr-2" />
              Set Reminder
            </Button>
            <Button variant="outline" size="sm">
              <QrCode className="w-4 h-4 mr-2" />
              View QR
            </Button>
            <Button variant="ghost" size="sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              History
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIReminders;