import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Book, Play, Volume2 } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const CommonWordsPage = () => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

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
    ],
    adjectives: [
      { georgian: "დიდი", english: "big", pronunciation: "didi" },
      { georgian: "პატარა", english: "small", pronunciation: "patara" },
      { georgian: "კარგი", english: "good", pronunciation: "kargi" },
      { georgian: "ცუდი", english: "bad", pronunciation: "tsudi" },
      { georgian: "ლამაზი", english: "beautiful", pronunciation: "lamazi" },
      { georgian: "ახალი", english: "new", pronunciation: "akhali" },
      { georgian: "ძველი", english: "old", pronunciation: "dzveli" },
      { georgian: "ცხელი", english: "hot", pronunciation: "tskheli" },
      { georgian: "ცივი", english: "cold", pronunciation: "tsivi" },
      { georgian: "მაღალი", english: "tall/high", pronunciation: "maghali" },
      { georgian: "დაბალი", english: "short/low", pronunciation: "dabali" },
      { georgian: "მძიმე", english: "heavy", pronunciation: "mdzime" },
      { georgian: "მსუბუქი", english: "light", pronunciation: "msubuki" },
      { georgian: "სუფთა", english: "clean", pronunciation: "supta" },
      { georgian: "ბინძური", english: "dirty", pronunciation: "bindzuri" }
    ],
    greetings: [
      { georgian: "გამარჯობა", english: "hello", pronunciation: "gamarjoba" },
      { georgian: "ნახვამდის", english: "goodbye", pronunciation: "nakhvamdis" },
      { georgian: "მადლობა", english: "thank you", pronunciation: "madloba" },
      { georgian: "გთხოვთ", english: "please", pronunciation: "gtxovt" },
      { georgian: "კარგად", english: "well", pronunciation: "kargad" },
      { georgian: "როგორ ხარ", english: "how are you", pronunciation: "rogor khar" },
      { georgian: "დილა მშვიდობისა", english: "good morning", pronunciation: "dila mshvidobisa" },
      { georgian: "საღამო მშვიდობისა", english: "good evening", pronunciation: "saghamo mshvidobisa" },
      { georgian: "ღამე მშვიდობისა", english: "good night", pronunciation: "ghame mshvidobisa" },
      { georgian: "კეთილი იყოს", english: "welcome", pronunciation: "ketili iqos" },
      { georgian: "გაიცანით", english: "nice to meet you", pronunciation: "gaitsanit" },
      { georgian: "კარგად ბრძანდებოდეთ", english: "farewell", pronunciation: "kargad brdzandebodet" },
      { georgian: "გისურვებთ", english: "I wish you", pronunciation: "gisurvebt" },
      { georgian: "გილოცავთ", english: "congratulations", pronunciation: "gilotsavt" },
      { georgian: "წარმატებები", english: "good luck", pronunciation: "tsarmatebebi" }
    ],
    numbers: [
      { georgian: "ერთი", english: "one", pronunciation: "erti" },
      { georgian: "ორი", english: "two", pronunciation: "ori" },
      { georgian: "სამი", english: "three", pronunciation: "sami" },
      { georgian: "ოთხი", english: "four", pronunciation: "otkhi" },
      { georgian: "ხუთი", english: "five", pronunciation: "khuti" },
      { georgian: "ექვსი", english: "six", pronunciation: "ekvsi" },
      { georgian: "შვიდი", english: "seven", pronunciation: "shvidi" },
      { georgian: "რვა", english: "eight", pronunciation: "rva" },
      { georgian: "ცხრა", english: "nine", pronunciation: "tskhra" },
      { georgian: "ათი", english: "ten", pronunciation: "ati" },
      { georgian: "ოცი", english: "twenty", pronunciation: "otsi" },
      { georgian: "ოცდაათი", english: "thirty", pronunciation: "otsdaati" },
      { georgian: "ორმოცი", english: "forty", pronunciation: "ormotsi" },
      { georgian: "ასი", english: "hundred", pronunciation: "asi" },
      { georgian: "ათასი", english: "thousand", pronunciation: "atasi" }
    ],
    time: [
      { georgian: "დღეს", english: "today", pronunciation: "dghes" },
      { georgian: "ხვალ", english: "tomorrow", pronunciation: "khval" },
      { georgian: "გუშინ", english: "yesterday", pronunciation: "gushin" },
      { georgian: "დილა", english: "morning", pronunciation: "dila" },
      { georgian: "საღამო", english: "evening", pronunciation: "saghamo" },
      { georgian: "ღამე", english: "night", pronunciation: "ghame" },
      { georgian: "კვირა", english: "week", pronunciation: "kvira" },
      { georgian: "თვე", english: "month", pronunciation: "tve" },
      { georgian: "წელი", english: "year", pronunciation: "tseli" },
      { georgian: "დრო", english: "time", pronunciation: "dro" },
      { georgian: "საათი", english: "hour", pronunciation: "saati" },
      { georgian: "წუთი", english: "minute", pronunciation: "tsuti" },
      { georgian: "წამი", english: "second", pronunciation: "tsami" },
      { georgian: "სეზონი", english: "season", pronunciation: "sezoni" },
      { georgian: "შუადღე", english: "noon", pronunciation: "shuadghe" }
    ],
    places: [
      { georgian: "ქალაქი", english: "city", pronunciation: "kalaki" },
      { georgian: "სოფელი", english: "village", pronunciation: "sopeli" },
      { georgian: "ქვეყანა", english: "country", pronunciation: "kveqana" },
      { georgian: "ქუჩა", english: "street", pronunciation: "kucha" },
      { georgian: "სკოლა", english: "school", pronunciation: "skola" },
      { georgian: "მაღაზია", english: "shop", pronunciation: "maghazia" },
      { georgian: "რესტორანი", english: "restaurant", pronunciation: "restorani" },
      { georgian: "ბანკი", english: "bank", pronunciation: "banki" },
      { georgian: "პარკი", english: "park", pronunciation: "parki" },
      { georgian: "ბაზარი", english: "market", pronunciation: "bazari" },
      { georgian: "უნივერსიტეტი", english: "university", pronunciation: "universiteti" },
      { georgian: "ბიბლიოთეკა", english: "library", pronunciation: "biblioteka" },
      { georgian: "მუზეუმი", english: "museum", pronunciation: "muzeumi" },
      { georgian: "თეატრი", english: "theater", pronunciation: "teatri" },
      { georgian: "კინოთეატრი", english: "cinema", pronunciation: "kinoteatri" }
    ]
  };

  const playAudio = (word: string) => {
    if (isPlaying === word) {
      setIsPlaying(null);
    } else {
      setIsPlaying(word);
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
                <span className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}>100 Common Words</span>
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
                onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
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

              {selectedCategory === category && (
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
                              ? (theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500')
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