import React, { useState, useEffect } from 'react';
import { Menu, X, Mic } from 'lucide-react';
import LanguageToggle from './LanguageToggle';
import GooeyNav from './SettingNav';
import type { Language } from '../constants/translations';

interface NavbarProps {
  currentLang: Language;
  onToggleLanguage: () => void;
  t: any;
}

const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onToggleLanguage,
  t,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items for GooeyNav
  const navItems = [
    { label: t.features, href: '#features' },
    { label: t.ourWhy, href: '#why' },
    { label: t.demo, href: '#demo' },
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gray-900/95 backdrop-blur-md py-2 shadow-lg'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Mic className="h-6 w-6 text-purple-400 mr-2" />
            <span className="text-white font-bold text-xl tracking-tight">
              VoiceCart
            </span>
          </div>

          {/* Desktop Navigation with GooeyNav */}
          <div className="hidden md:flex items-center space-x-8">
            {/* GooeyNav Container */}
            <div className="relative h-12 w-auto">
              <GooeyNav
                items={navItems}
                particleCount={12}
                particleDistances={[70, 8]}
                particleR={80}
                initialActiveIndex={0}
                animationTime={500}
                timeVariance={200}
                colors={[1, 2, 3, 1, 2, 3]}
                onItemClick={handleNavClick}
              />
            </div>

            <LanguageToggle
              currentLang={currentLang}
              onToggle={onToggleLanguage}
            />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <LanguageToggle
              currentLang={currentLang}
              onToggle={onToggleLanguage}
            />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Keep original for mobile */}
        {isOpen && (
          <div className="md:hidden mt-4 py-4 bg-gray-900/95 backdrop-blur-md rounded-lg">
            <div className="flex flex-col space-y-4 px-4">
              <a
                href="#features"
                className="text-gray-300 hover:text-purple-400 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {t.features}
              </a>
              <a
                href="#why"
                className="text-gray-300 hover:text-purple-400 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {t.ourWhy}
              </a>
              <a
                href="#demo"
                className="text-gray-300 hover:text-purple-400 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {t.demo}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
