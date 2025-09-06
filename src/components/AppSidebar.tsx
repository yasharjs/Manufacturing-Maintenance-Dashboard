import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "./ui/sidebar";
import { 
  FileText, 
  CheckSquare, 
  Wrench, 
  FileEdit, 
  ClipboardList, 
  Users,
  Activity,
  Database,
  MessageSquare,
  Upload
} from "lucide-react";

interface AppSidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export function AppSidebar({ currentView, onNavigate }: AppSidebarProps) {
  const menuItems = [
    { id: "home", label: "Home", icon: Activity },
    { id: "dashboard", label: "Machine Data", icon: Database },
    { id: "chat", label: "Chat", icon: MessageSquare },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "tasks", label: "Tasks", icon: CheckSquare },
    { id: "workbench", label: "Work Bench", icon: Wrench },
    { id: "logs", label: "Logs / Notes", icon: FileEdit },
    { id: "inspection", label: "Inspection checklist", icon: ClipboardList },
    { id: "team", label: "Team / Messages", icon: Users },
    { id: "upload", label: "Upload Documents", icon: Upload },
  ];

  return (
    <Sidebar className="border-r border-gray-200 bg-gray-100">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-[#3B82F6]" />
          <span className="font-semibold text-gray-900">AI Platform</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                onClick={() => onNavigate(item.id)}
                className={`w-full justify-start gap-3 px-4 py-3 rounded-lg mx-2 transition-colors ${
                  currentView === item.id 
                    ? 'bg-[#3B82F6] text-white hover:bg-[#2563EB]' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span className="text-sm">{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <div className="text-xs text-gray-500">
          © 2024 AI Platform
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}