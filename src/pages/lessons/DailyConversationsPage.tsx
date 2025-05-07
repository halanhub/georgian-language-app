import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Book, Brain, Check, ChevronDown, ChevronUp, Headphones, MessageSquare, Pencil, Play, Volume2, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserProgress } from '../../hooks/useUserProgress';
import { useAuth } from '../../contexts/AuthContext';

const DailyConversationsPage: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { updateProgress } = useUserProgress();
  const [expandedType, setExpandedType] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [timeSpent, setTimeSpent] = useState(0);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [exerciseMode, setExerciseMode] = useState<'listening' | 'translation' | 'completion' | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [completionInput, setCompletionInput] = useState('');
  const [completionFeedback, setCompletionFeedback] = useState<'correct' | 'incorrect' | null>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        const exerciseCompletion = (showFeedback ? 1 : 0) + 
                                  (completionFeedback === 'correct' ? 1 : 0);
        
        // Mark as completed if user has spent significant time or completed exercises
        const completed = timeSpent > 15 || exerciseCompletion >= 2;
        
        updateProgress('conversations', { 
          timeSpent, 
          completed: completed
        });
      }
    };
  }, [user, timeSpent, showFeedback, completionFeedback]);

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

  const conversations = [
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
        },
        {
          speaker: 'A',
          georgian: 'საიდან ხარ?',
          pronunciation: 'saidan khar?',
          english: 'Where are you from?'
        },
        {
          speaker: 'B',
          georgian: 'მე ვარ თბილისიდან. შენ?',
          pronunciation: 'me var tbilisidan. shen?',
          english: 'I\'m from Tbilisi. You?'
        },
        {
          speaker: 'A',
          georgian: 'მე ბათუმიდან ვარ.',
          pronunciation: 'me batumidan var.',
          english: 'I\'m from Batumi.'
        },
        {
          speaker: 'B',
          georgian: 'რამდენი წლის ხარ?',
          pronunciation: 'ramdeni tslis khar?',
          english: 'How old are you?'
        },
        {
          speaker: 'A',
          georgian: 'ოცდახუთი წლის ვარ.',
          pronunciation: 'otsdakhuti tslis var.',
          english: 'I\'m twenty-five years old.'
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
          georgian: 'დიახ, ერთი კროასანი.',
          pronunciation: 'diakh, erti kroasani.',
          english: 'Yes, one croissant.'
        },
        {
          speaker: 'Barista',
          georgian: 'რა სახის კროასანი გნებავთ? გვაქვს შოკოლადის და ნუშის.',
          pronunciation: 'ra sakhis kroasani gnebavt? gvaqvs shokoladis da nushis.',
          english: 'What type of croissant would you like? We have chocolate and almond.'
        },
        {
          speaker: 'Customer',
          georgian: 'შოკოლადის, თუ შეიძლება.',
          pronunciation: 'shokoladis, tu sheidzleba.',
          english: 'Chocolate, please.'
        },
        {
          speaker: 'Barista',
          georgian: 'აქ მიირთმევთ თუ წაიღებთ?',
          pronunciation: 'aq miirtmevt tu tsaighebt?',
          english: 'For here or to go?'
        },
        {
          speaker: 'Customer',
          georgian: 'აქ მივირთმევ.',
          pronunciation: 'aq mivirtmev.',
          english: 'I\'ll have it here.'
        },
        {
          speaker: 'Barista',
          georgian: 'თორმეტი ლარი გამოვიდა.',
          pronunciation: 'tormeti lari gamovida.',
          english: 'That\'ll be twelve lari.'
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
          georgian: 'დიახ, ინებეთ. დღის სპეციალური კერძებიც გვაქვს.',
          pronunciation: 'diakh, inebet. dghis spetsialuri kerdzebits gvaqvs.',
          english: 'Yes, here you are. We also have daily specials.'
        },
        {
          speaker: 'Customer',
          georgian: 'რა არის დღის სპეციალური?',
          pronunciation: 'ra aris dghis spetsialuri?',
          english: 'What are the daily specials?'
        },
        {
          speaker: 'Waiter',
          georgian: 'დღეს გვაქვს ჩაქაფული და აჯაფსანდალი.',
          pronunciation: 'dghes gvaqvs chakapuli da ajapsandali.',
          english: 'Today we have Chakapuli and Ajapsandali.'
        },
        {
          speaker: 'Customer',
          georgian: 'ჩაქაფული რა არის?',
          pronunciation: 'chakapuli ra aris?',
          english: 'What is Chakapuli?'
        },
        {
          speaker: 'Waiter',
          georgian: 'ეს არის ხორცის კერძი მწვანილით და ტარხუნით.',
          pronunciation: 'es aris khortsis kerdzi mtsvanilit da tarkhunit.',
          english: 'It\'s a meat dish with herbs and tarragon.'
        },
        {
          speaker: 'Customer',
          georgian: 'კარგი, ჩაქაფულს ვცდი და ერთი ხაჭაპურიც.',
          pronunciation: 'kargi, chakapuls vtsdi da erti khachapurits.',
          english: 'Okay, I\'ll try the Chakapuli and one Khachapuri.'
        },
        {
          speaker: 'Waiter',
          georgian: 'სასმელი რა მოგართვათ?',
          pronunciation: 'sasmeli ra mogartva?',
          english: 'What would you like to drink?'
        },
        {
          speaker: 'Customer',
          georgian: 'ერთი ბოთლი წითელი ღვინო.',
          pronunciation: 'erti botli tsiteli ghvino.',
          english: 'A bottle of red wine.'
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
          georgian: 'გამარჯობა, ეს პერანგი რა ზომებში გაქვთ?',
          pronunciation: 'gamarjoba, es perangi ra zomebshi gaqvt?',
          english: 'Hello, what sizes do you have this shirt in?'
        },
        {
          speaker: 'Seller',
          georgian: 'გვაქვს S, M და L ზომები.',
          pronunciation: 'gvaqvs S, M da L zomebi.',
          english: 'We have sizes S, M, and L.'
        },
        {
          speaker: 'Customer',
          georgian: 'M ზომა მინდა მოვზომო.',
          pronunciation: 'M zoma minda movzomo.',
          english: 'I\'d like to try on the M size.'
        },
        {
          speaker: 'Seller',
          georgian: 'გასაზომი ოთახი იქით არის.',
          pronunciation: 'gasazomi otakhi iqit aris.',
          english: 'The fitting room is over there.'
        },
        {
          speaker: 'Customer',
          georgian: 'მადლობა. ეს რა ღირს?',
          pronunciation: 'madloba. es ra ghirs?',
          english: 'Thank you. How much is this?'
        },
        {
          speaker: 'Seller',
          georgian: 'სამოცი ლარი.',
          pronunciation: 'samotsi lari.',
          english: 'Sixty lari.'
        },
        {
          speaker: 'Customer',
          georgian: 'ფასდაკლება ხომ არ არის?',
          pronunciation: 'pasdakleba khom ar aris?',
          english: 'Is there a discount?'
        },
        {
          speaker: 'Seller',
          georgian: 'დიახ, ოცი პროცენტი.',
          pronunciation: 'diakh, otsi protsenti.',
          english: 'Yes, twenty percent.'
        },
        {
          speaker: 'Customer',
          georgian: 'კარგი, ავიღებ. ბარათით შეიძლება?',
          pronunciation: 'kargi, avigheb. baratit sheidzleba?',
          english: 'Okay, I\'ll take it. Can I pay by card?'
        },
        {
          speaker: 'Seller',
          georgian: 'რა თქმა უნდა. აქ მოაწერეთ, გთხოვთ.',
          pronunciation: 'ra tqma unda. aq moatseret, gtxovt.',
          english: 'Of course. Please sign here.'
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
          georgian: 'გამარჯობა, მეტრომდე როგორ მივიდე?',
          pronunciation: 'gamarjoba, metromde rogor mivide?',
          english: 'Hello, how do I get to the metro?'
        },
        {
          speaker: 'Local',
          georgian: 'პირდაპირ იარეთ და მარცხნივ შეუხვიეთ.',
          pronunciation: 'pirdapir iaret da martsxniv sheukhviet.',
          english: 'Go straight and turn left.'
        },
        {
          speaker: 'Passenger',
          georgian: 'რამდენი გაჩერებაა სადგურამდე?',
          pronunciation: 'ramdeni gacherebaa sadguramde?',
          english: 'How many stops until the station?'
        },
        {
          speaker: 'Local',
          georgian: 'სამი გაჩერება. ბილეთი ერთი ლარი ღირს.',
          pronunciation: 'sami gachereba. bileti erti lari ghirs.',
          english: 'Three stops. The ticket costs one lari.'
        },
        {
          speaker: 'Passenger',
          georgian: 'სად შეიძლება ბილეთის ყიდვა?',
          pronunciation: 'sad sheidzleba biletis qidva?',
          english: 'Where can I buy a ticket?'
        },
        {
          speaker: 'Local',
          georgian: 'სალაროში ან ავტომატში.',
          pronunciation: 'salaroshi an avtomatshi.',
          english: 'At the ticket office or in the machine.'
        },
        {
          speaker: 'Passenger',
          georgian: 'ბოლო მატარებელი როდის არის?',
          pronunciation: 'bolo matarebeli rodis aris?',
          english: 'When is the last train?'
        },
        {
          speaker: 'Local',
          georgian: 'ღამის თორმეტ საათზე.',
          pronunciation: 'ghamis tormet saatze.',
          english: 'At midnight.'
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
          georgian: 'გუშინიდან. ყელიც მტკივა.',
          pronunciation: 'gushinidan. qelits mtkiva.',
          english: 'Since yesterday. My throat hurts too.'
        },
        {
          speaker: 'Doctor',
          georgian: 'ტემპერატურა გაიზომეთ?',
          pronunciation: 'temperatura gaizome?',
          english: 'Did you take your temperature?'
        },
        {
          speaker: 'Patient',
          georgian: 'დიახ, 38.5 მქონდა.',
          pronunciation: 'diakh, otsdatvrametnakhevari mqonda.',
          english: 'Yes, it was 38.5.'
        },
        {
          speaker: 'Doctor',
          georgian: 'პირი გააღეთ და ენა გამოყავით.',
          pronunciation: 'piri gaaghet da ena gamoqavit.',
          english: 'Open your mouth and stick out your tongue.'
        },
        {
          speaker: 'Patient',
          georgian: 'ალერგია ხომ არ არის?',
          pronunciation: 'alergia khom ar aris?',
          english: 'Could it be an allergy?'
        },
        {
          speaker: 'Doctor',
          georgian: 'არა, ვირუსული ინფექციაა.',
          pronunciation: 'ara, virusuli infektsiaa.',
          english: 'No, it\'s a viral infection.'
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
          georgian: 'გამარჯობა! სასწრაფო დახმარება მჭირდება!',
          pronunciation: 'gamarjoba! sastsrapo dakhmreba mchirdeba!',
          english: 'Hello! I need emergency help!'
        },
        {
          speaker: 'Operator',
          georgian: 'რა მოხდა? სად ხართ?',
          pronunciation: 'ra mokhda? sad khart?',
          english: 'What happened? Where are you?'
        },
        {
          speaker: 'Caller',
          georgian: 'ავარია მოხდა რუსთაველის გამზირზე.',
          pronunciation: 'avaria mokhda rustaveli gamzirze.',
          english: 'There\'s been an accident on Rustaveli Avenue.'
        },
        {
          speaker: 'Operator',
          georgian: 'დაშავებულები არიან?',
          pronunciation: 'dashavebulebi arian?',
          english: 'Are there any injured people?'
        },
        {
          speaker: 'Caller',
          georgian: 'დიახ, ერთი ადამიანი.',
          pronunciation: 'diakh, erti adamiani.',
          english: 'Yes, one person.'
        },
        {
          speaker: 'Operator',
          georgian: 'გონზე არის?',
          pronunciation: 'gonze aris?',
          english: 'Are they conscious?'
        },
        {
          speaker: 'Caller',
          georgian: 'დიახ, მაგრამ ფეხი აქვს დაზიანებული.',
          pronunciation: 'diakh, magram fekhi akvs dazianebuli.',
          english: 'Yes, but their leg is injured.'
        },
        {
          speaker: 'Operator',
          georgian: 'სისხლდენა არის?',
          pronunciation: 'siskhldena aris?',
          english: 'Is there bleeding?'
        },
        {
          speaker: 'Caller',
          georgian: 'არა, მაგრამ ძლიერი ტკივილი აქვს.',
          pronunciation: 'ara, magram dzlieri tkivili akvs.',
          english: 'No, but they\'re in severe pain.'
        }
      ]
    },
    {
      id: 'hotel',
      title: 'At the Hotel',
      description: 'Checking in and requesting services',
      dialogue: [
        {
          speaker: 'Guest',
          georgian: 'გამარჯობა, ჯავშანი მაქვს.',
          pronunciation: 'gamarjoba, javshani makvs.',
          english: 'Hello, I have a reservation.'
        },
        {
          speaker: 'Receptionist',
          georgian: 'თქვენი გვარი, გთხოვთ?',
          pronunciation: 'tkveni gvari, gtxovt?',
          english: 'Your last name, please?'
        },
        {
          speaker: 'Guest',
          georgian: 'სმითი. ორი ღამით.',
          pronunciation: 'smiti. ori ghamit.',
          english: 'Smith. For two nights.'
        },
        {
          speaker: 'Receptionist',
          georgian: 'დიახ, ორადგილიანი ოთახი საუზმით.',
          pronunciation: 'diakh, oradgiliani otakhi sauzmit.',
          english: 'Yes, a double room with breakfast.'
        },
        {
          speaker: 'Guest',
          georgian: 'საუზმე რომელ საათზეა?',
          pronunciation: 'sauzme romel saatzea?',
          english: 'What time is breakfast?'
        },
        {
          speaker: 'Receptionist',
          georgian: 'შვიდიდან ათ საათამდე.',
          pronunciation: 'shvididan at saatamde.',
          english: 'From seven to ten o\'clock.'
        },
        {
          speaker: 'Guest',
          georgian: 'Wi-Fi-ის პაროლი?',
          pronunciation: 'vaifais paroli?',
          english: 'What\'s the Wi-Fi password?'
        },
        {
          speaker: 'Receptionist',
          georgian: 'აი, ბარათზე წერია.',
          pronunciation: 'ai, baratze tseria.',
          english: 'Here, it\'s written on the card.'
        }
      ]
    },
    {
      id: 'business',
      title: 'Business Meeting',
      description: 'Professional conversations and meetings',
      dialogue: [
        {
          speaker: 'Host',
          georgian: 'მობრძანდით, შეხვედრა ახლა დაიწყება.',
          pronunciation: 'mobrdzandit, shekhvedra akhla daitsqeba.',
          english: 'Please come in, the meeting will start now.'
        },
        {
          speaker: 'Participant',
          georgian: 'დღის წესრიგი უკვე მზად არის?',
          pronunciation: 'dghis tsesrigi ukve mzad aris?',
          english: 'Is the agenda ready?'
        },
        {
          speaker: 'Host',
          georgian: 'დიახ, ყველას გამოვუგზავნე ელ-ფოსტით.',
          pronunciation: 'diakh, qvelas gamovugzavne el-postit.',
          english: 'Yes, I sent it to everyone by email.'
        },
        {
          speaker: 'Participant',
          georgian: 'პრეზენტაცია რამდენ ხანს გაგრძელდება?',
          pronunciation: 'prezentatsia ramden khans gagrdzeldeba?',
          english: 'How long will the presentation last?'
        },
        {
          speaker: 'Host',
          georgian: 'დაახლოებით ოცი წუთი.',
          pronunciation: 'daakhloebith otsi tsuti.',
          english: 'Approximately twenty minutes.'
        },
        {
          speaker: 'Participant',
          georgian: 'შეკითხვების დრო იქნება?',
          pronunciation: 'shekitkhvebis dro ikneba?',
          english: 'Will there be time for questions?'
        },
        {
          speaker: 'Host',
          georgian: 'რა თქმა უნდა, პრეზენტაციის შემდეგ.',
          pronunciation: 'ra tkma unda, prezentatsiis shemdeg.',
          english: 'Of course, after the presentation.'
        }
      ]
    },
    {
      id: 'social',
      title: 'Social Events',
      description: 'Conversations at parties and gatherings',
      dialogue: [
        {
          speaker: 'Host',
          georgian: 'კეთილი იყოს თქვენი მობრძანება!',
          pronunciation: 'ketili iqos tkveni mobrdzaneba!',
          english: 'Welcome!'
        },
        {
          speaker: 'Guest',
          georgian: 'გმადლობთ მოწვევისთვის.',
          pronunciation: 'gmadlobt motsvevistvis.',
          english: 'Thank you for the invitation.'
        },
        {
          speaker: 'Host',
          georgian: 'რამე დალიეთ? ღვინო გნებავთ?',
          pronunciation: 'rame daliet? ghvino gnebavt?',
          english: 'Would you like something to drink? Some wine?'
        },
        {
          speaker: 'Guest',
          georgian: 'სიამოვნებით. წითელი თუ შეიძლება.',
          pronunciation: 'siamovnebit. tsiteli tu sheidzleba.',
          english: 'With pleasure. Red, if possible.'
        },
        {
          speaker: 'Host',
          georgian: 'აქ დაბრძანდით, გთხოვთ.',
          pronunciation: 'ak dabrdzandit, gtxovt.',
          english: 'Please, sit here.'
        },
        {
          speaker: 'Guest',
          georgian: 'რა ლამაზი სახლი გაქვთ!',
          pronunciation: 'ra lamazi sakhli gaqvt!',
          english: 'What a beautiful house you have!'
        },
        {
          speaker: 'Host',
          georgian: 'დიდი მადლობა. სუფრასთან მობრძანდით.',
          pronunciation: 'didi madloba. suprastan mobrdzandit.',
          english: 'Thank you very much. Please come to the table.'
        }
      ]
    }
  ];

  // Exercise data
  const listeningExercises = [
    {
      audio: "greeting.mp3",
      question: "What is the person saying?",
      options: [
        "გამარჯობა! (gamarjoba!) - Hello!",
        "ნახვამდის! (nakhvamdis!) - Goodbye!",
        "გმადლობთ! (gmadlobt!) - Thank you!",
        "გთხოვთ! (gtxovt!) - Please!"
      ],
      correct: "გამარჯობა! (gamarjoba!) - Hello!"
    },
    {
      audio: "howAreYou.mp3",
      question: "What question is being asked?",
      options: [
        "რა გქვია? (ra gkvia?) - What's your name?",
        "როგორ ხარ? (rogor khar?) - How are you?",
        "საიდან ხარ? (saidan khar?) - Where are you from?",
        "რამდენი წლის ხარ? (ramdeni tslis khar?) - How old are you?"
      ],
      correct: "როგორ ხარ? (rogor khar?) - How are you?"
    },
    {
      audio: "whereAreYouFrom.mp3",
      question: "What is the person asking?",
      options: [
        "სად მიდიხარ? (sad midikhar?) - Where are you going?",
        "სად ცხოვრობ? (sad tskhovrob?) - Where do you live?",
        "საიდან ხარ? (saidan khar?) - Where are you from?",
        "სად მუშაობ? (sad mushaob?) - Where do you work?"
      ],
      correct: "საიდან ხარ? (saidan khar?) - Where are you from?"
    }
  ];

  const translationExercises = [
    {
      english: "I would like a coffee, please.",
      options: [
        "ერთი ჩაი, გთხოვთ. (erti chai, gtxovt.)",
        "ერთი ყავა მინდა, გთხოვთ. (erti qava minda, gtxovt.)",
        "წყალი მინდა, გთხოვთ. (tsqali minda, gtxovt.)",
        "ღვინო მინდა, გთხოვთ. (ghvino minda, gtxovt.)"
      ],
      correct: "ერთი ყავა მინდა, გთხოვთ. (erti qava minda, gtxovt.)"
    },
    {
      english: "How much is this?",
      options: [
        "ეს რა არის? (es ra aris?)",
        "ეს სად არის? (es sad aris?)",
        "ეს რა ღირს? (es ra ghirs?)",
        "ეს ვისია? (es visia?)"
      ],
      correct: "ეს რა ღირს? (es ra ghirs?)"
    },
    {
      english: "Can I pay by card?",
      options: [
        "ნაღდი ფულით შეიძლება? (naghdi pulit sheidzleba?)",
        "ბარათით შეიძლება? (baratit sheidzleba?)",
        "ჩეკი შეიძლება? (cheki sheidzleba?)",
        "ხურდა გაქვთ? (khurda gaqvt?)"
      ],
      correct: "ბარათით შეიძლება? (baratit sheidzleba?)"
    }
  ];

  const completionExercises = [
    {
      sentence: "გამარჯობა! როგორ _____?",
      options: ["ხარ (khar)", "არის (aris)", "ვარ (var)"],
      correct: "ხარ (khar)",
      translation: "Hello! How are you?"
    },
    {
      sentence: "მე _____ ნინო.",
      options: ["მქვია (mkvia)", "ქვია (kvia)", "ჰქვია (hkvia)"],
      correct: "მქვია (mkvia)",
      translation: "My name is Nino."
    },
    {
      sentence: "რამდენი _____ ეს ხაჭაპური?",
      options: ["ღირს (ghirs)", "ფასი (pasi)", "ლარი (lari)"],
      correct: "ღირს (ghirs)",
      translation: "How much is this khachapuri?"
    }
  ];

  const toggleType = (typeId: string) => {
    updateActivity();
    if (expandedType === typeId) {
      setExpandedType(null);
    } else {
      setExpandedType(typeId);
      setTimeout(() => {
        if (contentRefs.current[typeId]) {
          const headerOffset = 100;
          const elementPosition = contentRefs.current[typeId]?.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
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

  const playAllAudio = (words: string[]) => {
    updateActivity();
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

  const handleExerciseAnswer = (answer: string) => {
    updateActivity();
    setSelectedAnswer(answer);
    setShowFeedback(true);
  };

  const handleCompletionSelect = (option: string) => {
    updateActivity();
    setCompletionInput(option);
    setCompletionFeedback(option === completionExercises[currentExerciseIndex].correct ? 'correct' : 'incorrect');
  };

  const nextExercise = () => {
    updateActivity();
    if (exerciseMode === 'listening' && currentExerciseIndex < listeningExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else if (exerciseMode === 'translation' && currentExerciseIndex < translationExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else if (exerciseMode === 'completion' && currentExerciseIndex < completionExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCompletionInput('');
      setCompletionFeedback(null);
    }
    setSelectedAnswer('');
    setShowFeedback(false);
  };

  const resetExercise = () => {
    updateActivity();
    setCurrentExerciseIndex(0);
    setSelectedAnswer('');
    setShowFeedback(false);
    setCompletionInput('');
    setCompletionFeedback(null);
  };

  const isCorrectAnswer = () => {
    if (exerciseMode === 'listening') {
      return selectedAnswer === listeningExercises[currentExerciseIndex].correct;
    } else if (exerciseMode === 'translation') {
      return selectedAnswer === translationExercises[currentExerciseIndex].correct;
    }
    return false;
  };

  return (
    <div className="pt-16 pb-16" onClick={updateActivity}>
      <audio 
        ref={audioRef} 
        onEnded={() => setIsPlaying(null)}
        onError={() => {
          console.log('Audio file not found or error playing audio');
          setIsPlaying(null);
        }}
      />
      
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-purple-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm: px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>Daily Conversations</span> - ყოველდღიური საუბრები (qoveldghiuri saubrebi)
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
                ref={el => contentRefs.current[conversation.id] = el}
              >
                <button
                  onClick={() => toggleType(conversation.id)}
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

                {expandedType === conversation.id && (
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

      {/* Practice Exercises Section */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-purple-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Practice Exercises
          </h2>
          
          {!exerciseMode ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={() => setExerciseMode('listening')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Listening Comprehension
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Listen to audio and select the correct meaning
                </p>
              </button>
              
              <button
                onClick={() => setExerciseMode('translation')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Translation Practice
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Translate English phrases to Georgian
                </p>
              </button>
              
              <button
                onClick={() => setExerciseMode('completion')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Sentence Completion
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Complete conversations with the correct phrases
                </p>
              </button>
            </div>
          ) : (
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {exerciseMode === 'listening' ? 'Listening Comprehension' : 
                   exerciseMode === 'translation' ? 'Translation Practice' : 'Sentence Completion'}
                </h3>
                <button
                  onClick={() => setExerciseMode(null)}
                  className={`px-4 py-2 rounded ${
                    theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  Back to Exercises
                </button>
              </div>
              
              {exerciseMode === 'listening' && (
                <div>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {listeningExercises[currentExerciseIndex].question}
                  </p>
                  
                  <div className="mb-6">
                    <button
                      onClick={() => playAudio(`listening-${currentExerciseIndex}`)}
                      className={`mb-4 px-6 py-3 rounded-md flex items-center ${
                        theme === 'dark'
                          ? 'bg-purple-700 text-white hover:bg-purple-600'
                          : 'bg-purple-600 text-white hover:bg-purple-700'
                      }`}
                    >
                      <Headphones size={20} className="mr-2" />
                      {isPlaying === `listening-${currentExerciseIndex}` ? 'Stop Audio' : 'Play Audio'}
                    </button>
                    
                    <div className="grid grid-cols-1 gap-3">
                      {listeningExercises[currentExerciseIndex].options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleExerciseAnswer(option)}
                          className={`px-4 py-3 rounded-md text-left ${
                            selectedAnswer === option
                              ? option === listeningExercises[currentExerciseIndex].correct
                                ? (theme === 'dark' ? 'bg-green-700 text-white' : 'bg-green-100 text-green-800')
                                : (theme === 'dark' ? 'bg-red-700 text-white' : 'bg-red-100 text-red-800')
                              : (theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800')
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    
                    {showFeedback && (
                      <div className={`mt-4 p-4 rounded-md ${
                        isCorrectAnswer()
                          ? (theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800')
                          : (theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800')
                      }`}>
                        {isCorrectAnswer()
                          ? 'Correct! Well done.'
                          : `Incorrect. The correct answer is "${listeningExercises[currentExerciseIndex].correct}".`}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      onClick={resetExercise}
                      className={`px-4 py-2 rounded ${
                        theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                      }`}
                    >
                      Reset
                    </button>
                    
                    {currentExerciseIndex < listeningExercises.length - 1 && (
                      <button
                        onClick={nextExercise}
                        disabled={!showFeedback}
                        className={`px-4 py-2 rounded ${
                          !showFeedback
                            ? (theme === 'dark' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                            : (theme === 'dark' ? 'bg-purple-700 hover:bg-purple-600 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white')
                        }`}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              )}
              
              {exerciseMode === 'translation' && (
                <div>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Translate to Georgian: <span className="font-bold">{translationExercises[currentExerciseIndex].english}</span>
                  </p>
                  
                  <div className="mb-6">
                    <div className="grid grid-cols-1 gap-3">
                      {translationExercises[currentExerciseIndex].options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleExerciseAnswer(option)}
                          className={`px-4 py-3 rounded-md text-left ${
                            selectedAnswer === option
                              ? option === translationExercises[currentExerciseIndex].correct
                                ? (theme === 'dark' ? 'bg-green-700 text-white' : 'bg-green-100 text-green-800')
                                : (theme === 'dark' ? 'bg-red-700 text-white' : 'bg-red-100 text-red-800')
                              : (theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800')
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    
                    {showFeedback && (
                      <div className={`mt-4 p-4 rounded-md ${
                        isCorrectAnswer()
                          ? (theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800')
                          : (theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800')
                      }`}>
                        {isCorrectAnswer()
                          ? 'Correct! Well done.'
                          : `Incorrect. The correct answer is "${translationExercises[currentExerciseIndex].correct}".`}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      onClick={resetExercise}
                      className={`px-4 py-2 rounded ${
                        theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                      }`}
                    >
                      Reset
                    </button>
                    
                    {currentExerciseIndex < translationExercises.length - 1 && (
                      <button
                        onClick={nextExercise}
                        disabled={!showFeedback}
                        className={`px-4 py-2 rounded ${
                          !showFeedback
                            ? (theme === 'dark' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                            : (theme === 'dark' ? 'bg-purple-700 hover:bg-purple-600 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white')
                        }`}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              )}
              
              {exerciseMode === 'completion' && (
                <div>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Complete the sentence by selecting the correct word:
                  </p>
                  
                  <div className="mb-6">
                    <p className={`text-lg mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {completionExercises[currentExerciseIndex].sentence}
                    </p>
                    <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Translation: {completionExercises[currentExerciseIndex].translation}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {completionExercises[currentExerciseIndex].options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleCompletionSelect(option)}
                          className={`px-4 py-2 rounded-md ${
                            completionInput === option
                              ? (theme === 'dark' ? 'bg-purple-700 text-white' : 'bg-purple-100 text-purple-800')
                              : (theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800')
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    
                    {completionFeedback && (
                      <div className={`mt-4 p-4 rounded-md ${
                        completionFeedback === 'correct'
                          ? (theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800')
                          : (theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800')
                      }`}>
                        {completionFeedback === 'correct'
                          ? 'Correct! Well done.'
                          : `Incorrect. The correct answer is "${completionExercises[currentExerciseIndex].correct}".`}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      onClick={resetExercise}
                      className={`px-4 py-2 rounded ${
                        theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                      }`}
                    >
                      Reset
                    </button>
                    
                    {currentExerciseIndex < completionExercises.length - 1 && (
                      <button
                        onClick={nextExercise}
                        disabled={!completionFeedback}
                        className={`px-4 py-2 rounded ${
                          !completionFeedback
                            ? (theme === 'dark' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                            : (theme === 'dark' ? 'bg-purple-700 hover:bg-purple-600 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white')
                        }`}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DailyConversationsPage;