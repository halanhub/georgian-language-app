import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  AlignJustify, 
  BookOpen, 
  Brain,
  Dices, 
  GraduationCap, 
  Lightbulb, 
  Mail,
  MessageSquare, 
  Palette, 
  PenTool, 
  Settings,
  Trophy, 
  User
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const location = useLocation();
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);

  // Mock progress data - in a real app, this would come from a database
  const progressData = {
    lessonsCompleted: 3,
    totalLessons: 12,
    quizScore: 75,
    studyStreak: 5
  };

  if (!user) return null;

  const isActive = (path: string) => location.pathname.includes(path);

  return (
    <aside 
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 z-10 hidden md:block overflow-y-auto
      ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} 
      shadow-lg transition-all duration-300`}
    >
      <div className="p-4">
        <div 
          className={`p-4 mb-4 rounded-lg cursor-pointer transition-all ${
            theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-red-50 hover:bg-red-100'
          }`}
          onClick={() => setIsProfileExpanded(!isProfileExpanded)}
        >
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-600' : 'bg-red-100'}`}>
              <User size={24} className={theme === 'dark' ? 'text-red-400' : 'text-red-600'} />
            </div>
            <div className="overflow-hidden">
              <p className="font-medium truncate">{user.displayName || 'Language Learner'}</p>
            </div>
          </div>

          {isProfileExpanded && (
            <div className="mt-4 pt-4 border-t border-gray-600">
              <div className={`space-y-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Learning Level:</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    theme === 'dark' ? 'bg-gray-600' : 'bg-red-100'
                  }`}>Beginner</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Lessons Completed:</span>
                  <span className="text-sm font-medium">{progressData.lessonsCompleted}/{progressData.totalLessons}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Quiz Score:</span>
                  <span className="text-sm font-medium">{progressData.quizScore}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Study Streak:</span>
                  <span className="text-sm font-medium">{progressData.studyStreak} days</span>
                </div>
                <Link 
                  to="/settings" 
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm ${
                    theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-red-50'
                  }`}
                >
                  <Settings size={16} />
                  <span>Profile Settings</span>
                </Link>
                <Link 
                  to="/contact" 
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm ${
                    theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-red-50'
                  }`}
                >
                  <Mail size={16} />
                  <span>Contact Support</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        <nav className="space-y-1">
          <div className="mb-2 text-xs uppercase font-semibold opacity-70 px-3">Learning Levels</div>
          
          <Link 
            to="/beginner" 
            className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
              isActive('/beginner') 
                ? (theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-red-100 text-red-700') 
                : (theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-red-50')
            }`}
          >
            <BookOpen size={18} />
            <span>Beginner</span>
          </Link>
          
          <Link 
            to="/intermediate" 
            className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
              isActive('/intermediate') 
                ? (theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-red-100 text-red-700') 
                : (theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-red-50')
            }`}
          >
            <PenTool size={18} />
            <span>Intermediate</span>
          </Link>
          
          <Link 
            to="/advanced" 
            className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
              isActive('/advanced') 
                ? (theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-red-100 text-red-700') 
                : (theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-red-50')
            }`}
          >
            <GraduationCap size={18} />
            <span>Advanced</span>
          </Link>
          
          <div className="my-2 text-xs uppercase font-semibold opacity-70 px-3 pt-3">Learning Tools</div>
          
          <Link 
            to="/beginner/alphabet" 
            className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
              isActive('/alphabet') 
                ? (theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-red-100 text-red-700') 
                : (theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-red-50')
            }`}
          >
            <AlignJustify size={18} />
            <span>Georgian Alphabet</span>
          </Link>
          
          <Link 
            to="/beginner/vocabulary/colors" 
            className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
              isActive('/vocabulary') 
                ? (theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-red-100 text-red-700') 
                : (theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-red-50')
            }`}
          >
            <Brain size={18} />
            <span>Vocabulary</span>
          </Link>
          
          <Link 
            to="/beginner/quiz/alphabet" 
            className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
              isActive('/quiz') 
                ? (theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-red-100 text-red-700') 
                : (theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-red-50')
            }`}
          >
            <Dices size={18} />
            <span>Quizzes</span>
          </Link>
          
          <Link 
            to="/chat" 
            className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
              isActive('/chat') 
                ? (theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-red-100 text-red-700') 
                : (theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-red-50')
            }`}
          >
            <MessageSquare size={18} />
            <span>AI Chat Assistant</span>
          </Link>
          
          <div className="my-2 text-xs uppercase font-semibold opacity-70 px-3 pt-3">Progress</div>
          
          <Link 
            to="#achievements" 
            className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
              isActive('/achievements') 
                ? (theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-red-100 text-red-700') 
                : (theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-red-50')
            }`}
          >
            <Trophy size={18} />
            <span>Achievements</span>
          </Link>
          
          <Link 
            to="#tips" 
            className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
              isActive('/tips') 
                ? (theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-red-100 text-red-700') 
                : (theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-red-50')
            }`}
          >
            <Lightbulb size={18} />
            <span>Learning Tips</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;