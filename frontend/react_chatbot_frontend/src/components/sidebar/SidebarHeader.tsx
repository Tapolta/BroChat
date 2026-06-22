import HeaderLogo from '../HeaderLogo';

interface SidebarHeaderProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function SidebarHeader({ isOpen, onToggle }: SidebarHeaderProps) {
  return (
    <div className={`h-16 flex items-center px-4 border-b border-transparent shrink-0 ${isOpen ? 'justify-end' : 'justify-center'}`}>
      {isOpen ? (
        <div className="flex items-center justify-between w-full gap-4">
          <HeaderLogo />
          <button onClick={onToggle} className="p-2 hover:bg-gray-200 rounded-lg text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M9 3v18" />
              <path d="m16 15-3-3 3-3" />
            </svg>
          </button>
        </div>
      ) : (
        <button 
          onClick={onToggle} 
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
  );
}