import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Book, Brain, Check, ChevronDown, ChevronUp, Play, Volume2, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const CommonWordsPage: React.FC = () => {
  const { theme } = useTheme();
  const [expandedType, setExpandedType] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const studyTips = {
    reading: [
      'Practice reading Georgian texts daily, even if you don\'t understand everything',
      'Use context clues to guess word meanings',
      'Create flashcards with Georgian words and their translations',
      'Read Georgian news websites or children\'s books',
      'Highlight new words and create a personal dictionary',
      'Use spaced repetition techniques for vocabulary review',
      'Practice word recognition with different fonts and handwriting',
      'Join online Georgian reading groups'
    ],
    listening: [
      'Listen to Georgian podcasts and radio shows',
      'Watch Georgian movies with subtitles',
      'Practice with native speaker recordings',
      'Focus on intonation and pronunciation patterns',
      'Record yourself repeating words and phrases',
      'Use language learning apps with audio features',
      'Listen to Georgian music and try to sing along',
      'Participate in online language exchange sessions'
    ],
    speaking: [
      'Practice speaking with native Georgian speakers',
      'Record yourself speaking and analyze your pronunciation',
      'Use language exchange apps to find conversation partners',
      'Speak Georgian daily, even if just to yourself',
      'Focus on proper stress and intonation',
      'Join Georgian language meetups or online groups',
      'Practice common phrases and expressions',
      'Use role-play scenarios to improve fluency'
    ],
    writing: [
      'Keep a daily journal in Georgian',
      'Practice writing common phrases and sentences',
      'Use Georgian keyboard layouts for authentic writing',
      'Write emails or messages to language exchange partners',
      'Study proper Georgian punctuation rules',
      'Practice writing both printed and cursive forms',
      'Create story summaries in Georgian',
      'Participate in online Georgian writing workshops'
    ]
  };

  const commonWords = {
    pronouns: [
      { georgian: "მე", english: "I", pronunciation: "me" },
      { georgian: "შენ", english: "you", pronunciation: "shen" },
      { georgian: "ის", english: "he/she/it", pronunciation: "is" },
      { georgian: "ჩვენ", english: "we", pronunciation: "chven" },
      { georgian: "თქვენ", english: "you (plural)", pronunciation: "tkven" },
      { georgian: "ისინი", english: "they", pronunciation: "isini" },
      { georgian: "ჩემი", english: "my", pronunciation: "chemi" },
      { georgian: "შენი", english: "your", pronunciation: "sheni" },
      { georgian: "მისი", english: "his/her", pronunciation: "misi" },
      { georgian: "ჩვენი", english: "our", pronunciation: "chveni" },
      { georgian: "თქვენი", english: "your (plural)", pronunciation: "tkveni" },
      { georgian: "მათი", english: "their", pronunciation: "mati" },
      { georgian: "ეს", english: "this", pronunciation: "es" },
      { georgian: "ის", english: "that", pronunciation: "is" },
      { georgian: "ესენი", english: "these", pronunciation: "eseni" }
    ],
    verbs: [
      { georgian: "არის", english: "is", pronunciation: "aris" },
      { georgian: "ვარ", english: "am", pronunciation: "var" },
      { georgian: "ხარ", english: "are", pronunciation: "khar" },
      { georgian: "მინდა", english: "I want", pronunciation: "minda" },
      { georgian: "მიყვარს", english: "I love", pronunciation: "miqvars" },
      { georgian: "მომწონს", english: "I like", pronunciation: "momtsons" },
      { georgian: "მაქვს", english: "I have", pronunciation: "makvs" },
      { georgian: "ვჭამ", english: "I eat", pronunciation: "vcham" },
      { georgian: "ვსვამ", english: "I drink", pronunciation: "vsvam" },
      { georgian: "ვხედავ", english: "I see", pronunciation: "vkhedav" },
      { georgian: "ვწერ", english: "I write", pronunciation: "vtser" },
      { georgian: "ვკითხულობ", english: "I read", pronunciation: "vkitkhulob" },
      { georgian: "ვსწავლობ", english: "I learn", pronunciation: "vstsavlob" },
      { georgian: "ვმუშაობ", english: "I work", pronunciation: "vmushaob" },
      { georgian: "ვცხოვრობ", english: "I live", pronunciation: "vtskhovrob" }
    ],
    basics: [
      { georgian: "კი", english: "yes", pronunciation: "ki" },
      { georgian: "არა", english: "no", pronunciation: "ara" },
      { georgian: "არ", english: "not", pronunciation: "ar" },
      { georgian: "და", english: "and", pronunciation: "da" },
      { georgian: "ან", english: "or", pronunciation: "an" },
      { georgian: "თუ", english: "if", pronunciation: "tu" },
      { georgian: "რომ", english: "that", pronunciation: "rom" },
      { georgian: "მაგრამ", english: "but", pronunciation: "magram" },
      { georgian: "რადგან", english: "because", pronunciation: "radgan" },
      { georgian: "როცა", english: "when", pronunciation: "rotsa" },
      { georgian: "სად", english: "where", pronunciation: "sad" },
      { georgian: "როგორ", english: "how", pronunciation: "rogor" },
      { georgian: "რატომ", english: "why", pronunciation: "ratom" },
      { georgian: "რა", english: "what", pronunciation: "ra" },
      { georgian: "ვინ", english: "who", pronunciation: "vin" }
    ],
    nouns: [
      { georgian: "სახლი", english: "house", pronunciation: "sakhli" },
      { georgian: "კაცი", english: "man", pronunciation: "katsi" },
      { georgian: "ქალი", english: "woman", pronunciation: "kali" },
      { georgian: "ბავშვი", english: "child", pronunciation: "bavshvi" },
      { georgian: "დედა", english: "mother", pronunciation: "deda" },
      { georgian: "მამა", english: "father", pronunciation: "mama" },
      { georgian: "ძმა", english: "brother", pronunciation: "dzma" },
      { georgian: "და", english: "sister", pronunciation: "da" },
      { georgian: "მეგობარი", english: "friend", pronunciation: "megobari" },
      { georgian: "წიგნი", english: "book", pronunciation: "tsigni" },
      { georgian: "მასწავლებელი", english: "teacher", pronunciation: "mastsavlebeli" },
      { georgian: "მოსწავლე", english: "student", pronunciation: "mostsavle" },
      { georgian: "ექიმი", english: "doctor", pronunciation: "ekimi" },
      { georgian: "მანქანა", english: "car", pronunciation: "manqana" },
      { georgian: "ფანჯარა", english: "window", pronunciation: "panjara" }
    ],
    food: [
      { georgian: "პური", english: "bread", pronunciation: "puri" },
      { georgian: "წყალი", english: "water", pronunciation: "tsqali" },
      { georgian: "ღვინო", english: "wine", pronunciation: "ghvino" },
      { georgian: "ყავა", english: "coffee", pronunciation: "qava" },
      { georgian: "ჩაი", english: "tea", pronunciation: "chai" },
      { georgian: "ხორცი", english: "meat", pronunciation: "khortsi" },
      { georgian: "თევზი", english: "fish", pronunciation: "tevzi" },
      { georgian: "ხილი", english: "fruit", pronunciation: "khili" },
      { georgian: "ბოსტნეული", english: "vegetables", pronunciation: "bostneuli" },
      { georgian: "ყველი", english: "cheese", pronunciation: "qveli" },
      { georgian: "კარტოფილი", english: "potato", pronunciation: "kartopili" },
      { georgian: "პომიდორი", english: "tomato", pronunciation: "pomidori" },
      { georgian: "კიტრი", english: "cucumber", pronunciation: "kitri" },
      { georgian: "სტაფილო", english: "carrot", pronunciation: "stapilo" },
      { georgian: "ხახვი", english: "onion", pronunciation: "khakhvi" }
    ]
  };

  const playAudio = (word: string) => {
    if (isPlaying === word) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src = `https://api.example.com/audio/${word}.mp3`;
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
        });
        setIsPlaying(word);
      }
    }
  };

  const playAllAudio = (words: string[]) => {
    let currentIndex = 0;

    const playNext = () => {
      if (currentIndex < words.length) {
        playAudio(words[currentIndex]);
        currentIndex++;
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('ended', playNext);
      playNext();
    }
  };

  return (
    <div className="pt-16 pb-16">
      <audio 
        ref={audioRef}
        onEnded={() => setIsPlaying(null)}
        onError={() => setIsPlaying(null)}
      />

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-green-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-green-400' : 'text-green-600'}>Common Words</span>
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Master these essential Georgian words to build your vocabulary
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  to="/intermediate"
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' 
                      ? 'bg-gray-700 text-white hover:bg-gray-600' 
                      : 'bg-white text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Intermediate Level
                </Link>
                <Link
                  to="/intermediate/quiz/common-words"
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' ? 'bg-green-700 text-white hover:bg-green-800' : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  Take Quiz
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="hidden md:block md:w-1/3">
              <div className={`p-6 rounded-lg shadow-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                <Book className={`w-12 h-12 mb-4 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Study Tips
                </h3>
                <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• Practice pronunciation daily</li>
                  <li>• Create flashcards with these words</li>
                  <li>• Use words in simple sentences</li>
                  <li>• Review regularly to retain</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {Object.entries(commonWords).map(([category, words]) => (
            <div key={category} className="mb-8">
              <button
                onClick={() => setExpandedType(expandedType === category ? null : category)}
                className={`w-full text-left p-6 rounded-lg transition-colors ${
                  theme === 'dark' 
                    ? 'bg-gray-800 hover:bg-gray-750' 
                    : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <div className="flex items-center justify-between">
                  <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </h2>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Play all words in category
                    }}
                    className={`p-2 rounded-full ${
                      theme === 'dark' 
                        ? 'bg-gray-700 hover:bg-gray-600' 
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <Volume2 size={20} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />
                  </button>
                </div>
              </button>

              {expandedType === category && (
                <div className={`mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {words.map((word, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg ${
                        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
                      } hover:shadow-md transition-shadow`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {word.georgian}
                        </span>
                        <button
                          onClick={() => playAudio(word.georgian)}
                          className={`p-2 rounded-full transition-colors ${
                            isPlaying === word.georgian
                              ? (theme === 'dark' ? 'bg-green-600' : 'bg-green-500')
                              : (theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300')
                          }`}
                        >
                          <Play size={16} className={
                            isPlaying === word.georgian
                              ? 'text-white'
                              : (theme === 'dark' ? 'text-gray-300' : 'text-gray-700')
                          } />
                        </button>
                      </div>
                      <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}>
                        {word.english}
                      </p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                        /{word.pronunciation}/
                      </p>
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

export default CommonWordsPage;