import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserProgress } from '../../hooks/useUserProgress';
import { useAuth } from '../../contexts/AuthContext';

interface Poet {
  id: string;
  name: string;
  period: string;
  bio: string;
  significance: string;
  majorWorks: string[];
  image: string;
}

interface Period {
  id: string;
  title: string;
  description: string;
  poets: Poet[];
}

const LiteraturePoetryPage: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { updateProgress } = useUserProgress();
  const [expandedPeriod, setExpandedPeriod] = useState<string | null>(null);
  const [selectedPoet, setSelectedPoet] = useState<Poet | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());

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
      updateProgress('literature-poetry', { timeSpent: 1 });
    }
    
    return () => {
      if (user && timeSpent > 0) {
        const completed = timeSpent > 15;
        updateProgress('literature-poetry', { 
          timeSpent, 
          completed: completed
        });
      }
    };
  }, [user, timeSpent, updateProgress]);

  const periods: Period[] = [
    {
      id: 'medieval',
      title: 'Medieval Period (5th-12th centuries)',
      description: 'The golden age of Georgian literature, marked by religious and secular works',
      poets: [
        {
          id: 'rustaveli',
          name: 'Shota Rustaveli',
          period: '12th century',
          bio: 'The greatest Georgian poet of the Middle Ages, author of the epic poem "The Knight in the Panther\'s Skin"',
          significance: 'Rustaveli\'s masterpiece represents the pinnacle of Georgian medieval literature, combining chivalric romance with philosophical depth.',
          majorWorks: [
            'The Knight in the Panther\'s Skin (ვეფხისტყაოსანი)',
            'Various lyrical poems'
          ],
          image: 'https://images.pexels.com/photos/3844788/pexels-photo-3844788.jpeg'
        }
      ]
    },
    {
      id: 'romantic',
      title: 'Romantic Period (19th century)',
      description: 'A period of national revival and romantic poetry',
      poets: [
        {
          id: 'baratashvili',
          name: 'Nikoloz Baratashvili',
          period: '1817-1845',
          bio: 'A romantic poet who died at a young age but left a lasting impact on Georgian literature',
          significance: 'Baratashvili\'s poetry represents the height of Georgian Romanticism. His works tackle themes of destiny, loneliness, and the search for meaning.',
          majorWorks: [
            'Merani (მერანი)',
            'Twilight on Mtatsminda (შემოღამება მთაწმინდაზე)',
            'The Blue Horse (ცისფერი ცხენები)'
          ],
          image: 'https://images.pexels.com/photos/2233416/pexels-photo-2233416.jpeg'
        },
        {
          id: 'orbeliani',
          name: 'Grigol Orbeliani',
          period: '1804-1883',
          bio: 'A prominent figure in Georgian literature and politics',
          significance: 'Orbeliani\'s works combine romantic sensibilities with patriotic themes, celebrating Georgian culture and history.',
          majorWorks: [
            'Toast (სადღეგრძელო)',
            'Evening of Spring (საღამო გაზაფხულისა)',
            'The Response to Prince Eristavi (პასუხი თავად ერისთავს)'
          ],
          image: 'https://images.pexels.com/photos/1516440/pexels-photo-1516440.jpeg'
        }
      ]
    },
    {
      id: 'modern',
      title: 'Modern Period (20th century)',
      description: 'Modern Georgian poetry reflecting social and political changes',
      poets: [
        {
          id: 'tabidze',
          name: 'Galaktion Tabidze',
          period: '1892-1959',
          bio: 'One of the most influential Georgian poets of the 20th century',
          significance: 'Tabidze modernized Georgian poetry, introducing new forms and themes while maintaining connections to traditional Georgian verse.',
          majorWorks: [
            'Moon of Mtatsminda (მთაწმინდის მთვარე)',
            'The Wind Blows (ქარი ქრის)',
            'Without Love (უსიყვარულოდ)'
          ],
          image: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg'
        },
        {
          id: 'leonidze',
          name: 'Giorgi Leonidze',
          period: '1899-1966',
          bio: 'A poet known for his lyrical works and connection to Georgian folk traditions',
          significance: 'Leonidze\'s poetry bridges traditional Georgian themes with modern sensibilities, celebrating nature and rural life.',
          majorWorks: [
            'The Wish Tree (ნატვრის ხე)',
            'Georgian Poems (ქართული ლექსები)',
            'Village Evening (სოფლის საღამო)'
          ],
          image: 'https://images.pexels.com/photos/2233414/pexels-photo-2233414.jpeg'
        }
      ]
    },
    {
      id: 'contemporary',
      title: 'Contemporary Period (21st century)',
      description: 'Contemporary Georgian poetry exploring modern themes and forms',
      poets: [
        {
          id: 'samadashvili',
          name: 'Dato Samadashvili',
          period: '1963-present',
          bio: 'A contemporary poet known for experimental forms and urban themes',
          significance: 'Samadashvili\'s work represents the evolution of Georgian poetry in the post-Soviet era, addressing themes of identity and modernity.',
          majorWorks: [
            'City Rhythms (ქალაქის რიტმები)',
            'Digital Dreams (ციფრული სიზმრები)',
            'Metro Station Poems (მეტროს სადგურის ლექსები)'
          ],
          image: 'https://images.pexels.com/photos/3225529/pexels-photo-3225529.jpeg'
        }
      ]
    }
  ];

  const togglePeriod = (periodId: string) => {
    updateActivity();
    setExpandedPeriod(expandedPeriod === periodId ? null : periodId);
    setSelectedPoet(null);
  };

  const handlePoetSelect = (poet: Poet) => {
    updateActivity();
    setSelectedPoet(selectedPoet?.id === poet.id ? null : poet);
  };

  return (
    <div className="pt-16 pb-16" onClick={updateActivity}>
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-indigo-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}>Literature & Poetry</span> - ლიტერატურა და პოეზია
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Explore the rich tradition of Georgian literature through its greatest poets and their works.
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
                  to="/advanced/quiz/literature"
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
                  Study Tips
                </h3>
                <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• Read poems in both Georgian and translation</li>
                  <li>• Study the historical context</li>
                  <li>• Practice reciting verses aloud</li>
                  <li>• Analyze themes and symbolism</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {periods.map((period) => (
              <div key={period.id}>
                <button
                  onClick={() => togglePeriod(period.id)}
                  className={`w-full p-6 rounded-lg text-left transition-colors ${
                    theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
                  } shadow-lg`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {period.title}
                      </h2>
                      <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                        {period.description}
                      </p>
                    </div>
                    {expandedPeriod === period.id ? (
                      <ChevronUp className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                    ) : (
                      <ChevronDown className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                    )}
                  </div>
                </button>

                {expandedPeriod === period.id && (
                  <div className="mt-4 space-y-4">
                    {period.poets.map((poet) => (
                      <div
                        key={poet.id}
                        className={`p-6 rounded-lg ${
                          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                        } shadow-lg`}
                      >
                        <div className="md:flex md:items-start md:space-x-6">
                          <div className="md:w-1/3 mb-4 md:mb-0">
                            <img
                              src={poet.image}
                              alt={poet.name}
                              className="w-full h-48 object-cover rounded-lg"
                            />
                          </div>
                          <div className="md:w-2/3">
                            <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                              {poet.name}
                            </h3>
                            <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                              {poet.period}
                            </p>
                            <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                              {poet.bio}
                            </p>
                            
                            <button
                              onClick={() => handlePoetSelect(poet)}
                              className={`w-full py-2 px-4 rounded-lg text-sm font-medium ${
                                theme === 'dark'
                                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                              }`}
                            >
                              {selectedPoet?.id === poet.id ? 'Hide Details' : 'Show Details'}
                            </button>
                            
                            {selectedPoet?.id === poet.id && (
                              <div className="mt-4 space-y-4">
                                <div>
                                  <h4 className={`font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                    Significance
                                  </h4>
                                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                                    {poet.significance}
                                  </p>
                                </div>
                                
                                <div>
                                  <h4 className={`font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                    Major Works
                                  </h4>
                                  <ul className={`list-disc pl-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {poet.majorWorks.map((work, index) => (
                                      <li key={index}>{work}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-indigo-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Additional Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Reading Tips
              </h3>
              <ul className={`list-disc pl-5 space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Start with modern translations alongside Georgian text</li>
                <li>Focus on understanding the cultural context</li>
                <li>Practice reading aloud to improve pronunciation</li>
                <li>Keep a poetry journal for favorite verses</li>
                <li>Join poetry reading groups or clubs</li>
              </ul>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Literary Analysis
              </h3>
              <ul className={`list-disc pl-5 space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Study the historical background of each period</li>
                <li>Analyze common themes and motifs</li>
                <li>Compare different translations</li>
                <li>Examine poetic devices and structure</li>
                <li>Connect poems to contemporary issues</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LiteraturePoetryPage;