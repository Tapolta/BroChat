import React, { useState } from 'react';
import GeneralTab from '../settings/GeneralTab';
import AccountTab from '../settings/AccountTab';
import AppearanceTab from '../settings/AppearanceTab';
import AboutTab from '../settings/AboutTab';
import BaseModal from './BaseModal';

type TabType = 'General' | 'Account' | 'Appearance' | 'About';

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
  isLoggedIn?: boolean;
  user?: { name: string; email: string } | null;
  onLoginTrigger?: () => void;
  onLogoutTrigger?: () => void;
}

export default function SettingsModal({
  open,
  onClose,
  isLoggedIn = false,
  user = null,
  onLoginTrigger,
  onLogoutTrigger
}: SettingsModalProps) {
  
  const [selectedTab, setSelectedTab] = useState<TabType>('General');
  const menuItems: TabType[] = ['General', 'Account', 'Appearance', 'About'];

  const tabs: Record<TabType, React.ReactNode> = {
    General: <GeneralTab />,
    Account: (
      <AccountTab
        isLoggedIn={isLoggedIn}
        user={user}
        onLoginClick={onLoginTrigger}
        onLogoutClick={onLogoutTrigger}
      />
    ),
    Appearance: <AppearanceTab />,
    About: <AboutTab />
  };

  return (
    <BaseModal 
      open={open} 
      onClose={onClose} 
      title="Settings" 
      size="lg"
    >
      <div className="flex h-[500px] -mx-6 -mb-6 border-t border-gray-100 pt-4">
        
        <div className="w-[180px] border-r border-gray-200 pr-3 pl-6 flex flex-col gap-1 pb-6">
          {menuItems.map((item) => {
            const isActive = selectedTab === item;
            return (
              <button
                key={item}
                onClick={() => setSelectedTab(item)}
                className={`w-full text-left px-4 py-3 text-sm transition-colors duration-150
                  ${isActive
                    ? 'bg-gray-100 font-medium text-black rounded-xl'
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        <div className="flex-1 px-8 overflow-y-auto pb-6">
          {tabs[selectedTab]}
        </div>

      </div>
    </BaseModal>
  );
}