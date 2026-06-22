import { useEffect, useRef, useState } from "react";
import MessageList from "../components/MessageList";
import TextInput from "../components/TextInput";
import { useChat } from "../hooks/useChat";
import Sidebar from "../components/sidebar/Sidebar";
import SidebarUser from "../components/sidebar/SidebarUser";

function ChatPage() {
  const { messages, isLoading, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-screen w-full bg-white font-sans overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        
        <Sidebar isOpen={isSidebarOpen}>
          <SidebarUser isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        </Sidebar>

        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <main className="flex-1 flex flex-col bg-white overflow-hidden">
          
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center px-4">
              <div className="w-full max-w-3xl flex flex-col items-center gap-6">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-800">Ada yang bisa dibantu?</h1>
                  <p className="text-gray-400 text-sm mt-2">Mulai obrolan pertamamu dengan BroChat.</p>
                </div>
                
                <div className="w-full">
                  <TextInput onSendMessage={sendMessage} isLoading={isLoading} />
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto">
                <div className="max-w-3xl mx-auto flex flex-col gap-8 px-4 pt-12 pb-8">
                  <MessageList messages={messages} />

                  {isLoading && (
                    <div className="flex w-full justify-start mt-4">
                      <div className="flex gap-1 items-center px-2 py-1 bg-gray-50 rounded-lg border border-gray-100">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </div>

              <div className="w-full bg-white pt-4 pb-6 shrink-0 border-t border-gray-50">
                <div className="max-w-3xl mx-auto px-4">
                  <TextInput onSendMessage={sendMessage} isLoading={isLoading} />
                </div>
              </div>
            </>
          )}

        </main>
      </div>
    </div>
  );
}

export default ChatPage;