import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Cat, ChevronDown, ChevronUp, Play, Volume2, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface Animal {
  georgian: string;
  latin: string;
  english: string;
  example?: string;
}

interface AnimalCategory {
  id: string;
  title: string;
  description: string;
  animals: Animal[];
}

const AnimalsPage: React.FC = () => {
  const { theme } = useTheme();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const categories: AnimalCategory[] = [
    {
      id: 'pets',
      title: 'Pets & Domestic Animals',
      description: 'Common household and farm animals',
      animals: [
        { georgian: 'ძაღლი', latin: 'dzaghli', english: 'dog', example: 'დიდი ძაღლი - Big dog' },
        { georgian: 'კატა', latin: 'kata', english: 'cat', example: 'შავი კატა - Black cat' },
        { georgian: 'ცხენი', latin: 'tskheni', english: 'horse', example: 'ლამაზი ცხენი - Beautiful horse' },
        { georgian: 'ძროხა', latin: 'dzrokha', english: 'cow', example: 'რძის ძროხა - Dairy cow' },
        { georgian: 'ცხვარი', latin: 'tskhvari', english: 'sheep', example: 'თეთრი ცხვარი - White sheep' },
        { georgian: 'თხა', latin: 'tkha', english: 'goat', example: 'პატარა თხა - Small goat' },
        { georgian: 'ქათამი', latin: 'katami', english: 'chicken', example: 'დედალი ქათამი - Hen' },
        { georgian: 'კურდღელი', latin: 'kurdgheli', english: 'rabbit', example: 'რუხი კურდღელი - Gray rabbit' }
      ]
    },
    {
      id: 'wild',
      title: 'Wild Animals',
      description: 'Animals found in nature',
      animals: [
        { georgian: 'მგელი', latin: 'mgeli', english: 'wolf', example: 'რუხი მგელი - Gray wolf' },
        { georgian: 'დათვი', latin: 'datvi', english: 'bear', example: 'მურა დათვი - Brown bear' },
        { georgian: 'მელა', latin: 'mela', english: 'fox', example: 'წითელი მელა - Red fox' },
        { georgian: 'ირემი', latin: 'iremi', english: 'deer', example: 'ახალგაზრდა ირემი - Young deer' },
        { georgian: 'სპილო', latin: 'spilo', english: 'elephant', example: 'დიდი სპილო - Big elephant' },
        { georgian: 'ლომი', latin: 'lomi', english: 'lion', example: 'ძლიერი ლომი - Strong lion' },
        { georgian: 'ვეფხვი', latin: 'vepkhvi', english: 'tiger', example: 'ბენგალური ვეფხვი - Bengal tiger' },
        { georgian: 'გარეული ღორი', latin: 'gareuli ghori', english: 'wild boar', example: 'დიდი გარეული ღორი - Big wild boar' }
      ]
    },
    {
      id: 'birds',
      title: 'Birds',
      description: 'Different types of birds',
      animals: [
        { georgian: 'ჩიტი', latin: 'chiti', english: 'bird', example: 'პატარა ჩიტი - Small bird' },
        { georgian: 'არწივი', latin: 'artsivi', english: 'eagle', example: 'მთის არწივი - Mountain eagle' },
        { georgian: 'ბუ', latin: 'bu', english: 'owl', example: 'ბრძენი ბუ - Wise owl' },
        { georgian: 'მტრედი', latin: 'mtredi', english: 'pigeon/dove', example: 'თეთრი მტრედი - White dove' },
        { georgian: 'ყვავი', latin: 'qvavi', english: 'crow', example: 'შავი ყვავი - Black crow' },
        { georgian: 'მერცხალი', latin: 'mertskhali', english: 'swallow', example: 'სწრაფი მერცხალი - Fast swallow' },
        { georgian: 'იხვი', latin: 'ikhvi', english: 'duck', example: 'წყლის იხვი - Water duck' },
        { georgian: 'ბატი', latin: 'bati', english: 'goose', example: 'დიდი ბატი - Big goose' }
      ]
    },
    {
      id: 'insects',
      title: 'Insects & Small Creatures',
      description: 'Insects and other small animals',
      animals: [
        { georgian: 'პეპელა', latin: 'pepela', english: 'butterfly', example: 'ფერადი პეპელა - Colorful butterfly' },
        { georgian: 'ფუტკარი', latin: 'putkari', english: 'bee', example: 'თაფლის ფუტკარი - Honey bee' },
        { georgian: 'ჭიანჭველა', latin: 'chianchvela', english: 'ant', example: 'პატარა ჭიანჭველა - Small ant' },
        { georgian: 'ხოჭო', latin: 'khocho', english: 'beetle', example: 'შავი ხოჭო - Black beetle' },
        { georgian: 'კოღო', latin: 'kogho', english: 'mosquito', example: 'მწერი კოღო - Mosquito insect' },
        { georgian: 'ობობა', latin: 'oboba', english: 'spider', example: 'დიდი ობობა - Big spider' },
        { georgian: 'ჭრიჭინა', latin: 'chrichina', english: 'cricket', example: 'მწვანე ჭრიჭინა - Green cricket' },
        { georgian: 'პარკხვევია', latin: 'parkkhvevia', english: 'ladybug', example: 'წითელი პარკხვევია - Red ladybug' }
      ]
    },
    {
      id: 'marine',
      title: 'Marine Animals',
      description: 'Sea and water creatures',
      animals: [
        { georgian: 'თევზი', latin: 'tevzi', english: 'fish', example: 'ზღვის თევზი - Sea fish' },
        { georgian: 'ვეშაპი', latin: 'veshapi', english: 'whale', example: 'დიდი ვეშაპი - Big whale' },
        { georgian: 'დელფინი', latin: 'delpini', english: 'dolphin', example: 'მხიარული დელფინი - Playful dolphin' },
        { georgian: 'ზვიგენი', latin: 'zvigeni', english: 'shark', example: 'დიდი ზვიგენი - Big shark' },
        { georgian: 'კიბორჩხალა', latin: 'kiborchkhala', english: 'crab', example: 'წითელი კიბორჩხალა - Red crab' },
        { georgian: 'რვაფეხა', latin: 'rvapekha', english: 'octopus', example: 'დიდი რვაფეხა - Big octopus' },
        { georgian: 'სელაპი', latin: 'selapi', english: 'seal', example: 'ზღვის სელაპი - Sea seal' },
        { georgian: 'ზღვის ვარსკვლავი', latin: 'zghvis varskvlavi', english: 'starfish', example: 'ლამაზი ზღვის ვარსკვლავი - Beautiful starfish' }
      ]
    },
    {
      id: 'reptiles',
      title: 'Reptiles & Amphibians',
      description: 'Cold-blooded creatures',
      animals: [
        { georgian: 'გველი', latin: 'gveli', english: 'snake', example: 'გრძელი გველი - Long snake' },
        { georgian: 'ხვლიკი', latin: 'khvliki', english: 'lizard', example: 'მწვანე ხვლიკი - Green lizard' },
        { georgian: 'კუ', latin: 'ku', english: 'turtle', example: 'დიდი კუ - Big turtle' },
        { georgian: 'ბაყაყი', latin: 'baqaqi', english: 'frog', example: 'მწვანე ბაყაყი - Green frog' },
        { georgian: 'ნიანგი', latin: 'niangi', english: 'crocodile', example: 'დიდი ნიანგი - Big crocodile' },
        { georgian: 'სალამანდრა', latin: 'salamandra', english: 'salamander', example: 'შავი სალამანდრა - Black salamander' },
        { georgian: 'იგუანა', latin: 'iguana', english: 'iguana', example: 'მწვანე იგუანა - Green iguana' },
        { georgian: 'გომბეშო', latin: 'gombesho', english: 'toad', example: 'დიდი გომბეშო - Big toad' }
      ]
    }
  ];

  const toggleCategory = (categoryId: string) => {
    if (expandedCategory === categoryId) {
      setExpande

dCategory(null);
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
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-br from-amber-50 to-yellow-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}>Animals</span> - ცხოველები
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Learn the names of animals and related vocabulary in Georgian.
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
                  to="/beginner/quiz/animals"
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' ? 'bg-amber-700 text-white hover:bg-amber-800' : 'bg-amber-600 text-white hover:bg-amber-700'
                  }`}
                >
                  Take Quiz
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="hidden md:block md:w-1/3">
              <div className={`p-6 rounded-lg shadow-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-white bg-opacity-50 backdrop-blur-lg'}`}>
                <Cat className={`w-12 h-12 mb-4 ${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}`} />
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Learning Tips
                </h3>
                <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• Learn animals by category</li>
                  <li>• Practice pronunciation</li>
                  <li>• Use animals in sentences</li>
                  <li>• Learn related adjectives</li>
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
                    {category.animals.map((animal, index) => (
                      <div
                        key={index}
                        className={`p-6 rounded-lg ${
                          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                        } shadow-lg`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {animal.georgian}
                          </span>
                          <button
                            onClick={() => playAudio(animal.georgian)}
                            className={`p-2 rounded-full transition-colors ${
                              isPlaying === animal.georgian
                                ? (theme === 'dark' ? 'bg-amber-600' : 'bg-amber-500')
                                : (theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200')
                            }`}
                          >
                            {isPlaying === animal.georgian ? (
                              <X size={16} className="text-white" />
                            ) : (
                              <Volume2 size={16} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />
                            )}
                          </button>
                        </div>
                        <div className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            /{animal.latin}/
                          </p>
                          <p className="font-medium">{animal.english}</p>
                          {animal.example && (
                            <p className="text-sm italic">{animal.example}</p>
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

export default AnimalsPage;