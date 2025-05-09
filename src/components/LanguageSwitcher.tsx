import React, { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

interface LanguageSwitcherProps {
  variant?: 'dropdown' | 'buttons';
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  variant = 'dropdown',
  className = ''
}) => {
  const { language, changeLanguage, availableLanguages } = useLanguage();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (lang: 'en' | 'ru') => {
    changeLanguage(lang);
    setIsOpen(false);
  };

  // Get current language name
  const getCurrentLanguageName = () => {
    const currentLang = availableLanguages.find(lang => lang.code === language);
    return currentLang ? currentLang.name : 'English';
  };

  // Since we're removing language selection, this component will be empty
  return null;
};

export default LanguageSwitcher;