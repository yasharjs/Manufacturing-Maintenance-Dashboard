import { Badge } from "./ui/badge";
import { Activity } from "lucide-react";

interface HeaderProps {
  plantStatus: 'operational' | 'warning' | 'critical';
}

export function Header({ plantStatus }: HeaderProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-[#10B981] text-white';
      case 'warning': return 'bg-[#F59E0B] text-white';
      case 'critical': return 'bg-[#EF4444] text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return '✅';
      case 'warning': return '⚠️';
      case 'critical': return '❌';
      default: return '●';
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Activity className="h-8 w-8 text-[#3B82F6]" />
            <div>
              <h1 className="text-xl font-semibold text-gray-900">AI Platform</h1>
              <p className="text-sm text-gray-600">Machine Dashboard</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Plant Status:</span>
          <Badge 
            className={`${getStatusColor(plantStatus)} border-0 rounded-full px-3 py-1`}
          >
            <span className="mr-1">{getStatusIcon(plantStatus)}</span>
            {plantStatus.charAt(0).toUpperCase() + plantStatus.slice(1)}
          </Badge>
        </div>
      </div>
    </header>
  );
}