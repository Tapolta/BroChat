import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GuestSection from './GuestSection';
import SidebarHeader from './SidebarHeader';
import NewChatButton from './NewChatButton';
import ChatHistoryList from './ChatHistoryList';
import SettingsButton from './SettingsButton';
import { storageManager } from '../../utils/storage';
import { authService, type UserProfile } from '../../services/authService';
import { useSidebarRefreshListener } from '../../hooks/useChatSync';
import LoginModal from '../modal/LoginModal';
import SettingsModal from '../modal/SettingsModal';

interface SidebarUserProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SidebarUser({ isOpen, setIsOpen }: SidebarUserProps) {
  const navigate = useNavigate();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const checkLoginData = async () => {
    const key = storageManager.getSessionKey();
    
    if (!key) {
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const userData = await authService.getProfile(); 
      
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error: any) {
      console.error("Sesi tidak valid:", error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkLoginData();
  }, [isLoginOpen]); 

  useSidebarRefreshListener(() => {
    if (storageManager.getSessionKey()) {
      checkLoginData();
    }
  });

  const toggleSidebar = () => setIsOpen(!isOpen);
  const handleLogin = () => setIsLoginOpen(true);

  const handleNewChat = () => {
    navigate('/', { replace: true });
  };

  const handleLogout = () => {
    storageManager.clearSessionKey();
    storageManager.clearEmail();
    setIsAuthenticated(false);
    setUser(null);
    setIsSettingsOpen(false);
    navigate('/', { replace: true });
  };

  if (isLoading && isOpen) {
    return (
      <div className="flex flex-1 items-center justify-center text-gray-400 text-xs gap-2">
        <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        Memeriksa sesi...
      </div>
    );
  }

  return (
    <>
      <SidebarHeader isOpen={isOpen} onToggle={toggleSidebar} />
      {isOpen && (
        <div className="flex flex-col flex-1 p-3 overflow-y-auto justify-between">
          <div className="flex flex-col gap-2 flex-1">
            {isAuthenticated ? (
              <>
                <div className="px-2 py-1 text-xs text-gray-500 truncate">
                  Halo, <span className="font-semibold text-gray-700">{user?.email.split('@')[0]}</span>
                </div>

                <NewChatButton onClick={handleNewChat} />
                
                <ChatHistoryList items={user?.chats || []} />
              </>
            ) : (
              <div className="flex items-end h-full mb-4">
                <GuestSection onLogin={handleLogin} />
              </div>
            )}
          </div>

          <div className="mt-auto pt-2 border-t border-gray-200/60">
            {/* 3. UBAH ONCLICK UNTUK MEMBUKA MODAL SETTINGS */}
            <SettingsButton onClick={() => setIsSettingsOpen(true)} />
          </div>

          <LoginModal 
            isOpen={isLoginOpen} 
            onClose={() => setIsLoginOpen(false)} 
          />

          {/* 4. PASANG PROPS SETTINGS MODAL SECARA LENGKAP */}
          <SettingsModal
            open={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            isLoggedIn={isAuthenticated}
            user={
              user 
                ? { name: user.email.split('@')[0], email: user.email } 
                : null
            }
            onLoginTrigger={() => {
              setIsSettingsOpen(false); // Tutup settings dulu
              setIsLoginOpen(true);     // Buka login modal
            }}
            onLogoutTrigger={handleLogout}
          />
        </div>
      )}
    </>
  );
}