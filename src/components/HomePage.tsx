import { Card } from "./ui/card";
import { Database, MessageSquare, Upload, ArrowRight } from "lucide-react";
import exampleImage from 'figma:asset/e6a66a728c8b6d8cd430b93ce54467a68880912b.png';

interface HomePageProps {
  onNavigate: (view: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const mainFeatures = [
    {
      id: "dashboard",
      title: "Machine Data",
      description: "Monitor and analyze machine performance, efficiency, and maintenance data in real-time.",
      icon: Database,
      color: "bg-[#3B82F6]"
    },
    {
      id: "chat",
      title: "Chat",
      description: "Get instant AI-powered insights and recommendations for your manufacturing operations.",
      icon: MessageSquare,
      color: "bg-[#10B981]"
    },
    {
      id: "upload",
      title: "Upload Documents",
      description: "Upload and manage maintenance documents, manuals, and operational procedures.",
      icon: Upload,
      color: "bg-[#F59E0B]"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#3B82F6] rounded-full flex items-center justify-center">
              <Database className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-semibold text-gray-900">AI Platform</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your intelligent manufacturing maintenance companion. Monitor machines, get AI insights, and streamline operations.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mainFeatures.map((feature) => (
            <Card 
              key={feature.id}
              className="p-8 cursor-pointer transition-all duration-200 hover:shadow-xl hover:-translate-y-1 border border-gray-200 bg-white rounded-xl group"
              onClick={() => onNavigate(feature.id)}
            >
              <div className="text-center space-y-6">
                <div className={`w-20 h-20 ${feature.color} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-200`}>
                  <feature.icon className="h-10 w-10 text-white" />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
                
                <div className="flex items-center justify-center text-[#3B82F6] group-hover:text-[#2563EB] transition-colors">
                  <span className="text-sm font-medium mr-2">Get Started</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 text-center border border-gray-200 bg-white rounded-xl">
            <div className="text-2xl font-bold text-[#3B82F6] mb-2">3</div>
            <div className="text-sm text-gray-600">Active Machines</div>
          </Card>
          <Card className="p-6 text-center border border-gray-200 bg-white rounded-xl">
            <div className="text-2xl font-bold text-[#10B981] mb-2">94%</div>
            <div className="text-sm text-gray-600">Overall Efficiency</div>
          </Card>
          <Card className="p-6 text-center border border-gray-200 bg-white rounded-xl">
            <div className="text-2xl font-bold text-[#F59E0B] mb-2">2</div>
            <div className="text-sm text-gray-600">Pending Tasks</div>
          </Card>
          <Card className="p-6 text-center border border-gray-200 bg-white rounded-xl">
            <div className="text-2xl font-bold text-[#EF4444] mb-2">1</div>
            <div className="text-sm text-gray-600">Critical Alerts</div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-12 p-6 border border-gray-200 bg-white rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#EF4444] rounded-full"></div>
                <span className="text-sm text-gray-700">HyPET500 - High temperature alert</span>
              </div>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
                <span className="text-sm text-gray-700">Maintenance task completed on HyPET300</span>
              </div>
              <span className="text-xs text-gray-500">4 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#F59E0B] rounded-full"></div>
                <span className="text-sm text-gray-700">Weekly efficiency report generated</span>
              </div>
              <span className="text-xs text-gray-500">1 day ago</span>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}