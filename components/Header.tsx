
import React, { useState, useRef, useEffect } from 'react';
import { SidebarIcon, NewChatIcon, ChevronDownIcon, CusstzzLogo } from './Icons';
import { ModelType } from '../types';

interface HeaderProps {
  model: ModelType;
  onModelChange: (model: ModelType) => void;
  onToggleSidebar: () => void;
  onNewChat: () => void;
}

const Header: React.FC<HeaderProps> = ({ model, onModelChange, onToggleSidebar, onNewChat }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getModelDisplayName = (m: ModelType) => {
    switch(m) {
        case 'gemini-3-pro-preview': return 'Pro 3.0';
        case 'imagen-4.0-generate-001': return 'Imagen (Ultra)';
        case 'imagen-4.0-fast-generate-001': return 'Imagen (Fast)';
        case 'gemini-2.5-flash-image': return 'Edit (Precision)';
        case 'gemini-flash-lite-latest': return 'Lite 2.5';
        case 'gemini-1.5-flash': return 'Flash 1.5 (Legacy)';
        default: return 'Flash 2.5';
    }
  };
  
  const modelDisplayName = getModelDisplayName(model);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleModelSelect = (selectedModel: ModelType) => {
    onModelChange(selectedModel);
    setIsDropdownOpen(false);
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#0D0D0D] bg-opacity-80 backdrop-blur-sm z-20 border-b border-gray-800/50">
      <nav className="mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between h-16">
        <button onClick={onToggleSidebar} className="p-2 text-gray-400 hover:text-white transition-colors" aria-label="Open chat history">
          <SidebarIcon className="w-6 h-6" />
        </button>
        
        {/* Branding Only (No Dropdown) */}
        <div className="flex items-center gap-2 px-4 py-2 border border-gray-800 rounded-full bg-gray-900/30">
            <CusstzzLogo className="w-5 h-5" />
            <span className="text-sm">
              <span className="font-semibold bg-gradient-to-r from-[#00c6ff] via-[#8a2be2] to-[#00eaff] bg-clip-text text-transparent animate-gradient">
                Agent
              </span>
              <span className="text-gray-500 mx-1">|</span>
              <span className="text-gray-300 font-mono text-xs tracking-tight">
                {modelDisplayName}
              </span>
            </span>
        </div>
        
        <button onClick={onNewChat} className="p-2 text-gray-400 hover:text-white transition-colors" aria-label="Start new chat">
          <NewChatIcon className="w-6 h-6" />
        </button>
      </nav>
    </header>
  );
};

export default Header;
