import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Send, X, Bot, User } from "lucide-react";
import { useState } from "react";

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMachine?: string;
}

export function AIAssistant({ isOpen, onClose, selectedMachine }: AIAssistantProps) {
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed right-6 top-20 bottom-6 w-96 z-50">
      <Card className="h-full flex flex-col shadow-2xl border border-gray-200 rounded-xl bg-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-[#3B82F6]" />
            <h3 className="font-semibold text-gray-900">AI Assistant</h3>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="rounded-lg"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {/* User Message */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="h-4 w-4 text-gray-600" />
            </div>
            <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
              <p className="text-sm text-gray-900">Why is OEE down this week?</p>
            </div>
          </div>

          {/* AI Response */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-[#3B82F6] rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="bg-blue-50 rounded-lg p-3 max-w-[80%] space-y-3">
              <p className="text-sm text-gray-900">
                Availability dropped 20% due to cooling issues on HyPET500. Mold temp exceeded 25°C for 3 hours. 
                Recommended action: Inspect chiller and replace filter.
              </p>
              <Button 
                size="sm" 
                className="bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg"
              >
                Draft Maintenance Task
              </Button>
            </div>
          </div>

          {selectedMachine && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#3B82F6] rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-blue-50 rounded-lg p-3 max-w-[80%]">
                <p className="text-sm text-gray-900">
                  I've pulled up the data for <strong>{selectedMachine}</strong>. What would you like to know about this machine?
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <Input
              placeholder="Ask about machine performance..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 rounded-lg border-gray-300"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  setMessage("");
                }
              }}
            />
            <Button 
              size="sm" 
              className="bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg px-3"
              onClick={() => setMessage("")}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}