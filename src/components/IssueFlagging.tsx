import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Flag, Database, CheckCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const IssueFlagging = () => {
  const { toast } = useToast();
  const [componentId, setComponentId] = useState('');
  const [issueType, setIssueType] = useState('');
  const [severity, setSeverity] = useState('');
  const [description, setDescription] = useState('');
  const [flaggedIssues, setFlaggedIssues] = useState<Array<{
    id: string;
    componentId: string;
    type: string;
    severity: string;
    description: string;
    timestamp: string;
    status: string;
  }>>([]);

  const handleFlagIssue = () => {
    if (!componentId || !issueType || !severity || !description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before flagging the issue.",
        variant: "destructive",
      });
      return;
    }

    const newIssue = {
      id: `ISS-${Date.now()}`,
      componentId,
      type: issueType,
      severity,
      description,
      timestamp: new Date().toLocaleString(),
      status: 'Flagged'
    };

    setFlaggedIssues([newIssue, ...flaggedIssues]);

    toast({
      title: "Issue Flagged Successfully",
      description: `Component ${componentId} issue has been logged to TMS database.`,
    });

    // Reset form
    setComponentId('');
    setIssueType('');
    setSeverity('');
    setDescription('');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-destructive text-destructive-foreground';
      case 'High': return 'bg-orange-500 text-white';
      case 'Medium': return 'bg-yellow-500 text-black';
      case 'Low': return 'bg-green-500 text-white';
      default: return 'bg-muted';
    }
  };

  return (
    <section id="flag-issue" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-destructive/10 rounded-full mb-4">
            <Flag className="w-8 h-8 text-destructive" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Issue Flagging System</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Field engineers can immediately flag component failures and log them to TMS database
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Flag Issue Form */}
          <Card className="steel-shadow animate-slide-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Flag Component Failure
              </CardTitle>
              <CardDescription>
                Report component issues directly to TMS database
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="component-id">Component ID / QR Code</Label>
                <Input
                  id="component-id"
                  placeholder="Enter component ID (e.g., RC-2024-001)"
                  value={componentId}
                  onChange={(e) => setComponentId(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="issue-type">Issue Type</Label>
                <Select value={issueType} onValueChange={setIssueType}>
                  <SelectTrigger id="issue-type">
                    <SelectValue placeholder="Select issue type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Crack">Crack/Fracture</SelectItem>
                    <SelectItem value="Wear">Excessive Wear</SelectItem>
                    <SelectItem value="Corrosion">Corrosion</SelectItem>
                    <SelectItem value="Deformation">Deformation</SelectItem>
                    <SelectItem value="Missing">Missing Component</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="severity">Severity Level</Label>
                <Select value={severity} onValueChange={setSeverity}>
                  <SelectTrigger id="severity">
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Critical">Critical - Immediate Action</SelectItem>
                    <SelectItem value="High">High - Urgent</SelectItem>
                    <SelectItem value="Medium">Medium - Schedule Soon</SelectItem>
                    <SelectItem value="Low">Low - Routine Check</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Issue Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide detailed description of the component failure..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>

              <Button 
                onClick={handleFlagIssue} 
                className="w-full" 
                variant="destructive"
                size="lg"
              >
                <Flag className="w-4 h-4 mr-2" />
                Flag Issue to TMS Database
              </Button>
            </CardContent>
          </Card>

          {/* Flagged Issues List */}
          <Card className="steel-shadow animate-slide-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Recent Flagged Issues
              </CardTitle>
              <CardDescription>
                Issues logged in current session
              </CardDescription>
            </CardHeader>
            <CardContent>
              {flaggedIssues.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No issues flagged yet</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[500px] overflow-y-auto">
                  {flaggedIssues.map((issue) => (
                    <div 
                      key={issue.id} 
                      className="p-4 border border-border rounded-lg hover:bg-muted/50 smooth-transition"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{issue.componentId}</h4>
                          <p className="text-sm text-muted-foreground">{issue.type}</p>
                        </div>
                        <Badge className={getSeverityColor(issue.severity)}>
                          {issue.severity}
                        </Badge>
                      </div>
                      <p className="text-sm mb-2">{issue.description}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{issue.timestamp}</span>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>{issue.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* TMS Integration Info */}
        <Card className="mt-8 bg-blue-500/10 border-blue-500/20 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Database className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-600 mb-1">TMS Database Integration</p>
                <p className="text-xs text-blue-600/80">
                  All flagged issues are automatically synchronized with the Track Management System (TMS) database 
                  for real-time monitoring and maintenance scheduling.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default IssueFlagging;
