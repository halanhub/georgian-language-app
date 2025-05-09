import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MessageCircle, Play, Volume2, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserProgress } from '../../hooks/useUserProgress';
import { useAuth } from '../../contexts/AuthContext';

interface Conversation {
  id: string;
  title: string;
  description: string;
  dialogues: Array<{
    speaker: string;
    georgian: string;
    pronunciation: string;
    english: string;
  }>;
  vocabulary: Array<{
    word: string;
    pronunciation: string;
    translation: string;
  }>;
  questions: Array<{
    question: string;
    options: string[];
    correctAnswer: number;
  }>;
}

interface ConversationCategory {
  id: string;
  title: string;
  description: string;
  conversations: Conversation[];
}

const DailyConversationsPage: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { updateProgress } = useUserProgress();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedConversation, setExpandedConversation] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const conversationRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [timeSpent, setTimeSpent] = useState(0);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const conversationCategories: ConversationCategory[] = [
    {
      id: 'greetings',
      title: 'Greetings & Introductions',
      description: 'Basic conversations for meeting people',
      conversations: [
        {
          id: 'first-meeting',
          title: 'Meeting Someone for the First Time',
          description: 'A conversation between two people meeting for the first time',
          dialogues: [
            {
              speaker: 'Person A',
              georgian: 'გამარჯობა!',
              pronunciation: 'gamarjoba!',
              english: 'Hello!'
            },
            {
              speaker: 'Person B',
              georgian: 'გამარჯობა!',
              pronunciation: 'gamarjoba!',
              english: 'Hello!'
            },
            {
              speaker: 'Person A',
              georgian: 'მე მქვია გიორგი. შენ?',
              pronunciation: 'me mkvia giorgi. shen?',
              english: 'My name is Giorgi. And you?'
            },
            {
              speaker: 'Person B',
              georgian: 'მე მქვია ანა. სასიამოვნოა.',
              pronunciation: 'me mkvia ana. sasiamovnoa.',
              english: 'My name is Ana. Nice to meet you.'
            },
            {
              speaker: 'Person A',
              georgian: 'საიდან ხარ?',
              pronunciation: 'saidan khar?',
              english: 'Where are you from?'
            },
            {
              speaker: 'Person B',
              georgian: 'მე ვარ თბილისიდან. შენ?',
              pronunciation: 'me var tbilisidan. shen?',
              english: 'I am from Tbilisi. And you?'
            },
            {
              speaker: 'Person A',
              georgian: 'მე ვარ ბათუმიდან.',
              pronunciation: 'me var batumidan.',
              english: 'I am from Batumi.'
            }
          ],
          vocabulary: [
            { word: 'გამარჯობა', pronunciation: 'gamarjoba', translation: 'hello' },
            { word: 'მქვია', pronunciation: 'mkvia', translation: 'my name is' },
            { word: 'სასიამოვნოა', pronunciation: 'sasiamovnoa', translation: 'nice to meet you' },
            { word: 'საიდან', pronunciation: 'saidan', translation: 'from where' },
            { word: 'ვარ', pronunciation: 'var', translation: 'I am' }
          ],
          questions: [
            {
              question: 'How do you say "My name is" in Georgian?',
              options: ['მე ვარ', 'მე მქვია', 'სასიამოვნოა', 'საიდან ხარ'],
              correctAnswer: 1
            },
            {
              question: 'What is the Georgian word for "hello"?',
              options: ['ნახვამდის', 'გმადლობთ', 'გამარჯობა', 'კარგად'],
              correctAnswer: 2
            }
          ]
        },
        {
          id: 'how-are-you',
          title: 'Asking How Someone Is',
          description: 'A conversation about how someone is doing',
          dialogues: [
            {
              speaker: 'Person A',
              georgian: 'გამარჯობა! როგორ ხარ?',
              pronunciation: 'gamarjoba! rogor khar?',
              english: 'Hello! How are you?'
            },
            {
              speaker: 'Person B',
              georgian: 'გამარჯობა! კარგად, შენ?',
              pronunciation: 'gamarjoba! kargad, shen?',
              english: 'Hello! Good, and you?'
            },
            {
              speaker: 'Person A',
              georgian: 'მეც კარგად, გმადლობთ.',
              pronunciation: 'mets kargad, gmadlobt.',
              english: 'I am also good, thank you.'
            },
            {
              speaker: 'Person B',
              georgian: 'რას საქმიანობ?',
              pronunciation: 'ras sakmianob?',
              english: 'What do you do?'
            },
            {
              speaker: 'Person A',
              georgian: 'მე ვარ სტუდენტი. შენ?',
              pronunciation: 'me var studenti. shen?',
              english: 'I am a student. And you?'
            },
            {
              speaker: 'Person B',
              georgian: 'მე ვარ მასწავლებელი.',
              pronunciation: 'me var mastsavlebeli.',
              english: 'I am a teacher.'
            }
          ],
          vocabulary: [
            { word: 'როგორ ხარ', pronunciation: 'rogor khar', translation: 'how are you' },
            { word: 'კარგად', pronunciation: 'kargad', translation: 'good/well' },
            { word: 'გმადლობთ', pronunciation: 'gmadlobt', translation: 'thank you' },
            { word: 'რას საქმიანობ', pronunciation: 'ras sakmianob', translation: 'what do you do' },
            { word: 'სტუდენტი', pronunciation: 'studenti', translation: 'student' },
            { word: 'მასწავლებელი', pronunciation: 'mastsavlebeli', translation: 'teacher' }
          ],
          questions: [
            {
              question: 'How do you ask "How are you?" in Georgian?',
              options: ['როგორ ხარ?', 'რას საქმიანობ?', 'საიდან ხარ?', 'რა გქვია?'],
              correctAnswer: 0
            },
            {
              question: 'What is the Georgian word for "teacher"?',
              options: ['სტუდენტი', 'მასწავლებელი', 'ექიმი', 'ინჟინერი'],
              correctAnswer: 1
            }
          ]
        }
      ]
    },
    {
      id: 'restaurant',
      title: 'At the Restaurant',
      description: 'Conversations for ordering food and dining out',
      conversations: [
        {
          id: 'ordering-food',
          title: 'Ordering Food',
          description: 'A conversation between a customer and a waiter',
          dialogues: [
            {
              speaker: 'Waiter',
              georgian: 'გამარჯობა! რას ინებებთ?',
              pronunciation: 'gamarjoba! ras inebebt?',
              english: 'Hello! What would you like?'
            },
            {
              speaker: 'Customer',
              georgian: 'გამარჯობა! მენიუ გაქვთ?',
              pronunciation: 'gamarjoba! meniu gakvt?',
              english: 'Hello! Do you have a menu?'
            },
            {
              speaker: 'Waiter',
              georgian: 'დიახ, აი ინებეთ.',
              pronunciation: 'diakh, ai inebet.',
              english: 'Yes, here you are.'
            },
            {
              speaker: 'Customer',
              georgian: 'გმადლობთ. მე მინდა ხაჭაპური და ხინკალი.',
              pronunciation: 'gmadlobt. me minda khachapuri da khinkali.',
              english: 'Thank you. I would like khachapuri and khinkali.'
            },
            {
              speaker: 'Waiter',
              georgian: 'სასმელი?',
              pronunciation: 'sasmeli?',
              english: 'Drink?'
            },
            {
              speaker: 'Customer',
              georgian: 'ერთი ბოთლი წყალი და ერთი ჭიქა ღვინო.',
              pronunciation: 'erti botli tsqali da erti chika ghvino.',
              english: 'One bottle of water and one glass of wine.'
            },
            {
              speaker: 'Waiter',
              georgian: 'კარგი. სხვა რამე?',
              pronunciation: 'kargi. skhva rame?',
              english: 'Good. Anything else?'
            },
            {
              speaker: 'Customer',
              georgian: 'არა, ეს არის ყველაფერი. გმადლობთ.',
              pronunciation: 'ara, es aris qvelaperi. gmadlobt.',
              english: 'No, that is everything. Thank you.'
            }
          ],
          vocabulary: [
            { word: 'რას ინებებთ', pronunciation: 'ras inebebt', translation: 'what would you like' },
            { word: 'მენიუ', pronunciation: 'meniu', translation: 'menu' },
            { word: 'მინდა', pronunciation: 'minda', translation: 'I want' },
            { word: 'სასმელი', pronunciation: 'sasmeli', translation: 'drink' },
            { word: 'ბოთლი', pronunciation: 'botli', translation: 'bottle' },
            { word: 'ჭიქა', pronunciation: 'chika', translation: 'glass' },
            { word: 'სხვა რამე', pronunciation: 'skhva rame', translation: 'anything else' }
          ],
          questions: [
            {
              question: 'How do you say "What would you like?" in Georgian?',
              options: ['რას ინებებთ?', 'მენიუ გაქვთ?', 'სასმელი?', 'სხვა რამე?'],
              correctAnswer: 0
            },
            {
              question: 'What is the Georgian word for "menu"?',
              options: ['სასმელი', 'ჭიქა', 'მენიუ', 'ბოთლი'],
              correctAnswer: 2
            }
          ]
        },
        {
          id: 'paying-bill',
          title: 'Paying the Bill',
          description: 'A conversation about paying the bill at a restaurant',
          dialogues: [
            {
              speaker: 'Customer',
              georgian: 'ანგარიში, თუ შეიძლება.',
              pronunciation: 'angarishi, tu sheidzleba.',
              english: 'The bill, please.'
            },
            {
              speaker: 'Waiter',
              georgian: 'რა თქმა უნდა, ერთი წუთი.',
              pronunciation: 'ra tkma unda, erti tsuti.',
              english: 'Of course, one minute.'
            },
            {
              speaker: 'Waiter',
              georgian: 'აი თქვენი ანგარიში. სულ 45 ლარი.',
              pronunciation: 'ai tkveni angarishi. sul 45 lari.',
              english: 'Here is your bill. Total 45 lari.'
            },
            {
              speaker: 'Customer',
              georgian: 'შემიძლია ბარათით გადახდა?',
              pronunciation: 'shemidzlia baratit gadakhda?',
              english: 'Can I pay by card?'
            },
            {
              speaker: 'Waiter',
              georgian: 'დიახ, რა თქმა უნდა.',
              pronunciation: 'diakh, ra tkma unda.',
              english: 'Yes, of course.'
            },
            {
              speaker: 'Customer',
              georgian: 'აი, ინებეთ. დიდი მადლობა.',
              pronunciation: 'ai, inebet. didi madloba.',
              english: 'Here you are. Thank you very much.'
            },
            {
              speaker: 'Waiter',
              georgian: 'თქვენ მადლობა. კარგად ბრძანდებოდეთ.',
              pronunciation: 'tkven madloba. kargad brdzandebodet.',
              english: 'Thank you. Have a good day.'
            }
          ],
          vocabulary: [
            { word: 'ანგარიში', pronunciation: 'angarishi', translation: 'bill' },
            { word: 'თუ შეიძლება', pronunciation: 'tu sheidzleba', translation: 'please' },
            { word: 'სულ', pronunciation: 'sul', translation: 'total' },
            { word: 'ლარი', pronunciation: 'lari', translation: 'lari (Georgian currency)' },
            { word: 'ბარათი', pronunciation: 'barati', translation: 'card' },
            { word: 'გადახდა', pronunciation: 'gadakhda', translation: 'to pay' },
            { word: 'დიდი მადლობა', pronunciation: 'didi madloba', translation: 'thank you very much' }
          ],
          questions: [
            {
              question: 'How do you ask for the bill in Georgian?',
              options: [
                'შემიძლია ბარათით გადახდა?',
                'ანგარიში, თუ შეიძლება.',
                'სულ რამდენია?',
                'დიდი მადლობა.'
              ],
              correctAnswer: 1
            },
            {
              question: 'What is the Georgian word for "card" (as in credit card)?',
              options: ['ანგარიში', 'ლარი', 'ბარათი', 'გადახდა'],
              correctAnswer: 2
            }
          ]
        }
      ]
    },
    {
      id: 'shopping',
      title: 'Shopping',
      description: 'Conversations for shopping and asking about prices',
      conversations: [
        {
          id: 'buying-clothes',
          title: 'Buying Clothes',
          description: 'A conversation between a customer and a shop assistant',
          dialogues: [
            {
              speaker: 'Shop Assistant',
              georgian: 'გამარჯობა! რით შემიძლია დაგეხმაროთ?',
              pronunciation: 'gamarjoba! rit shemidzlia dagexmarot?',
              english: 'Hello! How can I help you?'
            },
            {
              speaker: 'Customer',
              georgian: 'გამარჯობა! მაისურებს ვეძებ.',
              pronunciation: 'gamarjoba! maisurebs vedzeb.',
              english: 'Hello! I am looking for T-shirts.'
            },
            {
              speaker: 'Shop Assistant',
              georgian: 'მაისურები აქეთ არის. რა ზომა გჭირდებათ?',
              pronunciation: 'maisurebi aket aris. ra zoma gchirdebat?',
              english: 'T-shirts are over here. What size do you need?'
            },
            {
              speaker: 'Customer',
              georgian: 'ზომა M. რა ღირს ეს მაისური?',
              pronunciation: 'zoma M. ra ghirs es maisuri?',
              english: 'Size M. How much is this T-shirt?'
            },
            {
              speaker: 'Shop Assistant',
              georgian: 'ეს მაისური ღირს 25 ლარი.',
              pronunciation: 'es maisuri ghirs 25 lari.',
              english: 'This T-shirt costs 25 lari.'
            },
            {
              speaker: 'Customer',
              georgian: 'კარგი, ავიღებ ამას.',
              pronunciation: 'kargi, avigheb amas.',
              english: 'Good, I will take this one.'
            }
          ],
          vocabulary: [
            { word: 'რით შემიძლია დაგეხმაროთ', pronunciation: 'rit shemidzlia dagexmarot', translation: 'how can I help you' },
            { word: 'ვეძებ', pronunciation: 'vedzeb', translation: 'I am looking for' },
            { word: 'მაისური', pronunciation: 'maisuri', translation: 'T-shirt' },
            { word: 'ზომა', pronunciation: 'zoma', translation: 'size' },
            { word: 'რა ღირს', pronunciation: 'ra ghirs', translation: 'how much is/costs' },
            { word: 'ავიღებ', pronunciation: 'avigheb', translation: 'I will take' }
          ],
          questions: [
            {
              question: 'How do you ask "How much is this?" in Georgian?',
              options: [
                'რა ზომა გჭირდებათ?',
                'რა ღირს ეს?',
                'რით შემიძლია დაგეხმაროთ?',
                'ავიღებ ამას.'
              ],
              correctAnswer: 1
            },
            {
              question: 'What is the Georgian phrase for "I am looking for"?',
              options: ['ავიღებ', 'ვეძებ', 'გჭირდებათ', 'ღირს'],
              correctAnswer: 1
            }
          ]
        },
        {
          id: 'at-market',
          title: 'At the Market',
          description: 'A conversation at a local market',
          dialogues: [
            {
              speaker: 'Customer',
              georgian: 'გამარჯობა! რამდენი ღირს ეს ვაშლი?',
              pronunciation: 'gamarjoba! ramdeni ghirs es vashli?',
              english: 'Hello! How much are these apples?'
            },
            {
              speaker: 'Vendor',
              georgian: 'გამარჯობა! 3 ლარი კილოგრამი.',
              pronunciation: 'gamarjoba! 3 lari kilogrami.',
              english: 'Hello! 3 lari per kilogram.'
            },
            {
              speaker: 'Customer',
              georgian: 'კარგია. 2 კილოგრამს ავიღებ.',
              pronunciation: 'kargia. 2 kilograms avigheb.',
              english: 'Good. I will take 2 kilograms.'
            },
            {
              speaker: 'Vendor',
              georgian: 'კიდევ რამე გნებავთ?',
              pronunciation: 'kidev rame gnebavt?',
              english: 'Would you like anything else?'
            },
            {
              speaker: 'Customer',
              georgian: 'დიახ, პომიდორიც მინდა. რამდენი ღირს?',
              pronunciation: 'diakh, pomidorits minda. ramdeni ghirs?',
              english: 'Yes, I also want tomatoes. How much are they?'
            },
            {
              speaker: 'Vendor',
              georgian: 'პომიდორი 4 ლარი ღირს.',
              pronunciation: 'pomidori 4 lari ghirs.',
              english: 'Tomatoes cost 4 lari.'
            },
            {
              speaker: 'Customer',
              georgian: '1 კილოგრამს ავიღებ. სულ რამდენია?',
              pronunciation: '1 kilograms avigheb. sul ramdenia?',
              english: 'I will take 1 kilogram. How much is the total?'
            },
            {
              speaker: 'Vendor',
              georgian: 'სულ 10 ლარი.',
              pronunciation: 'sul 10 lari.',
              english: 'Total is 10 lari.'
            }
          ],
          vocabulary: [
            { word: 'რამდენი ღირს', pronunciation: 'ramdeni ghirs', translation: 'how much is/costs' },
            { word: 'ვაშლი', pronunciation: 'vashli', translation: 'apple' },
            { word: 'კილოგრამი', pronunciation: 'kilogrami', translation: 'kilogram' },
            { word: 'კიდევ რამე', pronunciation: 'kidev rame', translation: 'anything else' },
            { word: 'პომიდორი', pronunciation: 'pomidori', translation: 'tomato' },
            { word: 'სულ', pronunciation: 'sul', translation: 'total' }
          ],
          questions: [
            {
              question: 'How do you ask "How much is the total?" in Georgian?',
              options: [
                'რამდენი ღირს?',
                'კიდევ რამე გნებავთ?',
                'სულ რამდენია?',
                'კარგია.'
              ],
              correctAnswer: 2
            },
            {
              question: 'What is the Georgian word for "apple"?',
              options: ['პომიდორი', 'ვაშლი', 'კილოგრამი', 'ლარი'],
              correctAnswer: 1
            }
          ]
        }
      ]
    },
    {
      id: 'transportation',
      title: 'Transportation',
      description: 'Conversations for getting around and using public transport',
      conversations: [
        {
          id: 'taxi',
          title: 'Taking a Taxi',
          description: 'A conversation between a passenger and a taxi driver',
          dialogues: [
            {
              speaker: 'Passenger',
              georgian: 'გამარჯობა! თავისუფალი ხართ?',
              pronunciation: 'gamarjoba! tavisupali khart?',
              english: 'Hello! Are you free?'
            },
            {
              speaker: 'Driver',
              georgian: 'გამარჯობა! დიახ, სად მიდიხართ?',
              pronunciation: 'gamarjoba! diakh, sad midikhart?',
              english: 'Hello! Yes, where are you going?'
            },
            {
              speaker: 'Passenger',
              georgian: 'რუსთაველის გამზირზე, თუ შეიძლება.',
              pronunciation: 'rustaveliz gamzirze, tu sheidzleba.',
              english: 'To Rustaveli Avenue, please.'
            },
            {
              speaker: 'Driver',
              georgian: 'კარგი. რამდენი წუთით?',
              pronunciation: 'kargi. ramdeni tsutit?',
              english: 'Good. How many minutes?'
            },
            {
              speaker: 'Passenger',
              georgian: 'რამდენი ლარი იქნება?',
              pronunciation: 'ramdeni lari ikneba?',
              english: 'How many lari will it be?'
            },
            {
              speaker: 'Driver',
              georgian: '10 ლარი.',
              pronunciation: '10 lari.',
              english: '10 lari.'
            },
            {
              speaker: 'Passenger',
              georgian: 'კარგი, წავიდეთ.',
              pronunciation: 'kargi, tsavidet.',
              english: 'Good, let\'s go.'
            }
          ],
          vocabulary: [
            { word: 'თავისუფალი', pronunciation: 'tavisupali', translation: 'free' },
            { word: 'სად მიდიხართ', pronunciation: 'sad midikhart', translation: 'where are you going' },
            { word: 'გამზირი', pronunciation: 'gamziri', translation: 'avenue' },
            { word: 'წუთი', pronunciation: 'tsuti', translation: 'minute' },
            { word: 'რამდენი', pronunciation: 'ramdeni', translation: 'how many/much' },
            { word: 'იქნება', pronunciation: 'ikneba', translation: 'will be' },
            { word: 'წავიდეთ', pronunciation: 'tsavidet', translation: 'let\'s go' }
          ],
          questions: [
            {
              question: 'How do you ask "Are you free?" to a taxi driver in Georgian?',
              options: [
                'სად მიდიხართ?',
                'თავისუფალი ხართ?',
                'რამდენი ლარი იქნება?',
                'წავიდეთ.'
              ],
              correctAnswer: 1
            },
            {
              question: 'What is the Georgian phrase for "How much will it be?"',
              options: [
                'სად მიდიხართ?',
                'თავისუფალი ხართ?',
                'რამდენი ლარი იქნება?',
                'რამდენი წუთით?'
              ],
              correctAnswer: 2
            }
          ]
        },
        {
          id: 'directions',
          title: 'Asking for Directions',
          description: 'A conversation about finding a location',
          dialogues: [
            {
              speaker: 'Tourist',
              georgian: 'უკაცრავად, სად არის ძველი თბილისი?',
              pronunciation: 'ukatsravad, sad aris dzveli tbilisi?',
              english: 'Excuse me, where is Old Tbilisi?'
            },
            {
              speaker: 'Local',
              georgian: 'ძველი თბილისი ახლოსაა. პირდაპირ იარეთ და მერე მარცხნივ.',
              pronunciation: 'dzveli tbilisi akhlosaa. pirdapir iaret da mere martsxniv.',
              english: 'Old Tbilisi is nearby. Go straight and then turn left.'
            },
            {
              speaker: 'Tourist',
              georgian: 'რამდენი წუთია ფეხით?',
              pronunciation: 'ramdeni tsutia pekhit?',
              english: 'How many minutes on foot?'
            },
            {
              speaker: 'Local',
              georgian: 'დაახლოებით 10 წუთი.',
              pronunciation: 'daakhloebith 10 tsuti.',
              english: 'About 10 minutes.'
            },
            {
              speaker: 'Tourist',
              georgian: 'დიდი მადლობა!',
              pronunciation: 'didi madloba!',
              english: 'Thank you very much!'
            },
            {
              speaker: 'Local',
              georgian: 'არაფრის.',
              pronunciation: 'arapris.',
              english: 'You\'re welcome.'
            }
          ],
          vocabulary: [
            { word: 'უკაცრავად', pronunciation: 'ukatsravad', translation: 'excuse me' },
            { word: 'სად არის', pronunciation: 'sad aris', translation: 'where is' },
            { word: 'ახლოს', pronunciation: 'akhlos', translation: 'nearby' },
            { word: 'პირდაპირ', pronunciation: 'pirdapir', translation: 'straight' },
            { word: 'მარცხნივ', pronunciation: 'martsxniv', translation: 'left' },
            { word: 'ფეხით', pronunciation: 'pekhit', translation: 'on foot' },
            { word: 'დაახლოებით', pronunciation: 'daakhloebith', translation: 'approximately' }
          ],
          questions: [
            {
              question: 'How do you say "Excuse me" in Georgian?',
              options: [
                'დიდი მადლობა',
                'უკაცრავად',
                'არაფრის',
                'ახლოს'
              ],
              correctAnswer: 1
            },
            {
              question: 'What is the Georgian word for "left" (direction)?',
              options: [
                'პირდაპირ',
                'მარჯვნივ',
                'მარცხნივ',
                'ფეხით'
              ],
              correctAnswer: 2
            }
          ]
        }
      ]
    }
  ];

  // Track time spent on the page
  useEffect(() => {
    // Set up interval to track time spent
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
      updateProgress('conversations', { timeSpent: 1 });
    }
    
    // Save progress when component unmounts
    return () => {
      if (user && timeSpent > 0) {
        // Calculate progress based on time spent and exercise completion
        const exerciseCompletion = Object.keys(selectedAnswers).length;
        
        // Mark as completed if user has spent significant time or completed exercises
        const completed = timeSpent > 15 || exerciseCompletion >= 3;
        
        updateProgress('conversations', { 
          timeSpent, 
          completed: completed
        });
      }
    };
  }, [user, timeSpent, selectedAnswers]);

  const toggleCategory = (categoryId: string) => {
    updateActivity();
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
      setExpandedConversation(null);
    } else {
      setExpandedCategory(categoryId);
      setExpandedConversation(null);
      setTimeout(() => {
        if (categoryRefs.current[categoryId]) {
          categoryRefs.current[categoryId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const toggleConversation = (conversationId: string) => {
    updateActivity();
    if (expandedConversation === conversationId) {
      setExpandedConversation(null);
    } else {
      setExpandedConversation(conversationId);
      setTimeout(() => {
        if (conversationRefs.current[conversationId]) {
          conversationRefs.current[conversationId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const playAudio = (text: string) => {
    updateActivity();
    if (audioRef.current) {
      if (isPlaying === text) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(null);
      } else {
        audioRef.current.src = `https://api.example.com/audio/${text}.mp3`;
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
        });
        setIsPlaying(text);
      }
    }
  };

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    updateActivity();
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const isCorrectAnswer = (conversation: Conversation, questionIndex: number, selectedIndex: number) => {
    return selectedIndex === conversation.questions[questionIndex].correctAnswer;
  };

  return (
    <div className="pt-16 pb-16" onClick={updateActivity}>
      <audio 
        ref={audioRef}
        onEnded={() => setIsPlaying(null)}
        onError={() => setIsPlaying(null)}
      />

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-yellow-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}>Daily Conversations</span> - ყოველდღიური საუბრები (qoveldghiuri saubrebi)
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Practice real-world dialogues and improve your speaking skills
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
                    theme === 'dark' ? 'bg-yellow-700 text-white hover:bg-yellow-800' : 'bg-yellow-600 text-white hover:bg-yellow-700'
                  }`}
                >
                  Take Quiz
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="hidden md:block md:w-1/3">
              <div className={`p-6 rounded-lg shadow-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                <MessageCircle className={`w-12 h-12 mb-4 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`} />
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Conversation Tips
                </h3>
                <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• Practice speaking aloud</li>
                  <li>• Listen to the audio multiple times</li>
                  <li>• Try to memorize common phrases</li>
                  <li>• Role-play the conversations with a partner</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {conversationCategories.map((category) => (
              <div
                key={category.id}
                ref={el => categoryRefs.current[category.id] = el}
                className={`rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg overflow-hidden`}
              >
                <button
                  onClick={() => toggleCategory(category.id)}
                  className={`w-full p-6 text-left transition-colors ${
                    theme === 'dark' ? 'hover:bg-gray-750' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {category.title}
                      </h2>
                      <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                        {category.description}
                      </p>
                    </div>
                  </div>
                </button>

                {expandedCategory === category.id && (
                  <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="space-y-6">
                      {category.conversations.map((conversation) => (
                        <div 
                          key={conversation.id}
                          ref={el => conversationRefs.current[conversation.id] = el}
                        >
                          <button
                            onClick={() => toggleConversation(conversation.id)}
                            className={`w-full p-4 text-left rounded-lg transition-colors ${
                              theme === 'dark' 
                                ? 'bg-gray-700 hover:bg-gray-650' 
                                : 'bg-gray-50 hover:bg-gray-100'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                  {conversation.title}
                                </h3>
                                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                  {conversation.description}
                                </p>
                              </div>
                              <Play size={20} className={theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'} />
                            </div>
                          </button>

                          {expandedConversation === conversation.id && (
                            <div className="mt-4 space-y-6">
                              {/* Dialogue Section */}
                              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                <h4 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                  Dialogue
                                </h4>
                                <div className="space-y-4">
                                  {conversation.dialogues.map((dialogue, index) => (
                                    <div 
                                      key={index}
                                      className={`p-3 rounded-lg ${
                                        dialogue.speaker === 'Person A' || 
                                        dialogue.speaker === 'Customer' || 
                                        dialogue.speaker === 'Tourist' || 
                                        dialogue.speaker === 'Passenger'
                                          ? theme === 'dark' 
                                            ? 'bg-blue-900/30 border border-blue-800' 
                                            : 'bg-blue-50 border border-blue-100'
                                          : theme === 'dark'
                                            ? 'bg-purple-900/30 border border-purple-800'
                                            : 'bg-purple-50 border border-purple-100'
                                      }`}
                                    >
                                      <div className="flex justify-between items-start mb-2">
                                        <span className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                                          {dialogue.speaker}
                                        </span>
                                        <button
                                          onClick={() => playAudio(dialogue.georgian)}
                                          className={`p-1 rounded-full ${
                                            isPlaying === dialogue.georgian
                                              ? theme === 'dark' 
                                                ? 'bg-yellow-700 text-yellow-200' 
                                                : 'bg-yellow-500 text-white'
                                              : theme === 'dark'
                                                ? 'bg-gray-600 hover:bg-gray-500 text-gray-300'
                                                : 'bg-white hover:bg-gray-200 text-gray-600'
                                          }`}
                                        >
                                          {isPlaying === dialogue.georgian ? (
                                            <X size={16} />
                                          ) : (
                                            <Volume2 size={16} />
                                          )}
                                        </button>
                                      </div>
                                      <p className={`text-lg mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                        {dialogue.georgian}
                                      </p>
                                      <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                        /{dialogue.pronunciation}/
                                      </p>
                                      <p className={`text-sm italic ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                        {dialogue.english}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Vocabulary Section */}
                              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                <h4 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                  Vocabulary
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                  {conversation.vocabulary.map((word, index) => (
                                    <div
                                      key={index}
                                      className={`p-3 rounded-lg ${
                                        theme === 'dark' ? 'bg-gray-600' : 'bg-white'
                                      }`}
                                    >
                                      <div className="flex items-center justify-between">
                                        <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                          {word.word}
                                        </span>
                                        <button
                                          onClick={() => playAudio(word.word)}
                                          className={`p-1 rounded-full ${
                                            theme === 'dark'
                                              ? 'hover:bg-gray-500'
                                              : 'hover:bg-gray-100'
                                          }`}
                                        >
                                          <Volume2 size={14} />
                                        </button>
                                      </div>
                                      <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                                        /{word.pronunciation}/
                                      </div>
                                      <div className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                                        {word.translation}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Questions Section */}
                              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                <h4 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                  Comprehension Questions
                                </h4>
                                <div className="space-y-6">
                                  {conversation.questions.map((question, qIndex) => (
                                    <div key={qIndex} className="space-y-3">
                                      <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                        {question.question}
                                      </p>
                                      <div className="space-y-2">
                                        {question.options.map((option, oIndex) => {
                                          const questionId = `${conversation.id}-${qIndex}`;
                                          const isSelected = selectedAnswers[questionId] === oIndex;
                                          const showResult = questionId in selectedAnswers;
                                          const isCorrect = oIndex === question.correctAnswer;

                                          return (
                                            <button
                                              key={oIndex}
                                              onClick={() => handleAnswerSelect(questionId, oIndex)}
                                              className={`w-full text-left p-3 rounded ${
                                                showResult
                                                  ? isCorrect
                                                    ? theme === 'dark'
                                                      ? 'bg-green-900 text-white'
                                                      : 'bg-green-100 text-green-800'
                                                    : isSelected
                                                      ? theme === 'dark'
                                                        ? 'bg-red-900 text-white'
                                                        : 'bg-red-100 text-red-800'
                                                      : theme === 'dark'
                                                        ? 'bg-gray-600 text-gray-300'
                                                        : 'bg-white text-gray-600'
                                                  : theme === 'dark'
                                                    ? 'bg-gray-600 hover:bg-gray-500 text-gray-200'
                                                    : 'bg-white hover:bg-gray-100 text-gray-700'
                                              }`}
                                            >
                                              {option}
                                            </button>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
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

      {/* Practice Tips Section */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-yellow-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Conversation Practice Tips
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Listen Actively
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Pay close attention to pronunciation and intonation. Try to mimic the native speakers' rhythm and stress patterns. Listen to the audio multiple times until you can understand without reading.
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Practice Speaking
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Repeat the dialogues aloud, trying to match the pronunciation. Practice both roles in the conversation. Record yourself speaking and compare with the original audio to identify areas for improvement.
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Apply in Real Life
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Try to use these phrases in real-life situations. Start with simple greetings and gradually incorporate more complex expressions. Don't be afraid to make mistakes - they're an essential part of learning.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DailyConversationsPage;