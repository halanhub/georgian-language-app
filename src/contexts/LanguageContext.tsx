import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type Language = 'en' | 'ru';

type LanguageContextType = {
  language: Language;
  changeLanguage: (lang: Language) => void;
  availableLanguages: { code: Language; name: string }[];
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<Language>('en');

  const availableLanguages = [
    { code: 'en' as Language, name: 'English' },
    { code: 'ru' as Language, name: 'Русский' }
  ];

  useEffect(() => {
    // Initialize language from localStorage or browser preference
    const savedLang = localStorage.getItem('i18nextLng');
    if (savedLang) {
      const langCode = savedLang.split('-')[0];
      if (langCode === 'en' || langCode === 'ru') {
        setLanguage(langCode as Language);
      }
    }
  }, []);

  useEffect(() => {
    // Sync with i18n when language changes
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    // Save to localStorage
    localStorage.setItem('i18nextLng', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};