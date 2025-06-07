import React from 'react';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Background from './components/Background';
import Demo from './components/Demo';
import Footer from './components/Footer';
import { useLanguage } from './hooks/useLanguage';
import { translations } from './constants/translations';

function App() {
  const { currentLang, toggleLanguage } = useLanguage();
  const t = translations[currentLang];

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden">
      <Toaster position="top-right" theme="dark" />
      <Navbar currentLang={currentLang} onToggleLanguage={toggleLanguage} t={t} />
      <Hero t={t} />
      <Features t={t} />
      <Background t={t} />
      <Demo t={t} />
      <Footer t={t} />
    </div>
  );
}

export default App;