import { Header } from "./Header";
import { MachineCard } from "./MachineCard";
import { AIAssistant } from "./AIAssistant";
import { useState, useEffect } from "react";

interface DashboardProps {
  onNavigateToDetail: (machineId: string) => void;
}

export function Dashboard({ onNavigateToDetail }: DashboardProps) {
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState<string>();

  type UIMachine = {
    id: string;
    name: string;
    status: 'operational' | 'warning' | 'critical';
    moldTemperature: number;
    injectionPressure: number;
    efficiency: number;
    faults?: Array<{ id: string; message: string }>;
  };

  const [machines, setMachines] = useState<UIMachine[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/machines');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const mapped: UIMachine[] = (data || []).map((m: any) => ({
          id: String(m.id || '').toLowerCase(),
          name: m.id,
          status: m.status,
          moldTemperature: m?.metrics?.mold_temp_c,
          injectionPressure: m?.metrics?.injection_pressure_bar,
          efficiency: m?.metrics?.efficiency_pct,
          faults: (m?.faults || []).map((f: any) => ({ id: f.code, message: f.label })),
        }));
        setMachines(mapped);
      } catch (e: any) {
        setError(e?.message || 'Failed to load machines');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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
        
        {error && (
          <div className="mb-4 text-red-600">Error: {error}</div>
        )}
        {loading && (
          <div className="mb-4 text-gray-600">Loading machines…</div>
        )}

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
