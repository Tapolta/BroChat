import type { ReactNode } from "react";

interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  closeOnOverlay?: boolean;
}

const sizeClasses = {
  sm: "w-full max-w-[360px]",
  md: "w-full max-w-[450px]",
  lg: "w-full max-w-[700px]",
};

function BaseModal({
  open,
  onClose,
  title,
  children,
  size = "md",
  closeOnOverlay = true,
}: BaseModalProps) {
  if (!open) return null;

  const handleOverlayClick = () => {
    if (closeOnOverlay) {
      onClose();
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[1px]"
        onClick={handleOverlayClick}
      />

      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] 
          bg-white rounded-3xl shadow-xl border border-gray-200 p-6 flex flex-col gap-4
          ${sizeClasses[size]}`}
      >
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-900">{title}</h2>
          
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="text-gray-700 text-[15px] leading-relaxed">
          {children}
        </div>
      </div>
    </>
  );
}

export default BaseModal;