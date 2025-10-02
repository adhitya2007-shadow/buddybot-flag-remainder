import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  AlertCircle, 
  CheckCircle,
  Clock,
  Wrench
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  category?: 'complaint' | 'info' | 'resolved';
}

const AIChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your Rail Pehchaan AI assistant. I can help you with component complaints, technical issues, and system queries. How can I assist you today?',
      timestamp: new Date(),
      category: 'info'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Sample complaint categories
  const quickActions = [
    'Component defect report',
    'QR code scanning issue',
    'Maintenance request',
    'System error report'
  ];

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    let response = '';
    let category: 'complaint' | 'info' | 'resolved' = 'info';

    if (lowerMessage.includes('defect') || lowerMessage.includes('damage') || lowerMessage.includes('broken')) {
      response = 'I understand you\'re reporting a component defect. I\'ve logged your complaint with ID: #RC' + Math.floor(Math.random() * 10000) + '. Our maintenance team will inspect the component within 24 hours. Please share the QR code or location details.';
      category = 'complaint';
    } else if (lowerMessage.includes('qr') || lowerMessage.includes('scan')) {
      response = 'For QR code scanning issues: 1) Ensure good lighting, 2) Clean the QR code surface, 3) Update the mobile app. If issues persist, I can generate a backup tracking code for you.';
      category = 'info';
    } else if (lowerMessage.includes('maintenance')) {
      response = 'Maintenance request received. Based on AI analysis, I recommend scheduling maintenance within 7 days. I\'ll notify the maintenance team and provide you with a service ticket number.';
      category = 'resolved';
    } else if (lowerMessage.includes('error') || lowerMessage.includes('problem')) {
      response = 'System error reported. I\'ve initiated diagnostic procedures and logged the issue. Our technical team will investigate and provide a fix within 2-4 hours. Error ID: #ERR' + Math.floor(Math.random() * 1000);
      category = 'complaint';
    } else {
      response = 'Thank you for your query. I\'m analyzing your request and will connect you with the appropriate department. Is this related to component tracking, maintenance, or technical support?';
      category = 'info';
    }

    return {
      id: Date.now().toString(),
      type: 'bot',
      content: response,
      timestamp: new Date(),
      category
    };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      
      if (botResponse.category === 'complaint') {
        toast({
          title: "Complaint Logged",
          description: "Your complaint has been registered and assigned to our team.",
        });
      }
    }, 1500);
  };

  const handleQuickAction = (action: string) => {
    setInputValue(action);
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'complaint':
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <MessageCircle className="w-4 h-4 text-primary" />;
    }
  };

  return (
    <section id="chatbot" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="secondary" className="mb-4">
            AI Support
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Intelligent Complaint System
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our AI chatbot handles complaints, technical issues, and support queries 
            24/7 with intelligent routing and automated resolution.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="h-[600px] flex flex-col railway-shadow animate-slide-up">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary" />
                Rail Pehchaan AI Assistant
                <Badge variant="outline" className="ml-auto">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Online
                </Badge>
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages Area */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start gap-3 max-w-[80%] ${
                        message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}>
                        <div className={`p-2 rounded-full ${
                          message.type === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-secondary text-secondary-foreground'
                        }`}>
                          {message.type === 'user' ? 
                            <User className="w-4 h-4" /> : 
                            <Bot className="w-4 h-4" />
                          }
                        </div>
                        
                        <div className={`p-3 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-card border steel-shadow'
                        }`}>
                          <div className="flex items-start gap-2 mb-1">
                            {message.type === 'bot' && getCategoryIcon(message.category)}
                            <p className="text-sm">{message.content}</p>
                          </div>
                          <p className="text-xs opacity-70">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-secondary text-secondary-foreground">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div className="bg-card border p-3 rounded-lg steel-shadow">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Quick Actions */}
              <div className="p-4 border-t bg-muted/30">
                <p className="text-sm text-muted-foreground mb-2">Quick actions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action) => (
                    <Button
                      key={action}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction(action)}
                      className="text-xs"
                    >
                      {action}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your complaint or question..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    variant="railway"
                    size="icon"
                    disabled={!inputValue.trim() || isTyping}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AIChatbot;