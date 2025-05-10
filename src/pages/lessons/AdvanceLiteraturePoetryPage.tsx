import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Volume2, ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserProgress } from '../../hooks/useUserProgress';
import { useAuth } from '../../contexts/AuthContext';

interface LiteraryWork {
  title: string;
  author: string;
  period: string;
  excerpt: string;
  translation: string;
  analysis: string;
}

interface Poet {
  name: string;
  lifespan: string;
  significance: string;
  works: string[];
  photo?: string;
}

const AdvancedLiteraturePoetryPage: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { updateProgress } = useUserProgress();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Track time spent on the page
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const timeDiff = now - lastActivityTime;
      
      // Only count time if user has been active in the last 5 minutes
      if (timeDiff < 5 * 60 * 1000) {
        setTimeSpent(prev => prev + 1);
      }
      
      setLastActivityTime(now);
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [lastActivityTime]);

  // Update user activity time on interactions
  const updateActivity = () => {
    setLastActivityTime(Date.now());
  };

  // Save progress when user leaves the page
  useEffect(() => {
    // Track initial visit
    if (user) {
      updateProgress('advanced-literature', { timeSpent: 1 });
    }
    
    // Save progress when component unmounts
    return () => {
      if (user && timeSpent > 0) {
        // Mark as completed if user has spent significant time
        const completed = timeSpent > 15;
        
        updateProgress('advanced-literature', { 
          timeSpent, 
          completed: completed
        });
      }
    };
  }, [user, timeSpent, updateProgress]);

  const literaryWorks: LiteraryWork[] = [
    {
      title: "ვეფხისტყაოსანი (The Knight in the Panther's Skin)",
      author: "შოთა რუსთაველი (Shota Rustaveli)",
      period: "12th century",
      excerpt: "ვის ჰშვენის, ლომსა, ხმარება სოსანგისა და ვარდისა? \nვის ჰშვენის, გმირსა, მეძავი, მეძვის სახლში ჯდომა, კარდისა?",
      translation: "Who would it befit, a lion, to use roses and lilies? \nWho would it befit, a hero, to chase harlots and sit in a brothel?",
      analysis: "This epic poem is considered the Georgian national epic and masterpiece of medieval literature. It explores themes of chivalry, friendship, love, and loyalty through the adventures of its protagonists. The poem consists of over 1600 quatrains and has been translated into many languages."
    },
    {
      title: "მერანი (Merani)",
      author: "ნიკოლოზ ბარათაშვილი (Nikoloz Baratashvili)",
      period: "19th century",
      excerpt: "მირბის, მიმაფრენს უგზო-უკვლოდ ჩემი მერანი, \nშავის ბედის მდევარს უკან ვეღარ დამეწევა!",
      translation: "My Merani runs, flies with me without path or trail, \nThe pursuer of my black fate can no longer catch up with me!",
      analysis: "This romantic poem uses the metaphor of a flying horse (Merani) to symbolize the poet's desire for freedom and transcendence. Written during Russian imperial rule, it expresses Georgian aspirations for independence and the poet's personal struggles."
    },
    {
      title: "დათა თუთაშხია (Data Tutashkhia)",
      author: "ჭაბუა ამირეჯიბი (Chabua Amirejibi)",
      period: "20th century",
      excerpt: "ადამიანი ვალდებულია იცხოვროს და ეძებოს თავისი ბედნიერება, მაგრამ ისე, რომ სხვისი უბედურების მიზეზი არ გახდეს.",
      translation: "A person is obliged to live and seek their happiness, but in such a way that they do not become the cause of another's misfortune.",
      analysis: "This novel explores the life of an outlaw in pre-revolutionary Georgia. It delves into philosophical questions about morality, justice, and the individual's relationship with society. The protagonist embodies the conflict between personal freedom and social responsibility."
    }
  ];

  const poets: Poet[] = [
    {
      name: "შოთა რუსთაველი (Shota Rustaveli)",
      lifespan: "c. 1160 - c. 1220",
      significance: "Georgia's national poet and author of the epic poem 'The Knight in the Panther's Skin.' His work represents the height of the Georgian Golden Age and has influenced Georgian culture for centuries.",
      works: ["ვეფხისტყაოსანი (The Knight in the Panther's Skin)"],
      photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Shota_Rustaveli_portrait.jpg/330px-Shota_Rustaveli_portrait.jpg"
    },
    {
      name: "ნიკოლოზ ბარათაშვილი (Nikoloz Baratashvili)",
      lifespan: "1817 - 1845",
      significance: "A prominent Georgian Romantic poet whose works have had a lasting impact on Georgian literature despite his short life. His poetry expresses deep philosophical thoughts and national yearning.",
      works: ["მერანი (Merani)", "ბედი ქართლისა (Fate of Georgia)", "სული ობოლი (The Orphaned Soul)"],
      photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Nikoloz_Baratashvili.jpg/330px-Nikoloz_Baratashvili.jpg"
    },
    {
      name: "აკაკი წერეთელი (Akaki Tsereteli)",
      lifespan: "1840 - 1915",
      significance: "One of the greatest Georgian poets, who played a crucial role in the national revival movement. His patriotic and lyrical poetry captured the spirit of the Georgian people.",
      works: ["გამზრდელი (The Tutor)", "თორნიკე ერისთავი (Tornike Eristavi)", "სულიკო (Suliko)"],
      photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Akaki_Tsereteli_by_Gigo_Gabashvili.jpg/330px-Akaki_Tsereteli_by_Gigo_Gabashvili.jpg"
    },
    {
      name: "გალაკტიონ ტაბიძე (Galaktion Tabidze)",
      lifespan: "1891 - 1959",
      significance: "Often referred to as the 'King of Poets,' he revolutionized Georgian poetry with his symbolist and modernist approach. His work bridges traditional Georgian poetry with European modernism.",
      works: ["მთვარის მოტაცება (Moon's Abduction)", "ქარი ქრის (The Wind Blows)", "სილაჟვარდე ანუ ვარდი სილაში (Azure or Rose in the Sand)"],
      photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Galaktion_Tabidze.jpg/330px-Galaktion_Tabidze.jpg"
    },
    {
      name: "ანა კალანდაძე (Ana Kalandadze)",
      lifespan: "1924 - 2008",
      significance: "One of the most important female voices in Georgian poetry, known for her deeply spiritual and philosophical works that blend traditional Georgian themes with modernist expression.",
      works: ["ლოცვა (Prayer)", "მთვარეს (To the Moon)", "ვარსკვლავებს (To the Stars)"],
      photo: "https://upload.wikimedia.org/wikipedia/ka/thumb/e/e7/Ana_kalandadze.jpg/250px-Ana_kalandadze.jpg"
    }
  ];

  const toggleSection = (section: string) => {
    updateActivity();
    setExpandedSection(expandedSection === section ? null : section);
  };

  const playAudio = (text: string) => {
    updateActivity();
    if (isPlaying === text) {
      setIsPlaying(null);
    } else {
      setIsPlaying(text);
      // Here you would normally play the audio file
      setTimeout(() => setIsPlaying(null), 2000);
    }
  };

  return (
    <div className="pt-16 pb-16" onClick={updateActivity}>
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-purple-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>Literature & Poetry</span> - ლიტერატურა და პოეზია
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Explore Georgia's rich literary heritage and poetic traditions
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
                    theme === 'dark' ? 'bg-purple-700 text-white hover:bg-purple-800' : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  Take Quiz
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="hidden md:block md:w-1/3">
              <div className={`p-6 rounded-lg shadow-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                <BookOpen className={`w-12 h-12 mb-4 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Literary Significance
                </h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Georgian literature spans over 15 centuries, with its own unique alphabet and literary traditions. The medieval epic "The Knight in the Panther's Skin" is considered a masterpiece of world literature.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Literary Periods Overview */}
          <div className="mb-12">
            <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Literary Periods in Georgian History
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} shadow-lg`}>
                <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Medieval Period (5th-18th c.)
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  The golden age of Georgian literature, marked by religious texts, hagiography, and the epic poetry of Shota Rustaveli. This period established Georgian as a literary language and set the foundation for future generations.
                </p>
              </div>
              
              <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} shadow-lg`}>
                <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Romantic Period (19th c.)
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  A period of national awakening and resistance to Russian imperial rule. Poets like Nikoloz Baratashvili and Akaki Tsereteli expressed Georgian identity and aspirations for freedom through their works.
                </p>
              </div>
              
              <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} shadow-lg`}>
                <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Modern & Contemporary (20th-21st c.)
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  From Soviet-era constraints to post-independence freedom, modern Georgian literature has evolved through symbolism, realism, and postmodernism. Writers like Galaktion Tabidze and contemporary authors continue to enrich Georgian literary traditions.
                </p>
              </div>
            </div>
          </div>

          {/* Classic Literary Works */}
          <div className="mb-12">
            <button
              onClick={() => toggleSection('literary-works')}
              className={`w-full text-left mb-6 flex items-center justify-between ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
            >
              <h2 className="text-2xl font-bold">Classic Literary Works</h2>
              {expandedSection === 'literary-works' ? <ChevronUp /> : <ChevronDown />}
            </button>
            
            {expandedSection === 'literary-works' && (
              <div className="space-y-6">
                {literaryWorks.map((work, index) => (
                  <div 
                    key={index}
                    className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
                  >
                    <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {work.title}
                    </h3>
                    <div className={`mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      <span className="font-medium">{work.author}</span> • {work.period}
                    </div>
                    
                    <div className={`p-4 rounded-lg mb-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          Excerpt
                        </h4>
                        <button
                          onClick={() => playAudio(work.excerpt)}
                          className={`p-1 rounded-full ${
                            theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'
                          }`}
                        >
                          <Volume2 size={16} />
                        </button>
                      </div>
                      <p className={`whitespace-pre-line ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        {work.excerpt}
                      </p>
                      <p className={`mt-2 text-sm italic ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {work.translation}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className={`font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Analysis
                      </h4>
                      <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                        {work.analysis}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Notable Poets */}
          <div className="mb-12">
            <button
              onClick={() => toggleSection('poets')}
              className={`w-full text-left mb-6 flex items-center justify-between ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
            >
              <h2 className="text-2xl font-bold">Notable Poets</h2>
              {expandedSection === 'poets' ? <ChevronUp /> : <ChevronDown />}
            </button>
            
            {expandedSection === 'poets' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {poets.map((poet, index) => (
                  <div 
                    key={index}
                    className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
                  >
                    <div className="flex items-start">
                      {poet.photo && (
                        <img 
                          src={poet.photo} 
                          alt={poet.name} 
                          className="w-24 h-24 object-cover rounded-lg mr-4"
                        />
                      )}
                      <div>
                        <h3 className={`text-xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {poet.name}
                        </h3>
                        <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          {poet.lifespan}
                        </p>
                      </div>
                    </div>
                    
                    <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {poet.significance}
                    </p>
                    
                    <div>
                      <h4 className={`font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Notable Works:
                      </h4>
                      <ul className={`list-disc pl-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {poet.works.map((work, i) => (
                          <li key={i}>{work}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Literary Themes */}
          <div>
            <button
              onClick={() => toggleSection('themes')}
              className={`w-full text-left mb-6 flex items-center justify-between ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
            >
              <h2 className="text-2xl font-bold">Common Literary Themes</h2>
              {expandedSection === 'themes' ? <ChevronUp /> : <ChevronDown />}
            </button>
            
            {expandedSection === 'themes' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} shadow-lg`}>
                  <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    National Identity
                  </h3>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    Georgian literature often explores themes of national identity, independence, and cultural preservation. This reflects Georgia's historical struggles to maintain its identity amid invasions and occupations by larger powers.
                  </p>
                </div>
                
                <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} shadow-lg`}>
                  <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Chivalry & Honor
                  </h3>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    From medieval epics to modern works, concepts of honor, chivalry, and moral courage are central to Georgian literature. Characters often face moral dilemmas that test their adherence to a code of honor.
                  </p>
                </div>
                
                <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} shadow-lg`}>
                  <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Nature & Landscape
                  </h3>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    Georgia's diverse and dramatic landscapes—from the Caucasus Mountains to the Black Sea coast—feature prominently in its literature. Nature often serves as both setting and metaphor for human emotions and national spirit.
                  </p>
                </div>
                
                <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} shadow-lg`}>
                  <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Love & Sacrifice
                  </h3>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    Romantic love, often intertwined with themes of sacrifice, is a recurring motif. From Rustaveli's epic to modern novels, characters frequently demonstrate their love through acts of self-sacrifice and devotion.
                  </p>
                </div>
                
                <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} shadow-lg`}>
                  <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Tradition vs. Modernity
                  </h3>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    The tension between traditional values and modernization is a common theme, especially in 20th and 21st century works. This reflects Georgia's position at the crossroads of East and West, tradition and progress.
                  </p>
                </div>
                
                <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} shadow-lg`}>
                  <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Spirituality & Faith
                  </h3>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    With Georgia's long Christian history, religious themes and spiritual quests are prevalent in its literature. Even secular works often contain religious symbolism and references to Georgia's Orthodox heritage.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdvancedLiteraturePoetryPage;