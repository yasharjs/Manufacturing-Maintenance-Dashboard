import { Header } from "./Header";
import { MachineCard } from "./MachineCard";
import { AIAssistant } from "./AIAssistant";
import { useState } from "react";

interface DashboardProps {
  onNavigateToDetail: (machineId: string) => void;
}

export function Dashboard({ onNavigateToDetail }: DashboardProps) {
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState<string>();

  // Mock data
  const machines = [
    {
      id: "hypet500",
      name: "HyPET500",
      status: "critical" as const,
      moldTemperature: 28,
      injectionPressure: 145,
      efficiency: 72,
      faults: [
        { id: "101", message: "Fault 101: High temperature detected" },
        { id: "132", message: "Fault 132: Efficiency below threshold" }
      ]
    },
    {
      id: "hypet400",
      name: "HyPET400",
      status: "warning" as const,
      moldTemperature: 24,
      injectionPressure: 120,
      efficiency: 88,
    },
    {
      id: "hypet300",
      name: "HyPET300",
      status: "operational" as const,
      moldTemperature: 22,
      injectionPressure: 110,
      efficiency: 94,
    }
  ];

  const plantStatus = machines.some(m => m.status === 'critical') 
    ? 'critical' 
    : machines.some(m => m.status === 'warning') 
    ? 'warning' 
    : 'operational';

  const handleAskAI = (machineId: string) => {
    const machine = machines.find(m => m.id === machineId);
    setSelectedMachine(machine?.name);
    setAiAssistantOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header plantStatus={plantStatus} />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Machine Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor and manage your manufacturing equipment</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {machines.map((machine) => (
            <MachineCard
              key={machine.id}
              machine={machine}
              onViewDetails={onNavigateToDetail}
              onAskAI={handleAskAI}
            />
          ))}
        </div>
      </main>

      <AIAssistant
        isOpen={aiAssistantOpen}
        onClose={() => {
          setAiAssistantOpen(false);
          setSelectedMachine(undefined);
        }}
        selectedMachine={selectedMachine}
      />
    </div>
  );
}