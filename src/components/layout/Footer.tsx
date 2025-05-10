import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, HelpCircle, Facebook, Instagram } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`py-6 ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              &copy; {currentYear} ქართული ენა. {t('footer.rights')}
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <Link 
              to="/contact" 
              className={`text-sm ${theme === 'dark' ? 'hover:text-white' : 'hover:text-red-600'} transition-colors`}
              aria-label="Contact us"
            >
              <Mail size={18} className="inline mr-1" />
              {t('footer.contact')}
            </Link>

            <Link 
              to="/faq" 
              className={`text-sm ${theme === 'dark' ? 'hover:text-white' : 'hover:text-red-600'} transition-colors`}
              aria-label="FAQ"
            >
              <HelpCircle size={18} className="inline mr-1" />
              {t('footer.faq')}
            </Link>

            <a 
              href="https://www.facebook.com/profile.php?id=61576210552897" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`text-sm ${theme === 'dark' ? 'hover:text-white' : 'hover:text-red-600'} transition-colors`}
              aria-label="Facebook"
            >
              <Facebook size={18} className="inline mr-1" />
              Facebook
            </a>

            <a 
              href="https://www.instagram.com/kartuliena_learngeorgian/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`text-sm ${theme === 'dark' ? 'hover:text-white' : 'hover:text-red-600'} transition-colors`}
              aria-label="Instagram"
            >
              <Instagram size={18} className="inline mr-1" />
              Instagram
            </a>

            <div className="flex items-center">
              <span className="text-sm">{t('footer.made_with')}</span>
              <Heart size={16} className={`mx-1 ${theme === 'dark' ? 'text-red-400' : 'text-red-500'}`} />
              <span className="text-sm">{t('footer.for_learners')}</span>
            </div>
          </div>
        </div>
        
        {/* SEO Footer Links */}
        <div className={`mt-6 pt-6 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} grid grid-cols-1 md:grid-cols-4 gap-6`}>
          <div>
            <h3 className={`text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t('nav.beginner')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/beginner/alphabet" className={`text-sm ${theme === 'dark' ? 'hover:text-white' : 'hover:text-red-600'}`}>{t('nav.alphabet')}</Link>
              </li>
              <li>
                <Link to="/beginner/basic-vocabulary" className={`text-sm ${theme === 'dark' ? 'hover:text-white' : 'hover:text-red-600'}`}>{t('beginner.topics.vocabulary.name')}</Link>
              </li>
              <li>
                <Link to="/beginner/numbers" className={`text-sm ${theme === 'dark' ? 'hover:text-white' : 'hover:text-red-600'}`}>{t('beginner.topics.numbers.name')}</Link>
              </li>
              <li>
                <Link to="/beginner/colors-and-shapes" className={`text-sm ${theme === 'dark' ? 'hover:text-white' : 'hover:text-red-600'}`}>{t('beginner.topics.colors.name')}</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className={`text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t('home.levels.title')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/beginner" className={`text-sm ${theme === 'dark' ? 'hover:text-white' : 'hover:text-red-600'}`}>{t('nav.beginner')}</Link>
              </li>
              <li>
                <Link to="/intermediate" className={`text-sm ${theme === 'dark' ? 'hover:text-white' : 'hover:text-red-600'}`}>{t('nav.intermediate')}</Link>
              </li>
              <li>
                <Link to="/advanced" className={`text-sm ${theme === 'dark' ? 'hover:text-white' : 'hover:text-red-600'}`}>{t('nav.advanced')}</Link>
              </li>
              <li>
                <Link to="/quizzes" className={`text-sm ${theme === 'dark' ? 'hover:text-white' : 'hover:text-red-600'}`}>{t('nav.quizzes')}</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className={`text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t('common.resources')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/learning-tips" className={`text-sm ${theme === 'dark' ? 'hover:text-white' : 'hover:text-red-600'}`}>{t('nav.learning_tips')}</Link>
              </li>
              <li>
                <Link to="/vocabulary" className={`text-sm ${theme === 'dark' ? 'hover:text-white' : 'hover:text-red-600'}`}>{t('nav.vocabulary')}</Link>
              </li>
              <li>
                <Link to="/intermediate/grammar" className={`text-sm ${theme === 'dark' ? 'hover:text-white' : 'hover:text-red-600'}`}>{t('intermediate.topics.grammar.name')}</Link>
              </li>
              <li>
                <Link to="/faq" className={`text-sm ${theme === 'dark' ? 'hover:text-white' : 'hover:text-red-600'}`}>{t('common.faq')}</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className={`text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t('common.about_us')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className={`text-sm ${theme === 'dark' ? 'hover:text-white' : 'hover:text-red-600'}`}>{t('footer.contact')}</Link>
              </li>
              <li>
                <Link to="/support" className={`text-sm ${theme === 'dark' ? 'hover:text-white' : 'hover:text-red-600'}`}>{t('common.support')}</Link>
              </li>
              <li>
                <Link to="/terms-of-service" className={`text-sm ${theme === 'dark' ? 'hover:text-white' : 'hover:text-red-600'}`}>{t('common.terms')}</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className={`text-sm ${theme === 'dark' ? 'hover:text-white' : 'hover:text-red-600'}`}>{t('common.privacy')}</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;