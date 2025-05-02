import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, ChevronDown, ChevronUp, Play, Volume2, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface Activity {
  georgian: string;
  latin: string;
  english: string;
  example?: string;
}

interface ActivityCategory {
  id: string;
  title: string;
  description: string;
  activities: Activity[];
}

const DailyActivitiesPage: React.FC = () => {
  const { theme } = useTheme();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const categories: ActivityCategory[] = [
    {
      id: 'morning',
      title: 'Morning Routine',
      description: 'Activities from waking up to starting the day',
      activities: [
        { georgian: 'გაღვიძება', latin: 'gaghvidzeba', english: 'waking up', example: 'დილით ადრე ვიღვიძებ - I wake up early in the morning' },
        { georgian: 'გამოღვიძება', latin: 'gamoghvidzeba', english: 'getting up', example: 'შვიდ საათზე ვდგები - I get up at seven o\'clock' },
        { georgian: 'პირის დაბანა', latin: 'piris dabana', english: 'washing face', example: 'პირს ვიბან - I wash my face' },
        { georgian: 'კბილების გახეხვა', latin: 'kbilebis gakhexva', english: 'brushing teeth', example: 'კბილებს ვიხეხავ - I brush my teeth' },
        { georgian: 'შხაპის მიღება', latin: 'shxapis migheba', english: 'taking a shower', example: 'შხაპს ვიღებ - I take a shower' },
        { georgian: 'ჩაცმა', latin: 'chatsma', english: 'getting dressed', example: 'ტანსაცმელს ვიცვამ - I put on clothes' },
        { georgian: 'საუზმის მომზადება', latin: 'sauzmis momzadeba', english: 'preparing breakfast', example: 'საუზმეს ვამზადებ - I prepare breakfast' },
        { georgian: 'ყავის დალევა', latin: 'qavis daleva', english: 'drinking coffee', example: 'ყავას ვსვამ - I drink coffee' }
      ]
    },
    {
      id: 'work',
      title: 'Work & Study',
      description: 'Activities related to work and education',
      activities: [
        { georgian: 'სამსახურში წასვლა', latin: 'samsakhurshi tsasvla', english: 'going to work', example: 'სამსახურში მივდივარ - I go to work' },
        { georgian: 'სწავლა', latin: 'stsavla', english: 'studying', example: 'ქართულს ვსწავლობ - I study Georgian' },
        { georgian: 'მუშაობა', latin: 'mushaoba', english: 'working', example: 'ოფისში ვმუშაობ - I work in the office' },
        { georgian: 'შეხვედრა', latin: 'shekhvedra', english: 'meeting', example: 'შეხვედრაზე ვარ - I am in a meeting' },
        { georgian: 'წერა', latin: 'tsera', english: 'writing', example: 'წერილს ვწერ - I write a letter' },
        { georgian: 'კითხვა', latin: 'kitkhva', english: 'reading', example: 'წიგნს ვკითხულობ - I read a book' },
        { georgian: 'სწავლება', latin: 'stsavleba', english: 'teaching', example: 'ენას ვასწავლი - I teach language' },
        { georgian: 'დასვენება', latin: 'dasveneba', english: 'taking a break', example: 'ცოტა ხანს ვისვენებ - I take a short break' }
      ]
    },
    {
      id: 'household',
      title: 'Household Chores',
      description: 'Common household activities',
      activities: [
        { georgian: 'დალაგება', latin: 'dalageba', english: 'cleaning', example: 'სახლს ვალაგებ - I clean the house' },
        { georgian: 'რეცხვა', latin: 'retskhva', english: 'washing', example: 'სარეცხს ვრეცხავ - I do the laundry' },
        { georgian: 'საჭმლის მომზადება', latin: 'sachmlis momzadeba', english: 'cooking', example: 'საჭმელს ვამზადებ - I cook food' },
        { georgian: 'ჭურჭლის რეცხვა', latin: 'churchlis retskhva', english: 'washing dishes', example: 'ჭურჭელს ვრეცხავ - I wash the dishes' },
        { georgian: 'დაგვა', latin: 'dagva', english: 'sweeping', example: 'იატაკს ვგვი - I sweep the floor' },
        { georgian: 'დაუთოება', latin: 'dautoeba', english: 'ironing', example: 'ტანსაცმელს ვაუთოებ - I iron clothes' },
        { georgian: 'საყიდლებზე წასვლა', latin: 'saqidlebze tsasvla', english: 'going shopping', example: 'საყიდლებზე მივდივარ - I go shopping' },
        { georgian: 'დაბინავება', latin: 'dabinaveba', english: 'organizing', example: 'ნივთებს ვალაგებ - I organize things' }
      ]
    },
    {
      id: 'leisure',
      title: 'Leisure Activities',
      description: 'Free time and entertainment',
      activities: [
        { georgian: 'ტელევიზორის ყურება', latin: 'televizoris qureba', english: 'watching TV', example: 'ტელევიზორს ვუყურებ - I watch TV' },
        { georgian: 'მუსიკის მოსმენა', latin: 'musikis mosmena', english: 'listening to music', example: 'მუსიკას ვუსმენ - I listen to music' },
        { georgian: 'სეირნობა', latin: 'seirnoba', english: 'taking a walk', example: 'პარკში ვსეირნობ - I walk in the park' },
        { georgian: 'ვარჯიში', latin: 'varjishi', english: 'exercising', example: 'დარბაზში ვვარჯიშობ - I exercise at the gym' },
        { georgian: 'კითხვა', latin: 'kitkhva', english: 'reading', example: 'წიგნს ვკითხულობ - I read a book' },
        { georgian: 'თამაში', latin: 'tamashi', english: 'playing', example: 'თამაშს ვთამაშობ - I play a game' },
        { georgian: 'ცეკვა', latin: 'tsekva', english: 'dancing', example: 'ვცეკვავ - I dance' },
        { georgian: 'სიმღერა', latin: 'simghera', english: 'singing', example: 'ვმღერი - I sing' }
      ]
    },
    {
      id: 'evening',
      title: 'Evening Routine',
      description: 'Activities before going to bed',
      activities: [
        { georgian: 'ვახშმის მომზადება', latin: 'vakhshmis momzadeba', english: 'preparing dinner', example: 'ვახშამს ვამზადებ - I prepare dinner' },
        { georgian: 'ვახშმობა', latin: 'vakhshmoba', english: 'having dinner', example: 'ვვახშმობ - I have dinner' },
        { georgian: 'დასვენება', latin: 'dasveneba', english: 'resting', example: 'ვისვენებ - I rest' },
        { georgian: 'აბაზანის მიღება', latin: 'abazan is migheba', english: 'taking a bath', example: 'აბაზანას ვიღებ - I take a bath' },
        { georgian: 'პიჟამის ჩაცმა', latin: 'pizhami s chatsma', english: 'putting on pajamas', example: 'პიჟამას ვიცვამ - I put on pajamas' },
        { georgian: 'კბილების გახეხვა', latin: 'kbilebis gakhexva', english: 'brushing teeth', example: 'კბილებს ვიხეხავ - I brush my teeth' },
        { georgian: 'დაძინება', latin: 'dadzineba', english: 'going to sleep', example: 'ვიძინებ - I go to sleep' },
        { georgian: 'ალარმის დაყენება', latin: 'alarmis daqeneba', english: 'setting an alarm', example: 'მაღვიძარას ვაყენებ - I set the alarm' }
      ]
    },
    {
      id: 'social',
      title: 'Social Activities',
      description: 'Interactions with others',
      activities: [
        { georgian: 'შეხვედრა', latin: 'shekhvedra', english: 'meeting', example: 'მეგობრებს ვხვდები - I meet friends' },
        { georgian: 'საუბარი', latin: 'saubari', english: 'talking', example: 'ვსაუბრობ - I talk' },
        { georgian: 'სტუმრად წასვლა', latin: 'stumrad tsasvla', english: 'visiting', example: 'სტუმრად მივდივარ - I go visiting' },
        { georgian: 'დარეკვა', latin: 'darekva', english: 'calling', example: 'ვრეკავ - I make a call' },
        { georgian: 'მიწერა', latin: 'mitsera', english: 'messaging', example: 'მესიჯს ვწერ - I send a message' },
        { georgian: 'გასეირნება', latin: 'gaseirneba', english: 'going out', example: 'გარეთ გავდივარ - I go out' },
        { georgian: 'წვეულება', latin: 'tsveuleba', english: 'partying', example: 'წვეულებაზე ვარ - I am at a party' },
        { georgian: 'სადილობა', latin: 'sadilobა', english: 'having lunch', example: 'რესტორანში ვსადილობ - I have lunch at a restaurant' }
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
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-br from-cyan-50 to-blue-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}>Daily Activities</span> - ყოველდღიური საქმიანობები
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Learn vocabulary for everyday routines and activities in Georgian.
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
                  to="/beginner/quiz/activities"
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' ? 'bg-cyan-700 text-white hover:bg-cyan-800' : 'bg-cyan-600 text-white hover:bg-cyan-700'
                  }`}
                >
                  Take Quiz
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="hidden md:block md:w-1/3">
              <div className={`p-6 rounded-lg shadow-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-white bg-opacity-50 backdrop-blur-lg'}`}>
                <Clock className={`w-12 h-12 mb-4 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`} />
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Learning Tips
                </h3>
                <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• Learn activities by time of day</li>
                  <li>• Practice with daily routines</li>
                  <li>• Use verbs in sentences</li>
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
                    {category.activities.map((activity, index) => (
                      <div
                        key={index}
                        className={`p-6 rounded-lg ${
                          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                        } shadow-lg`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {activity.georgian}
                          </span>
                          <button
                            onClick={() => playAudio(activity.georgian)}
                            className={`p-2 rounded-full transition-colors ${
                              isPlaying === activity.georgian
                                ? (theme === 'dark' ? 'bg-cyan-600' : 'bg-cyan-500')
                                : (theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200')
                            }`}
                          >
                            {isPlaying === activity.georgian ? (
                              <X size={16} className="text-white" />
                            ) : (
                              <Volume2 size={16} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />
                            )}
                          </button>
                        </div>
                        <div className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            /{activity.latin}/
                          </p>
                          <p className="font-medium">{activity.english}</p>
                          {activity.example && (
                            <p className="text-sm italic">{activity.example}</p>
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

export default DailyActivitiesPage;