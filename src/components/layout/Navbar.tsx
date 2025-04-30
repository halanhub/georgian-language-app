import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogIn, Menu, Moon, Sun, X } from 'lucide-react';
import logo from '/src/assets/images/logo.png'; 
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';


const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-20 transition-all duration-300 ${
      isScrolled || isMenuOpen
        ? theme === 'dark'
          ? 'bg-gray-800 shadow-lg'
          : 'bg-white shadow-lg'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/src/assets/images/logo.png"
                alt="Logo"
                className="h-8 w-8 object-contain"
              />
              <span className="font-georgia text-xl font-bold">ქართული ენა</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? theme === 'dark'
                    ? 'bg-gray-700 text-white'
                    : 'bg-red-100 text-red-700'
                  : theme === 'dark'
                    ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    : 'text-gray-700 hover:bg-red-50 hover:text-red-700'
              }`}>
                Home
              </Link>

              {user ? (
                <>
                  <Link to="/beginner" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname.includes('/beginner')
                      ? theme === 'dark'
                        ? 'bg-gray-700 text-white'
                        : 'bg-red-100 text-red-700'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        : 'text-gray-700 hover:bg-red-50 hover:text-red-700'
                  }`}>
                    Beginner
                  </Link>

                  <Link to="/intermediate" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname.includes('/intermediate')
                      ? theme === 'dark'
                        ? 'bg-gray-700 text-white'
                        : 'bg-red-100 text-red-700'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        : 'text-gray-700 hover:bg-red-50 hover:text-red-700'
                  }`}>
                    Intermediate
                  </Link>

                  <Link to="/advanced" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname.includes('/advanced')
                      ? theme === 'dark'
                        ? 'bg-gray-700 text-white'
                        : 'bg-red-100 text-red-700'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        : 'text-gray-700 hover:bg-red-50 hover:text-red-700'
                  }`}>
                    Advanced
                  </Link>

                  <Link to="/chat" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === '/chat'
                      ? theme === 'dark'
                        ? 'bg-gray-700 text-white'
                        : 'bg-red-100 text-red-700'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        : 'text-gray-700 hover:bg-red-50 hover:text-red-700'
                  }`}>
                    AI Chat
                  </Link>

                  <button
                    onClick={handleLogout}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        : 'text-gray-700 hover:bg-red-50 hover:text-red-700'
                    } transition-colors`}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === '/login'
                      ? theme === 'dark'
                        ? 'bg-gray-700 text-white'
                        : 'bg-red-100 text-red-700'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        : 'text-gray-700 hover:bg-red-50 hover:text-red-700'
                  }`}>
                    Login
                  </Link>

                  <Link to="/signup" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    theme === 'dark'
                      ? 'bg-red-700 text-white hover:bg-red-800'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}>
                    Sign Up
                  </Link>
                </>
              )}

              <button
                onClick={toggleTheme}
                className="ml-2 p-2 rounded-full text-gray-400 hover:text-gray-300 focus:outline-none"
                aria-label="Toggle dark mode"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-400 hover:text-gray-300 focus:outline-none mr-2"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={toggleMenu}
              className={`p-2 rounded-md focus:outline-none ${
                theme === 'dark'
                  ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <Link to="/" className={`block px-3 py-2 rounded-md text-base font-medium ${
            location.pathname === '/'
              ? theme === 'dark'
                ? 'bg-gray-700 text-white'
                : 'bg-red-100 text-red-700'
              : theme === 'dark'
                ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                : 'text-gray-700 hover:bg-red-50 hover:text-red-700'
          }`} onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>

          {user ? (
            <>
              <Link to="/beginner" className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname.includes('/beginner')
                  ? theme === 'dark'
                    ? 'bg-gray-700 text-white'
                    : 'bg-red-100 text-red-700'
                  : theme === 'dark'
                    ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    : 'text-gray-700 hover:bg-red-50 hover:text-red-700'
              }`} onClick={() => setIsMenuOpen(false)}>
                Beginner
              </Link>

              <Link to="/intermediate" className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname.includes('/intermediate')
                  ? theme === 'dark'
                    ? 'bg-gray-700 text-white'
                    : 'bg-red-100 text-red-700'
                  : theme === 'dark'
                    ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    : 'text-gray-700 hover:bg-red-50 hover:text-red-700'
              }`} onClick={() => setIsMenuOpen(false)}>
                Intermediate
              </Link>

              <Link to="/advanced" className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname.includes('/advanced')
                  ? theme === 'dark'
                    ? 'bg-gray-700 text-white'
                    : 'bg-red-100 text-red-700'
                  : theme === 'dark'
                    ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    : 'text-gray-700 hover:bg-red-50 hover:text-red-700'
              }`} onClick={() => setIsMenuOpen(false)}>
                Advanced
              </Link>

              <Link to="/chat" className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/chat'
                  ? theme === 'dark'
                    ? 'bg-gray-700 text-white'
                    : 'bg-red-100 text-red-700'
                  : theme === 'dark'
                    ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    : 'text-gray-700 hover:bg-red-50 hover:text-red-700'
              }`} onClick={() => setIsMenuOpen(false)}>
                AI Chat
              </Link>

              <button
                onClick={handleLogout}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  theme === 'dark'
                    ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    : 'text-gray-700 hover:bg-red-50 hover:text-red-700'
                }`}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/login'
                  ? theme === 'dark'
                    ? 'bg-gray-700 text-white'
                    : 'bg-red-100 text-red-700'
                  : theme === 'dark'
                    ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    : 'text-gray-700 hover:bg-red-50 hover:text-red-700'
              }`} onClick={() => setIsMenuOpen(false)}>
                <LogIn className="inline mr-2" size={18} />
                Login
              </Link>

              <Link to="/signup" className={`block px-3 py-2 rounded-md text-base font-medium ${
                theme === 'dark'
                  ? 'bg-red-700 text-white hover:bg-red-800'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`} onClick={() => setIsMenuOpen(false)}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
