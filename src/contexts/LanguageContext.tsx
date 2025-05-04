import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type Language = 'en' | 'ru' | 'ka';

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
    { code: 'ru' as Language, name: 'Русский' },
    { code: 'ka' as Language, name: 'ქართული' }
  ];

  useEffect(() => {
    // Initialize language from i18n
    const currentLang = i18n.language.split('-')[0];
    if (currentLang === 'en' || currentLang === 'ru' || currentLang === 'ka') {
      setLanguage(currentLang as Language);
    }
  }, [i18n.language]);

  const changeLanguage = (lang: Language) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    // Save to localStorage
    localStorage.setItem('i18nextLng', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};