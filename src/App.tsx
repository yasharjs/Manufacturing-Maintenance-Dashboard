import { useState } from 'react';
import { SidebarProvider } from './components/ui/sidebar';
import { AppSidebar } from './components/AppSidebar';
import { HomePage } from './components/HomePage';
import { Dashboard } from './components/Dashboard';
import { MachineDetail } from './components/MachineDetail';
import { ChatPage } from './components/ChatPage';
import { UploadPage } from './components/UploadPage';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedMachine, setSelectedMachine] = useState<string>('');

  const handleNavigateToDetail = (machineId: string) => {
    setSelectedMachine(machineId);
    setCurrentView('detail');
  };

  const handleNavigateBack = () => {
    setCurrentView('dashboard');
    setSelectedMachine('');
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    if (view !== 'detail') {
      setSelectedMachine('');
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'dashboard':
        return <Dashboard onNavigateToDetail={handleNavigateToDetail} />;
      case 'detail':
        return <MachineDetail machineId={selectedMachine} onNavigateBack={handleNavigateBack} />;
      case 'chat':
        return <ChatPage />;
      case 'upload':
        return <UploadPage />;
      default:
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Coming Soon</h2>
              <p className="text-gray-600">This feature is under development.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar currentView={currentView} onNavigate={handleNavigate} />
        <main className="flex-1">
          {renderCurrentView()}
        </main>
      </div>
    </SidebarProvider>
  );
}