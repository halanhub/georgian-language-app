import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogIn, Menu, Moon, Sun, X, User, Settings, LogOut, Mail, CreditCard } from 'lucide-react';
import logo from '/src/assets/images/logo.png'; 
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';


const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
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

                  <div className="relative">
                    <button
                      onClick={toggleProfileMenu}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        theme === 'dark'
                          ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                          : 'text-gray-700 hover:bg-red-50 hover:text-red-700'
                      } transition-colors`}
                    >
                      <User size={18} className="mr-1" />
                      {user.displayName?.split(' ')[0] || 'Profile'}
                    </button>
                    
                    {isProfileMenuOpen && (
                      <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${
                        theme === 'dark' ? 'bg-gray-700' : 'bg-white'
                      } ring-1 ring-black ring-opacity-5 z-50`}>
                        <Link
                          to="/settings"
                          className={`block px-4 py-2 text-sm ${
                            theme === 'dark' ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'
                          }`}
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          <Settings size={16} className="inline mr-2" />
                          Settings
                        </Link>
                        <Link
                          to="/pricing"
                          className={`block px-4 py-2 text-sm ${
                            theme === 'dark' ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'
                          }`}
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          <CreditCard size={16} className="inline mr-2" />
                          Subscription
                        </Link>
                        <button
                          onClick={handleLogout}
                          className={`block w-full text-left px-4 py-2 text-sm ${
                            theme === 'dark' ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <LogOut size={16} className="inline mr-2" />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
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

              <div className="border-t border-gray-700 my-2 pt-2">
                <Link to="/settings" className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === '/settings'
                    ? theme === 'dark'
                      ? 'bg-gray-700 text-white'
                      : 'bg-red-100 text-red-700'
                    : theme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      : 'text-gray-700 hover:bg-red-50 hover:text-red-700'
                }`} onClick={() => setIsMenuOpen(false)}>
                  <Settings size={18} className="mr-2" />
                  Profile Settings
                </Link>

                <Link to="/pricing" className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === '/pricing'
                    ? theme === 'dark'
                      ? 'bg-gray-700 text-white'
                      : 'bg-red-100 text-red-700'
                    : theme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      : 'text-gray-700 hover:bg-red-50 hover:text-red-700'
                }`} onClick={() => setIsMenuOpen(false)}>
                  <CreditCard size={18} className="mr-2" />
                  Subscription
                </Link>

                <Link to="/contact" className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === '/contact'
                    ? theme === 'dark'
                      ? 'bg-gray-700 text-white'
                      : 'bg-red-100 text-red-700'
                    : theme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      : 'text-gray-700 hover:bg-red-50 hover:text-red-700'
                }`} onClick={() => setIsMenuOpen(false)}>
                  <Mail size={18} className="mr-2" />
                  Contact Support
                </Link>

                <button
                  onClick={handleLogout}
                  className={`flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    theme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      : 'text-gray-700 hover:bg-red-50 hover:text-red-700'
                  }`}
                >
                  <LogOut size={18} className="mr-2" />
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
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