import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Volume2,
  X,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useUserProgress } from '../hooks/useUserProgress';
import { useAuth } from '../contexts/AuthContext';

const AdvanceIdiomsPage: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { updateProgress } = useUserProgress();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const timeDiff = now - lastActivityTime;
      if (timeDiff < 5 * 60 * 1000) {
        setTimeSpent(prev => prev + 1);
      }
      setLastActivityTime(now);
    }, 60000);
    return () => clearInterval(interval);
  }, [lastActivityTime]);

  const updateActivity = () => {
    setLastActivityTime(Date.now());
  };

  useEffect(() => {
    if (user) {
      updateProgress('idioms', { timeSpent: 1 });
    }
    return () => {
      if (user && timeSpent > 0) {
        updateProgress('idioms', {
          timeSpent,
          completed: timeSpent > 10,
        });
      }
    };
  }, [user, timeSpent, updateProgress]);

  const toggleCategory = (id: string) => {
    updateActivity();
    setExpandedCategory(prev => (prev === id ? null : id));
    setTimeout(() => {
      if (categoryRefs.current[id]) {
        categoryRefs.current[id]?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const playAudio = (text: string) => {
    updateActivity();
    if (isPlaying === text) {
      setIsPlaying(null);
    } else {
      setIsPlaying(text);
      setTimeout(() => setIsPlaying(null), 1000);
    }
  };

  const idioms = [
    {
      id: 'example',
      title: 'Common Idioms',
      description: 'Useful idiomatic expressions in Georgian.',
      entries: [
        {
          georgian: 'ენას კბილი დააჭირე',
          latin: 'enas kbili daachire',
          meaning: 'Hold your tongue',
          literal: 'Put your tooth on your tongue',
          example: 'ენას კბილი დააჭირე, არავინ გეკითხება!',
          translation: 'Hold your tongue, no one is asking you!',
        },
        {
          georgian: 'გული გაუსკდა',
          latin: 'guli gauskda',
          meaning: 'Terrified',
          literal: 'Heart burst',
          example: 'ხმაურზე გული გამისკდა.',
          translation: 'The noise terrified me.',
        },
      ],
    },
  ];

  return (
    <div className="pt-16 pb-16" onClick={updateActivity}>
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-indigo-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}>Idiomatic Expressions</span>
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Learn useful Georgian idioms with literal and contextual meanings.
              </p>
              <div className="flex gap-4">
                <Link to="/advanced" className="inline-flex items-center px-4 py-2 text-sm font-medium rounded bg-white shadow">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Advanced
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {idioms.map((category) => (
            <div key={category.id} ref={(el) => (categoryRefs.current[category.id] = el)}>
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full p-6 text-left bg-gray-100 dark:bg-gray-800 rounded-lg shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">{category.title}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{category.description}</p>
                  </div>
                  {expandedCategory === category.id ? <ChevronUp /> : <ChevronDown />}
                </div>
              </button>
              {expandedCategory === category.id && (
                <div className="mt-4 space-y-4">
                  {category.entries.map((idiom, index) => (
                    <div key={index} className="p-4 rounded bg-white dark:bg-gray-700 shadow">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold">{idiom.georgian}</h3>
                        <button
                          onClick={() => playAudio(idiom.georgian)}
                          className="p-2 rounded-full bg-gray-200 dark:bg-gray-600"
                        >
                          {isPlaying === idiom.georgian ? <X size={16} /> : <Volume2 size={16} />}
                        </button>
                      </div>
                      <p className="text-sm italic">/{idiom.latin}/</p>
                      <p><strong>Literal:</strong> {idiom.literal}</p>
                      <p><strong>Meaning:</strong> {idiom.meaning}</p>
                      <p className="mt-2"><strong>Example:</strong> {idiom.example}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{idiom.translation}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdvanceIdiomsPage;
