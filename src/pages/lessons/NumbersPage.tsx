import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Book, Check, ChevronDown, ChevronUp, Play, Volume2, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface NumberGroup {
  id: string;
  title: string;
  description: string;
  numbers: {
    number: number;
    georgian: string;
    latin: string;
    example?: string;
  }[];
}

const NumbersPage: React.FC = () => {
  const { theme } = useTheme();
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const groupRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [exerciseMode, setExerciseMode] = useState<'counting' | 'translation' | 'sequence' | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [countingInput, setCountingInput] = useState('');
  const [countingFeedback, setCountingFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const numberGroups: NumberGroup[] = [
    {
      id: '1-10',
      title: 'Numbers 1-10',
      description: 'Basic numbers from one to ten',
      numbers: [
        { number: 1, georgian: 'ერთი', latin: 'erti', example: 'ერთი კაცი - One man' },
        { number: 2, georgian: 'ორი', latin: 'ori', example: 'ორი ქალი - Two women' },
        { number: 3, georgian: 'სამი', latin: 'sami', example: 'სამი ბავშვი - Three children' },
        { number: 4, georgian: 'ოთხი', latin: 'otkhi', example: 'ოთხი წიგნი - Four books' },
        { number: 5, georgian: 'ხუთი', latin: 'khuti', example: 'ხუთი სახლი - Five houses' },
        { number: 6, georgian: 'ექვსი', latin: 'ekvsi', example: 'ექვსი ვაშლი - Six apples' },
        { number: 7, georgian: 'შვიდი', latin: 'shvidi', example: 'შვიდი დღე - Seven days' },
        { number: 8, georgian: 'რვა', latin: 'rva', example: 'რვა საათი - Eight hours' },
        { number: 9, georgian: 'ცხრა', latin: 'tskhra', example: 'ცხრა თვე - Nine months' },
        { number: 10, georgian: 'ათი', latin: 'ati', example: 'ათი წელი - Ten years' }
      ]
    },
    {
      id: '11-20',
      title: 'Numbers 11-20',
      description: 'Numbers from eleven to twenty',
      numbers: [
        { number: 11, georgian: 'თერთმეტი', latin: 'tertmeti', example: 'თერთმეტი კაცი - Eleven men' },
        { number: 12, georgian: 'თორმეტი', latin: 'tormeti', example: 'თორმეტი თვე - Twelve months' },
        { number: 13, georgian: 'ცამეტი', latin: 'tsameti', example: 'ცამეტი წელი - Thirteen years' },
        { number: 14, georgian: 'თოთხმეტი', latin: 'totxmeti', example: 'თოთხმეტი დღე - Fourteen days' },
        { number: 15, georgian: 'თხუთმეტი', latin: 'txutmeti', example: 'თხუთმეტი წუთი - Fifteen minutes' },
        { number: 16, georgian: 'თექვსმეტი', latin: 'tekvsmeti', example: 'თექვსმეტი საათი - Sixteen hours' },
        { number: 17, georgian: 'ჩვიდმეტი', latin: 'chvidmeti', example: 'ჩვიდმეტი წელი - Seventeen years' },
        { number: 18, georgian: 'თვრამეტი', latin: 'tvrameti', example: 'თვრამეტი კაცი - Eighteen men' },
        { number: 19, georgian: 'ცხრამეტი', latin: 'tskhrameti', example: 'ცხრამეტი ქალი - Nineteen women' },
        { number: 20, georgian: 'ოცი', latin: 'otsi', example: 'ოცი წელი - Twenty years' }
      ]
    },
    {
      id: '21-30',
      title: 'Numbers 21-30',
      description: 'Numbers from twenty-one to thirty',
      numbers: [
        { number: 21, georgian: 'ოცდაერთი', latin: 'otsdaerti', example: 'ოცდაერთი წელი - Twenty-one years' },
        { number: 22, georgian: 'ოცდაორი', latin: 'otsdaori', example: 'ოცდაორი დღე - Twenty-two days' },
        { number: 23, georgian: 'ოცდასამი', latin: 'otsdasami', example: 'ოცდასამი საათი - Twenty-three hours' },
        { number: 24, georgian: 'ოცდაოთხი', latin: 'otsdaotkhi', example: 'ოცდაოთხი საათი - Twenty-four hours' },
        { number: 25, georgian: 'ოცდახუთი', latin: 'otsdakhuti', example: 'ოცდახუთი წელი - Twenty-five years' },
        { number: 26, georgian: 'ოცდაექვსი', latin: 'otsdaekvsi', example: 'ოცდაექვსი კაცი - Twenty-six men' },
        { number: 27, georgian: 'ოცდაშვიდი', latin: 'otsdashvidi', example: 'ოცდაშვიდი ქალი - Twenty-seven women' },
        { number: 28, georgian: 'ოცდარვა', latin: 'otsdarva', example: 'ოცდარვა დღე - Twenty-eight days' },
        { number: 29, georgian: 'ოცდაცხრა', latin: 'otsdatskhra', example: 'ოცდაცხრა წელი - Twenty-nine years' },
        { number: 30, georgian: 'ოცდაათი', latin: 'otsdaati', example: 'ოცდაათი წუთი - Thirty minutes' }
      ]
    },
    {
      id: '31-40',
      title: 'Numbers 31-40',
      description: 'Numbers from thirty-one to forty',
      numbers: [
        { number: 31, georgian: 'ოცდათერთმეტი', latin: 'otsdatertmeti', example: 'ოცდათერთმეტი წელი - Thirty-one years' },
        { number: 32, georgian: 'ოცდათორმეტი', latin: 'otsdatormeti', example: 'ოცდათორმეტი დღე - Thirty-two days' },
        { number: 33, georgian: 'ოცდაცამეტი', latin: 'otsdatsameti', example: 'ოცდაცამეტი კაცი - Thirty-three men' },
        { number: 34, georgian: 'ოცდათოთხმეტი', latin: 'otsdatotxmeti', example: 'ოცდათოთხმეტი საათი - Thirty-four hours' },
        { number: 35, georgian: 'ოცდათხუთმეტი', latin: 'otsdatxutmeti', example: 'ოცდათხუთმეტი წელი - Thirty-five years' },
        { number: 36, georgian: 'ოცდათექვსმეტი', latin: 'otsdatekvsmeti', example: 'ოცდათექვსმეტი ქალი - Thirty-six women' },
        { number: 37, georgian: 'ოცდაჩვიდმეტი', latin: 'otsdachvidmeti', example: 'ოცდაჩვიდმეტი დღე - Thirty-seven days' },
        { number: 38, georgian: 'ოცდათვრამეტი', latin: 'otsdatvrameti', example: 'ოცდათვრამეტი წელი - Thirty-eight years' },
        { number: 39, georgian: 'ოცდაცხრამეტი', latin: 'otsdatskhrameti', example: 'ოცდაცხრამეტი წუთი - Thirty-nine minutes' },
        { number: 40, georgian: 'ორმოცი', latin: 'ormotsi', example: 'ორმოცი წელი - Forty years' }
      ]
    },
    {
      id: '41-50',
      title: 'Numbers 41-50',
      description: 'Numbers from forty-one to fifty',
      numbers: [
        { number: 41, georgian: 'ორმოცდაერთი', latin: 'ormotsdaerti', example: 'ორმოცდაერთი წელი - Forty-one years' },
        { number: 42, georgian: 'ორმოცდაორი', latin: 'ormotsdaori', example: 'ორმოცდაორი დღე - Forty-two days' },
        { number: 43, georgian: 'ორმოცდასამი', latin: 'ormotsdasami', example: 'ორმოცდასამი კაცი - Forty-three men' },
        { number: 44, georgian: 'ორმოცდაოთხი', latin: 'ormotsdaotkhi', example: 'ორმოცდაოთხი საათი - Forty-four hours' },
        { number: 45, georgian: 'ორმოცდახუთი', latin: 'ormotsdakhuti', example: 'ორმოცდახუთი წელი - Forty-five years' },
        { number: 46, georgian: 'ორმოცდაექვსი', latin: 'ormotsdaekvsi', example: 'ორმოცდაექვსი ქალი - Forty-six women' },
        { number: 47, georgian: 'ორმოცდაშვიდი', latin: 'ormotsdashvidi', example: 'ორმოცდაშვიდი დღე - Forty-seven days' },
        { number: 48, georgian: 'ორმოცდარვა', latin: 'ormotsdarva', example: 'ორმოცდარვა წელი - Forty-eight years' },
        { number: 49, georgian: 'ორმოცდაცხრა', latin: 'ormotsdatskhra', example: 'ორმოცდაცხრა წუთი - Forty-nine minutes' },
        { number: 50, georgian: 'ორმოცდაათი', latin: 'ormotsdaati', example: 'ორმოცდაათი წელი - Fifty years' }
      ]
    },
    {
      id: '51-60',
      title: 'Numbers 51-60',
      description: 'Numbers from fifty-one to sixty',
      numbers: [
        { number: 51, georgian: 'ორმოცდათერთმეტი', latin: 'ormotsdatertmeti', example: 'ორმოცდათერთმეტი წელი - Fifty-one years' },
        { number: 52, georgian: 'ორმოცდათორმეტი', latin: 'ormotsdatormeti', example: 'ორმოცდათორმეტი დღე - Fifty-two days' },
        { number: 53, georgian: 'ორმოცდაცამეტი', latin: 'ormotsdatsameti', example: 'ორმოცდაცამეტი კაცი - Fifty-three men' },
        { number: 54, georgian: 'ორმოცდათოთხმეტი', latin: 'ormotsdatotxmeti', example: 'ორმოცდათოთხმეტი საათი - Fifty-four hours' },
        { number: 55, georgian: 'ორმოცდათხუთმეტი', latin: 'ormotsdatxutmeti', example: 'ორმოცდათხუთმეტი წელი - Fifty-five years' },
        { number: 56, georgian: 'ორმოცდათექვსმეტი', latin: 'ormotsdatekvsmeti', example: 'ორმოცდათექვსმეტი ქალი - Fifty-six women' },
        { number: 57, georgian: 'ორმოცდაჩვიდმეტი', latin: 'ormotsdachvidmeti', example: 'ორმოცდაჩვიდმეტი დღე - Fifty-seven days' },
        { number: 58, georgian: 'ორმოცდათვრამეტი', latin: 'ormotsdatvrameti', example: 'ორმოცდათვრამეტი წელი - Fifty-eight years' },
        { number: 59, georgian: 'ორმოცდაცხრამეტი', latin: 'ormotsdaskhrameti', example: 'ორმოცდაცხრამეტი წუთი - Fifty-nine minutes' },
        { number: 60, georgian: 'სამოცი', latin: 'samotsi', example: 'სამოცი წელი - Sixty years' }
      ]
    },
    {
      id: '61-70',
      title: 'Numbers 61-70',
      description: 'Numbers from sixty-one to seventy',
      numbers: [
        { number: 61, georgian: 'სამოცდაერთი', latin: 'samotsdaerti', example: 'სამოცდაერთი წელი - Sixty-one years' },
        { number: 62, georgian: 'სამოცდაორი', latin: 'samotsdaori', example: 'სამოცდაორი დღე - Sixty-two days' },
        { number: 63, georgian: 'სამოცდასამი', latin: 'samotsdasami', example: 'სამოცდასამი კაცი - Sixty-three men' },
        { number: 64, georgian: 'სამოცდაოთხი', latin: 'samotsdaotkhi', example: 'სამოცდაოთხი საათი - Sixty-four hours' },
        { number: 65, georgian: 'სამოცდახუთი', latin: 'samotsdakhuti', example: 'სამოცდახუთი წელი - Sixty-five years' },
        { number: 66, georgian: 'სამოცდაექვსი', latin: 'samotsdaekvsi', example: 'სამოცდაექვსი ქალი - Sixty-six women' },
        { number: 67, georgian: 'სამოცდაშვიდი', latin: 'samotsdashvidi', example: 'სამოცდაშვიდი დღე - Sixty-seven days' },
        { number: 68, georgian: 'სამოცდარვა', latin: 'samotsdarva', example: 'სამოცდარვა წელი - Sixty-eight years' },
        { number: 69, georgian: 'სამოცდაცხრა', latin: 'samotsdatskhra', example: 'სამოცდაცხრა წუთი - Sixty-nine minutes' },
        { number: 70, georgian: 'სამოცდაათი', latin: 'samotsdaati', example: 'სამოცდაათი წელი - Seventy years' }
      ]
    },
    {
      id: '71-80',
      title: 'Numbers 71-80',
      description: 'Numbers from seventy-one to eighty',
      numbers: [
        { number: 71, georgian: 'სამოცდათერთმეტი', latin: 'samotsdatertmeti', example: 'სამოცდათერთმეტი წელი - Seventy-one years' },
        { number: 72, georgian: 'სამოცდათორმეტი', latin: 'samotsdatormeti', example: 'სამოცდათორმეტი დღე - Seventy-two days' },
        { number: 73, georgian: 'სამოცდაცამეტი', latin: 'samotsdatsameti', example: 'სამოცდაცამეტი კაცი - Seventy-three men' },
        { number: 74, georgian: 'სამოცდათოთხმეტი', latin: 'samotsdatotxmeti', example: 'სამოცდათოთხმეტი საათი - Seventy-four hours' },
        { number: 75, georgian: 'სამოცდათხუთმეტი', latin: 'samotsdatxutmeti', example: 'სამოცდათხუთმეტი წელი - Seventy-five years' },
        { number: 76, georgian: 'სამოცდათექვსმეტი', latin: 'samotsdatekvsmeti', example: 'სამოცდათექვსმეტი ქალი - Seventy-six women' },
        { number: 77, georgian: 'სამოცდაჩვიდმეტი', latin: 'samotsdachvidmeti', example: 'სამოცდაჩვიდმეტი დღე - Seventy-seven days' },
        { number: 78, georgian: 'სამოცდათვრამეტი', latin: 'samotsdatvrameti', example: 'სამოცდათვრამეტი წელი - Seventy-eight years' },
        { number: 79, georgian: 'სამოცდაცხრამეტი', latin: 'samotsdaskhrameti', example: 'სამოცდაცხრამეტი წუთი - Seventy-nine minutes' },
        { number: 80, georgian: 'ოთხმოცი', latin: 'otxmotsi', example: 'ოთხმოცი წელი - Eighty years' }
      ]
    },
    {
      id: '81-90',
      title: 'Numbers 81-90',
      description: 'Numbers from eighty-one to ninety',
      numbers: [
        { number: 81, georgian: 'ოთხმოცდაერთი', latin: 'otxmotsdaerti', example: 'ოთხმოცდაერთი წელი - Eighty-one years' },
        { number: 82, georgian: 'ოთხმოცდაორი', latin: 'otxmotsdaori', example: 'ოთხმოცდაორი დღე - Eighty-two days' },
        { number: 83, georgian: 'ოთხმოცდასამი', latin: 'otxmotsdasami', example: 'ოთხმოცდასამი კაცი - Eighty-three men' },
        { number: 84, georgian: 'ოთხმოცდაოთხი', latin: 'otxmotsdaotkhi', example: 'ოთხმოცდაოთხი საათი - Eighty-four hours' },
        { number: 85, georgian: 'ოთხმოცდახუთი', latin: 'otxmotsdakhuti', example: 'ოთხმოცდახუთი წელი - Eighty-five years' },
        { number: 86, georgian: 'ოთხმოცდაექვსი', latin: 'otxmotsdaekvsi', example: 'ოთხმოცდაექვსი ქალი - Eighty-six women' },
        { number: 87, georgian: 'ოთხმოცდაშვიდი', latin: 'otxmotsdashvidi', example: 'ოთხმოცდაშვიდი დღე - Eighty-seven days' },
        { number: 88, georgian: 'ოთხმოცდარვა', latin: 'otxmotsdarva', example: 'ოთხმოცდარვა წელი - Eighty-eight years' },
        { number: 89, georgian: 'ოთხმოცდაცხრა', latin: 'otxmotsdatskhra', example: 'ოთხმოცდაცხრა წუთი - Eighty-nine minutes' },
        { number: 90, georgian: 'ოთხმოცდაათი', latin: 'otxmotsdaati', example: 'ოთხმოცდაათი წელი - Ninety years' }
      ]
    },
    {
      id: '91-100',
      title: 'Numbers 91-100',
      description: 'Numbers from ninety-one to one hundred',
      numbers: [
        { number: 91, georgian: 'ოთხმოცდათერთმეტი', latin: 'otxmotsdatertmeti', example: 'ოთხმოცდათერთმეტი წელი - Ninety-one years' },
        { number: 92, georgian: 'ოთხმოცდათორმეტი', latin: 'otxmotsdatormeti', example: 'ოთხმოცდათორმეტი დღე - Ninety-two days' },
        { number: 93, georgian: 'ოთხმოცდაცამეტი', latin: 'otxmotsdatsameti', example: 'ოთხმოცდაცამეტი კაცი - Ninety-three men' },
        { number: 94, georgian: 'ოთხმოცდათოთხმეტი', latin: 'otxmotsdatotxmeti', example: 'ოთხმოცდათოთხმეტი საათი - Ninety-four hours' },
        { number: 95, georgian: 'ოთხმოცდათხუთმეტი', latin: 'otxmotsdatxutmeti', example: 'ოთხმოცდათხუთმეტი წელი - Ninety-five years' },
        { number: 96, georgian: 'ოთხმოცდათექვსმეტი', latin: 'otxmotsdatekvsmeti', example: 'ოთხმოცდათექვსმეტი ქალი - Ninety-six women' },
        { number: 97, georgian: 'ოთხმოცდაჩვიდმეტი', latin: 'otxmotsdachvidmeti', example: 'ოთხმოცდაჩვიდმეტი დღე - Ninety-seven days' },
        { number: 98, georgian: 'ოთხმოცდათვრამეტი', latin: 'otxmotsdatvrameti', example: 'ოთხმოცდათვრამეტი წელი - Ninety-eight years' },
        { number: 99, georgian: 'ოთხმოცდაცხრამეტი', latin: 'otxmotsdaskhrameti', example: 'ოთხმოცდაცხრამეტი წუთი - Ninety-nine minutes' },
        { number: 100, georgian: 'ასი', latin: 'asi', example: 'ასი წელი - One hundred years' }
      ]
    }
  ];

  // Exercise data
  const translationExercises = [
    { number: 5, options: ['სამი', 'ოთხი', 'ხუთი', 'ექვსი'], correct: 'ხუთი' },
    { number: 12, options: ['ათი', 'თერთმეტი', 'თორმეტი', 'ცამეტი'], correct: 'თორმეტი' },
    { number: 20, options: ['ოცი', 'ოცდაათი', 'ორმოცი', 'სამოცი'], correct: 'ოცი' },
    { number: 33, options: ['ოცდაცამეტი', 'ოცდათოთხმეტი', 'ორმოცდასამი', 'ოცდასამი'], correct: 'ოცდაცამეტი' },
    { number: 50, options: ['ორმოცდაათი', 'ორმოცი', 'სამოცი', 'ოთხმოცი'], correct: 'ორმოცდაათი' }
  ];

  const sequenceExercises = [
    { 
      prompt: "What comes after 'ოთხი'?", 
      options: ['სამი', 'ხუთი', 'ექვსი', 'შვიდი'], 
      correct: 'ხუთი' 
    },
    { 
      prompt: "What comes before 'ოცი'?", 
      options: ['თვრამეტი', 'ცხრამეტი', 'ოცდაერთი', 'თექვსმეტი'], 
      correct: 'ცხრამეტი' 
    },
    { 
      prompt: "Complete the sequence: ორმოცდარვა, ორმოცდაცხრა, ...?", 
      options: ['ორმოცდაათი', 'ორმოცი', 'სამოცი', 'ორმოცდაერთი'], 
      correct: 'ორმოცდაათი' 
    },
    { 
      prompt: "Complete the sequence: ოთხმოცდათვრამეტი, ოთხმოცდაცხრა, ...?", 
      options: ['ოთხმოცდაათი', 'ასი', 'ოთხმოცი', 'ოთხმოცდაერთი'], 
      correct: 'ოთხმოცდაათი' 
    },
    { 
      prompt: "What comes after 'ცხრა'?", 
      options: ['რვა', 'ათი', 'თერთმეტი', 'თორმეტი'], 
      correct: 'ათი' 
    }
  ];

  const countingExercises = [
    { 
      prompt: "Count from 1 to 5 in Georgian", 
      correct: "ერთი, ორი, სამი, ოთხი, ხუთი" 
    },
    { 
      prompt: "Count from 6 to 10 in Georgian", 
      correct: "ექვსი, შვიდი, რვა, ცხრა, ათი" 
    },
    { 
      prompt: "Count from 11 to 15 in Georgian", 
      correct: "თერთმეტი, თორმეტი, ცამეტი, თოთხმეტი, თხუთმეტი" 
    },
    { 
      prompt: "Write the numbers 20, 30, 40, 50 in Georgian", 
      correct: "ოცი, ოცდაათი, ორმოცი, ორმოცდაათი" 
    },
    { 
      prompt: "Write the numbers 60, 70, 80, 90, 100 in Georgian", 
      correct: "სამოცი, სამოცდაათი, ოთხმოცი, ოთხმოცდაათი, ასი" 
    }
  ];

  const toggleGroup = (groupId: string) => {
    if (expandedGroup === groupId) {
      setExpandedGroup(null);
    } else {
      setExpandedGroup(groupId);
      setTimeout(() => {
        if (groupRefs.current[groupId]) {
          groupRefs.current[groupId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  const handleExerciseAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
  };

  const handleCountingSubmit = () => {
    const exercise = countingExercises[currentExerciseIndex];
    const normalizedInput = countingInput.trim().replace(/\s+/g, ' ').toLowerCase();
    const normalizedCorrect = exercise.correct.toLowerCase();
    
    if (normalizedInput === normalizedCorrect) {
      setCountingFeedback('correct');
    } else {
      setCountingFeedback('incorrect');
    }
  };

  const nextExercise = () => {
    if (exerciseMode === 'translation' && currentExerciseIndex < translationExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else if (exerciseMode === 'sequence' && currentExerciseIndex < sequenceExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else if (exerciseMode === 'counting' && currentExerciseIndex < countingExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCountingInput('');
      setCountingFeedback(null);
    }
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const resetExercise = () => {
    setCurrentExerciseIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setCountingInput('');
    setCountingFeedback(null);
  };

  const isCorrectAnswer = () => {
    if (!selectedAnswer) return false;
    
    if (exerciseMode === 'translation') {
      return selectedAnswer === translationExercises[currentExerciseIndex].correct;
    } else if (exerciseMode === 'sequence') {
      return selectedAnswer === sequenceExercises[currentExerciseIndex].correct;
    }
    
    return false;
  };

  return (
    <div className="pt-16 pb-16">
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-br from-yellow-50 to-orange-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}>Numbers</span> - რიცხვები
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Learn to count in Georgian from 1 to 100 with pronunciation and examples.
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
                  to="/beginner/quiz/numbers"
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
              <div className={`p-6 rounded-lg shadow-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-white bg-opacity-50 backdrop-blur-lg'}`}>
                <Book className={`w-12 h-12 mb-4 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`} />
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Learning Tips
                </h3>
                <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• Learn numbers in groups of ten</li>
                  <li>• Practice counting out loud</li>
                  <li>• Use numbers in simple sentences</li>
                  <li>• Focus on pronunciation patterns</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {numberGroups.map((group) => (
              <div
                key={group.id}
                ref={el => groupRefs.current[group.id] = el}
              >
                <button
                  onClick={() => toggleGroup(group.id)}
                  className={`w-full p-6 rounded-lg text-left transition-colors ${
                    theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
                  } shadow-lg`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {group.title}
                      </h2>
                      <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                        {group.description}
                      </p>
                    </div>
                    {expandedGroup === group.id ? (
                      <ChevronUp className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                    ) : (
                      <ChevronDown className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                    )}
                  </div>
                </button>

                {expandedGroup === group.id && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {group.numbers.map((number) => (
                      <div
                        key={number.number}
                        className={`p-6 rounded-lg ${
                          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                        } shadow-lg`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <span className={`text-2xl font-bold mr-3 ${
                              theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
                            }`}>
                              {number.number}
                            </span>
                            <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                              {number.georgian}
                            </span>
                          </div>
                          <button
                            onClick={() => playAudio(number.georgian)}
                            className={`p-2 rounded-full transition-colors ${
                              isPlaying === number.georgian
                                ? (theme === 'dark' ? 'bg-yellow-600' : 'bg-yellow-500')
                                : (theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200')
                            }`}
                          >
                            {isPlaying === number.georgian ? (
                              <X size={16} className="text-white" />
                            ) : (
                              <Volume2 size={16} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />
                            )}
                          </button>
                        </div>
                        <div className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            /{number.latin}/
                          </p>
                          {number.example && (
                            <p className="text-sm italic">{number.example}</p>
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
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-yellow-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Practice Exercises
          </h2>
          
          {!exerciseMode ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={() => setExerciseMode('translation')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Number Translation
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Match numbers with their Georgian words
                </p>
              </button>
              
              <button
                onClick={() => setExerciseMode('sequence')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Number Sequences
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Complete number sequences in Georgian
                </p>
              </button>
              
              <button
                onClick={() => setExerciseMode('counting')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Counting Practice
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Practice counting in Georgian
                </p>
              </button>
            </div>
          ) : (
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {exerciseMode === 'translation' ? 'Number Translation' : 
                   exerciseMode === 'sequence' ? 'Number Sequences' : 'Counting Practice'}
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
              
              {exerciseMode === 'translation' && (
                <div>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Select the Georgian word for the number: <span className="font-bold">{translationExercises[currentExerciseIndex].number}</span>
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
                            : (theme === 'dark' ? 'bg-yellow-700 hover:bg-yellow-600 text-white' : 'bg-yellow-600 hover:bg-yellow-700 text-white')
                        }`}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              )}
              
              {exerciseMode === 'sequence' && (
                <div>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {sequenceExercises[currentExerciseIndex].prompt}
                  </p>
                  
                  <div className="mb-6">
                    <div className="grid grid-cols-2 gap-4">
                      {sequenceExercises[currentExerciseIndex].options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleExerciseAnswer(option)}
                          className={`px-4 py-3 rounded-md text-center ${
                            selectedAnswer === option
                              ? option === sequenceExercises[currentExerciseIndex].correct
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
                          : `Incorrect. The correct answer is "${sequenceExercises[currentExerciseIndex].correct}".`}
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
                    
                    {currentExerciseIndex < sequenceExercises.length - 1 && (
                      <button
                        onClick={nextExercise}
                        disabled={!showFeedback}
                        className={`px-4 py-2 rounded ${
                          !showFeedback
                            ? (theme === 'dark' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                            : (theme === 'dark' ? 'bg-yellow-700 hover:bg-yellow-600 text-white' : 'bg-yellow-600 hover:bg-yellow-700 text-white')
                        }`}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              )}
              
              {exerciseMode === 'counting' && (
                <div>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {countingExercises[currentExerciseIndex].prompt}
                  </p>
                  
                  <div className="mb-6">
                    <textarea
                      value={countingInput}
                      onChange={(e) => setCountingInput(e.target.value)}
                      className={`w-full px-4 py-2 rounded-md ${
                        theme === 'dark'
                          ? 'bg-gray-600 border-gray-500 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } border focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                      placeholder="Type your answer here..."
                      rows={3}
                    />
                    
                    <div className="mt-4 flex justify-center">
                      <button
                        onClick={handleCountingSubmit}
                        className={`px-6 py-2 rounded-md ${
                          theme === 'dark'
                            ? 'bg-yellow-700 hover:bg-yellow-600 text-white'
                            : 'bg-yellow-600 hover:bg-yellow-700 text-white'
                        }`}
                      >
                        Check
                      </button>
                    </div>
                    
                    {countingFeedback && (
                      <div className={`mt-4 p-4 rounded-md ${
                        countingFeedback === 'correct'
                          ? (theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800')
                          : (theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800')
                      }`}>
                        {countingFeedback === 'correct'
                          ? 'Correct! Well done.'
                          : `Incorrect. The correct answer is "${countingExercises[currentExerciseIndex].correct}".`}
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
                    
                    {currentExerciseIndex < countingExercises.length - 1 && (
                      <button
                        onClick={nextExercise}
                        disabled={!countingFeedback}
                        className={`px-4 py-2 rounded ${
                          !countingFeedback
                            ? (theme === 'dark' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                            : (theme === 'dark' ? 'bg-yellow-700 hover:bg-yellow-600 text-white' : 'bg-yellow-600 hover:bg-yellow-700 text-white')
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

export default NumbersPage;