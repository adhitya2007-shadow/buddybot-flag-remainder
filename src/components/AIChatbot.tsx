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
import { supabase } from '@/integrations/supabase/client';

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
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = async (userMessage: string): Promise<string> => {
    try {
      const conversationHistory = messages.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));

      conversationHistory.push({
        role: 'user',
        content: userMessage
      });

      const { data, error } = await supabase.functions.invoke('rail-chat', {
        body: { messages: conversationHistory }
      });

      if (error) {
        console.error('AI function error:', error);
        throw error;
      }

      if (data?.error) {
        if (data.error.includes('Rate limit')) {
          toast({
            title: "Rate Limit Reached",
            description: "Too many requests. Please wait a moment and try again.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Service Error",
            description: data.error,
            variant: "destructive",
          });
        }
        return "I'm experiencing high demand right now. Please try again in a moment.";
      }

      return data.response || "I apologize, I couldn't generate a response.";
    } catch (error) {
      console.error('Error calling AI:', error);
      toast({
        title: "Connection Error",
        description: "Failed to connect to AI service. Please try again.",
        variant: "destructive",
      });
      return "I'm having trouble connecting right now. Please try again.";
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    const currentInput = inputValue;
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const aiResponse = await getAIResponse(currentInput);
      
      const botMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content: aiResponse,
        timestamp: new Date(),
        category: 'info'
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
    } finally {
      setIsTyping(false);
    }
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

            <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
              {/* Messages Area */}
              <ScrollArea className="flex-1 p-4 h-full">
                <div className="space-y-4 pr-4">
                  {messages.map((message, index) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className={`flex items-start gap-3 max-w-[80%] ${
                        message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}>
                        <div className={`p-2 rounded-full flex-shrink-0 ${
                          message.type === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-secondary text-secondary-foreground'
                        }`}>
                          {message.type === 'user' ? 
                            <User className="w-4 h-4" /> : 
                            <Bot className="w-4 h-4" />
                          }
                        </div>
                        
                        <div className={`p-3 rounded-lg break-words ${
                          message.type === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-card border steel-shadow'
                        }`}>
                          <div className="flex items-start gap-2 mb-1">
                            {message.type === 'bot' && getCategoryIcon(message.category)}
                            <p className="text-sm break-words whitespace-pre-wrap">{message.content}</p>
                          </div>
                          <p className="text-xs opacity-70">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start animate-fade-in">
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
              <div className="p-4 border-t flex-shrink-0">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your complaint or question..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="flex-1 smooth-transition"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    variant="railway"
                    size="icon"
                    disabled={!inputValue.trim() || isTyping}
                    className="smooth-transition hover-scale"
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