import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Cat, ChevronDown, ChevronUp, Play, Volume2, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserProgress } from '../../hooks/useUserProgress';
import { useAuth } from '../../contexts/AuthContext';

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
  const { user } = useAuth();
  const { updateProgress } = useUserProgress();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [timeSpent, setTimeSpent] = useState(0);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [exerciseMode, setExerciseMode] = useState<'matching' | 'translation' | 'classification' | 'sounds' | 'habitats' | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [multipleAnswers, setMultipleAnswers] = useState<string[]>([]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories: AnimalCategory[] = [
    {
      id: 'pets',
      title: 'Pets & Domestic Animals',
      description: 'Common household and farm animals',
      animals: [
        { georgian: 'ძაღლი', latin: 'dzaghli', english: 'dog', example: 'დიდი ძაღლი (didi dzaghli) - Big dog' },
        { georgian: 'კატა', latin: 'kata', english: 'cat', example: 'შავი კატა (shavi kata) - Black cat' },
        { georgian: 'ცხენი', latin: 'tskheni', english: 'horse', example: 'ლამაზი ცხენი (lamazi tskheni) - Beautiful horse' },
        { georgian: 'ძროხა', latin: 'dzrokha', english: 'cow', example: 'რძის ძროხა (rdzis dzrokha) - Dairy cow' },
        { georgian: 'ცხვარი', latin: 'tskhvari', english: 'sheep', example: 'თეთრი ცხვარი (tetri tskhvari) - White sheep' },
        { georgian: 'თხა', latin: 'tkha', english: 'goat', example: 'პატარა თხა (patara tkha) - Small goat' },
        { georgian: 'ქათამი', latin: 'katami', english: 'chicken', example: 'დედალი ქათამი (dedali katami) - Hen' },
        { georgian: 'კურდღელი', latin: 'kurdgheli', english: 'rabbit', example: 'რუხი კურდღელი (rukhi kurdgheli) - Gray rabbit' }
      ]
    },
    {
      id: 'wild',
      title: 'Wild Animals',
      description: 'Animals found in nature',
      animals: [
        { georgian: 'მგელი', latin: 'mgeli', english: 'wolf', example: 'რუხი მგელი (rukhi mgeli) - Gray wolf' },
        { georgian: 'დათვი', latin: 'datvi', english: 'bear', example: 'მურა დათვი (mura datvi) - Brown bear' },
        { georgian: 'მელა', latin: 'mela', english: 'fox', example: 'წითელი მელა (tsiteli mela) - Red fox' },
        { georgian: 'ირემი', latin: 'iremi', english: 'deer', example: 'ახალგაზრდა ირემი (akhalgazrda iremi) - Young deer' },
        { georgian: 'სპილო', latin: 'spilo', english: 'elephant', example: 'დიდი სპილო (didi spilo) - Big elephant' },
        { georgian: 'ლომი', latin: 'lomi', english: 'lion', example: 'ძლიერი ლომი (dzlieri lomi) - Strong lion' },
        { georgian: 'ვეფხვი', latin: 'vepkhvi', english: 'tiger', example: 'ბენგალური ვეფხვი (bengaluri vepkhvi) - Bengal tiger' },
        { georgian: 'გარეული ღორი', latin: 'gareuli ghori', english: 'wild boar', example: 'დიდი გარეული ღორი (didi gareuli ghori) - Big wild boar' }
      ]
    },
    {
      id: 'birds',
      title: 'Birds',
      description: 'Different types of birds',
      animals: [
        { georgian: 'ჩიტი', latin: 'chiti', english: 'bird', example: 'პატარა ჩიტი (patara chiti) - Small bird' },
        { georgian: 'არწივი', latin: 'artsivi', english: 'eagle', example: 'მთის არწივი (mtis artsivi) - Mountain eagle' },
        { georgian: 'ბუ', latin: 'bu', english: 'owl', example: 'ბრძენი ბუ (brdzeni bu) - Wise owl' },
        { georgian: 'მტრედი', latin: 'mtredi', english: 'pigeon/dove', example: 'თეთრი მტრედი (tetri mtredi) - White dove' },
        { georgian: 'ყვავი', latin: 'qvavi', english: 'crow', example: 'შავი ყვავი (shavi qvavi) - Black crow' },
        { georgian: 'მერცხალი', latin: 'mertskhali', english: 'swallow', example: 'სწრაფი მერცხალი (strapi mertskhali) - Fast swallow' },
        { georgian: 'იხვი', latin: 'ikhvi', english: 'duck', example: 'წყლის იხვი (tsqlis ikhvi) - Water duck' },
        { georgian: 'ბატი', latin: 'bati', english: 'goose', example: 'დიდი ბატი (didi bati) - Big goose' }
      ]
    },
    {
      id: 'insects',
      title: 'Insects & Small Creatures',
      description: 'Insects and other small animals',
      animals: [
        { georgian: 'პეპელა', latin: 'pepela', english: 'butterfly', example: 'ფერადი პეპელა (peradi pepela) - Colorful butterfly' },
        { georgian: 'ფუტკარი', latin: 'putkari', english: 'bee', example: 'თაფლის ფუტკარი (taplis putkari) - Honey bee' },
        { georgian: 'ჭიანჭველა', latin: 'chianchvela', english: 'ant', example: 'პატარა ჭიანჭველა (patara chianchvela) - Small ant' },
        { georgian: 'ხოჭო', latin: 'khocho', english: 'beetle', example: 'შავი ხოჭო (shavi khocho) - Black beetle' },
        { georgian: 'კოღო', latin: 'kogho', english: 'mosquito', example: 'მწერი კოღო (mtseri kogho) - Mosquito insect' },
        { georgian: 'ობობა', latin: 'oboba', english: 'spider', example: 'დიდი ობობა (didi oboba) - Big spider' },
        { georgian: 'ჭრიჭინა', latin: 'chrichina', english: 'cricket', example: 'მწვანე ჭრიჭინა (mtsvane chrichina) - Green cricket' },
        { georgian: 'პარკხვევია', latin: 'parkkhvevia', english: 'ladybug', example: 'წითელი პარკხვევია (tsiteli parkkhvevia) - Red ladybug' }
      ]
    },
    {
      id: 'marine',
      title: 'Marine Animals',
      description: 'Sea and water creatures',
      animals: [
        { georgian: 'თევზი', latin: 'tevzi', english: 'fish', example: 'ზღვის თევზი (zghvis tevzi) - Sea fish' },
        { georgian: 'ვეშაპი', latin: 'veshapi', english: 'whale', example: 'დიდი ვეშაპი (didi veshapi) - Big whale' },
        { georgian: 'დელფინი', latin: 'delpini', english: 'dolphin', example: 'მხიარული დელფინი (mkhiaruli delpini) - Playful dolphin' },
        { georgian: 'ზვიგენი', latin: 'zvigeni', english: 'shark', example: 'დიდი ზვიგენი (didi zvigeni) - Big shark' },
        { georgian: 'კიბორჩხალა', latin: 'kiborchkhala', english: 'crab', example: 'წითელი კიბორჩხალა (tsiteli kiborchkhala) - Red crab' },
        { georgian: 'რვაფეხა', latin: 'rvapekha', english: 'octopus', example: 'დიდი რვაფეხა (didi rvapekha) - Big octopus' },
        { georgian: 'სელაპი', latin: 'selapi', english: 'seal', example: 'ზღვის სელაპი (zghvis selapi) - Sea seal' },
        { georgian: 'ზღვის ვარსკვლავი', latin: 'zghvis varskvlavi', english: 'starfish', example: 'ლამაზი ზღვის ვარსკვლავი (lamazi zghvis varskvlavi) - Beautiful starfish' }
      ]
    },
    {
      id: 'reptiles',
      title: 'Reptiles & Amphibians',
      description: 'Cold-blooded creatures',
      animals: [
        { georgian: 'გველი', latin: 'gveli', english: 'snake', example: 'გრძელი გველი (grdzeli gveli) - Long snake' },
        { georgian: 'ხვლიკი', latin: 'khvliki', english: 'lizard', example: 'მწვანე ხვლიკი (mtsvane khvliki) - Green lizard' },
        { georgian: 'კუ', latin: 'ku', english: 'turtle', example: 'დიდი კუ (didi ku) - Big turtle' },
        { georgian: 'ბაყაყი', latin: 'baqaqi', english: 'frog', example: 'მწვანე ბაყაყი (mtsvane baqaqi) - Green frog' },
        { georgian: 'ნიანგი', latin: 'niangi', english: 'crocodile', example: 'დიდი ნიანგი (didi niangi) - Big crocodile' },
        { georgian: 'სალამანდრა', latin: 'salamandra', english: 'salamander', example: 'შავი სალამანდრა (shavi salamandra) - Black salamander' },
        { georgian: 'იგუანა', latin: 'iguana', english: 'iguana', example: 'მწვანე იგუანა (mtsvane iguana) - Green iguana' },
        { georgian: 'გომბეშო', latin: 'gombesho', english: 'toad', example: 'დიდი გომბეშო (didi gombesho) - Big toad' }
      ]
    }
  ];

  // Exercise data
  const matchingExercises = [
    { georgian: 'ძაღლი (dzaghli)', options: ['cat', 'dog', 'horse', 'sheep'], correct: 'dog' },
    { georgian: 'კატა (kata)', options: ['cat', 'dog', 'rabbit', 'goat'], correct: 'cat' },
    { georgian: 'ლომი (lomi)', options: ['tiger', 'lion', 'bear', 'wolf'], correct: 'lion' },
    { georgian: 'თევზი (tevzi)', options: ['bird', 'fish', 'snake', 'frog'], correct: 'fish' },
    { georgian: 'პეპელა (pepela)', options: ['bee', 'butterfly', 'ant', 'spider'], correct: 'butterfly' }
  ];

  const translationExercises = [
    { english: 'bear', options: ['დათვი (datvi)', 'მგელი (mgeli)', 'მელა (mela)', 'ლომი (lomi)'], correct: 'დათვი (datvi)' },
    { english: 'bird', options: ['თევზი (tevzi)', 'ჩიტი (chiti)', 'პეპელა (pepela)', 'ბაყაყი (baqaqi)'], correct: 'ჩიტი (chiti)' },
    { english: 'snake', options: ['კუ (ku)', 'ხვლიკი (khvliki)', 'გველი (gveli)', 'ნიანგი (niangi)'], correct: 'გველი (gveli)' },
    { english: 'sheep', options: ['ძროხა (dzrokha)', 'ცხვარი (tskhvari)', 'თხა (tkha)', 'ცხენი (tskheni)'], correct: 'ცხვარი (tskhvari)' },
    { english: 'eagle', options: ['ბუ (bu)', 'არწივი (artsivi)', 'ყვავი (qvavi)', 'მტრედი (mtredi)'], correct: 'არწივი (artsivi)' }
  ];

  const classificationExercises = [
    {
      question: "Which animals are domestic pets?",
      options: ['ძაღლი (dzaghli)', 'კატა (kata)', 'ლომი (lomi)', 'მგელი (mgeli)', 'კურდღელი (kurdgheli)', 'დათვი (datvi)'],
      correctAnswers: ['ძაღლი (dzaghli)', 'კატა (kata)', 'კურდღელი (kurdgheli)'],
      explanation: "ძაღლი (dzaghli) - dog, კატა (kata) - cat, and კურდღელი (kurdgheli) - rabbit are common domestic pets."
    },
    {
      question: "Which animals can fly?",
      options: ['ჩიტი (chiti)', 'თევზი (tevzi)', 'პეპელა (pepela)', 'ძაღლი (dzaghli)', 'არწივი (artsivi)', 'ბუ (bu)'],
      correctAnswers: ['ჩიტი (chiti)', 'პეპელა (pepela)', 'არწივი (artsivi)', 'ბუ (bu)'],
      explanation: "ჩიტი (chiti) - bird, პეპელა (pepela) - butterfly, არწივი (artsivi) - eagle, and ბუ (bu) - owl can all fly."
    },
    {
      question: "Which animals live in water?",
      options: ['თევზი (tevzi)', 'ვეშაპი (veshapi)', 'ძაღლი (dzaghli)', 'დელფინი (delpini)', 'ზვიგენი (zvigeni)', 'ლომი (lomi)'],
      correctAnswers: ['თევზი (tevzi)', 'ვეშაპი (veshapi)', 'დელფინი (delpini)', 'ზვიგენი (zvigeni)'],
      explanation: "თევზი (tevzi) - fish, ვეშაპი (veshapi) - whale, დელფინი (delpini) - dolphin, and ზვიგენი (zvigeni) - shark all live in water."
    },
    {
      question: "Which animals are reptiles?",
      options: ['გველი (gveli)', 'ხვლიკი (khvliki)', 'კუ (ku)', 'ბაყაყი (baqaqi)', 'ნიანგი (niangi)', 'თევზი (tevzi)'],
      correctAnswers: ['გველი (gveli)', 'ხვლიკი (khvliki)', 'კუ (ku)', 'ნიანგი (niangi)'],
      explanation: "გველი (gveli) - snake, ხვლიკი (khvliki) - lizard, კუ (ku) - turtle, and ნიანგი (niangi) - crocodile are all reptiles."
    },
    {
      question: "Which animals are insects?",
      options: ['პეპელა (pepela)', 'ფუტკარი (putkari)', 'ჭიანჭველა (chianchvela)', 'ობობა (oboba)', 'ხოჭო (khocho)', 'ბაყაყი (baqaqi)'],
      correctAnswers: ['პეპელა (pepela)', 'ფუტკარი (putkari)', 'ჭიანჭველა (chianchvela)', 'ხოჭო (khocho)'],
      explanation: "პეპელა (pepela) - butterfly, ფუტკარი (putkari) - bee, ჭიანჭველა (chianchvela) - ant, and ხოჭო (khocho) - beetle are insects. ობობა (oboba) - spider is an arachnid, not an insect."
    }
  ];

  const soundsExercises = [
    {
      question: "Which animal makes the sound 'ყეფს' (yeps)?",
      options: ['ძაღლი (dzaghli)', 'კატა (kata)', 'ძროხა (dzrokha)', 'ცხენი (tskheni)'],
      correct: 'ძაღლი (dzaghli)',
      explanation: "ძაღლი (dzaghli) - dog makes the sound 'ყეფს' (yeps) - barks."
    },
    {
      question: "Which animal makes the sound 'კნავის' (knavis)?",
      options: ['ძაღლი (dzaghli)', 'კატა (kata)', 'ძროხა (dzrokha)', 'ცხენი (tskheni)'],
      correct: 'კატა (kata)',
      explanation: "კატა (kata) - cat makes the sound 'კნავის' (knavis) - meows."
    },
    {
      question: "Which animal makes the sound 'ბღავის' (bghavis)?",
      options: ['ძაღლი (dzaghli)', 'კატა (kata)', 'ძროხა (dzrokha)', 'ცხენი (tskheni)'],
      correct: 'ძროხა (dzrokha)',
      explanation: "ძროხა (dzrokha) - cow makes the sound 'ბღავის' (bghavis) - moos."
    },
    {
      question: "Which animal makes the sound 'ყიყლიყოს' (yiqliyo)?",
      options: ['ქათამი (katami)', 'იხვი (ikhvi)', 'ბატი (bati)', 'მტრედი (mtredi)'],
      correct: 'ქათამი (katami)',
      explanation: "ქათამი (katami) - chicken makes the sound 'ყიყლიყოს' (yiqliyo) - crows/clucks."
    },
    {
      question: "Which animal makes the sound 'ყიყინებს' (yiyinebs)?",
      options: ['ბაყაყი (baqaqi)', 'გველი (gveli)', 'ხვლიკი (khvliki)', 'კუ (ku)'],
      correct: 'ბაყაყი (baqaqi)',
      explanation: "ბაყაყი (baqaqi) - frog makes the sound 'ყიყინებს' (yiyinebs) - croaks."
    }
  ];

  const habitatsExercises = [
    {
      question: "Where does 'თევზი (tevzi)' (fish) live?",
      options: ['ტყეში (tqeshi) - in the forest', 'წყალში (tsqalshi) - in water', 'უდაბნოში (udabnoshi) - in the desert', 'მთაში (mtashi) - in the mountains'],
      correct: 'წყალში (tsqalshi) - in water',
      explanation: "თევზი (tevzi) - fish lives in water - წყალში (tsqalshi)."
    },
    {
      question: "Where does 'მგელი (mgeli)' (wolf) typically live?",
      options: ['ტყეში (tqeshi) - in the forest', 'წყალში (tsqalshi) - in water', 'უდაბნოში (udabnoshi) - in the desert', 'ქალაქში (kalakshi) - in the city'],
      correct: 'ტყეში (tqeshi) - in the forest',
      explanation: "მგელი (mgeli) - wolf typically lives in the forest - ტყეში (tqeshi)."
    },
    {
      question: "Where would you find 'ობობა (oboba)' (spider)?",
      options: ['ხეზე (kheze) - on a tree', 'ქსელში (kselshi) - in a web', 'მიწაში (mitsashi) - in the ground', 'წყალში (tsqalshi) - in water'],
      correct: 'ქსელში (kselshi) - in a web',
      explanation: "ობობა (oboba) - spider is typically found in a web - ქსელში (kselshi)."
    },
    {
      question: "Where does 'არწივი (artsivi)' (eagle) build its nest?",
      options: ['მიწაზე (mitsaze) - on the ground', 'წყალში (tsqalshi) - in water', 'მაღალ ხეზე (maghal kheze) - in tall trees', 'კლდეზე (kldeze) - on cliffs'],
      correct: 'კლდეზე (kldeze) - on cliffs',
      explanation: "არწივი (artsivi) - eagle typically builds its nest on cliffs - კლდეზე (kldeze)."
    },
    {
      question: "Where does 'ნიანგი (niangi)' (crocodile) live?",
      options: ['ტყეში (tqeshi) - in the forest', 'მთაში (mtashi) - in the mountains', 'წყალში და ხმელეთზე (tsqalshi da khmeletze) - in water and on land', 'უდაბნოში (udabnoshi) - in the desert'],
      correct: 'წყალში და ხმელეთზე (tsqalshi da khmeletze) - in water and on land',
      explanation: "ნიანგი (niangi) - crocodile lives both in water and on land - წყალში და ხმელეთზე (tsqalshi da khmeletze)."
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
      updateProgress('animals', { timeSpent: 1 });
    }
    
    // Save progress when component unmounts
    return () => {
      if (user && timeSpent > 0) {
        // Calculate progress based on time spent and exercise completion
        const exerciseCompletion = Object.keys(matchingExercises).length + 
                                  Object.keys(translationExercises).length + 
                                  multipleAnswers.length;
        
        // Mark as completed if user has spent significant time or completed exercises
        const completed = timeSpent > 10 || exerciseCompletion >= 5;
        
        updateProgress('animals', { 
          timeSpent, 
          completed: completed
        });
      }
    };
  }, [user, timeSpent, multipleAnswers]);

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

  const toggleMultipleAnswer = (answer: string) => {
    updateActivity();
    if (multipleAnswers.includes(answer)) {
      setMultipleAnswers(multipleAnswers.filter(a => a !== answer));
    } else {
      setMultipleAnswers([...multipleAnswers, answer]);
    }
  };

  const checkMultipleAnswers = () => {
    updateActivity();
    setShowFeedback(true);
  };

  const nextExercise = () => {
    updateActivity();
    if (exerciseMode === 'matching' && currentExerciseIndex < matchingExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else if (exerciseMode === 'translation' && currentExerciseIndex < translationExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else if (exerciseMode === 'classification' && currentExerciseIndex < classificationExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else if (exerciseMode === 'sounds' && currentExerciseIndex < soundsExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else if (exerciseMode === 'habitats' && currentExerciseIndex < habitatsExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
    setSelectedAnswer(null);
    setShowFeedback(false);
    setMultipleAnswers([]);
  };

  const resetExercise = () => {
    updateActivity();
    setCurrentExerciseIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setMultipleAnswers([]);
  };

  const isCorrectAnswer = () => {
    if (exerciseMode === 'matching' && selectedAnswer) {
      return selectedAnswer === matchingExercises[currentExerciseIndex].correct;
    } else if (exerciseMode === 'translation' && selectedAnswer) {
      return selectedAnswer === translationExercises[currentExerciseIndex].correct;
    } else if (exerciseMode === 'classification') {
      const correctAnswers = classificationExercises[currentExerciseIndex].correctAnswers;
      return (
        multipleAnswers.length === correctAnswers.length &&
        multipleAnswers.every(answer => correctAnswers.includes(answer))
      );
    } else if (exerciseMode === 'sounds' && selectedAnswer) {
      return selectedAnswer === soundsExercises[currentExerciseIndex].correct;
    } else if (exerciseMode === 'habitats' && selectedAnswer) {
      return selectedAnswer === habitatsExercises[currentExerciseIndex].correct;
    }
    return false;
  };

  return (
    <div className="pt-16 pb-16" onClick={updateActivity}>
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-br from-amber-50 to-yellow-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}>Animals</span> - ცხოველები (tskhovelebi)
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

      {/* Practice Exercises Section */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-amber-50'}`}>
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
                  Match Georgian animal names with their English translations
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
                  Translate English animal names to Georgian
                </p>
              </button>
              
              <button
                onClick={() => setExerciseMode('classification')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Animal Classification
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Group animals by their categories
                </p>
              </button>

              <button
                onClick={() => setExerciseMode('sounds')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Animal Sounds
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Match animals with their Georgian sound words
                </p>
              </button>

              <button
                onClick={() => setExerciseMode('habitats')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Animal Habitats
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Learn where different animals live in Georgian
                </p>
              </button>
            </div>
          ) : (
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {exerciseMode === 'matching' ? 'Word Matching' : 
                   exerciseMode === 'translation' ? 'Translation Practice' : 
                   exerciseMode === 'classification' ? 'Animal Classification' :
                   exerciseMode === 'sounds' ? 'Animal Sounds' : 'Animal Habitats'}
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
                            : (theme === 'dark' ? 'bg-amber-700 hover:bg-amber-600 text-white' : 'bg-amber-600 hover:bg-amber-700 text-white')
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
                            : (theme === 'dark' ? 'bg-amber-700 hover:bg-amber-600 text-white' : 'bg-amber-600 hover:bg-amber-700 text-white')
                        }`}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              )}
              
              {exerciseMode === 'classification' && (
                <div>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {classificationExercises[currentExerciseIndex].question}
                  </p>
                  
                  <div className="mb-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                      {classificationExercises[currentExerciseIndex].options.map((option) => (
                        <button
                          key={option}
                          onClick={() => toggleMultipleAnswer(option)}
                          className={`px-4 py-3 rounded-md text-center ${
                            multipleAnswers.includes(option)
                              ? (theme === 'dark' ? 'bg-amber-700 text-white' : 'bg-amber-100 text-amber-800')
                              : (theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800')
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={checkMultipleAnswers}
                      disabled={multipleAnswers.length === 0}
                      className={`px-6 py-2 rounded-md ${
                        multipleAnswers.length === 0
                          ? (theme === 'dark' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                          : (theme === 'dark' ? 'bg-amber-700 hover:bg-amber-600 text-white' : 'bg-amber-600 hover:bg-amber-700 text-white')
                      }`}
                    >
                      Check Answers
                    </button>
                    
                    {showFeedback && (
                      <div className={`mt-4 p-4 rounded-md ${
                        isCorrectAnswer()
                          ? (theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800')
                          : (theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800')
                      }`}>
                        {isCorrectAnswer()
                          ? `Correct! ${classificationExercises[currentExerciseIndex].explanation}`
                          : `Incorrect. The correct answers are: ${classificationExercises[currentExerciseIndex].correctAnswers.join(', ')}. ${classificationExercises[currentExerciseIndex].explanation}`}
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
                    
                    {currentExerciseIndex < classificationExercises.length - 1 && (
                      <button
                        onClick={nextExercise}
                        disabled={!showFeedback}
                        className={`px-4 py-2 rounded ${
                          !showFeedback
                            ? (theme === 'dark' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                            : (theme === 'dark' ? 'bg-amber-700 hover:bg-amber-600 text-white' : 'bg-amber-600 hover:bg-amber-700 text-white')
                        }`}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              )}

              {exerciseMode === 'sounds' && (
                <div>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {soundsExercises[currentExerciseIndex].question}
                  </p>
                  
                  <div className="mb-6">
                    <div className="grid grid-cols-2 gap-4">
                      {soundsExercises[currentExerciseIndex].options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleExerciseAnswer(option)}
                          className={`px-4 py-3 rounded-md text-center ${
                            selectedAnswer === option
                              ? option === soundsExercises[currentExerciseIndex].correct
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
                          ? `Correct! ${soundsExercises[currentExerciseIndex].explanation}`
                          : `Incorrect. The correct answer is "${soundsExercises[currentExerciseIndex].correct}". ${soundsExercises[currentExerciseIndex].explanation}`}
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
                    
                    {currentExerciseIndex < soundsExercises.length - 1 && (
                      <button
                        onClick={nextExercise}
                        disabled={!showFeedback}
                        className={`px-4 py-2 rounded ${
                          !showFeedback
                            ? (theme === 'dark' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                            : (theme === 'dark' ? 'bg-amber-700 hover:bg-amber-600 text-white' : 'bg-amber-600 hover:bg-amber-700 text-white')
                        }`}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              )}

              {exerciseMode === 'habitats' && (
                <div>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {habitatsExercises[currentExerciseIndex].question}
                  </p>
                  
                  <div className="mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {habitatsExercises[currentExerciseIndex].options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleExerciseAnswer(option)}
                          className={`px-4 py-3 rounded-md text-center ${
                            selectedAnswer === option
                              ? option === habitatsExercises[currentExerciseIndex].correct
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
                          ? `Correct! ${habitatsExercises[currentExerciseIndex].explanation}`
                          : `Incorrect. The correct answer is "${habitatsExercises[currentExerciseIndex].correct}". ${habitatsExercises[currentExerciseIndex].explanation}`}
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
                    
                    {currentExerciseIndex < habitatsExercises.length - 1 && (
                      <button
                        onClick={nextExercise}
                        disabled={!showFeedback}
                        className={`px-4 py-2 rounded ${
                          !showFeedback
                            ? (theme === 'dark' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                            : (theme === 'dark' ? 'bg-amber-700 hover:bg-amber-600 text-white' : 'bg-amber-600 hover:bg-amber-700 text-white')
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

export default AnimalsPage;