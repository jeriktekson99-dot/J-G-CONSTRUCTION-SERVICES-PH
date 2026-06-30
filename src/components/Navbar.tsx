import React, { useState, useEffect } from 'react';
import SgLogo from './SgLogo';
import { Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'about' | 'services' | 'portfolio' | 'get-started' | 'privacy-policy' | 'terms-of-use' | 'safety-compliance';
  setView: (view: 'home' | 'about' | 'services' | 'portfolio' | 'get-started' | 'privacy-policy' | 'terms-of-use' | 'safety-compliance') => void;
  onScrollToSection: (id: string) => void;
}

export default function Navbar({ currentView, setView, onScrollToSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setIsOpen(false);
    onScrollToSection(sectionId);
  };

  const handleViewClick = (viewName: 'home' | 'about' | 'services' | 'portfolio' | 'get-started' | 'privacy-policy' | 'terms-of-use' | 'safety-compliance') => {
    setIsOpen(false);
    setView(viewName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav 
      id="jg-nav-bar"
      className={`fixed top-0 left-0 w-full z-50 bg-[#D12229] transition-all duration-300 ${
        scrolled ? 'border-b border-red-800 shadow-[0_2px_15px_rgba(0,0,0,0.15)] py-4' : 'border-b border-red-500 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Left: Brand logo & name */}
          <button 
            onClick={() => handleViewClick('home')}
            className="flex items-center gap-3 group cursor-pointer focus:outline-none"
            aria-label="J/G Construction Services Homepage"
          >
            <img 
              src="https://lh3.googleusercontent.com/d/1TztSWdzD5w6pHrnNZUMhsRde0r2ncMtz"
              alt="J/G Logo"
              className="h-10 w-10 sm:h-11 sm:w-11 transition-transform duration-500 group-hover:rotate-12 object-contain"
              referrerPolicy="no-referrer"
            />
            <span className="font-display font-black text-white tracking-tight hover:text-red-100 transition-colors text-lg sm:text-xl lg:text-2xl">
              J/G CONSTRUCTION SERVICES
            </span>
          </button>

          {/* Center/Right: Nav links for wide screens - Exactly: Home, About, Services, Portfolio */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 ml-auto">
            <button 
              onClick={() => handleViewClick('home')} 
              className={`font-display font-black text-base transition-colors cursor-pointer ${
                currentView === 'home' ? 'text-white border-b-2 border-white pb-1' : 'text-red-100 hover:text-white hover:border-b hover:border-white pb-1'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => handleViewClick('about')} 
              className={`font-display font-black text-base transition-colors cursor-pointer ${
                currentView === 'about' ? 'text-white border-b-2 border-white pb-1' : 'text-red-100 hover:text-white hover:border-b hover:border-white pb-1'
              }`}
            >
              About
            </button>
            <button 
              onClick={() => handleViewClick('services')} 
              className={`font-display font-black text-base transition-colors cursor-pointer ${
                currentView === 'services' ? 'text-white border-b-2 border-white pb-1' : 'text-red-100 hover:text-white hover:border-b hover:border-white pb-1'
              }`}
            >
              Services
            </button>
            <button 
              onClick={() => handleViewClick('portfolio')} 
              className={`font-display font-black text-base transition-colors cursor-pointer ${
                currentView === 'portfolio' ? 'text-white border-b-2 border-white pb-1' : 'text-red-100 hover:text-white hover:border-b hover:border-white pb-1'
              }`}
            >
              Portfolio
            </button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex md:hidden ml-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div className="md:hidden bg-[#D12229] border-t border-red-500 border-b border-red-700">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 text-left">
            <button
              onClick={() => handleViewClick('home')}
              className={`block w-full text-left px-3 py-3 rounded-none text-lg font-black transition-colors ${
                currentView === 'home' ? 'text-white bg-red-700' : 'text-red-100 hover:text-white hover:bg-red-700'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleViewClick('about')}
              className={`block w-full text-left px-3 py-3 rounded-none text-lg font-black transition-colors ${
                currentView === 'about' ? 'text-white bg-red-700' : 'text-red-100 hover:text-white hover:bg-red-700'
              }`}
            >
              About
            </button>
            <button
              onClick={() => handleViewClick('services')}
              className={`block w-full text-left px-3 py-3 rounded-none text-lg font-black transition-colors ${
                currentView === 'services' ? 'text-white bg-red-700' : 'text-red-100 hover:text-white hover:bg-red-700'
              }`}
            >
              Services
            </button>
            <button
              onClick={() => handleViewClick('portfolio')}
              className={`block w-full text-left px-3 py-3 rounded-none text-lg font-black transition-colors ${
                currentView === 'portfolio' ? 'text-white bg-red-700' : 'text-red-100 hover:text-white hover:bg-red-700'
              }`}
            >
              Portfolio
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
