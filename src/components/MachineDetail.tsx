import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb";
import { ArrowLeft, Plus } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface MachineDetailProps {
  machineId: string;
  onNavigateBack: () => void;
}

export function MachineDetail({ machineId, onNavigateBack }: MachineDetailProps) {
  // Mock data
  const machineData = {
    hypet500: {
      name: "HyPET500",
      status: "critical" as const,
      oee: 72,
      availability: 80,
      performance: 85,
      quality: 98
    },
    hypet400: {
      name: "HyPET400", 
      status: "warning" as const,
      oee: 88,
      availability: 92,
      performance: 90,
      quality: 96
    },
    hypet300: {
      name: "HyPET300",
      status: "operational" as const,
      oee: 94,
      availability: 98,
      performance: 96,
      quality: 99
    }
  };

  const machine = machineData[machineId as keyof typeof machineData];

  // Mock time series data
  const temperatureData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    temperature: 20 + Math.random() * 10 + (i > 8 && i < 15 ? 5 : 0),
    threshold: 25
  }));

  const pressureData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    pressure: 100 + Math.random() * 50
  }));

  const cycleTimeData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    cycleTime: 45 + Math.random() * 10
  }));

  const downtimeData = [
    { name: 'Scheduled', value: 40, color: '#10B981' },
    { name: 'Unscheduled', value: 35, color: '#EF4444' },
    { name: 'Other', value: 25, color: '#F59E0B' }
  ];

  const downtimeEvents = [
    { date: 'Jun 24', duration: '1.2h', cause: 'Cooling issue (temp > 25°C)' },
    { date: 'Jun 26', duration: '0.5h', cause: 'Electrical (board replaced)' },
    { date: 'Jun 28', duration: '2.1h', cause: 'Scheduled maintenance' }
  ];

  const tasks = [
    { id: 1, title: 'Replace cooling filter', status: 'Draft', priority: 'High' },
    { id: 2, title: 'Inspect electrical board', status: 'In Progress', priority: 'Medium' },
    { id: 3, title: 'Lubricate joints', status: 'Completed', priority: 'Low' }
  ];

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

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!machine) {
    return <div>Machine not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onNavigateBack}
              className="rounded-lg"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink onClick={onNavigateBack} className="cursor-pointer">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{machine.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-gray-900">{machine.name} – Machine Detail</h1>
            <Badge className={`${getStatusColor(machine.status)} border-0 rounded-full px-3 py-1`}>
              <span className="mr-1">{getStatusIcon(machine.status)}</span>
              {machine.status.charAt(0).toUpperCase() + machine.status.slice(1)}
            </Badge>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Metrics & Charts - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">{machine.oee}%</div>
                <div className="text-sm text-gray-600">OEE</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">{machine.availability}%</div>
                <div className="text-sm text-gray-600">Availability</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">{machine.performance}%</div>
                <div className="text-sm text-gray-600">Performance</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">{machine.quality}%</div>
                <div className="text-sm text-gray-600">Quality</div>
              </Card>
            </div>

            {/* Charts */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Mold Temperature (24h)</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={temperatureData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="temperature" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" dataKey="threshold" stroke="#EF4444" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Injection Pressure Trend</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={pressureData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="pressure" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Cycle Time Trend</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={cycleTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="cycleTime" stroke="#F59E0B" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Downtime Reasons</h3>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width={300} height={200}>
                  <PieChart>
                    <Pie
                      data={downtimeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {downtimeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="ml-4 space-y-2">
                  {downtimeData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm">{item.name}: {item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Logs & Tasks - 1/3 width */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Downtime Events</h3>
              <div className="space-y-3">
                {downtimeEvents.map((event, index) => (
                  <div key={index} className="border-l-2 border-gray-200 pl-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-sm">{event.date}</div>
                        <div className="text-xs text-gray-600">{event.duration}</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-700 mt-1">{event.cause}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Tasks</h3>
                <Button size="sm" className="bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg">
                  <Plus className="h-4 w-4 mr-1" />
                  New Task
                </Button>
              </div>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{task.title}</span>
                      <Badge className={`${getTaskStatusColor(task.status)} border-0 text-xs`}>
                        {task.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-600">Priority: {task.priority}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}