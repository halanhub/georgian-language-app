import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Play, VolumeX } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

// Georgian alphabet data
const georgianAlphabet = [
  { letter: 'ა', name: 'ანი (ani)', latin: 'a', audio: '#', example: 'ახალი (akhali) - new' },
  { letter: 'ბ', name: 'ბანი (bani)', latin: 'b', audio: '#', example: 'ბავშვი (bavshvi) - child' },
  { letter: 'გ', name: 'განი (gani)', latin: 'g', audio: '#', example: 'გული (guli) - heart' },
  { letter: 'დ', name: 'დონი (doni)', latin: 'd', audio: '#', example: 'დედა (deda) - mother' },
  { letter: 'ე', name: 'ენი (eni)', latin: 'e', audio: '#', example: 'ერთი (erti) - one' },
  { letter: 'ვ', name: 'ვინი (vini)', latin: 'v', audio: '#', example: 'ვაშლი (vashli) - apple' },
  { letter: 'ზ', name: 'ზენი (zeni)', latin: 'z', audio: '#', example: 'ზამთარი (zamtari) - winter' },
  { letter: 'თ', name: 'თანი (tani)', latin: 't', audio: '#', example: 'თოვლი (tovli) - snow' },
  { letter: 'ი', name: 'ინი (ini)', latin: 'i', audio: '#', example: 'იხვი (ikhvi) - duck' },
  { letter: 'კ', name: 'კანი (kani)', latin: 'k', audio: '#', example: 'კაცი (katsi) - man' },
  { letter: 'ლ', name: 'ლასი (lasi)', latin: 'l', audio: '#', example: 'ლომი (lomi) - lion' },
  { letter: 'მ', name: 'მანი (mani)', latin: 'm', audio: '#', example: 'მზე (mze) - sun' },
  { letter: 'ნ', name: 'ნარი (nari)', latin: 'n', audio: '#', example: 'ნინო (nino) - name' },
  { letter: 'ო', name: 'ონი (oni)', latin: 'o', audio: '#', example: 'ოთახი (otakhi) - room' },
  { letter: 'პ', name: 'პარი (pari)', latin: 'p', audio: '#', example: 'პური (puri) - bread' },
  { letter: 'ჟ', name: 'ჟანი (zhani)', latin: 'zh', audio: '#', example: 'ჟურნალი (zhurnali) - magazine' },
  { letter: 'რ', name: 'რაე (rae)', latin: 'r', audio: '#', example: 'რძე (rdze) - milk' },
  { letter: 'ს', name: 'სანი (sani)', latin: 's', audio: '#', example: 'სახლი (sakhli) - house' },
  { letter: 'ტ', name: 'ტარი (tari)', latin: 't', audio: '#', example: 'ტყე (tke) - forest' },
  { letter: 'უ', name: 'უნი (uni)', latin: 'u', audio: '#', example: 'უბანი (ubani) - district' },
  { letter: 'ფ', name: 'ფარი (pari)', latin: 'p', audio: '#', example: 'ფანჯარა (panjara) - window' },
  { letter: 'ქ', name: 'ქანი (kani)', latin: 'k', audio: '#', example: 'ქალაქი (kalaki) - city' },
  { letter: 'ღ', name: 'ღანი (ghani)', latin: 'gh', audio: '#', example: 'ღვინო (ghvino) - wine' },
  { letter: 'ყ', name: 'ყარი (qari)', latin: 'q', audio: '#', example: 'ყვავილი (qvavili) - flower' },
  { letter: 'შ', name: 'შინი (shini)', latin: 'sh', audio: '#', example: 'შვილი (shvili) - child' },
  { letter: 'ჩ', name: 'ჩინი (chini)', latin: 'ch', audio: '#', example: 'ჩაი (chai) - tea' },
  { letter: 'ც', name: 'ცანი (tsani)', latin: 'ts', audio: '#', example: 'ცა (tsa) - sky' },
  { letter: 'ძ', name: 'ძილი (dzili)', latin: 'dz', audio: '#', example: 'ძაღლი (dzaghli) - dog' },
  { letter: 'წ', name: 'წილი (tsili)', latin: 'ts', audio: '#', example: 'წყალი (tsqali) - water' },
  { letter: 'ჭ', name: 'ჭარი (chari)', latin: 'ch', audio: '#', example: 'ჭიქა (chika) - glass' },
  { letter: 'ხ', name: 'ხანი (khani)', latin: 'kh', audio: '#', example: 'ხელი (kheli) - hand' },
  { letter: 'ჯ', name: 'ჯანი (jani)', latin: 'j', audio: '#', example: 'ჯინსი (jinsi) - jeans' },
  { letter: 'ჰ', name: 'ჰაე (hae)', latin: 'h', audio: '#', example: 'ჰავა (hava) - climate' },
];

const AlphabetPage: React.FC = () => {
  const { theme } = useTheme();
  const [selectedLetter, setSelectedLetter] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAlphabet = georgianAlphabet.filter(
    (letter) => 
      letter.letter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      letter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      letter.latin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      letter.example.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLetterClick = (index: number) => {
    setSelectedLetter(index === selectedLetter ? null : index);
  };

  const playAudio = (audio: string) => {
    // In a real implementation, this would play the audio file
    console.log('Playing audio:', audio);
  };

  return (
    <div className="pt-16 pb-16">
      {/* Hero section */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div>
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}>Georgian Alphabet</span> - ქართული ანბანი
              </h1>
              <p className={`text-lg mb-6 max-w-3xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                The Georgian alphabet is a unique writing system used to write the Georgian language. It has 33 letters, each with a distinct sound. Start by learning the letters, their pronunciation, and common examples.
              </p>
              <div className="flex space-x-4">
                <Link
                  to="/beginner"
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' 
                      ? 'bg-gray-700 text-white hover:bg-gray-600' 
                      : 'bg-white text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Beginner Level
                </Link>
                <Link
                  to="/beginner/quiz/alphabet"
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' ? 'bg-blue-700 text-white hover:bg-blue-800' : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Take Alphabet Quiz
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alphabet Content */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                33 Georgian Letters
              </h2>
              
              <div className="mt-4 md:mt-0">
                <input
                  type="text"
                  placeholder="Search letters..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`px-4 py-2 rounded-md w-full md:w-auto ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } border focus:outline-none focus:ring-2 ${
                    theme === 'dark' ? 'focus:ring-blue-500' : 'focus:ring-blue-500'
                  }`}
                />
              </div>
            </div>
            
            <div className={`p-4 rounded-lg mb-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'}`}>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Click on any letter to see more details, including pronunciation and example words.
                The Georgian alphabet is called "Mkhedruli" (მხედრული) and is one of the world's most unique writing systems.
              </p>
            </div>
          </div>

          {/* Alphabet Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredAlphabet.map((letter, index) => (
              <div
                key={index}
                onClick={() => handleLetterClick(index)}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  selectedLetter === index
                    ? (theme === 'dark' ? 'bg-blue-900 text-white' : 'bg-blue-100 border-blue-500')
                    : (theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50')
                } border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {letter.letter}
                  </span>
                  <span className={`text-sm px-2 py-1 rounded ${
                    theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {letter.latin}
                  </span>
                </div>
                <div className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {letter.name}
                </div>
                
                {selectedLetter === index && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => playAudio(letter.audio)}
                      className={`flex items-center text-sm ${
                        theme === 'dark' 
                          ? 'text-blue-400 hover:text-blue-300' 
                          : 'text-blue-600 hover:text-blue-700'
                      }`}
                    >
                      <Play size={16} className="mr-1" />
                      Pronounce
                    </button>
                    <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {letter.example}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {filteredAlphabet.length === 0 && (
            <div className={`p-8 text-center rounded-lg ${
              theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-50 text-gray-600'
            }`}>
              <VolumeX size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg">No letters found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      </section>

      {/* Learning Tips */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Tips for Learning the Georgian Alphabet
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
              <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Practice Writing
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Write each letter repeatedly to build muscle memory and improve recognition. Pay attention to the unique curves and shapes.
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
              <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Learn in Groups
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Study 5-7 letters at a time rather than trying to memorize all 33 at once. Master each group before moving to the next.
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
              <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Use Mnemonics
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Create visual associations or stories to help remember the shapes of unfamiliar letters. Connect the letter shape to something familiar.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Practice Section */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`p-8 rounded-lg text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'}`}>
            <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Ready to Practice Your Knowledge?
            </h2>
            <p className={`max-w-2xl mx-auto mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Test your understanding of the Georgian alphabet with our interactive quiz. Recognize letters, match them to sounds, and practice with example words.
            </p>
            <Link
              to="/beginner/quiz/alphabet"
              className={`inline-flex items-center px-6 py-3 rounded-lg font-medium ${
                theme === 'dark' ? 'bg-blue-700 text-white hover:bg-blue-800' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Take the Alphabet Quiz
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AlphabetPage;