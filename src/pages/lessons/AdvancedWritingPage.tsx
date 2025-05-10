import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Check, ChevronDown, ChevronUp, Play, Volume2, X, Send } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserProgress } from '../../hooks/useUserProgress';
import { useAuth } from '../../contexts/AuthContext';

interface WritingPrompt {
  id: string;
  title: string;
  description: string;
  example: string;
  exampleTranslation: string;
  tips: string[];
  keywords: string[];
}

interface WritingCategory {
  id: string;
  title: string;
  description: string;
  prompts: WritingPrompt[];
}

const AdvancedWritingPage: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { updateProgress } = useUserProgress();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<WritingPrompt | null>(null);
  const [userResponse, setUserResponse] = useState('');
  const [timeSpent, setTimeSpent] = useState(0);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [exerciseMode, setExerciseMode] = useState<'creative' | 'analytical' | 'descriptive' | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
      updateProgress('advanced-writing', { timeSpent: 1 });
    }
    
    return () => {
      if (user && timeSpent > 0) {
        const exerciseCompletion = userResponse.length > 100 ? 1 : 0;
        const completed = timeSpent > 15 || exerciseCompletion >= 1;
        
        updateProgress('advanced-writing', { 
          timeSpent, 
          completed: completed
        });
      }
    };
  }, [user, timeSpent, userResponse, updateProgress]);

  const writingCategories: WritingCategory[] = [
    {
      id: 'academic',
      title: 'Academic Writing',
      description: 'Develop formal academic writing skills in Georgian',
      prompts: [
        {
          id: 'research-paper',
          title: 'Research Paper Introduction',
          description: 'Write an introduction for a research paper about Georgian cultural heritage',
          example: 'საქართველოს კულტურული მემკვიდრეობა მრავალფეროვანი და მდიდარია...',
          exampleTranslation: 'Georgia\'s cultural heritage is diverse and rich...',
          tips: [
            'Start with a broad statement about the topic',
            'Narrow down to your specific focus',
            'Include a clear thesis statement',
            'Use formal academic language',
            'Maintain an objective tone'
          ],
          keywords: ['კვლევა', 'ანალიზი', 'მემკვიდრეობა', 'კულტურა', 'მნიშვნელობა']
        },
        {
          id: 'literature-review',
          title: 'Literature Review',
          description: 'Write a literature review section about Georgian poetry',
          example: 'ქართული პოეზიის განვითარება საუკუნეების მანძილზე...',
          exampleTranslation: 'The development of Georgian poetry throughout the centuries...',
          tips: [
            'Synthesize multiple sources',
            'Compare different perspectives',
            'Use transitional phrases',
            'Maintain chronological or thematic organization',
            'Cite sources appropriately'
          ],
          keywords: ['ლიტერატურა', 'პოეზია', 'ანალიზი', 'განვითარება', 'კვლევა']
        }
      ]
    },
    {
      id: 'creative',
      title: 'Creative Writing',
      description: 'Express yourself through creative writing in Georgian',
      prompts: [
        {
          id: 'short-story',
          title: 'Short Story',
          description: 'Write a short story about a traditional Georgian celebration',
          example: 'სოფელში დილიდანვე სამზადისი იყო...',
          exampleTranslation: 'The village was busy with preparations since morning...',
          tips: [
            'Create vivid descriptions',
            'Develop interesting characters',
            'Use dialogue effectively',
            'Build tension and resolution',
            'Include sensory details'
          ],
          keywords: ['დღესასწაული', 'ტრადიცია', 'სოფელი', 'ოჯახი', 'ზეიმი']
        },
        {
          id: 'poetry',
          title: 'Poetry',
          description: 'Compose a poem about Georgian landscapes',
          example: 'მთების სილუეტი ცის კიდეზე...',
          exampleTranslation: 'The silhouette of mountains on the horizon...',
          tips: [
            'Use metaphors and similes',
            'Consider rhythm and meter',
            'Include vivid imagery',
            'Express emotions through words',
            'Experiment with form'
          ],
          keywords: ['მთები', 'ბუნება', 'პეიზაჟი', 'სილამაზე', 'განცდა']
        }
      ]
    },
    {
      id: 'professional',
      title: 'Professional Writing',
      description: 'Master professional writing for business and formal contexts',
      prompts: [
        {
          id: 'business-proposal',
          title: 'Business Proposal',
          description: 'Write a business proposal for a cultural tourism project',
          example: 'წარმოგიდგენთ პროექტს, რომელიც მიზნად ისახავს...',
          exampleTranslation: 'We present a project that aims to...',
          tips: [
            'Use clear and concise language',
            'Include specific objectives',
            'Present a detailed plan',
            'Address potential concerns',
            'Maintain professional tone'
          ],
          keywords: ['პროექტი', 'ბიზნესი', 'ტურიზმი', 'განვითარება', 'მიზანი']
        },
        {
          id: 'formal-letter',
          title: 'Formal Letter',
          description: 'Write a formal letter to a cultural institution',
          example: 'პატივცემულო ქალბატონო/ბატონო...',
          exampleTranslation: 'Dear Sir/Madam...',
          tips: [
            'Follow formal letter structure',
            'Use appropriate salutations',
            'State purpose clearly',
            'Maintain formal tone',
            'End appropriately'
          ],
          keywords: ['წერილი', 'ფორმალური', 'მიმართვა', 'თხოვნა', 'პატივისცემა']
        }
      ]
    },
    {
      id: 'journalistic',
      title: 'Journalistic Writing',
      description: 'Learn to write news articles and feature stories',
      prompts: [
        {
          id: 'news-article',
          title: 'News Article',
          description: 'Write a news article about a cultural event',
          example: 'გუშინ თბილისის ოპერის თეატრში გაიმართა...',
          exampleTranslation: 'Yesterday at the Tbilisi Opera House...',
          tips: [
            'Follow inverted pyramid structure',
            'Include the 5 W\'s (Who, What, When, Where, Why)',
            'Use objective language',
            'Include relevant quotes',
            'Write clear headlines'
          ],
          keywords: ['ღონისძიება', 'კულტურა', 'თეატრი', 'პრემიერა', 'წარმოდგენა']
        },
        {
          id: 'feature-story',
          title: 'Feature Story',
          description: 'Write a feature story about Georgian artisans',
          example: 'ხის მჭრელი გიორგი მთელი ცხოვრება ამ საქმეს ემსახურება...',
          exampleTranslation: 'Woodcarver Giorgi has dedicated his life to this craft...',
          tips: [
            'Start with an engaging hook',
            'Include personal stories',
            'Use descriptive language',
            'Balance facts and narrative',
            'End with impact'
          ],
          keywords: ['ხელოსანი', 'ტრადიცია', 'ოსტატი', 'ხელოვნება', 'მემკვიდრეობა']
        }
      ]
    }
  ];

  const toggleCategory = (categoryId: string) => {
    updateActivity();
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
      setTimeout(() => {
        if (categoryRefs.current[categoryId]) {
          categoryRefs.current[categoryId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const handlePromptSelect = (prompt: WritingPrompt) => {
    updateActivity();
    setSelectedPrompt(prompt);
    setUserResponse('');
    setShowFeedback(false);
    setFeedback('');
    
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleSubmit = () => {
    updateActivity();
    if (userResponse.length < 50) {
      setFeedback('Please write a longer response to receive meaningful feedback.');
      setShowFeedback(true);
      return;
    }

    // Here you would normally send the response for evaluation
    setFeedback('Your writing has been submitted for review. Keep practicing!');
    setShowFeedback(true);
  };

  return (
    <div className="pt-16 pb-16" onClick={updateActivity}>
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-indigo-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}>Advanced Writing</span> - მაღალი დონის წერა
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Develop sophisticated writing skills in Georgian across various genres and styles.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  to="/advanced"
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' 
                      ? 'bg-gray-700 text-white hover:bg-gray-600' 
                      : 'bg-white text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Advanced Level
                </Link>
                <Link
                  to="/advanced/quiz/writing"
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' ? 'bg-indigo-700 text-white hover:bg-indigo-800' : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  Take Quiz
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="hidden md:block md:w-1/3">
              <div className={`p-6 rounded-lg shadow-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                <BookOpen className={`w-12 h-12 mb-4 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Writing Tips
                </h3>
                <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• Plan your writing before starting</li>
                  <li>• Use appropriate style for each context</li>
                  <li>• Pay attention to grammar and structure</li>
                  <li>• Review and revise your work</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {writingCategories.map((category) => (
              <div
                key={category.id}
                ref={el => categoryRefs.current[category.id] = el}
              >
                <button
                  onClick={() => toggleCategory(category.id)}
                  className={`w-full p-6 rounded-lg text-left transition-colors ${
                    theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
                  } shadow-lg`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {category.title}
                      </h2>
                      <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                        {category.description}
                      </p>
                    </div>
                    {expandedCategory === category.id ? (
                      <ChevronUp className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                    ) : (
                      <ChevronDown className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                    )}
                  </div>
                </button>

                {expandedCategory === category.id && (
                  <div className="mt-4 space-y-4">
                    {category.prompts.map((prompt) => (
                      <div
                        key={prompt.id}
                        className={`p-6 rounded-lg ${
                          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                        } shadow-lg`}
                      >
                        <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {prompt.title}
                        </h3>
                        <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          {prompt.description}
                        </p>
                        
                        <div className={`p-4 rounded-lg mb-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <p className={`font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            Example:
                          </p>
                          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                            {prompt.example}
                          </p>
                          <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            {prompt.exampleTranslation}
                          </p>
                        </div>
                        
                        <div className="mb-4">
                          <p className={`font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            Writing Tips:
                          </p>
                          <ul className={`list-disc pl-5 space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                            {prompt.tips.map((tip, index) => (
                              <li key={index}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="mb-4">
                          <p className={`font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            Key Words:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {prompt.keywords.map((keyword, index) => (
                              <span
                                key={index}
                                className={`px-3 py-1 rounded-full text-sm ${
                                  theme === 'dark'
                                    ? 'bg-gray-700 text-gray-300'
                                    : 'bg-gray-100 text-gray-700'
                                }`}
                              >
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handlePromptSelect(prompt)}
                          className={`w-full py-2 px-4 rounded-lg text-white font-medium ${
                            theme === 'dark'
                              ? 'bg-indigo-600 hover:bg-indigo-700'
                              : 'bg-indigo-500 hover:bg-indigo-600'
                          }`}
                        >
                          Start Writing
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedPrompt && (
        <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-indigo-50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {selectedPrompt.title}
              </h3>
              
              <div className={`mb-4 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-50'}`}>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  {selectedPrompt.description}
                </p>
              </div>
              
              <textarea
                ref={textareaRef}
                value={userResponse}
                onChange={(e) => setUserResponse(e.target.value)}
                placeholder="Start writing here..."
                className={`w-full h-64 p-4 rounded-lg mb-4 ${
                  theme === 'dark'
                    ? 'bg-gray-800 text-white placeholder-gray-500'
                    : 'bg-white text-gray-900 placeholder-gray-400'
                } border ${
                  theme === 'dark' ? 'border-gray-600' : 'border-gray-300'
                }`}
              />
              
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setSelectedPrompt(null)}
                  className={`px-4 py-2 rounded ${
                    theme === 'dark'
                      ? 'bg-gray-600 hover:bg-gray-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  }`}
                >
                  Cancel
                </button>
                
                <button
                  onClick={handleSubmit}
                  disabled={userResponse.length < 50}
                  className={`px-4 py-2 rounded flex items-center ${
                    userResponse.length < 50
                      ? (theme === 'dark' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                      : (theme === 'dark' ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-indigo-500 hover:bg-indigo-600 text-white')
                  }`}
                >
                  Submit
                  <Send className="ml-2 h-4 w-4" />
                </button>
              </div>
              
              {showFeedback && (
                <div className={`mt-4 p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-600' : 'bg-gray-100'
                }`}>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    {feedback}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Additional Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Writing Guidelines
              </h3>
              <ul className={`list-disc pl-5 space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Always plan your writing with an outline</li>
                <li>Use appropriate style and tone for your audience</li>
                <li>Include clear transitions between paragraphs</li>
                <li>Support main points with examples</li>
                <li>Review and revise your work multiple times</li>
              </ul>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Common Mistakes to Avoid
              </h3>
              <ul className={`list-disc pl-5 space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Mixing formal and informal language</li>
                <li>Incorrect use of punctuation</li>
                <li>Poor paragraph structure</li>
                <li>Inconsistent verb tenses</li>
                <li>Lack of clear topic sentences</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdvancedWritingPage;