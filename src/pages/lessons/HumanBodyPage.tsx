import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Heart, ChevronDown, ChevronUp, Play, Volume2, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface BodyPart {
  georgian: string;
  latin: string;
  english: string;
  example?: string;
}

interface BodyCategory {
  id: string;
  title: string;
  description: string;
  parts: BodyPart[];
}

const HumanBodyPage: React.FC = () => {
  const { theme } = useTheme();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const categories: BodyCategory[] = [
    {
      id: 'head',
      title: 'Head & Face',
      description: 'Parts of the head and face',
      parts: [
        { georgian: 'თავი', latin: 'tavi', english: 'head', example: 'თავი მტკივა - I have a headache' },
        { georgian: 'თვალი', latin: 'tvali', english: 'eye', example: 'ლურჯი თვალები - Blue eyes' },
        { georgian: 'ცხვირი', latin: 'tskhviri', english: 'nose', example: 'პატარა ცხვირი - Small nose' },
        { georgian: 'პირი', latin: 'piri', english: 'mouth', example: 'პირი გააღე - Open your mouth' },
        { georgian: 'კბილი', latin: 'kbili', english: 'tooth', example: 'თეთრი კბილები - White teeth' },
        { georgian: 'ყური', latin: 'quri', english: 'ear', example: 'ყური მტკივა - My ear hurts' },
        { georgian: 'თმა', latin: 'tma', english: 'hair', example: 'შავი თმა - Black hair' },
        { georgian: 'შუბლი', latin: 'shubli', english: 'forehead', example: 'მაღალი შუბლი - High forehead' },
        { georgian: 'ლოყა', latin: 'loqa', english: 'cheek', example: 'წითელი ლოყები - Red cheeks' },
        { georgian: 'ნიკაპი', latin: 'nikapi', english: 'chin', example: 'მრგვალი ნიკაპი - Round chin' }
      ]
    },
    {
      id: 'body',
      title: 'Body & Torso',
      description: 'Main body parts',
      parts: [
        { georgian: 'სხეული', latin: 'sxeuli', english: 'body', example: 'ჯანმრთელი სხეული - Healthy body' },
        { georgian: 'მკერდი', latin: 'mkerdi', english: 'chest', example: 'მკერდის ტკივილი - Chest pain' },
        { georgian: 'მუცელი', latin: 'mutseli', english: 'stomach', example: 'მუცელი მტკივა - My stomach hurts' },
        { georgian: 'ზურგი', latin: 'zurgi', english: 'back', example: 'სწორი ზურგი - Straight back' },
        { georgian: 'მხარი', latin: 'mkhari', english: 'shoulder', example: 'მარჯვენა მხარი - Right shoulder' },
        { georgian: 'გული', latin: 'guli', english: 'heart', example: 'გული მიცემს - Heart beats' },
        { georgian: 'ფილტვი', latin: 'piltvi', english: 'lung', example: 'ჯანმრთელი ფილტვები - Healthy lungs' },
        { georgian: 'კისერი', latin: 'kiseri', english: 'neck', example: 'გრძელი კისერი - Long neck' }
      ]
    },
    {
      id: 'limbs',
      title: 'Arms & Legs',
      description: 'Limbs and extremities',
      parts: [
        { georgian: 'ხელი', latin: 'kheli', english: 'hand/arm', example: 'მარჯვენა ხელი - Right hand' },
        { georgian: 'თითი', latin: 'titi', english: 'finger', example: 'გრძელი თითები - Long fingers' },
        { georgian: 'ფეხი', latin: 'pekhi', english: 'leg/foot', example: 'მარცხენა ფეხი - Left leg' },
        { georgian: 'მუხლი', latin: 'mukhli', english: 'knee', example: 'მუხლის ტკივილი - Knee pain' },
        { georgian: 'იდაყვი', latin: 'idaqvi', english: 'elbow', example: 'იდაყვის სახსარი - Elbow joint' },
        { georgian: 'მაჯა', latin: 'maja', english: 'wrist', example: 'წვრილი მაჯა - Thin wrist' },
        { georgian: 'ტერფი', latin: 'terpi', english: 'foot', example: 'პატარა ტერფი - Small foot' },
        { georgian: 'ფრჩხილი', latin: 'prchkhili', english: 'nail', example: 'გრძელი ფრჩხილები - Long nails' }
      ]
    },
    {
      id: 'health',
      title: 'Health & Medical',
      description: 'Health-related vocabulary',
      parts: [
        { georgian: 'ტკივილი', latin: 'tkivili', english: 'pain', example: 'ძლიერი ტკივილი - Strong pain' },
        { georgian: 'სიცხე', latin: 'sitskhe', english: 'fever', example: 'მაღალი სიცხე - High fever' },
        { georgian: 'ჭრილობა', latin: 'chriloba', english: 'wound', example: 'პატარა ჭრილობა - Small wound' },
        { georgian: 'სისხლი', latin: 'siskhli', english: 'blood', example: 'წითელი სისხლი - Red blood' },
        { georgian: 'კუნთი', latin: 'kunti', english: 'muscle', example: 'ძლიერი კუნთები - Strong muscles' },
        { georgian: 'ძვალი', latin: 'dzvali', english: 'bone', example: 'მყარი ძვალი - Solid bone' },
        { georgian: 'სახსარი', latin: 'sakhsari', english: 'joint', example: 'მტკივანი სახსარი - Painful joint' },
        { georgian: 'ნერვი', latin: 'nervi', english: 'nerve', example: 'ნერვების დაძაბვა - Nerve tension' }
      ]
    }
  ];

  const toggleCategory = (categoryId: string) => {
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
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-br from-pink-50 to-red-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-pink-400' : 'text-pink-600'}>Human Body</span> - ადამიანის სხეული
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Learn body parts and health-related vocabulary in Georgian.
              </p>
              <div className="flex flex-wrap gap-2">
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
                  to="/beginner/quiz/body"
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' ? 'bg-pink-700 text-white hover:bg-pink-800' : 'bg-pink-600 text-white hover:bg-pink-700'
                  }`}
                >
                  Take Quiz
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="hidden md:block md:w-1/3">
              <div className={`p-6 rounded-lg shadow-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-white bg-opacity-50 backdrop-blur-lg'}`}>
                <Heart className={`w-12 h-12 mb-4 ${theme === 'dark' ? 'text-pink-400' : 'text-pink-600'}`} />
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Learning Tips
                </h3>
                <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• Learn parts in related groups</li>
                  <li>• Practice with visual aids</li>
                  <li>• Use words in health contexts</li>
                  <li>• Focus on pronunciation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {categories.map((category) => (
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
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.parts.map((part, index) => (
                      <div
                        key={index}
                        className={`p-6 rounded-lg ${
                          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                        } shadow-lg`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {part.georgian}
                          </span>
                          <button
                            onClick={() => playAudio(part.georgian)}
                            className={`p-2 rounded-full transition-colors ${
                              isPlaying === part.georgian
                                ? (theme === 'dark' ? 'bg-pink-600' : 'bg-pink-500')
                                : (theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200')
                            }`}
                          >
                            {isPlaying === part.georgian ? (
                              <X size={16} className="text-white" />
                            ) : (
                              <Volume2 size={16} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />
                            )}
                          </button>
                        </div>
                        <div className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            /{part.latin}/
                          </p>
                          <p className="font-medium">{part.english}</p>
                          {part.example && (
                            <p className="text-sm italic">{part.example}</p>
                          )}
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
    </div>
  );
};

export default HumanBodyPage;