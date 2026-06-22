import React, { useState } from 'react';
import GuestSection from './GuestSection';
import HeaderLogo from '../HeaderLogo';
import LoginModal from '../LoginModal';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const isAuthenticated = false;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogin = () => {
    setIsLoginOpen(true);
  };

  const chatHistory = [
    "AI Project",
    "Learning React",
    "Machine Learning",
  ];

  return (
    <aside 
      className={`flex flex-col h-full bg-gray-50 shrink-0 z-40 transition-all duration-200
        fixed inset-y-0 left-0 md:relative 
        ${isOpen 
          ? 'w-[260px]' 
          : 'w-0 border-none md:w-[72px] md:border-r md:border-gray-200'
        }`}
    >
      {/* HEADER SIDEBAR */}
      <div className={`h-16 flex items-center px-4 border-b border-transparent shrink-0 ${isOpen ? 'justify-end' : 'justify-center'}`}>
        {isOpen ? (
          <div className="flex items-center justify-between w-full gap-4">
            <HeaderLogo />
            <button onClick={toggleSidebar} className="p-2 hover:bg-gray-200 rounded-lg text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M9 3v18" />
                <path d="m16 15-3-3 3-3" />
              </svg>
            </button>
          </div>
        ) : (
          <button 
            onClick={toggleSidebar} 
            className="p-2 hover:bg-gray-200 rounded-lg text-gray-500 
              fixed top-3 left-3 z-50 bg-white border border-gray-200 shadow-sm
              md:static md:bg-transparent md:border-none md:shadow-none md:mx-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {isOpen && (
        <>
          {!isAuthenticated && (
            <div className="flex items-end h-full mb-4">
              <GuestSection onLogin={handleLogin} />
            </div>
          )}

          {isAuthenticated && (
            <>
              <div className="p-3 shrink-0">
              <button className="flex items-center gap-2 w-full px-3 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-100 text-sm font-medium text-gray-800 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                New Chat
              </button>
            </div>

              <div className="flex-1 overflow-y-auto px-3 py-2">
                <h3 className="text-xs font-semibold text-gray-400 mb-2 px-2">Today</h3>
                <div className="flex flex-col gap-1">
                  {chatHistory.map((item, index) => (
                    <button 
                    key={index}
                    className="flex items-center w-full px-2 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-200 truncate text-left"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {!isAuthenticated && <div className="flex-1" />}

          <div className="p-3 border-t border-gray-200 shrink-0">
            <button 
              className="flex items-center gap-2 w-full px-2 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-200"
              onClick={() => {}}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Settings
            </button>
          </div>

          <LoginModal 
            isOpen={isLoginOpen} 
            onClose={() => setIsLoginOpen(false)} 
          />
        </>
      )}
    </aside>
  );
}

export default Sidebar;