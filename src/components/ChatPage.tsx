import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Send, Bot, User, Zap } from "lucide-react";
import { useState } from "react";

export function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai" as const,
      content: "Hello! I'm your AI assistant for manufacturing operations. How can I help you today?",
      timestamp: new Date(Date.now() - 60000)
    },
    {
      id: 2,
      type: "user" as const,
      content: "What's the status of HyPET500?",
      timestamp: new Date(Date.now() - 30000)
    },
    {
      id: 3,
      type: "ai" as const,
      content: "HyPET500 is currently showing critical status with high temperature alerts. The mold temperature has exceeded 25°C for the past 3 hours. I recommend immediate inspection of the cooling system and filter replacement.",
      timestamp: new Date()
    }
  ]);

  const quickPrompts = [
    "Show me machine efficiency trends",
    "What maintenance is due this week?",
    "Analyze downtime causes",
    "Generate performance report"
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      type: "user" as const,
      content: message,
      timestamp: new Date()
    };
    
    setMessages([...messages, newMessage]);
    setMessage("");
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: "ai" as const,
        content: "I understand your question. Let me analyze the data and provide you with relevant insights...",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#3B82F6] rounded-full flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">AI Chat Assistant</h1>
              <p className="text-sm text-gray-600">Get instant insights about your manufacturing operations</p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-6 h-[calc(100vh-120px)] flex flex-col">
        {/* Quick Prompts */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Quick prompts to get started:</h3>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="rounded-full border-gray-300 text-gray-700 hover:bg-gray-100"
                onClick={() => setMessage(prompt)}
              >
                <Zap className="h-3 w-3 mr-1" />
                {prompt}
              </Button>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <Card className="flex-1 flex flex-col mb-4 border border-gray-200 bg-white rounded-xl">
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.type === "ai" ? "bg-[#3B82F6]" : "bg-gray-100"
                }`}>
                  {msg.type === "ai" ? (
                    <Bot className="h-4 w-4 text-white" />
                  ) : (
                    <User className="h-4 w-4 text-gray-600" />
                  )}
                </div>
                <div className={`rounded-lg p-4 max-w-[80%] ${
                  msg.type === "ai" ? "bg-blue-50" : "bg-gray-100"
                }`}>
                  <p className="text-sm text-gray-900">{msg.content}</p>
                  <div className="text-xs text-gray-500 mt-2">
                    {msg.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <Input
                placeholder="Ask about machine performance, maintenance, or operations..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 rounded-lg border-gray-300"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
              />
              <Button 
                onClick={handleSendMessage}
                className="bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg px-4"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}