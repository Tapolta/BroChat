import React, { useState } from 'react';
import GuestSection from './GuestSection';
import LoginModal from '../login/LoginModal';
import SidebarHeader from './SidebarHeader';
import NewChatButton from './NewChatButton';
import ChatHistoryList from './ChatHistoryList';
import SettingsButton from './SettingsButton';

interface SidebarUserProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SidebarUser({ isOpen, setIsOpen }: SidebarUserProps) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  
  const isAuthenticated = false; 
  const chatHistory = ["AI Project", "Learning React", "Machine Learning"];

  const toggleSidebar = () => setIsOpen(!isOpen);
  const handleLogin = () => setIsLoginOpen(true);

  return (
    <>
      <SidebarHeader isOpen={isOpen} onToggle={toggleSidebar} />

      {isOpen && (
        <div className="flex flex-col flex-1 p-3 overflow-y-auto justify-between">
          <div className="flex flex-col gap-2 flex-1">
            {isAuthenticated ? (
              <>
                <NewChatButton onClick={() => console.log("New chat created")} />
                <ChatHistoryList items={chatHistory} />
              </>
            ) : (
              <div className="flex items-end h-full mb-4">
                <GuestSection onLogin={handleLogin} />
              </div>
            )}
          </div>

          <div className="mt-auto pt-2 border-t border-gray-200/60">
            <SettingsButton onClick={() => console.log("Open settings")} />
          </div>

          <LoginModal 
            isOpen={isLoginOpen} 
            onClose={() => setIsLoginOpen(false)} 
          />
        </div>
      )}
    </>
  );
}