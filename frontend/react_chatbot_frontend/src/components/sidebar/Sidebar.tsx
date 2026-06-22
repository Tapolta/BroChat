import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export default function Sidebar({ isOpen, children }: SidebarProps) {
  return (
    <aside 
      className={`flex flex-col h-full bg-gray-50 shrink-0 z-40 transition-all duration-200
        fixed inset-y-0 left-0 md:relative 
        ${isOpen ? 'w-[260px]' : 'w-0 border-none md:w-[72px] md:border-r md:border-gray-200'}`}
    >
      {children}
    </aside>
  );
}