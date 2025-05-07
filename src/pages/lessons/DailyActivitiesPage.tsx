import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, ChevronDown, ChevronUp, Play, Volume2, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserProgress } from '../../hooks/useUserProgress';
import { useAuth } from '../../contexts/AuthContext';

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
  const { user } = useAuth();
  const { updateProgress } = useUserProgress();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [timeSpent, setTimeSpent] = useState(0);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [exerciseMode, setExerciseMode] = useState<'matching' | 'translation' | 'sequencing' | 'timeOfDay' | 'completion' | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [sequenceItems, setSequenceItems] = useState<string[]>([]);
  const [sequencedItems, setSequencedItems] = useState<string[]>([]);
  const [completionInput, setCompletionInput] = useState('');
  const [completionFeedback, setCompletionFeedback] = useState<'correct' | 'incorrect' | null>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories: ActivityCategory[] = [
    {
      id: 'morning',
      title: 'Morning Routine',
      description: 'Activities from waking up to starting the day',
      activities: [
        { georgian: 'გაღვიძება', latin: 'gaghvidzeba', english: 'waking up', example: 'დილით ადრე ვიღვიძებ (dilit adre vighvidzeb) - I wake up early in the morning' },
        { georgian: 'გამოღვიძება', latin: 'gamoghvidzeba', english: 'getting up', example: 'შვიდ საათზე ვდგები (shvid saatze vdgebi) - I get up at seven o\'clock' },
        { georgian: 'პირის დაბანა', latin: 'piris dabana', english: 'washing face', example: 'პირს ვიბან (pirs viban) - I wash my face' },
        { georgian: 'კბილების გახეხვა', latin: 'kbilebis gakhexva', english: 'brushing teeth', example: 'კბილებს ვიხეხავ (kbilebs vikhexav) - I brush my teeth' },
        { georgian: 'შხაპის მიღება', latin: 'shxapis migheba', english: 'taking a shower', example: 'შხაპს ვიღებ (shxaps vigheb) - I take a shower' },
        { georgian: 'ჩაცმა', latin: 'chatsma', english: 'getting dressed', example: 'ტანსაცმელს ვიცვამ (tansatsmels vitsvam) - I put on clothes' },
        { georgian: 'საუზმის მომზადება', latin: 'sauzmis momzadeba', english: 'preparing breakfast', example: 'საუზმეს ვამზადებ (sauzmes vamzadeb) - I prepare breakfast' },
        { georgian: 'ყავის დალევა', latin: 'qavis daleva', english: 'drinking coffee', example: 'ყავას ვსვამ (qavas vsvam) - I drink coffee' }
      ]
    },
    {
      id: 'work',
      title: 'Work & Study',
      description: 'Activities related to work and education',
      activities: [
        { georgian: 'სამსახურში წასვლა', latin: 'samsakhurshi tsasvla', english: 'going to work', example: 'სამსახურში მივდივარ (samsakhurshi mivdivar) - I go to work' },
        { georgian: 'სწავლა', latin: 'stsavla', english: 'studying', example: 'ქართულს ვსწავლობ (kartuls vstsavlob) - I study Georgian' },
        { georgian: 'მუშაობა', latin: 'mushaoba', english: 'working', example: 'ოფისში ვმუშაობ (opisshi vmushaob) - I work in the office' },
        { georgian: 'შეხვედრა', latin: 'shekhvedra', english: 'meeting', example: 'შეხვედრაზე ვარ (shekhvedraze var) - I am in a meeting' },
        { georgian: 'წერა', latin: 'tsera', english: 'writing', example: 'წერილს ვწერ (tserils vtser) - I write a letter' },
        { georgian: 'კითხვა', latin: 'kitkhva', english: 'reading', example: 'წიგნს ვკითხულობ (tsigns vkitkhulob) - I read a book' },
        { georgian: 'სწავლება', latin: 'stsavleba', english: 'teaching', example: 'ენას ვასწავლი (enas vastsavli) - I teach language' },
        { georgian: 'დასვენება', latin: 'dasveneba', english: 'taking a break', example: 'ცოტა ხანს ვისვენებ (tsota khans visveneb) - I take a short break' }
      ]
    },
    {
      id: 'household',
      title: 'Household Chores',
      description: 'Common household activities',
      activities: [
        { georgian: 'დალაგება', latin: 'dalageba', english: 'cleaning', example: 'სახლს ვალაგებ (sakhls valageb) - I clean the house' },
        { georgian: 'რეცხვა', latin: 'retskhva', english: 'washing', example: 'სარეცხს ვრეცხავ (saretskhs vretskav) - I do the laundry' },
        { georgian: 'საჭმლის მომზადება', latin: 'sachmlis momzadeba', english: 'cooking', example: 'საჭმელს ვამზადებ (sachmels vamzadeb) - I cook food' },
        { georgian: 'ჭურჭლის რეცხვა', latin: 'churchlis retskhva', english: 'washing dishes', example: 'ჭურჭელს ვრეცხავ (churchels vretskav) - I wash the dishes' },
        { georgian: 'დაგვა', latin: 'dagva', english: 'sweeping', example: 'იატაკს ვგვი (iataks vgvi) - I sweep the floor' },
        { georgian: 'დაუთოება', latin: 'dautoeba', english: 'ironing', example: 'ტანსაცმელს ვაუთოებ (tansatsmels vautoeb) - I iron clothes' },
        { georgian: 'საყიდლებზე წასვლა', latin: 'saqidlebze tsasvla', english: 'going shopping', example: 'საყიდლებზე მივდივარ (saqidlebze mivdivar) - I go shopping' },
        { georgian: 'დაბინავება', latin: 'dabinaveba', english: 'organizing', example: 'ნივთებს ვალაგებ (nivtebs valageb) - I organize things' }
      ]
    },
    {
      id: 'leisure',
      title: 'Leisure Activities',
      description: 'Free time and entertainment',
      activities: [
        { georgian: 'ტელევიზორის ყურება', latin: 'televizoris qureba', english: 'watching TV', example: 'ტელევიზორს ვუყურებ (televizors vuqureb) - I watch TV' },
        { georgian: 'მუსიკის მოსმენა', latin: 'musikis mosmena', english: 'listening to music', example: 'მუსიკას ვუსმენ (musikas vusmen) - I listen to music' },
        { georgian: 'სეირნობა', latin: 'seirnoba', english: 'taking a walk', example: 'პარკში ვსეირნობ (parkshi vseirnob) - I walk in the park' },
        { georgian: 'ვარჯიში', latin: 'varjishi', english: 'exercising', example: 'დარბაზში ვვარჯიშობ (darbazshi vvarjishob) - I exercise at the gym' },
        { georgian: 'კითხვა', latin: 'kitkhva', english: 'reading', example: 'წიგნს ვკითხულობ (tsigns vkitkhulob) - I read a book' },
        { georgian: 'თამაში', latin: 'tamashi', english: 'playing', example: 'თამაშს ვთამაშობ (tamash vtamashob) - I play a game' },
        { georgian: 'ცეკვა', latin: 'tsekva', english: 'dancing', example: 'ვცეკვავ (vtsekav) - I dance' },
        { georgian: 'სიმღერა', latin: 'simghera', english: 'singing', example: 'ვმღერი (vmgheri) - I sing' }
      ]
    },
    {
      id: 'evening',
      title: 'Evening Routine',
      description: 'Activities before going to bed',
      activities: [
        { georgian: 'ვახშმის მომზადება', latin: 'vakhshmis momzadeba', english: 'preparing dinner', example: 'ვახშამს ვამზადებ (vakhshams vamzadeb) - I prepare dinner' },
        { georgian: 'ვახშმობა', latin: 'vakhshmoba', english: 'having dinner', example: 'ვვახშმობ (vvakhshmob) - I have dinner' },
        { georgian: 'დასვენება', latin: 'dasveneba', english: 'resting', example: 'ვისვენებ (visveneb) - I rest' },
        { georgian: 'აბაზანის მიღება', latin: 'abazan is migheba', english: 'taking a bath', example: 'აბაზანას ვიღებ (abazanas vigheb) - I take a bath' },
        { georgian: 'პიჟამის ჩაცმა', latin: 'pizhami s chatsma', english: 'putting on pajamas', example: 'პიჟამას ვიცვამ (pizhamas vitsvam) - I put on pajamas' },
        { georgian: 'კბილების გახეხვა', latin: 'kbilebis gakhexva', english: 'brushing teeth', example: 'კბილებს ვიხეხავ (kbilebs vikhexav) - I brush my teeth' },
        { georgian: 'დაძინება', latin: 'dadzineba', english: 'going to sleep', example: 'ვიძინებ (vidzineb) - I go to sleep' },
        { georgian: 'ალარმის დაყენება', latin: 'alarmis daqeneba', english: 'setting an alarm', example: 'მაღვიძარას ვაყენებ (maghvidzaras vaqeneb) - I set the alarm' }
      ]
    },
    {
      id: 'social',
      title: 'Social Activities',
      description: 'Interactions with others',
      activities: [
        { georgian: 'შეხვედრა', latin: 'shekhvedra', english: 'meeting', example: 'მეგობრებს ვხვდები (megobrebs vkhvdebi) - I meet friends' },
        { georgian: 'საუბარი', latin: 'saubari', english: 'talking', example: 'ვსაუბრობ (vsaubrob) - I talk' },
        { georgian: 'სტუმრად წასვლა', latin: 'stumrad tsasvla', english: 'visiting', example: 'სტუმრად მივდივარ (stumrad mivdivar) - I go visiting' },
        { georgian: 'დარეკვა', latin: 'darekva', english: 'calling', example: 'ვრეკავ (vrekav) - I make a call' },
        { georgian: 'მიწერა', latin: 'mitsera', english: 'messaging', example: 'მესიჯს ვწერ (mesijs vtser) - I send a message' },
        { georgian: 'გასეირნება', latin: 'gaseirneba', english: 'going out', example: 'გარეთ გავდივარ (garet gavdivar) - I go out' },
        { georgian: 'წვეულება', latin: 'tsveuleba', english: 'partying', example: 'წვეულებაზე ვარ (tsveulebazevar) - I am at a party' },
        { georgian: 'სადილობა', latin: 'sadilobა', english: 'having lunch', example: 'რესტორანში ვსადილობ (restoranshi vsadilob) - I have lunch at a restaurant' }
      ]
    }
  ];

  // Exercise data
  const matchingExercises = [
    { georgian: 'გაღვიძება (gaghvidzeba)', options: ['going to sleep', 'waking up', 'taking a shower', 'getting dressed'], correct: 'waking up' },
    { georgian: 'სწავლა (stsavla)', options: ['working', 'studying', 'teaching', 'reading'], correct: 'studying' },
    { georgian: 'საჭმლის მომზადება (sachmlis momzadeba)', options: ['eating', 'cooking', 'shopping', 'cleaning'], correct: 'cooking' },
    { georgian: 'დასვენება (dasveneba)', options: ['working', 'exercising', 'resting', 'cleaning'], correct: 'resting' },
    { georgian: 'სეირნობა (seirnoba)', options: ['running', 'taking a walk', 'driving', 'swimming'], correct: 'taking a walk' }
  ];

  const translationExercises = [
    { english: 'reading', options: ['წერა (tsera)', 'კითხვა (kitkhva)', 'სწავლა (stsavla)', 'თამაში (tamashi)'], correct: 'კითხვა (kitkhva)' },
    { english: 'cleaning', options: ['დალაგება (dalageba)', 'რეცხვა (retskhva)', 'დაგვა (dagva)', 'დაუთოება (dautoeba)'], correct: 'დალაგება (dalageba)' },
    { english: 'watching TV', options: ['მუსიკის მოსმენა (musikis mosmena)', 'ტელევიზორის ყურება (televizoris qureba)', 'კითხვა (kitkhva)', 'თამაში (tamashi)'], correct: 'ტელევიზორის ყურება (televizoris qureba)' },
    { english: 'going to work', options: ['სამსახურში წასვლა (samsakhurshi tsasvla)', 'სახლში წასვლა (sakhlshi tsasvla)', 'სკოლაში წასვლა (skolashi tsasvla)', 'მაღაზიაში წასვლა (maghaziashi tsasvla)'], correct: 'სამსახურში წასვლა (samsakhurshi tsasvla)' },
    { english: 'brushing teeth', options: ['პირის დაბანა (piris dabana)', 'შხაპის მიღება (shxapis migheba)', 'კბილების გახეხვა (kbilebis gakhexva)', 'ჩაცმა (chatsma)'], correct: 'კბილების გახეხვა (kbilebis gakhexva)' }
  ];

  const sequencingExercises = [
    {
      title: "Put these morning activities in the correct order",
      items: ['კბილების გახეხვა (kbilebis gakhexva)', 'გაღვიძება (gaghvidzeba)', 'საუზმის მომზადება (sauzmis momzadeba)', 'ჩაცმა (chatsma)'],
      correctOrder: ['გაღვიძება (gaghvidzeba)', 'კბილების გახეხვა (kbilebis gakhexva)', 'ჩაცმა (chatsma)', 'საუზმის მომზადება (sauzmis momzadeba)']
    },
    {
      title: "Put these evening activities in the correct order",
      items: ['დაძინება (dadzineba)', 'ვახშმობა (vakhshmoba)', 'კბილების გახეხვა (kbilebis gakhexva)', 'პიჟამის ჩაცმა (pizhami s chatsma)'],
      correctOrder: ['ვახშმობა (vakhshmoba)', 'კბილების გახეხვა (kbilebis gakhexva)', 'პიჟამის ჩაცმა (pizhami s chatsma)', 'დაძინება (dadzineba)']
    },
    {
      title: "Put these cooking activities in the correct order",
      items: ['ჭამა (chama)', 'საჭმლის მომზადება (sachmlis momzadeba)', 'ჭურჭლის რეცხვა (churchlis retskhva)', 'საყიდლებზე წასვლა (saqidlebze tsasvla)'],
      correctOrder: ['საყიდლებზე წასვლა (saqidlebze tsasvla)', 'საჭმლის მომზადება (sachmlis momzadeba)', 'ჭამა (chama)', 'ჭურჭლის რეცხვა (churchlis retskhva)']
    }
  ];

  const timeOfDayExercises = [
    {
      question: "When do you typically do 'გაღვიძება (gaghvidzeba)' (waking up)?",
      options: ['დილით (dilit) - in the morning', 'შუადღისას (shuadghisas) - at noon', 'საღამოს (saghamos) - in the evening', 'ღამით (ghamit) - at night'],
      correct: 'დილით (dilit) - in the morning'
    },
    {
      question: "When do you typically do 'ვახშმობა (vakhshmoba)' (having dinner)?",
      options: ['დილით (dilit) - in the morning', 'შუადღისას (shuadghisas) - at noon', 'საღამოს (saghamos) - in the evening', 'ღამით (ghamit) - at night'],
      correct: 'საღამოს (saghamos) - in the evening'
    },
    {
      question: "When do you typically do 'სადილობა (sadilobა)' (having lunch)?",
      options: ['დილით (dilit) - in the morning', 'შუადღისას (shuadghisas) - at noon', 'საღამოს (saghamos) - in the evening', 'ღამით (ghamit) - at night'],
      correct: 'შუადღისას (shuadghisas) - at noon'
    },
    {
      question: "When do you typically do 'დაძინება (dadzineba)' (going to sleep)?",
      options: ['დილით (dilit) - in the morning', 'შუადღისას (shuadghisas) - at noon', 'საღამოს (saghamos) - in the evening', 'ღამით (ghamit) - at night'],
      correct: 'ღამით (ghamit) - at night'
    },
    {
      question: "When do you typically do 'საუზმობა (sauzmoba)' (having breakfast)?",
      options: ['დილით (dilit) - in the morning', 'შუადღისას (shuadghisas) - at noon', 'საღამოს (saghamos) - in the evening', 'ღამით (ghamit) - at night'],
      correct: 'დილით (dilit) - in the morning'
    }
  ];

  const completionExercises = [
    {
      sentence: "დილით მე _____ ვიღვიძებ.",
      options: ["ადრე (adre)", "გვიან (gvian)", "ნელა (nela)", "სწრაფად (stsrapad)"],
      correct: "ადრე (adre)",
      translation: "I wake up early in the morning."
    },
    {
      sentence: "მე ყოველ დღე _____ ვვარჯიშობ.",
      options: ["დილით (dilit)", "საღამოს (saghamos)", "ღამით (ghamit)", "შუადღისას (shuadghisas)"],
      correct: "დილით (dilit)",
      translation: "I exercise every day in the morning."
    },
    {
      sentence: "სამსახურის შემდეგ მე _____ მივდივარ.",
      options: ["სახლში (sakhlshi)", "პარკში (parkshi)", "მაღაზიაში (maghaziashi)", "რესტორანში (restoranshi)"],
      correct: "სახლში (sakhlshi)",
      translation: "After work, I go home."
    },
    {
      sentence: "საღამოს მე ტელევიზორს _____.",
      options: ["ვუყურებ (vuqureb)", "ვკითხულობ (vkitkhulob)", "ვწერ (vtser)", "ვასწავლი (vastsavli)"],
      correct: "ვუყურებ (vuqureb)",
      translation: "In the evening, I watch TV."
    },
    {
      sentence: "ყოველ დილით მე _____ ვსვამ.",
      options: ["ყავას (qavas)", "ჩაის (chais)", "წყალს (tsqals)", "რძეს (rdzes)"],
      correct: "ყავას (qavas)",
      translation: "Every morning I drink coffee."
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
      updateProgress('activities', { timeSpent: 1 });
    }
    
    // Save progress when component unmounts
    return () => {
      if (user && timeSpent > 0) {
        // Calculate progress based on time spent and exercise completion
        const exerciseCompletion = Object.keys(matchingExercises).length + 
                                  Object.keys(translationExercises).length + 
                                  (completionFeedback === 'correct' ? 1 : 0);
        
        // Mark as completed if user has spent significant time or completed exercises
        const completed = timeSpent > 10 || exerciseCompletion >= 5;
        
        updateProgress('activities', { 
          timeSpent, 
          completed: completed
        });
      }
    };
  }, [user, timeSpent, completionFeedback]);

  const toggleCategory = (categoryId: string) => {
    updateActivity();
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
    updateActivity();
    if (isPlaying === word) {
      setIsPlaying(null);
    } else {
      setIsPlaying(word);
      // Here you would normally play the audio file
      setTimeout(() => setIsPlaying(null), 1000);
    }
  };

  const handleExerciseAnswer = (answer: string) => {
    updateActivity();
    setSelectedAnswer(answer);
    setShowFeedback(true);
  };

  const startSequencingExercise = () => {
    updateActivity();
    setSequenceItems([...sequencingExercises[currentExerciseIndex].items]);
    setSequencedItems([]);
  };

  const handleItemClick = (item: string) => {
    updateActivity();
    if (sequenceItems.includes(item)) {
      // Move from available to sequenced
      setSequenceItems(sequenceItems.filter(i => i !== item));
      setSequencedItems([...sequencedItems, item]);
    } else if (sequencedItems.includes(item)) {
      // Move from sequenced back to available
      setSequencedItems(sequencedItems.filter(i => i !== item));
      setSequenceItems([...sequenceItems, item]);
    }
  };

  const checkSequencingAnswer = () => {
    updateActivity();
    const isCorrect = sequencedItems.every((item, index) => 
      item === sequencingExercises[currentExerciseIndex].correctOrder[index]
    );
    setShowFeedback(true);
    return isCorrect;
  };

  const handleCompletionSubmit = (correct: string) => {
    updateActivity();
    setCompletionFeedback(completionInput === correct ? 'correct' : 'incorrect');
  };

  const nextExercise = () => {
    updateActivity();
    if (exerciseMode === 'matching' && currentExerciseIndex < matchingExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else if (exerciseMode === 'translation' && currentExerciseIndex < translationExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else if (exerciseMode === 'sequencing' && currentExerciseIndex < sequencingExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      startSequencingExercise();
    } else if (exerciseMode === 'timeOfDay' && currentExerciseIndex < timeOfDayExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else if (exerciseMode === 'completion' && currentExerciseIndex < completionExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCompletionInput('');
      setCompletionFeedback(null);
    }
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const resetExercise = () => {
    updateActivity();
    setCurrentExerciseIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setSequenceItems([]);
    setSequencedItems([]);
    setCompletionInput('');
    setCompletionFeedback(null);
    if (exerciseMode === 'sequencing') {
      startSequencingExercise();
    }
  };

  const isCorrectAnswer = () => {
    if (exerciseMode === 'matching' && selectedAnswer) {
      return selectedAnswer === matchingExercises[currentExerciseIndex].correct;
    } else if (exerciseMode === 'translation' && selectedAnswer) {
      return selectedAnswer === translationExercises[currentExerciseIndex].correct;
    } else if (exerciseMode === 'sequencing') {
      return sequencedItems.every((item, index) => 
        item === sequencingExercises[currentExerciseIndex].correctOrder[index]
      );
    } else if (exerciseMode === 'timeOfDay' && selectedAnswer) {
      return selectedAnswer === timeOfDayExercises[currentExerciseIndex].correct;
    }
    return false;
  };

  // Initialize sequencing exercise when mode changes
  useEffect(() => {
    if (exerciseMode === 'sequencing') {
      startSequencingExercise();
    }
  }, [exerciseMode, currentExerciseIndex]);

  return (
    <div className="pt-16 pb-16" onClick={updateActivity}>
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-br from-cyan-50 to-blue-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}>Daily Activities</span> - ყოველდღიური საქმიანობები (qoveldghiuri sakmianobebι)
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

      {/* Practice Exercises Section */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-cyan-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Practice Exercises
          </h2>
          
          {!exerciseMode ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={() => setExerciseMode('matching')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Word Matching
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Match Georgian activities with their English translations
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
                  Translate English activities to Georgian
                </p>
              </button>
              
              <button
                onClick={() => setExerciseMode('sequencing')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Activity Sequencing
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Put daily activities in the correct order
                </p>
              </button>

              <button
                onClick={() => setExerciseMode('timeOfDay')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Time of Day
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Match activities with the appropriate time of day
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
                  Complete sentences about daily activities
                </p>
              </button>
            </div>
          ) : (
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {exerciseMode === 'matching' ? 'Word Matching' : 
                   exerciseMode === 'translation' ? 'Translation Practice' : 
                   exerciseMode === 'sequencing' ? 'Activity Sequencing' :
                   exerciseMode === 'timeOfDay' ? 'Time of Day' : 'Sentence Completion'}
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
              
              {exerciseMode === 'matching' && (
                <div>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Match the Georgian word with its English meaning:
                  </p>
                  
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <span className={`text-xl font-bold mr-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {matchingExercises[currentExerciseIndex].georgian}
                      </span>
                      <span className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        =
                      </span>
                      <div className="ml-4 flex flex-wrap gap-2">
                        {matchingExercises[currentExerciseIndex].options.map((option) => (
                          <button
                            key={option}
                            onClick={() => handleExerciseAnswer(option)}
                            className={`px-4 py-2 rounded-md ${
                              selectedAnswer === option
                                ? option === matchingExercises[currentExerciseIndex].correct
                                  ? (theme === 'dark' ? 'bg-green-700 text-white' : 'bg-green-100 text-green-800')
                                  : (theme === 'dark' ? 'bg-red-700 text-white' : 'bg-red-100 text-red-800')
                                : (theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800')
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {showFeedback && (
                      <div className={`p-4 rounded-md ${
                        isCorrectAnswer()
                          ? (theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800')
                          : (theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800')
                      }`}>
                        {isCorrectAnswer()
                          ? 'Correct! Well done.'
                          : `Incorrect. The correct answer is "${matchingExercises[currentExerciseIndex].correct}".`}
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
                    
                    {currentExerciseIndex < matchingExercises.length - 1 && (
                      <button
                        onClick={nextExercise}
                        disabled={!showFeedback}
                        className={`px-4 py-2 rounded ${
                          !showFeedback
                            ? (theme === 'dark' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                            : (theme === 'dark' ? 'bg-cyan-700 hover:bg-cyan-600 text-white' : 'bg-cyan-600 hover:bg-cyan-700 text-white')
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
                    Select the Georgian translation for: <span className="font-bold">{translationExercises[currentExerciseIndex].english}</span>
                  </p>
                  
                  <div className="mb-6">
                    <div className="grid grid-cols-2 gap-4">
                      {translationExercises[currentExerciseIndex].options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleExerciseAnswer(option)}
                          className={`px-4 py-3 rounded-md text-center ${
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
                            : (theme === 'dark' ? 'bg-cyan-700 hover:bg-cyan-600 text-white' : 'bg-cyan-600 hover:bg-cyan-700 text-white')
                        }`}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              )}
              
              {exerciseMode === 'sequencing' && (
                <div>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {sequencingExercises[currentExerciseIndex].title}
                  </p>
                  
                  <div className="mb-6">
                    <div className="mb-4">
                      <h4 className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        Available items:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {sequenceItems.map((item) => (
                          <button
                            key={item}
                            onClick={() => handleItemClick(item)}
                            className={`px-4 py-2 rounded-md ${
                              theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                            }`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        Your sequence:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {sequencedItems.length > 0 ? (
                          sequencedItems.map((item, index) => (
                            <button
                              key={index}
                              onClick={() => handleItemClick(item)}
                              className={`px-4 py-2 rounded-md ${
                                theme === 'dark' ? 'bg-cyan-700 hover:bg-cyan-600 text-white' : 'bg-cyan-100 hover:bg-cyan-200 text-cyan-800'
                              }`}
                            >
                              {item}
                            </button>
                          ))
                        ) : (
                          <p className={`text-sm italic ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            Click items above to place them in order
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-center">
                      <button
                        onClick={() => checkSequencingAnswer()}
                        disabled={sequencedItems.length !== sequencingExercises[currentExerciseIndex].correctOrder.length}
                        className={`px-6 py-2 rounded-md ${
                          sequencedItems.length !== sequencingExercises[currentExerciseIndex].correctOrder.length
                            ? (theme === 'dark' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                            : (theme === 'dark' ? 'bg-cyan-700 hover:bg-cyan-600 text-white' : 'bg-cyan-600 hover:bg-cyan-700 text-white')
                        }`}
                      >
                        Check Sequence
                      </button>
                    </div>
                    
                    {showFeedback && (
                      <div className={`mt-4 p-4 rounded-md ${
                        isCorrectAnswer()
                          ? (theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800')
                          : (theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800')
                      }`}>
                        {isCorrectAnswer()
                          ? 'Correct! Well done.'
                          : `Incorrect. The correct order is: ${sequencingExercises[currentExerciseIndex].correctOrder.join(', ')}`}
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
                    
                    {currentExerciseIndex < sequencingExercises.length - 1 && (
                      <button
                        onClick={nextExercise}
                        disabled={!showFeedback}
                        className={`px-4 py-2 rounded ${
                          !showFeedback
                            ? (theme === 'dark' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                            : (theme === 'dark' ? 'bg-cyan-700 hover:bg-cyan-600 text-white' : 'bg-cyan-600 hover:bg-cyan-700 text-white')
                        }`}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              )}

              {exerciseMode === 'timeOfDay' && (
                <div>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {timeOfDayExercises[currentExerciseIndex].question}
                  </p>
                  
                  <div className="mb-6">
                    <div className="grid grid-cols-2 gap-4">
                      {timeOfDayExercises[currentExerciseIndex].options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleExerciseAnswer(option)}
                          className={`px-4 py-3 rounded-md text-center ${
                            selectedAnswer === option
                              ? option === timeOfDayExercises[currentExerciseIndex].correct
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
                          : `Incorrect. The correct answer is "${timeOfDayExercises[currentExerciseIndex].correct}".`}
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
                    
                    {currentExerciseIndex < timeOfDayExercises.length - 1 && (
                      <button
                        onClick={nextExercise}
                        disabled={!showFeedback}
                        className={`px-4 py-2 rounded ${
                          !showFeedback
                            ? (theme === 'dark' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                            : (theme === 'dark' ? 'bg-cyan-700 hover:bg-cyan-600 text-white' : 'bg-cyan-600 hover:bg-cyan-700 text-white')
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
                          onClick={() => setCompletionInput(option)}
                          className={`px-4 py-2 rounded-md ${
                            completionInput === option
                              ? (theme === 'dark' ? 'bg-cyan-700 text-white' : 'bg-cyan-100 text-cyan-800')
                              : (theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800')
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => handleCompletionSubmit(completionExercises[currentExerciseIndex].correct)}
                      disabled={!completionInput}
                      className={`px-6 py-2 rounded-md ${
                        !completionInput
                          ? (theme === 'dark' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                          : (theme === 'dark' ? 'bg-cyan-700 hover:bg-cyan-600 text-white' : 'bg-cyan-600 hover:bg-cyan-700 text-white')
                      }`}
                    >
                      Check
                    </button>
                    
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
                            : (theme === 'dark' ? 'bg-cyan-700 hover:bg-cyan-600 text-white' : 'bg-cyan-600 hover:bg-cyan-700 text-white')
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

export default DailyActivitiesPage;