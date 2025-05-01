import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Book, MessageSquare, Play, Volume2, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface Conversation {
  id: string;
  title: string;
  description: string;
  dialogue: {
    speaker: string;
    georgian: string;
    pronunciation: string;
    english: string;
    audio?: string;
  }[];
}

const DailyConversationsPage: React.FC = () => {
  const { theme } = useTheme();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const conversations: Conversation[] = [
    {
      id: 'greetings',
      title: 'Basic Greetings',
      description: 'Learn how to greet people and introduce yourself',
      dialogue: [
        {
          speaker: 'A',
          georgian: 'გამარჯობა!',
          pronunciation: 'gamarjoba!',
          english: 'Hello!'
        },
        {
          speaker: 'B',
          georgian: 'გამარჯობა! როგორ ხარ?',
          pronunciation: 'gamarjoba! rogor khar?',
          english: 'Hello! How are you?'
        },
        {
          speaker: 'A',
          georgian: 'კარგად, შენ?',
          pronunciation: 'kargad, shen?',
          english: 'Good, and you?'
        },
        {
          speaker: 'B',
          georgian: 'მეც კარგად. რა გქვია?',
          pronunciation: 'mets kargad. ra gkvia?',
          english: 'I\'m good too. What\'s your name?'
        },
        {
          speaker: 'A',
          georgian: 'მე მქვია გიორგი. შენ?',
          pronunciation: 'me mkvia giorgi. shen?',
          english: 'My name is Giorgi. And you?'
        },
        {
          speaker: 'B',
          georgian: 'მე მქვია ნინო. სასიამოვნოა.',
          pronunciation: 'me mkvia nino. sasiamovnoa.',
          english: 'My name is Nino. Nice to meet you.'
        }
      ]
    },
    {
      id: 'cafe',
      title: 'At the Café',
      description: 'Order food and drinks at a café',
      dialogue: [
        {
          speaker: 'Customer',
          georgian: 'გამარჯობა, ერთი ყავა მინდა.',
          pronunciation: 'gamarjoba, erti qava minda.',
          english: 'Hello, I would like one coffee.'
        },
        {
          speaker: 'Barista',
          georgian: 'როგორი ყავა გნებავთ?',
          pronunciation: 'rogori qava gnebavt?',
          english: 'What kind of coffee would you like?'
        },
        {
          speaker: 'Customer',
          georgian: 'ამერიკანო, გთხოვთ.',
          pronunciation: 'amerikano, gtxovt.',
          english: 'Americano, please.'
        },
        {
          speaker: 'Barista',
          georgian: 'რამე კიდევ გნებავთ?',
          pronunciation: 'rame kidev gnebavt?',
          english: 'Would you like anything else?'
        },
        {
          speaker: 'Customer',
          georgian: 'არა, მადლობა.',
          pronunciation: 'ara, madloba.',
          english: 'No, thank you.'
        }
      ]
    },
    {
      id: 'directions',
      title: 'Asking for Directions',
      description: 'Learn how to ask for and give directions',
      dialogue: [
        {
          speaker: 'Tourist',
          georgian: 'უკაცრავად, მუზეუმი სად არის?',
          pronunciation: 'ukatsravad, muzeumi sad aris?',
          english: 'Excuse me, where is the museum?'
        },
        {
          speaker: 'Local',
          georgian: 'პირდაპირ იარეთ და მარცხნივ შეუხვიეთ.',
          pronunciation: 'pirdapir iaret da martsxniv sheukhviet.',
          english: 'Go straight and turn left.'
        },
        {
          speaker: 'Tourist',
          georgian: 'შორს არის?',
          pronunciation: 'shors aris?',
          english: 'Is it far?'
        },
        {
          speaker: 'Local',
          georgian: 'არა, ხუთი წუთის სავალზეა.',
          pronunciation: 'ara, khuti tsutis savalzea.',
          english: 'No, it\'s a five-minute walk.'
        }
      ]
    },
    {
      id: 'shopping',
      title: 'Shopping',
      description: 'Common phrases for shopping',
      dialogue: [
        {
          speaker: 'Customer',
          georgian: 'ეს რა ღირს?',
          pronunciation: 'es ra ghirs?',
          english: 'How much is this?'
        },
        {
          speaker: 'Seller',
          georgian: 'ოცი ლარი.',
          pronunciation: 'otsi lari.',
          english: 'Twenty lari.'
        },
        {
          speaker: 'Customer',
          georgian: 'ძალიან ძვირია.',
          pronunciation: 'dzalian dzviria.',
          english: 'It\'s very expensive.'
        },
        {
          speaker: 'Seller',
          georgian: 'თხუთმეტ ლარად მოგცემთ.',
          pronunciation: 'tkhutmet larad mogtsemt.',
          english: 'I\'ll give it to you for fifteen lari.'
        }
      ]
    },
    {
      id: 'restaurant',
      title: 'At the Restaurant',
      description: 'Order food and interact with waitstaff',
      dialogue: [
        {
          speaker: 'Waiter',
          georgian: 'მოგესალმებით, რას მიირთმევთ?',
          pronunciation: 'mogesalmebit, ras miirtmevt?',
          english: 'Welcome, what would you like to eat?'
        },
        {
          speaker: 'Customer',
          georgian: 'მენიუ შეიძლება?',
          pronunciation: 'meniu sheidzleba?',
          english: 'Can I have the menu?'
        },
        {
          speaker: 'Waiter',
          georgian: 'დიახ, ინებეთ.',
          pronunciation: 'diakh, inebet.',
          english: 'Yes, here you are.'
        },
        {
          speaker: 'Customer',
          georgian: 'ხაჭაპური და ხინკალი მინდა.',
          pronunciation: 'khachapuri da khinkali minda.',
          english: 'I would like khachapuri and khinkali.'
        }
      ]
    },
    {
      id: 'transportation',
      title: 'Taking Transportation',
      description: 'Learn how to use public transport and taxis',
      dialogue: [
        {
          speaker: 'Passenger',
          georgian: 'უკაცრავად, ავტობუსი ნომერი 1 აქედან გადის?',
          pronunciation: 'ukatsravad, avtobusi nomeri erti akedan gadis?',
          english: 'Excuse me, does bus number 1 leave from here?'
        },
        {
          speaker: 'Local',
          georgian: 'დიახ, ყოველ 15 წუთში ერთხელ.',
          pronunciation: 'diakh, qovel txutmet tsutshi ertkhel.',
          english: 'Yes, every 15 minutes.'
        },
        {
          speaker: 'Passenger',
          georgian: 'რამდენი გაჩერებაა ცენტრამდე?',
          pronunciation: 'ramdeni gacherebaa tsentramde?',
          english: 'How many stops until the center?'
        },
        {
          speaker: 'Local',
          georgian: 'ხუთი გაჩერება. ბილეთი 1 ლარი ღირს.',
          pronunciation: 'khuti gachereba. bileti erti lari ghirs.',
          english: 'Five stops. The ticket costs 1 lari.'
        }
      ]
    },
    {
      id: 'healthcare',
      title: 'At the Doctor',
      description: 'Medical vocabulary and common phrases',
      dialogue: [
        {
          speaker: 'Doctor',
          georgian: 'რა გაწუხებთ?',
          pronunciation: 'ra gatsukhebt?',
          english: 'What\'s bothering you?'
        },
        {
          speaker: 'Patient',
          georgian: 'თავი მტკივა და სიცხე მაქვს.',
          pronunciation: 'tavi mtkiva da sitskhe makvs.',
          english: 'I have a headache and fever.'
        },
        {
          speaker: 'Doctor',
          georgian: 'რამდენი ხანია?',
          pronunciation: 'ramdeni khania?',
          english: 'For how long?'
        },
        {
          speaker: 'Patient',
          georgian: 'გუშინიდან.',
          pronunciation: 'gushinidan.',
          english: 'Since yesterday.'
        },
        {
          speaker: 'Doctor',
          georgian: 'რეცეპტს გამოგიწერთ.',
          pronunciation: 'retsepts gamogitsert.',
          english: 'I\'ll write you a prescription.'
        }
      ]
    },
    {
      id: 'weather',
      title: 'Discussing Weather',
      description: 'Talk about weather conditions',
      dialogue: [
        {
          speaker: 'A',
          georgian: 'დღეს რა ამინდია?',
          pronunciation: 'dghes ra amindia?',
          english: 'What\'s the weather like today?'
        },
        {
          speaker: 'B',
          georgian: 'მზიანია, მაგრამ ცივა.',
          pronunciation: 'mziania, magram tsiva.',
          english: 'It\'s sunny but cold.'
        },
        {
          speaker: 'A',
          georgian: 'ხვალ წვიმა იქნება?',
          pronunciation: 'khval tsvima ikneba?',
          english: 'Will it rain tomorrow?'
        },
        {
          speaker: 'B',
          georgian: 'არა, მზიანი დღე იქნება.',
          pronunciation: 'ara, mziani dghe ikneba.',
          english: 'No, it will be a sunny day.'
        }
      ]
    },
    {
      id: 'phone',
      title: 'Phone Conversations',
      description: 'Common phrases for phone calls',
      dialogue: [
        {
          speaker: 'Caller',
          georgian: 'გამარჯობა, გიორგი სახლშია?',
          pronunciation: 'gamarjoba, giorgi sakhlshia?',
          english: 'Hello, is Giorgi home?'
        },
        {
          speaker: 'Receiver',
          georgian: 'არა, სამსახურშია. ვინ კითხულობს?',
          pronunciation: 'ara, samsakhurishia. vin kitkhuobs?',
          english: 'No, he\'s at work. Who\'s asking?'
        },
        {
          speaker: 'Caller',
          georgian: 'მე ვარ დათო. როდის დაბრუნდება?',
          pronunciation: 'me var dato. rodis dabrundeba?',
          english: 'This is Dato. When will he return?'
        },
        {
          speaker: 'Receiver',
          georgian: 'საღამოს შვიდ საათზე.',
          pronunciation: 'saghamos shvid saatze.',
          english: 'At seven in the evening.'
        }
      ]
    },
    {
      id: 'plans',
      title: 'Making Plans',
      description: 'Arrange meetings and activities',
      dialogue: [
        {
          speaker: 'A',
          georgian: 'შაბათს რას აკეთებ?',
          pronunciation: 'shabats ras aketeb?',
          english: 'What are you doing on Saturday?'
        },
        {
          speaker: 'B',
          georgian: 'არაფერს განსაკუთრებულს. რატომ?',
          pronunciation: 'arapers gansakutrebuls. ratom?',
          english: 'Nothing special. Why?'
        },
        {
          speaker: 'A',
          georgian: 'კაფეში წავიდეთ?',
          pronunciation: 'kapeshi tsavidet?',
          english: 'Shall we go to a café?'
        },
        {
          speaker: 'B',
          georgian: 'კარგი აზრია! რომელ საათზე?',
          pronunciation: 'kargi azria! romel saatze?',
          english: 'Good idea! What time?'
        }
      ]
    },
    {
      id: 'work',
      title: 'At Work',
      description: 'Professional conversations',
      dialogue: [
        {
          speaker: 'Employee',
          georgian: 'შეხვედრა როდის იწყება?',
          pronunciation: 'shekhvedra rodis itsqeba?',
          english: 'When does the meeting start?'
        },
        {
          speaker: 'Colleague',
          georgian: 'ათ საათზე, საკონფერენციო ოთახში.',
          pronunciation: 'at saatze, sakonperentsio otakhshi.',
          english: 'At 10 o\'clock, in the conference room.'
        },
        {
          speaker: 'Employee',
          georgian: 'პრეზენტაცია მზად არის?',
          pronunciation: 'prezentatsia mzad aris?',
          english: 'Is the presentation ready?'
        },
        {
          speaker: 'Colleague',
          georgian: 'დიახ, ყველაფერი მზადაა.',
          pronunciation: 'diakh, qvelaperi mzadaa.',
          english: 'Yes, everything is ready.'
        }
      ]
    },
    {
      id: 'family',
      title: 'Family Gatherings',
      description: 'Conversations with family members',
      dialogue: [
        {
          speaker: 'Parent',
          georgian: 'სად არიან ბავშვები?',
          pronunciation: 'sad arian bavshvebi?',
          english: 'Where are the children?'
        },
        {
          speaker: 'Relative',
          georgian: 'ეზოში თამაშობენ.',
          pronunciation: 'ezoshi tamashoben.',
          english: 'They\'re playing in the yard.'
        },
        {
          speaker: 'Parent',
          georgian: 'სადილი მზად არის?',
          pronunciation: 'sadili mzad aris?',
          english: 'Is lunch ready?'
        },
        {
          speaker: 'Relative',
          georgian: 'კი, შეგვიძლია დავსხდეთ.',
          pronunciation: 'ki, shegvidzlia davskhdet.',
          english: 'Yes, we can sit down.'
        }
      ]
    },
    {
      id: 'emergency',
      title: 'Emergency Situations',
      description: 'Important phrases for urgent situations',
      dialogue: [
        {
          speaker: 'Caller',
          georgian: 'გთხოვთ, სასწრაფოდ! უბედური შემთხვევაა!',
          pronunciation: 'gtxovt, sastsrapod! ubeduri shemtkhvevaa!',
          english: 'Please, urgent! There\'s been an accident!'
        },
        {
          speaker: 'Operator',
          georgian: 'სად ხართ? მისამართი მითხარით.',
          pronunciation: 'sad khart? misamarti mitkharit.',
          english: 'Where are you? Tell me the address.'
        },
        {
          speaker: 'Caller',
          georgian: 'რუსთაველის გამზირი 10.',
          pronunciation: 'rustaveli gamziri ati.',
          english: '10 Rustaveli Avenue.'
        },
        {
          speaker: 'Operator',
          georgian: 'სასწრაფო მოდის. ხაზზე დარჩით.',
          pronunciation: 'sastsrapo modis. khazze darchit.',
          english: 'An ambulance is coming. Stay on the line.'
        }
      ]
    }
  ];

  const playAudio = (dialogueId: string) => {
    if (isPlaying === dialogueId) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src = `https://api.example.com/audio/${dialogueId}.mp3`;
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
        });
        setIsPlaying(dialogueId);
      }
    }
  };

  return (
    <div className="pt-16 pb-16">
      <audio 
        ref={audioRef}
        onEnded={() => setIsPlaying(null)}
        onError={() => setIsPlaying(null)}
      />

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-purple-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>Daily Conversations</span>
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Practice real-world Georgian conversations for everyday situations
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
                  to="/intermediate/quiz/conversations"
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
                <Book className={`w-12 h-12 mb-4 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Study Tips
                </h3>
                <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• Listen to each dialogue multiple times</li>
                  <li>• Practice speaking both roles</li>
                  <li>• Focus on pronunciation</li>
                  <li>• Learn phrases in context</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg overflow-hidden`}
              >
                <button
                  onClick={() => setSelectedConversation(
                    selectedConversation === conversation.id ? null : conversation.id
                  )}
                  className={`w-full p-6 text-left transition-colors ${
                    theme === 'dark' ? 'hover:bg-gray-750' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`p-3 rounded-full mr-4 ${
                        theme === 'dark' ? 'bg-gray-700 text-purple-400' : 'bg-purple-100 text-purple-600'
                      }`}>
                        <MessageSquare size={24} />
                      </div>
                      <div>
                        <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {conversation.title}
                        </h3>
                        <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                          {conversation.description}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playAudio(conversation.id);
                      }}
                      className={`p-2 rounded-full ${
                        theme === 'dark' 
                          ? 'bg-gray-700 hover:bg-gray-600' 
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {isPlaying === conversation.id ? (
                        <X size={20} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />
                      ) : (
                        <Volume2 size={20} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />
                      )}
                    </button>
                  </div>
                </button>

                {selectedConversation === conversation.id && (
                  <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="space-y-4">
                      {conversation.dialogue.map((line, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg ${
                            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-sm font-medium ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                              {line.speaker}
                            </span>
                            <button
                              onClick={() => playAudio(`${conversation.id}-${index}`)}
                              className={`p-2 rounded-full transition-colors ${
                                isPlaying === `${conversation.id}-${index}`
                                  ? (theme === 'dark' ? 'bg-purple-600' : 'bg-purple-500')
                                  : (theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300')
                              }`}
                            >
                              <Play size={16} className={
                                isPlaying === `${conversation.id}-${index}`
                                  ? 'text-white'
                                  : (theme === 'dark' ? 'text-gray-300' : 'text-gray-700')
                              } />
                            </button>
                          </div>
                          <p className={`text-lg font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {line.georgian}
                          </p>
                          <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            /{line.pronunciation}/
                          </p>
                          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                            {line.english}
                          </p>
                        </div>
                      ))}
                    </div>
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

export default DailyConversationsPage;