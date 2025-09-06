import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { AlertTriangle } from "lucide-react";

interface MachineCardProps {
  machine: {
    id: string;
    name: string;
    status: 'operational' | 'warning' | 'critical';
    moldTemperature: number;
    injectionPressure: number;
    efficiency: number;
    faults?: Array<{ id: string; message: string }>;
  };
  onViewDetails: (machineId: string) => void;
  onAskAI: (machineId: string) => void;
}

export function MachineCard({ machine, onViewDetails, onAskAI }: MachineCardProps) {
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
    <Card className="p-6 h-full flex flex-col shadow-lg border border-gray-200 rounded-xl bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{machine.name}</h3>
        <Badge 
          className={`${getStatusColor(machine.status)} border-0 rounded-full px-3 py-1`}
        >
          <span className="mr-1">{getStatusIcon(machine.status)}</span>
          {machine.status.charAt(0).toUpperCase() + machine.status.slice(1)}
        </Badge>
      </div>

      {/* Metrics */}
      <div className="space-y-3 mb-4 flex-1">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Mold Temperature</span>
          <span className="font-medium">{machine.moldTemperature}°C</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Injection Pressure</span>
          <span className="font-medium">{machine.injectionPressure} bar</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Efficiency</span>
          <span className="font-medium">{machine.efficiency}%</span>
        </div>

        {/* Fault Alerts */}
        {machine.faults && machine.faults.length > 0 && (
          <div className="mt-4 space-y-2">
            {machine.faults.map((fault) => (
              <div 
                key={fault.id}
                className="flex items-center gap-2 bg-[#EF4444] text-white px-3 py-2 rounded-full text-xs"
              >
                <AlertTriangle className="h-3 w-3" />
                <span>{fault.message}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-4">
        <Button 
          variant="outline" 
          className="flex-1 rounded-lg border-gray-300"
          onClick={() => onViewDetails(machine.id)}
        >
          View Details
        </Button>
        <Button 
          className="flex-1 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg"
          onClick={() => onAskAI(machine.id)}
        >
          Ask AI
        </Button>
      </div>
    </Card>
  );
}