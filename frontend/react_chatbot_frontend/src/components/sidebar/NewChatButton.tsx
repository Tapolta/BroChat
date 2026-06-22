interface NewChatButtonProps {
  onClick?: () => void;
}

export default function NewChatButton({ onClick }: NewChatButtonProps) {
  return (
    <div className="p-3 shrink-0">
      <button 
        onClick={onClick}
        className="flex items-center gap-2 w-full px-3 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-100 text-sm font-medium text-gray-800 shadow-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
        New Chat
      </button>
    </div>
  );
}