import { useState } from 'react';
import { LayoutDashboard, Bot } from 'lucide-react';
import SidebarHeader from './SidebarHeader';

interface SidebarAdminProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SidebarAdmin({ isOpen, setIsOpen }: SidebarAdminProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'ai-settings'>('dashboard');
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <SidebarHeader isOpen={isOpen} onToggle={toggleSidebar} />

      {isOpen && (
        <div className="flex flex-col flex-1 p-4 justify-between animate-fadeIn">
          <nav className="flex flex-col gap-1.5">
            
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${
                activeTab === 'dashboard'
                  ? 'bg-black/[0.06] text-gray-900 font-semibold'
                  : 'text-gray-400 hover:bg-black/[0.03] hover:text-gray-900'
              }`}
            >
              <LayoutDashboard 
                className={`w-4 h-4 transition-colors ${
                  activeTab === 'dashboard' ? 'text-gray-900' : 'text-gray-400'
                }`} 
              />
              <span>Dashboard</span>
            </button>

            {/* Tombol AI Settings */}
            <button
              onClick={() => setActiveTab('ai-settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${
                activeTab === 'ai-settings'
                  ? 'bg-black/[0.06] text-gray-900 font-semibold'
                  : 'text-gray-400 hover:bg-black/[0.03] hover:text-gray-900'
              }`}
            >
              <Bot 
                className={`w-4 h-4 transition-colors ${
                  activeTab === 'ai-settings' ? 'text-gray-900' : 'text-gray-400'
                }`} 
              />
              <span>AI Settings</span>
            </button>

          </nav>

          <div className="text-[11px] text-gray-400 text-center font-medium pt-4 border-t border-gray-200/60">
            Admin Mode Active
          </div>
        </div>
      )}
    </>
  );
}