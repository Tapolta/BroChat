import { useState, useRef, type ChangeEvent, type KeyboardEvent } from 'react';

interface TextInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

function TextInput({ onSendMessage, isLoading = false }: TextInputProps) {
  const [inputText, setInputText] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleSend = () => {
    if (!inputText.trim() || isLoading) return;
    
    onSendMessage(inputText);
    
    setInputText("");
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); 
      handleSend();
    }
  };

  return (
    <div className="w-full flex items-end gap-3 p-3 bg-white border border-gray-200 shadow-sm rounded-3xl">
      
      <textarea
        ref={textareaRef}
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={isLoading ? "AI sedang merespons..." : "Ask anything..."}
        rows={1}
        disabled={isLoading}
        className="flex-1 resize-none bg-transparent focus:outline-none text-gray-800 text-base px-2 py-1.5 max-h-[144px] overflow-y-auto disabled:opacity-50"
      />

      <button
        onClick={handleSend}
        disabled={!inputText.trim() || isLoading}
        className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-black text-white disabled:bg-gray-100 disabled:text-gray-300 cursor-pointer disabled:cursor-default"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={2.5} 
          stroke="currentColor" 
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
        </svg>
      </button>
      
    </div>
  );
}

export default TextInput;