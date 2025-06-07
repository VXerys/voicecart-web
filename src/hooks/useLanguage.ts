import { useState, useCallback } from 'react';
import type { Language } from '../constants/translations';

export function useLanguage() {
  const [currentLang, setCurrentLang] = useState<Language>('id');

  const toggleLanguage = useCallback(() => {
    setCurrentLang(prev => prev === 'id' ? 'en' : 'id');
  }, []);

  return {
    currentLang,
    toggleLanguage
  };
}