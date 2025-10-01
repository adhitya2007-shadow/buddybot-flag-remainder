import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Train, 
  Shield, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      toast.success('Login successful!');
      navigate('/dashboard');
    } else {
      toast.error('Please enter email and password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Train className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Rail Pehchaan</h1>
          <p className="text-muted-foreground">Access your railway management dashboard</p>
        </div>

        {/* Supabase Integration Notice */}
        <Card className="mb-6 bg-blue-500/10 border-blue-500/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="space-y-2">
                <p className="text-sm font-medium text-blue-600">Authentication Setup Required</p>
                <p className="text-xs text-blue-600/80">
                  To enable login functionality, please connect your Lovable project to Supabase using our native integration. 
                  Click the green Supabase button in the top right to get started.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Login Form */}
        <Card className="steel-shadow">
          <form onSubmit={handleLogin}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Secure Login
            </CardTitle>
            <CardDescription>
              Enter your credentials to access the railway management system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="engineer@railway.gov.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-4"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your secure password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-4 pr-12"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Login Button */}
            <Button 
              type="submit"
              className="w-full" 
              variant="railway" 
              size="lg"
              disabled={!email || !password}
            >
              Sign In to Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <Separator />

            {/* Role-based Access */}
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground text-center">Access Levels</p>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { role: 'Station Master', badge: 'Station' },
                  { role: 'Maintenance Engineer', badge: 'Technical' },
                  { role: 'Quality Inspector', badge: 'Quality' },
                  { role: 'System Administrator', badge: 'Admin' }
                ].map((access) => (
                  <div key={access.role} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm font-medium">{access.role}</span>
                    <Badge variant="outline" className="text-xs">
                      {access.badge}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Features */}
            <div className="pt-4 border-t border-border">
              <p className="text-xs text-center text-muted-foreground mb-3">Security Features</p>
              <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span>End-to-end encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span>Multi-factor auth</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span>Session management</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span>Audit logging</span>
                </div>
              </div>
            </div>
          </CardContent>
          </form>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Rail Pehchaan © 2024 • Secure Railway Management System
        </p>
      </div>
    </div>
  );
};

export default LoginPage;