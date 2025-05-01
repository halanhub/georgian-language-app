import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Book, Check, ChevronRight, Pencil, Play, Volume2 } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface Example {
  georgian: string;
  pronunciation: string;
  english: string;
  explanation: string;
}

const SentenceConstructionPage: React.FC = () => {
  const { theme } = useTheme();
  const [selectedExample, setSelectedExample] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  const basicRules = [
    {
      title: "Subject-Object-Verb (SOV) Order",
      description: "Georgian primarily follows SOV word order",
      examples: [
        {
          georgian: "გიორგი წიგნს კითხულობს",
          pronunciation: "giorgi tsigns kitkholobs",
          english: "Giorgi (S) is reading (V) a book (O)",
          explanation: "The subject (Giorgi) comes first, followed by the object (book), and the verb (is reading) at the end"
        },
        {
          georgian: "ნინო ჩაის სვამს",
          pronunciation: "nino chais svams",
          english: "Nino (S) is drinking (V) tea (O)",
          explanation: "Subject (Nino) + Object (tea) + Verb (is drinking)"
        }
      ]
    },
    {
      title: "Postpositions Instead of Prepositions",
      description: "Georgian uses postpositions that come after nouns",
      examples: [
        {
          georgian: "სახლში მივდივარ",
          pronunciation: "sakhlshi mivdivar",
          english: "I am going to (the) house",
          explanation: "-ში (-shi) is a postposition meaning 'in/into/to'"
        },
        {
          georgian: "მაგიდაზე დევს",
          pronunciation: "magidaze devs",
          english: "It lies on the table",
          explanation: "-ზე (-ze) is a postposition meaning 'on'"
        }
      ]
    },
    {
      title: "Verb Agreement",
      description: "Verbs agree with both subject and object",
      examples: [
        {
          georgian: "მე შენ გხედავ",
          pronunciation: "me shen gkhedav",
          english: "I see you",
          explanation: "The verb გხედავ shows agreement with both 'I' (subject) and 'you' (object)"
        },
        {
          georgian: "ის მას ხედავს",
          pronunciation: "is mas khedavs",
          english: "He/she sees him/her",
          explanation: "The verb changes to show third-person subject and object"
        }
      ]
    },
    {
      title: "Case System",
      description: "Georgian nouns change form based on their role",
      examples: [
        {
          georgian: "კაცი წერილს წერს",
          pronunciation: "katsi tserils tsers",
          english: "The man writes a letter",
          explanation: "კაცი (nominative case) + წერილს (dative case) + verb"
        },
        {
          georgian: "დედამ საჭმელი მოამზადა",
          pronunciation: "dedam sachmeli moamzada",
          english: "Mother prepared food",
          explanation: "დედამ (ergative case) + საჭმელი (nominative case) + verb"
        }
      ]
    },
    {
      title: "Question Formation",
      description: "Questions often use specific particles or word order",
      examples: [
        {
          georgian: "სად მიდიხარ?",
          pronunciation: "sad midikhar?",
          english: "Where are you going?",
          explanation: "Question word სად (where) comes at the beginning"
        },
        {
          georgian: "გინდა ჩაი?",
          pronunciation: "ginda chai?",
          english: "Do you want tea?",
          explanation: "Yes/no questions often maintain SOV order with rising intonation"
        }
      ]
    },
    {
      title: "Adjective Placement",
      description: "Adjectives come before the nouns they modify",
      examples: [
        {
          georgian: "ლამაზი სახლი",
          pronunciation: "lamazi sakhli",
          english: "Beautiful house",
          explanation: "Adjective (ლამაზი) precedes the noun (სახლი)"
        },
        {
          georgian: "დიდი წითელი წიგნი",
          pronunciation: "didi tsiteli tsigni",
          english: "Big red book",
          explanation: "Multiple adjectives come before the noun in order: size, color, noun"
        }
      ]
    },
    {
      title: "Possession",
      description: "Possession is shown through case endings",
      examples: [
        {
          georgian: "ჩემი წიგნი",
          pronunciation: "chemi tsigni",
          english: "My book",
          explanation: "Possessive pronoun (ჩემი) + noun"
        },
        {
          georgian: "კაცის სახლი",
          pronunciation: "katsis sakhli",
          english: "Man's house",
          explanation: "Possessor (კაცის) in genitive case + possessed noun"
        }
      ]
    },
    {
      title: "Time Expressions",
      description: "Time expressions often come at the beginning",
      examples: [
        {
          georgian: "დილას სკოლაში მივდივარ",
          pronunciation: "dilas skolashi mivdivar",
          english: "In the morning I go to school",
          explanation: "Time (დილას) + location + verb"
        },
        {
          georgian: "გუშინ წერილი დავწერე",
          pronunciation: "gushin tserili davtsere",
          english: "Yesterday I wrote a letter",
          explanation: "Time (გუშინ) + object + verb"
        }
      ]
    },
    {
      title: "Negation",
      description: "Negation uses the particle არ or ვერ",
      examples: [
        {
          georgian: "არ მინდა",
          pronunciation: "ar minda",
          english: "I don't want",
          explanation: "არ (not) comes before the verb"
        },
        {
          georgian: "ვერ ვხედავ",
          pronunciation: "ver vkhedav",
          english: "I cannot see",
          explanation: "ვერ (cannot) indicates inability rather than unwillingness"
        }
      ]
    },
    {
      title: "Indirect Objects",
      description: "Indirect objects typically come before direct objects",
      examples: [
        {
          georgian: "დედა შვილს წიგნს აძლევს",
          pronunciation: "deda shvils tsigns adzlevs",
          english: "Mother gives the child a book",
          explanation: "Subject + indirect object (შვილს) + direct object (წიგნს) + verb"
        },
        {
          georgian: "მე მას წერილს ვუგზავნი",
          pronunciation: "me mas tserils vugzavni",
          english: "I am sending him/her a letter",
          explanation: "Subject + indirect object (მას) + direct object (წერილს) + verb"
        }
      ]
    }
  ];

  const exercises = [
    {
      type: "Arrange words",
      instruction: "Arrange these words to form a correct Georgian sentence:",
      words: ["წიგნს", "ბავშვი", "კითხულობს"],
      correctOrder: "ბავშვი წიგნს კითხულობს",
      translation: "The child is reading a book"
    },
    {
      type: "Complete sentence",
      instruction: "Complete the sentence with the correct form:",
      sentence: "მე ___ ვწერ",
      options: ["წერილს", "წერილი", "წერილმა"],
      correct: "წერილს",
      explanation: "Direct objects take the dative case (-ს)"
    },
    {
      type: "Transform",
      instruction: "Transform this positive sentence into negative:",
      sentence: "ვხედავ მას",
      answer: "არ ვხედავ მას",
      explanation: "Add არ before the verb to make it negative"
    }
  ];

  const playAudio = (text: string) => {
    if (isPlaying === text) {
      setIsPlaying(null);
    } else {
      setIsPlaying(text);
      // Here you would normally play the audio file
      setTimeout(() => setIsPlaying(null), 1000);
    }
  };

  return (
    <div className="pt-16 pb-16">
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}>Sentence Construction</span>
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Learn how to build proper Georgian sentences with these essential rules and patterns.
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
                  to="/intermediate/quiz/sentences"
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' ? 'bg-blue-700 text-white hover:bg-blue-800' : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Take Quiz
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="hidden md:block md:w-1/3">
              <div className={`p-6 rounded-lg shadow-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                <Book className={`w-12 h-12 mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Learning Tips
                </h3>
                <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• Start with basic SOV patterns</li>
                  <li>• Practice with simple sentences first</li>
                  <li>• Pay attention to case endings</li>
                  <li>• Learn verb conjugation patterns</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Basic Sentence Patterns
          </h2>
          
          <div className="space-y-8">
            {basicRules.map((rule, ruleIndex) => (
              <div 
                key={ruleIndex}
                className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {rule.title}
                </h3>
                <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {rule.description}
                </p>
                
                <div className="space-y-4">
                  {rule.examples.map((example, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {example.georgian}
                        </p>
                        <button
                          onClick={() => playAudio(example.georgian)}
                          className={`p-2 rounded-full transition-colors ${
                            isPlaying === example.georgian
                              ? (theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500')
                              : (theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300')
                          }`}
                        >
                          <Play size={16} className={
                            isPlaying === example.georgian
                              ? 'text-white'
                              : (theme === 'dark' ? 'text-gray-300' : 'text-gray-700')
                          } />
                        </button>
                      </div>
                      <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        /{example.pronunciation}/
                      </p>
                      <p className={`mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {example.english}
                      </p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Check size={16} className="inline mr-2 text-green-500" />
                        {example.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-8 flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            <Pencil className="mr-2" size={24} />
            Practice Exercises
          </h2>
          
          <div className="space-y-6">
            {exercises.map((exercise, index) => (
              <div 
                key={index}
                className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg`}
              >
                <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Exercise {index + 1}: {exercise.type}
                </h3>
                <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {exercise.instruction}
                </p>
                
                {exercise.type === "Arrange words" && (
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {exercise.words.map((word, wordIndex) => (
                        <div
                          key={wordIndex}
                          className={`px-3 py-2 rounded ${
                            theme === 'dark' 
                              ? 'bg-gray-600 text-white' 
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {word}
                        </div>
                      ))}
                    </div>
                    <button
                      className={`mt-4 px-4 py-2 rounded ${
                        theme === 'dark'
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                    >
                      Check Answer
                    </button>
                  </div>
                )}
                
                {exercise.type === "Complete sentence" && (
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2 items-center">
                      {exercise.sentence.split('___').map((part, partIndex, array) => (
                        <React.Fragment key={partIndex}>
                          <span>{part}</span>
                          {partIndex < array.length - 1 && (
                            <select
                              className={`px-3 py-2 rounded ${
                                theme === 'dark'
                                  ? 'bg-gray-600 text-white border-gray-500'
                                  : 'bg-white text-gray-800 border-gray-300'
                              } border`}
                            >
                              <option value="">Choose...</option>
                              {exercise.options.map((option, optionIndex) => (
                                <option key={optionIndex} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                    <button
                      className={`mt-4 px-4 py-2 rounded ${
                        theme === 'dark'
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                    >
                      Check Answer
                    </button>
                  </div>
                )}
                
                {exercise.type === "Transform" && (
                  <div className="space-y-4">
                    <div className={`p-4 rounded ${
                      theme === 'dark' ? 'bg-gray-600' : 'bg-gray-100'
                    }`}>
                      <p className={theme === 'dark' ? 'text-white' : 'text-gray-800'}>
                        {exercise.sentence}
                      </p>
                    </div>
                    <input
                      type="text"
                      placeholder="Type your answer..."
                      className={`w-full px-4 py-2 rounded ${
                        theme === 'dark'
                          ? 'bg-gray-600 text-white border-gray-500'
                          : 'bg-white text-gray-800 border-gray-300'
                      } border`}
                    />
                    <button
                      className={`mt-4 px-4 py-2 rounded ${
                        theme === 'dark'
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                    >
                      Check Answer
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SentenceConstructionPage;