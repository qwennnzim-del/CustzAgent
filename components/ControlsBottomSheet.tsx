
import React from 'react';
import { GlobeIcon, BrainIcon, LightningIcon } from './Icons';
import { ModelType, VoiceName } from '../types';

interface ControlsBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  isSearchEnabled: boolean;
  onToggleSearch: () => void;
  isThinkingEnabled?: boolean;
  onToggleThinking?: () => void;
  isTurboEnabled?: boolean;
  onToggleTurbo?: () => void;
  model: ModelType;
  voice: VoiceName;
  onVoiceChange: (voice: VoiceName) => void;
}

const ControlsBottomSheet: React.FC<ControlsBottomSheetProps> = ({
  isOpen,
  onClose,
  isSearchEnabled,
  onToggleSearch,
  isThinkingEnabled,
  onToggleThinking,
  isTurboEnabled,
  onToggleTurbo,
  model,
  voice,
  onVoiceChange
}) => {
  const isChatModel = ['gemini-2.5-flash', 'gemini-3-pro-preview', 'gemini-flash-lite-latest', 'gemini-1.5-flash'].includes(model);
  const isThinkingSupported = ['gemini-2.5-flash', 'gemini-3-pro-preview', 'gemini-flash-lite-latest'].includes(model);

  const voices: { id: VoiceName; label: string; desc: string }[] = [
      { id: 'Kore', label: 'Kore', desc: 'Calm & Balanced (Default)' },
      { id: 'Fenrir', label: 'Fenrir', desc: 'Fast & Energetic' },
      { id: 'Puck', label: 'Puck', desc: 'Soft & Friendly' },
      { id: 'Charon', label: 'Charon', desc: 'Deep & Authoritative' },
      { id: 'Aoede', label: 'Aoede', desc: 'High & Expressive' },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 animate-fade-in"
          onClick={onClose}
          aria-hidden="true"
        ></div>
      )}

      {/* Bottom Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-[#1A1A1A] rounded-t-3xl shadow-xl transform transition-transform duration-300 ease-out 
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="controls-sheet-title"
      >
        <div className="relative p-4 pb-8">
          {/* Handle bar */}
          <div className="w-12 h-1 bg-gray-700 rounded-full mx-auto mb-4" />
          
          <h2 id="controls-sheet-title" className="sr-only">Advanced Controls</h2>
          
          {/* Features Section */}
          <div className="mb-6">
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-3 px-2">Capabilities</p>
              <div className="flex justify-around items-center gap-4">
                {/* Search Toggle */}
                <button
                  onClick={onToggleSearch}
                  disabled={!isChatModel}
                  className={`flex flex-col items-center gap-1 p-3 transition-all duration-300 rounded-xl hover:bg-gray-800/50 group relative w-24
                    ${!isChatModel ? 'opacity-30 cursor-not-allowed' : ''}
                    ${isSearchEnabled && isChatModel ? 'text-blue-400 bg-blue-500/10' : 'text-gray-400 hover:text-white'}
                  `}
                  title={isChatModel ? "Toggle Google Search" : "Search unavailable for this model"}
                >
                  {isSearchEnabled && isChatModel && (
                    <span className="absolute inset-0 rounded-xl bg-blue-500/20 animate-ping opacity-75"></span>
                  )}
                  <GlobeIcon className={`w-6 h-6 transition-transform duration-300 ${isSearchEnabled && isChatModel ? 'scale-110 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]' : ''}`} />
                  <span className="text-xs mt-1 font-medium">Search</span>
                </button>

                {/* CoT (Thinking) Toggle */}
                <button
                  onClick={onToggleThinking}
                  disabled={!isThinkingSupported}
                  className={`flex flex-col items-center gap-1 p-3 transition-all duration-300 rounded-xl hover:bg-gray-800/50 group relative w-24
                    ${!isThinkingSupported ? 'opacity-30 cursor-not-allowed' : ''}
                    ${isThinkingEnabled && isThinkingSupported ? 'text-purple-400 bg-purple-500/10' : 'text-gray-400 hover:text-white'}
                  `}
                  title={isThinkingSupported ? "Enable CoT (Deep Thinking)" : "CoT unavailable for this model"}
                >
                  {isThinkingEnabled && isThinkingSupported && (
                    <span className="absolute inset-0 rounded-xl bg-purple-500/20 animate-ping opacity-75"></span>
                  )}
                  <BrainIcon className={`w-6 h-6 transition-transform duration-300 ${isThinkingEnabled ? 'scale-110 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]' : ''}`} />
                  <span className="text-xs mt-1 font-medium">CoT</span>
                </button>

                {/* Turbo Zero Toggle */}
                <button
                  onClick={onToggleTurbo}
                  disabled={!isThinkingSupported}
                  className={`flex flex-col items-center gap-1 p-3 transition-all duration-300 rounded-xl hover:bg-gray-800/50 group relative w-24
                    ${!isThinkingSupported ? 'opacity-30 cursor-not-allowed' : ''}
                    ${isTurboEnabled && isThinkingSupported ? 'text-yellow-400 bg-yellow-500/10' : 'text-gray-400 hover:text-white'}
                  `}
                  title={isThinkingSupported ? "Enable Turbo Zero (Instant Answer)" : "Turbo unavailable for this model"}
                >
                  {isTurboEnabled && isThinkingSupported && (
                    <span className="absolute inset-0 rounded-xl bg-yellow-500/20 animate-ping opacity-75"></span>
                  )}
                  <LightningIcon className={`w-6 h-6 transition-transform duration-300 ${isTurboEnabled ? 'scale-110 drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]' : ''}`} />
                  <span className="text-xs mt-1 font-medium">Turbo</span>
                </button>
              </div>
          </div>
          
          {/* Voice Matrix Section */}
          <div>
               <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-3 px-2">Voice Identity Matrix</p>
               <div className="grid grid-cols-1 gap-2">
                   {voices.map((v) => (
                       <button
                           key={v.id}
                           onClick={() => onVoiceChange(v.id)}
                           className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                               voice === v.id 
                               ? 'bg-gray-800 border border-blue-500/50' 
                               : 'bg-gray-900/50 border border-transparent hover:bg-gray-800'
                           }`}
                       >
                           <div className="flex flex-col items-start">
                               <span className={`text-sm font-bold ${voice === v.id ? 'text-blue-400' : 'text-gray-300'}`}>{v.label}</span>
                               <span className="text-[10px] text-gray-500">{v.desc}</span>
                           </div>
                           {voice === v.id && (
                               <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
                           )}
                       </button>
                   ))}
               </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default ControlsBottomSheet;