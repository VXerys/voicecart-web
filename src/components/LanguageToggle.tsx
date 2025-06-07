import React from 'react';
import { Globe } from 'lucide-react';
import type { Language } from '../constants/translations';

interface LanguageToggleProps {
  currentLang: Language;
  onToggle: () => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ currentLang, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="relative p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors group"
      title="Switch Language"
    >
      <Globe className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
      <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-[10px]">
        {currentLang === 'id' ? '🇮🇩' : '🇬🇧'}
      </span>
    </button>
  );
};

export default LanguageToggle;