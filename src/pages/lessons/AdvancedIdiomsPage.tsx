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
import { useTheme } from '../../contexts/ThemeContext';
import { useUserProgress } from '../../hooks/useUserProgress';
import { useAuth } from '../../contexts/AuthContext';

interface IdiomEntry {
  georgian: string;
  latin: string;
  meaning: string;
  literal: string;
  example: string;
  translation: string;
}

interface IdiomCategory {
  id: string;
  title: string;
  description: string;
  entries: IdiomEntry[];
}

const AdvancedIdiomsPage: React.FC = () => {
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

  const idioms: IdiomCategory[] = [
    {
      id: 'everyday',
      title: 'Common Everyday Idioms',
      description: 'Frequently used idiomatic expressions in daily Georgian conversations',
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
        {
          georgian: 'თვალი დაადგა',
          latin: 'tvali daadga',
          meaning: 'To keep an eye on',
          literal: 'To place an eye on',
          example: 'ბავშვებს თვალი დაადგი.',
          translation: 'Keep an eye on the children.',
        },
        {
          georgian: 'ყურები ჩამოყარა',
          latin: 'qurebi chamoqara',
          meaning: 'To become sad or disappointed',
          literal: 'To drop one\'s ears',
          example: 'ცუდი ამბის გაგებაზე ყურები ჩამოყარა.',
          translation: 'He became sad upon hearing the bad news.',
        },
        {
          georgian: 'გულზე მოეშვა',
          latin: 'gulze moeshva',
          meaning: 'To feel relieved',
          literal: 'To loosen on the heart',
          example: 'კარგი ამბის გაგებაზე გულზე მოეშვა.',
          translation: 'He felt relieved upon hearing the good news.',
        }
      ]
    },
    {
      id: 'cultural',
      title: 'Cultural Idioms',
      description: 'Expressions that reflect Georgian cultural values and traditions',
      entries: [
        {
          georgian: 'პურ-მარილი',
          latin: 'pur-marili',
          meaning: 'Hospitality',
          literal: 'Bread and salt',
          example: 'ქართული პურ-მარილი განთქმულია.',
          translation: 'Georgian hospitality is renowned.',
        },
        {
          georgian: 'სტუმარი ღვთისაა',
          latin: 'stumari ghvtisaa',
          meaning: 'A guest is a gift from God',
          literal: 'A guest is from God',
          example: 'სტუმარი ღვთისაა, კარგად მიიღე.',
          translation: 'A guest is a gift from God, welcome them well.',
        },
        {
          georgian: 'შენი ჭირიმე',
          latin: 'sheni chirime',
          meaning: 'Term of endearment',
          literal: 'Let me take your troubles',
          example: 'შენი ჭირიმე, დამეხმარე.',
          translation: 'My dear, help me.',
        },
        {
          georgian: 'გენაცვალე',
          latin: 'genatsvale',
          meaning: 'Term of endearment',
          literal: 'Let me be sacrificed for you',
          example: 'გენაცვალე, როგორ ხარ?',
          translation: 'My dear, how are you?',
        },
        {
          georgian: 'შენი კვნესამე',
          latin: 'sheni kvnesame',
          meaning: 'Expression of affection',
          literal: 'Let me take your moaning',
          example: 'შენი კვნესამე, რა ლამაზი ხარ!',
          translation: 'My dear, how beautiful you are!',
        }
      ]
    },
    {
      id: 'wisdom',
      title: 'Proverbs and Wisdom',
      description: 'Traditional Georgian sayings that convey wisdom and life lessons',
      entries: [
        {
          georgian: 'ერთი ყვავი გაზაფხულს ვერ მოიყვანს',
          latin: 'erti qvavi gazapkhuls ver moiqvans',
          meaning: 'One swallow doesn't make a summer',
          literal: 'One crow cannot bring spring',
          example: 'ერთი კარგი დღე ჯერ კიდევ არაფერს ნიშნავს, ერთი ყვავი გაზაფხულს ვერ მოიყვანს.',
          translation: 'One good day doesn't mean anything yet, one swallow doesn't make a summer.',
        },
        {
          georgian: 'რაც მოგივა დავითაო, ყველა შენი თავითაო',
          latin: 'rats mogiva davitao, qvela sheni tavitao',
          meaning: 'You are responsible for your own fate',
          literal: 'Whatever happens to you, Davit, it's all from your own head',
          example: 'თვითონ აირჩია ეს გზა, ახლა რაც მოუვა დავითაო, ყველა თავისი თავითაო.',
          translation: 'He chose this path himself, now whatever happens to him is his own responsibility.',
        },
        {
          georgian: 'ცოდნა განძია, რომელიც პატრონს თან სდევს',
          latin: 'tsodna gandzia, romelic patrons tan sdevs',
          meaning: 'Knowledge is a treasure that follows its owner',
          literal: 'Knowledge is a treasure that follows its owner',
          example: 'ისწავლე, რადგან ცოდნა განძია, რომელიც პატრონს თან სდევს.',
          translation: 'Study, because knowledge is a treasure that follows its owner.',
        },
        {
          georgian: 'ენა ტკბილია, მაგრამ გესლიანიც',
          latin: 'ena tkbilia, magram geslianic',
          meaning: 'Words can be both sweet and poisonous',
          literal: 'The tongue is sweet but can be venomous too',
          example: 'ფრთხილად იყავი რას ამბობ, ენა ტკბილია, მაგრამ გესლიანიც.',
          translation: 'Be careful what you say, words can be both sweet and poisonous.',
        },
        {
          georgian: 'კარგი შვილი დედის გულის ვარდიაო',
          latin: 'kargi shvili dedis gulis vardiao',
          meaning: 'A good child is the rose of a mother's heart',
          literal: 'A good child is the rose of a mother's heart',
          example: 'დედა შვილზე ამაყობს, კარგი შვილი დედის გულის ვარდიაო.',
          translation: 'The mother is proud of her child, a good child is the rose of a mother's heart.',
        }
      ]
    },
    {
      id: 'emotions',
      title: 'Emotional Expressions',
      description: 'Idioms that express feelings and emotional states',
      entries: [
        {
          georgian: 'გული გადაუტრიალდა',
          latin: 'guli gadautrialda',
          meaning: 'To feel disgusted',
          literal: 'Heart turned over',
          example: 'ამ სურათის დანახვაზე გული გადამიტრიალდა.',
          translation: 'I felt disgusted when I saw this picture.',
        },
        {
          georgian: 'გული მოუვიდა',
          latin: 'guli mouvida',
          meaning: 'To get angry',
          literal: 'Heart came to him/her',
          example: 'ამ სიტყვებზე გული მომივიდა.',
          translation: 'I got angry at these words.',
        },
        {
          georgian: 'გული აუჩუყდა',
          latin: 'guli auchuqda',
          meaning: 'To be moved emotionally',
          literal: 'Heart softened',
          example: 'ამ ამბის გაგებაზე გული ამიჩუყდა.',
          translation: 'I was moved when I heard this story.',
        },
        {
          georgian: 'თავში აუვარდა',
          latin: 'tavshi auvarda',
          meaning: 'To go to one\'s head',
          literal: 'It went up to his/her head',
          example: 'წარმატება თავში აუვარდა.',
          translation: 'Success went to his head.',
        },
        {
          georgian: 'ნერვები მოეშალა',
          latin: 'nervebi moeshala',
          meaning: 'To become very nervous',
          literal: 'Nerves got disrupted',
          example: 'გამოცდის წინ ნერვები მოეშალა.',
          translation: 'He became very nervous before the exam.',
        }
      ]
    }
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

export default AdvancedIdiomsPage;