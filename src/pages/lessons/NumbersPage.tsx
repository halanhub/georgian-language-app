import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Book, Brain, Check, ChevronDown, ChevronUp, Play, Volume2, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserProgress } from '../../hooks/useUserProgress';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

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
  const { user } = useAuth();
  const { updateProgress } = useUserProgress();
  const { t } = useTranslation();
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const groupRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [exerciseMode, setExerciseMode] = useState<'counting' | 'translation' | 'sequence' | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [countingInput, setCountingInput] = useState('');
  const [countingFeedback, setCountingFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const numberGroups: NumberGroup[] = [
    {
      id: '1-10',
      title: 'Numbers 1-10',
      description: 'Basic numbers from one to ten',
      numbers: [
        { number: 1, georgian: 'ერთი', latin: 'erti', example: 'ერთი კაცი (erti katsi) - One man' },
        { number: 2, georgian: 'ორი', latin: 'ori', example: 'ორი ქალი (ori kali) - Two women' },
        { number: 3, georgian: 'სამი', latin: 'sami', example: 'სამი ბავშვი (sami bavshvi) - Three children' },
        { number: 4, georgian: 'ოთხი', latin: 'otkhi', example: 'ოთხი წიგნი (otkhi tsigni) - Four books' },
        { number: 5, georgian: 'ხუთი', latin: 'khuti', example: 'ხუთი სახლი (khuti sakhli) - Five houses' },
        { number: 6, georgian: 'ექვსი', latin: 'ekvsi', example: 'ექვსი ვაშლი (ekvsi vashli) - Six apples' },
        { number: 7, georgian: 'შვიდი', latin: 'shvidi', example: 'შვიდი დღე (shvidi dghe) - Seven days' },
        { number: 8, georgian: 'რვა', latin: 'rva', example: 'რვა საათი (rva saati) - Eight hours' },
        { number: 9, georgian: 'ცხრა', latin: 'tskhra', example: 'ცხრა თვე (tskhra tve) - Nine months' },
        { number: 10, georgian: 'ათი', latin: 'ati', example: 'ათი წელი (ati tseli) - Ten years' }
      ]
    },
    {
      id: '11-20',
      title: 'Numbers 11-20',
      description: 'Numbers from eleven to twenty',
      numbers: [
        { number: 11, georgian: 'თერთმეტი', latin: 'tertmeti', example: 'თერთმეტი კაცი (tertmeti katsi) - Eleven men' },
        { number: 12, georgian: 'თორმეტი', latin: 'tormeti', example: 'თორმეტი თვე (tormeti tve) - Twelve months' },
        { number: 13, georgian: 'ცამეტი', latin: 'tsameti', example: 'ცამეტი წელი (tsameti tseli) - Thirteen years' },
        { number: 14, georgian: 'თოთხმეტი', latin: 'totxmeti', example: 'თოთხმეტი დღე (totxmeti dghe) - Fourteen days' },
        { number: 15, georgian: 'თხუთმეტი', latin: 'txutmeti', example: 'თხუთმეტი წუთი (txutmeti tsuti) - Fifteen minutes' },
        { number: 16, georgian: 'თექვსმეტი', latin: 'tekvsmeti', example: 'თექვსმეტი საათი (tekvsmeti saati) - Sixteen hours' },
        { number: 17, georgian: 'ჩვიდმეტი', latin: 'chvidmeti', example: 'ჩვიდმეტი წელი (chvidmeti tseli) - Seventeen years' },
        { number: 18, georgian: 'თვრამეტი', latin: 'tvrameti', example: 'თვრამეტი კაცი (tvrameti katsi) - Eighteen men' },
        { number: 19, georgian: 'ცხრამეტი', latin: 'tskhrameti', example: 'ცხრამეტი ქალი (tskhrameti kali) - Nineteen women' },
        { number: 20, georgian: 'ოცი', latin: 'otsi', example: 'ოცი წელი (otsi tseli) - Twenty years' }
      ]
    },
    {
      id: '21-30',
      title: 'Numbers 21-30',
      description: 'Numbers from twenty-one to thirty',
      numbers: [
        { number: 21, georgian: 'ოცდაერთი', latin: 'otsdaerti', example: 'ოცდაერთი წელი (otsdaerti tseli) - Twenty-one years' },
        { number: 22, georgian: 'ოცდაორი', latin: 'otsdaori', example: 'ოცდაორი დღე (otsdaori dghe) - Twenty-two days' },
        { number: 23, georgian: 'ოცდასამი', latin: 'otsdasami', example: 'ოცდასამი საათი (otsdasami saati) - Twenty-three hours' },
        { number: 24, georgian: 'ოცდაოთხი', latin: 'otsdaotkhi', example: 'ოცდაოთხი საათი (otsdaotkhi saati) - Twenty-four hours' },
        { number: 25, georgian: 'ოცდახუთი', latin: 'otsdakhuti', example: 'ოცდახუთი წელი (otsdakhuti tseli) - Twenty-five years' },
        { number: 26, georgian: 'ოცდაექვსი', latin: 'otsdaekvsi', example: 'ოცდაექვსი კაცი (otsdaekvsi katsi) - Twenty-six men' },
        { number: 27, georgian: 'ოცდაშვიდი', latin: 'otsdashvidi', example: 'ოცდაშვიდი ქალი (otsdashvidi kali) - Twenty-seven women' },
        { number: 28, georgian: 'ოცდარვა', latin: 'otsdarva', example: 'ოცდარვა დღე (otsdarva dghe) - Twenty-eight days' },
        { number: 29, georgian: 'ოცდაცხრა', latin: 'otsdatskhra', example: 'ოცდაცხრა წელი (otsdatskhra tseli) - Twenty-nine years' },
        { number: 30, georgian: 'ოცდაათი', latin: 'otsdaati', example: 'ოცდაათი წუთი (otsdaati tsuti) - Thirty minutes' }
      ]
    },
    {
      id: '31-40',
      title: 'Numbers 31-40',
      description: 'Numbers from thirty-one to forty',
      numbers: [
        { number: 31, georgian: 'ოცდათერთმეტი', latin: 'otsdatertmeti', example: 'ოცდათერთმეტი წელი (otsdatertmeti tseli) - Thirty-one years' },
        { number: 32, georgian: 'ოცდათორმეტი', latin: 'otsdatormeti', example: 'ოცდათორმეტი დღე (otsdatormeti dghe) - Thirty-two days' },
        { number: 33, georgian: 'ოცდაცამეტი', latin: 'otsdatsameti', example: 'ოცდაცამეტი კაცი (otsdatsameti katsi) - Thirty-three men' },
        { number: 34, georgian: 'ოცდათოთხმეტი', latin: 'otsdatotxmeti', example: 'ოცდათოთხმეტი საათი (otsdatotxmeti saati) - Thirty-four hours' },
        { number: 35, georgian: 'ოცდათხუთმეტი', latin: 'otsdatxutmeti', example: 'ოცდათხუთმეტი წელი (otsdatxutmeti tseli) - Thirty-five years' },
        { number: 36, georgian: 'ოცდათექვსმეტი', latin: 'otsdatekvsmeti', example: 'ოცდათექვსმეტი ქალი (otsdatekvsmeti kali) - Thirty-six women' },
        { number: 37, georgian: 'ოცდაჩვიდმეტი', latin: 'otsdachvidmeti', example: 'ოცდაჩვიდმეტი დღე (otsdachvidmeti dghe) - Thirty-seven days' },
        { number: 38, georgian: 'ოცდათვრამეტი', latin: 'otsdatvrameti', example: 'ოცდათვრამეტი წელი (otsdatvrameti tseli) - Thirty-eight years' },
        { number: 39, georgian: 'ოცდაცხრამეტი', latin: 'otsdatskhrameti', example: 'ოცდაცხრამეტი წუთი (otsdatskhrameti tsuti) - Thirty-nine minutes' },
        { number: 40, georgian: 'ორმოცი', latin: 'ormotsi', example: 'ორმოცი წელი (ormotsi tseli) - Forty years' }
      ]
    },
    {
      id: '41-50',
      title: 'Numbers 41-50',
      description: 'Numbers from forty-one to fifty',
      numbers: [
        { number: 41, georgian: 'ორმოცდაერთი', latin: 'ormotsdaerti', example: 'ორმოცდაერთი წელი (ormotsdaerti tseli) - Forty-one years' },
        { number: 42, georgian: 'ორმოცდაორი', latin: 'ormotsdaori', example: 'ორმოცდაორი დღე (ormotsdaori dghe) - Forty-two days' },
        { number: 43, georgian: 'ორმოცდასამი', latin: 'ormotsdasami', example: 'ორმოცდასამი კაცი (ormotsdasami katsi) - Forty-three men' },
        { number: 44, georgian: 'ორმოცდაოთხი', latin: 'ormotsdaotkhi', example: 'ორმოცდაოთხი საათი (ormotsdaotkhi saati) - Forty-four hours' },
        { number: 45, georgian: 'ორმოცდახუთი', latin: 'ormotsdakhuti', example: 'ორმოცდახუთი წელი (ormotsdakhuti tseli) - Forty-five years' },
        { number: 46, georgian: 'ორმოცდაექვსი', latin: 'ormotsdaekvsi', example: 'ორმოცდაექვსი ქალი (ormotsdaekvsi kali) - Forty-six women' },
        { number: 47, georgian: 'ორმოცდაშვიდი', latin: 'ormotsdashvidi', example: 'ორმოცდაშვიდი დღე (ormotsdashvidi dghe) - Forty-seven days' },
        { number: 48, georgian: 'ორმოცდარვა', latin: 'ormotsdarva', example: 'ორმოცდარვა წელი (ormotsdarva tseli) - Forty-eight years' },
        { number: 49, georgian: 'ორმოცდაცხრა', latin: 'ormotsdatskhra', example: 'ორმოცდაცხრა წუთი (ormotsdatskhra tsuti) - Forty-nine minutes' },
        { number: 50, georgian: 'ორმოცდაათი', latin: 'ormotsdaati', example: 'ორმოცდაათი წელი (ormotsdaati tseli) - Fifty years' }
      ]
    },
    {
      id: '51-60',
      title: 'Numbers 51-60',
      description: 'Numbers from fifty-one to sixty',
      numbers: [
        { number: 51, georgian: 'ორმოცდათერთმეტი', latin: 'ormotsdatertmeti', example: 'ორმოცდათერთმეტი წელი (ormotsdatertmeti tseli) - Fifty-one years' },
        { number: 52, georgian: 'ორმოცდათორმეტი', latin: 'ormotsdatormeti', example: 'ორმოცდათორმეტი დღე (ormotsdatormeti dghe) - Fifty-two days' },
        { number: 53, georgian: 'ორმოცდაცამეტი', latin: 'ormotsdatsameti', example: 'ორმოცდაცამეტი კაცი (ormotsdatsameti katsi) - Fifty-three men' },
        { number: 54, georgian: 'ორმოცდათოთხმეტი', latin: 'ormotsdatotxmeti', example: 'ორმოცდათოთხმეტი საათი (ormotsdatotxmeti saati) - Fifty-four hours' },
        { number: 55, georgian: 'ორმოცდათხუთმეტი', latin: 'ormotsdatxutmeti', example: 'ორმოცდათხუთმეტი წელი (ormotsdatxutmeti tseli) - Fifty-five years' },
        { number: 56, georgian: 'ორმოცდათექვსმეტი', latin: 'ormotsdatekvsmeti', example: 'ორმოცდათექვსმეტი ქალი (ormotsdatekvsmeti kali) - Fifty-six women' },
        { number: 57, georgian: 'ორმოცდაჩვიდმეტი', latin: 'ormotsdachvidmeti', example: 'ორმოცდაჩვიდმეტი დღე (ormotsdachvidmeti dghe) - Fifty-seven days' },
        { number: 58, georgian: 'ორმოცდათვრამეტი', latin: 'ormotsdatvrameti', example: 'ორმოცდათვრამეტი წელი (ormotsdatvrameti tseli) - Fifty-eight years' },
        { number: 59, georgian: 'ორმოცდაცხრამეტი', latin: 'ormotsdaskhrameti', example: 'ორმოცდაცხრამეტი წუთი (ormotsdaskhrameti tsuti) - Fifty-nine minutes' },
        { number: 60, georgian: 'სამოცი', latin: 'samotsi', example: 'სამოცი წელი (samotsi tseli) - Sixty years' }
      ]
    },
    {
      id: '61-70',
      title: 'Numbers 61-70',
      description: 'Numbers from sixty-one to seventy',
      numbers: [
        { number: 61, georgian: 'სამოცდაერთი', latin: 'samotsdaerti', example: 'სამოცდაერთი წელი (samotsdaerti tseli) - Sixty-one years' },
        { number: 62, georgian: 'სამოცდაორი', latin: 'samotsdaori', example: 'სამოცდაორი დღე (samotsdaori dghe) - Sixty-two days' },
        { number: 63, georgian: 'სამოცდასამი', latin: 'samotsdasami', example: 'სამოცდასამი კაცი (samotsdasami katsi) - Sixty-three men' },
        { number: 64, georgian: 'სამოცდაოთხი', latin: 'samotsdaotkhi', example: 'სამოცდაოთხი საათი (samotsdaotkhi saati) - Sixty-four hours' },
        { number: 65, georgian: 'სამოცდახუთი', latin: 'samotsdakhuti', example: 'სამოცდახუთი წელი (samotsdakhuti tseli) - Sixty-five years' },
        { number: 66, georgian: 'სამოცდაექვსი', latin: 'samotsdaekvsi', example: 'სამოცდაექვსი ქალი (samotsdaekvsi kali) - Sixty-six women' },
        { number: 67, georgian: 'სამოცდაშვიდი', latin: 'samotsdashvidi', example: 'სამოცდაშვიდი დღე (samotsdashvidi dghe) - Sixty-seven days' },
        { number: 68, georgian: 'სამოცდარვა', latin: 'samotsdarva', example: 'სამოცდარვა წელი (samotsdarva tseli) - Sixty-eight years' },
        { number: 69, georgian: 'სამოცდაცხრა', latin: 'samotsdatskhra', example: 'სამოცდაცხრა წუთი (samotsdatskhra tsuti) - Sixty-nine minutes' },
        { number: 70, georgian: 'სამოცდაათი', latin: 'samotsdaati', example: 'სამოცდაათი წელი (samotsdaati tseli) - Seventy years' }
      ]
    },
    {
      id: '71-80',
      title: 'Numbers 71-80',
      description: 'Numbers from seventy-one to eighty',
      numbers: [
        { number: 71, georgian: 'სამოცდათერთმეტი', latin: 'samotsdatertmeti', example: 'სამოცდათერთმეტი წელი (samotsdatertmeti tseli) - Seventy-one years' },
        { number: 72, georgian: 'სამოცდათორმეტი', latin: 'samotsdatormeti', example: 'სამოცდათორმეტი დღე (samotsdatormeti dghe) - Seventy-two days' },
        { number: 73, georgian: 'სამოცდაცამეტი', latin: 'samotsdatsameti', example: 'სამოცდაცამეტი კაცი (samotsdatsameti katsi) - Seventy-three men' },
        { number: 74, georgian: 'სამოცდათოთხმეტი', latin: 'samotsdatotxmeti', example: 'სამოცდათოთხმეტი საათი (samotsdatotxmeti saati) - Seventy-four hours' },
        { number: 75, georgian: 'სამოცდათხუთმეტი', latin: 'samotsdatxutmeti', example: 'სამოცდათხუთმეტი წელი (samotsdatxutmeti tseli) - Seventy-five years' },
        { number: 76, georgian: 'სამოცდათექვსმეტი', latin: 'samotsdatekvsmeti', example: 'სამოცდათექვსმეტი ქალი (samotsdatekvsmeti kali) - Seventy-six women' },
        { number: 77, georgian: 'სამოცდაჩვიდმეტი', latin: 'samotsdachvidmeti', example: 'სამოცდაჩვიდმეტი დღე (samotsdachvidmeti dghe) - Seventy-seven days' },
        { number: 78, georgian: 'სამოცდათვრამეტი', latin: 'samotsdatvrameti', example: 'სამოცდათვრამეტი წელი (samotsdatvrameti tseli) - Seventy-eight years' },
        { number: 79, georgian: 'სამოცდაცხრამეტი', latin: 'samotsdaskhrameti', example: 'სამოცდაცხრამეტი წუთი (samotsdaskhrameti tsuti) - Seventy-nine minutes' },
        { number: 80, georgian: 'ოთხმოცი', latin: 'otxmotsi', example: 'ოთხმოცი წელი (otxmotsi tseli) - Eighty years' }
      ]
    },
    {
      id: '81-90',
      title: 'Numbers 81-90',
      description: 'Numbers from eighty-one to ninety',
      numbers: [
        { number: 81, georgian: 'ოთხმოცდაერთი', latin: 'otxmotsdaerti', example: 'ოთხმოცდაერთი წელი (otxmotsdaerti tseli) - Eighty-one years' },
        { number: 82, georgian: 'ოთხმოცდაორი', latin: 'otxmotsdaori', example: 'ოთხმოცდაორი დღე (otxmotsdaori dghe) - Eighty-two days' },
        { number: 83, georgian: 'ოთხმოცდასამი', latin: 'otxmotsdasami', example: 'ოთხმოცდასამი კაცი (otxmotsdasami katsi) - Eighty-three men' },
        { number: 84, georgian: 'ოთხმოცდაოთხი', latin: 'otxmotsdaotkhi', example: 'ოთხმოცდაოთხი საათი (otxmotsdaotkhi saati) - Eighty-four hours' },
        { number: 85, georgian: 'ოთხმოცდახუთი', latin: 'otxmotsdakhuti', example: 'ოთხმოცდახუთი წელი (otxmotsdakhuti tseli) - Eighty-five years' },
        { number: 86, georgian: 'ოთხმოცდაექვსი', latin: 'otxmotsdaekvsi', example: 'ოთხმოცდაექვსი ქალი (otxmotsdaekvsi kali) - Eighty-six women' },
        { number: 87, georgian: 'ოთხმოცდაშვიდი', latin: 'otxmotsdashvidi', example: 'ოთხმოცდაშვიდი დღე (otxmotsdashvidi dghe) - Eighty-seven days' },
        { number: 88, georgian: 'ოთხმოცდარვა', latin: 'otxmotsdarva', example: 'ოთხმოცდარვა წელი (otxmotsdarva tseli) - Eighty-eight years' },
        { number: 89, georgian: 'ოთხმოცდაცხრა', latin: 'otxmotsdatskhra', example: 'ოთხმოცდაცხრა წუთი (otxmotsdatskhra tsuti) - Eighty-nine minutes' },
        { number: 90, georgian: 'ოთხმოცდაათი', latin: 'otxmotsdaati', example: 'ოთხმოცდაათი წელი (otxmotsdaati tseli) - Ninety years' }
      ]
    },
    {
      id: '91-100',
      title: 'Numbers 91-100',
      description: 'Numbers from ninety-one to one hundred',
      numbers: [
        { number: 91, georgian: 'ოთხმოცდათერთმეტი', latin: 'otxmotsdatertmeti', example: 'ოთხმოცდათერთმეტი წელი (otxmotsdatertmeti tseli) - Ninety-one years' },
        { number: 92, georgian: 'ოთხმოცდათორმეტი', latin: 'otxmotsdatormeti', example: 'ოთხმოცდათორმეტი დღე (otxmotsdatormeti dghe) - Ninety-two days' },
        { number: 93, georgian: 'ოთხმოცდაცამეტი', latin: 'otxmotsdatsameti', example: 'ოთხმოცდაცამეტი კაცი (otxmotsdatsameti katsi) - Ninety-three men' },
        { number: 94, georgian: 'ოთხმოცდათოთხმეტი', latin: 'otxmotsdatotxmeti', example: 'ოთხმოცდათოთხმეტი საათი (otxmotsdatotxmeti saati) - Ninety-four hours' },
        { number: 95, georgian: 'ოთხმოცდათხუთმეტი', latin: 'otxmotsdatxutmeti', example: 'ოთხმოცდათხუთმეტი წელი (otxmotsdatxutmeti tseli) - Ninety-five years' },
        { number: 96, georgian: 'ოთხმოცდათექვსმეტი', latin: 'otxmotsdatekvsmeti', example: 'ოთხმოცდათექვსმეტი ქალი (otxmotsdatekvsmeti kali) - Ninety-six women' },
        { number: 97, georgian: 'ოთხმოცდაჩვიდმეტი', latin: 'otxmotsdachvidmeti', example: 'ოთხმოცდაჩვიდმეტი დღე (otxmotsdachvidmeti dghe) - Ninety-seven days' },
        { number: 98, georgian: 'ოთხმოცდათვრამეტი', latin: 'otxmotsdatvrameti', example: 'ოთხმოცდათვრამეტი წელი (otxmotsdatvrameti tseli) - Ninety-eight years' },
        { number: 99, georgian: 'ოთხმოცდაცხრამეტი', latin: 'otxmotsdaskhrameti', example: 'ოთხმოცდაცხრამეტი წუთი (otxmotsdaskhrameti tsuti) - Ninety-nine minutes' },
        { number: 100, georgian: 'ასი', latin: 'asi', example: 'ასი წელი (asi tseli) - One hundred years' }
      ]
    }
  ];

  // Exercise data
  const translationExercises = [
    { number: 5, options: ['სამი (sami)', 'ოთხი (otkhi)', 'ხუთი (khuti)', 'ექვსი (ekvsi)'], correct: 'ხუთი (khuti)' },
    { number: 12, options: ['ათი (ati)', 'თერთმეტი (tertmeti)', 'თორმეტი (tormeti)', 'ცამეტი (tsameti)'], correct: 'თორმეტი (tormeti)' },
    { number: 20, options: ['ოცი (otsi)', 'ოცდაათი (otsdaati)', 'ორმოცი (ormotsi)', 'სამოცი (samotsi)'], correct: 'ოცი (otsi)' },
    { number: 33, options: ['ოცდაცამეტი (otsdatsameti)', 'ოცდათოთხმეტი (otsdatotxmeti)', 'ორმოცდასამი (ormotsdasami)', 'ოცდასამი (otsdasami)'], correct: 'ოცდაცამეტი (otsdatsameti)' },
    { number: 50, options: ['ორმოცდაათი (ormotsdaati)', 'ორმოცი (ormotsi)', 'სამოცი (samotsi)', 'ოთხმოცი (otxmotsi)'], correct: 'ორმოცდაათი (ormotsdaati)' }
  ];

  const sequenceExercises = [
    { 
      prompt: "What comes after 'ოთხი (otkhi)'?", 
      options: ['სამი (sami)', 'ხუთი (khuti)', 'ექვსი (ekvsi)', 'შვიდი (shvidi)'], 
      correct: 'ხუთი (khuti)' 
    },
    { 
      prompt: "What comes before 'ოცი (otsi)'?", 
      options: ['თვრამეტი (tvrameti)', 'ცხრამეტი (tskhrameti)', 'ოცდაერთი (otsdaerti)', 'თექვსმეტი (tekvsmeti)'], 
      correct: 'ცხრამეტი (tskhrameti)' 
    },
    { 
      prompt: "Complete the sequence: ორმოცდარვა (ormotsdarva), ორმოცდაცხრა (ormotsdatskhra), ...?", 
      options: ['ორმოცდაათი (ormotsdaati)', 'ორმოცი (ormotsi)', 'სამოცი (samotsi)', 'ორმოცდაერთი (ormotsdaerti)'], 
      correct: 'ორმოცდაათი (ormotsdaati)' 
    },
    { 
      prompt: "Complete the sequence: ოთხმოცდათვრამეტი (otxmotsdatvrameti), ოთხმოცდაცხრა (otxmotsdatskhra), ...?", 
      options: ['ოთხმოცდაათი (otxmotsdaati)', 'ასი (asi)', 'ოთხმოცი (otxmotsi)', 'ოთხმოცდაერთი (otxmotsdaerti)'], 
      correct: 'ოთხმოცდაათი (otxmotsdaati)' 
    },
    { 
      prompt: "What comes after 'ცხრა (tskhra)'?", 
      options: ['რვა (rva)', 'ათი (ati)', 'თერთმეტი (tertmeti)', 'თორმეტი (tormeti)'], 
      correct: 'ათი (ati)' 
    }
  ];

  const countingExercises = [
    { 
      prompt: "Count from 1 to 5 in Georgian", 
      correct: "ერთი, ორი, სამი, ოთხი, ხუთი", 
      hint: "ერთი (erti), ორი (ori), სამი (sami), ოთხი (otkhi), ხუთი (khuti)"
    },
    { 
      prompt: "Count from 6 to 10 in Georgian", 
      correct: "ექვსი, შვიდი, რვა, ცხრა, ათი",
      hint: "ექვსი (ekvsi), შვიდი (shvidi), რვა (rva), ცხრა (tskhra), ათი (ati)"
    },
    { 
      prompt: "Count from 11 to 15 in Georgian", 
      correct: "თერთმეტი, თორმეტი, ცამეტი, თოთხმეტი, თხუთმეტი",
      hint: "თერთმეტი (tertmeti), თორმეტი (tormeti), ცამეტი (tsameti), თოთხმეტი (totxmeti), თხუთმეტი (txutmeti)"
    },
    { 
      prompt: "Write the numbers 20, 30, 40, 50 in Georgian", 
      correct: "ოცი, ოცდაათი, ორმოცი, ორმოცდაათი",
      hint: "ოცი (otsi), ოცდაათი (otsdaati), ორმოცი (ormotsi), ორმოცდაათი (ormotsdaati)"
    },
    { 
      prompt: "Write the numbers 60, 70, 80, 90, 100 in Georgian", 
      correct: "სამოცი, სამოცდაათი, ოთხმოცი, ოთხმოცდაათი, ასი",
      hint: "სამოცი (samotsi), სამოცდაათი (samotsdaati), ოთხმოცი (otxmotsi), ოთხმოცდაათი (otxmotsdaati), ასი (asi)"
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
      updateProgress('numbers', { timeSpent: 1 });
    }
    
    // Save progress when component unmounts
    return () => {
      if (user && timeSpent > 0) {
        // Calculate progress based on time spent and exercise completion
        const exerciseCompletion = Object.keys(translationExercises).length + 
                                  Object.keys(sequenceExercises).length + 
                                  (countingFeedback === 'correct' ? 1 : 0);
        
        // Mark as completed if user has spent significant time or completed exercises
        const completed = timeSpent > 10 || exerciseCompletion >= 5;
        
        updateProgress('numbers', { 
          timeSpent, 
          completed: completed
        });
      }
    };
  }, [user, timeSpent, countingFeedback, updateProgress]);

  const toggleGroup = (groupId: string) => {
    updateActivity();
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

  const handleCountingSubmit = () => {
    updateActivity();
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
    updateActivity();
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
    updateActivity();
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

  // Function to determine if a number group needs smaller text and different layout
  const needsSpecialLayout = (groupId: string) => {
    return ['31-40', '41-50', '51-60', '61-70', '71-80', '81-90', '91-100'].includes(groupId);
  };

  return (
    <div className="pt-16 pb-16" onClick={updateActivity}>
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-br from-yellow-50 to-orange-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}>{t('beginner.topics.numbers.name')}</span> - რიცხვები (ritskhvebi)
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('beginner.topics.numbers.description')}
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
                  {t('common.back')} {t('nav.beginner')}
                </Link>
                <Link
                  to="/beginner/quiz/numbers"
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' ? 'bg-yellow-700 text-white hover:bg-yellow-800' : 'bg-yellow-600 text-white hover:bg-yellow-700'
                  }`}
                >
                  {t('beginner.take_quiz')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="hidden md:block md:w-1/3">
              <div className={`p-6 rounded-lg shadow-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-white bg-opacity-50 backdrop-blur-lg'}`}>
                <Book className={`w-12 h-12 mb-4 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`} />
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {t('learning_tips.title')}
                </h3>
                <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• {t('learning_tips.learn_groups')}</li>
                  <li>• {t('learning_tips.practice_writing')}</li>
                  <li>• {t('learning_tips.listen_pronunciation')}</li>
                  <li>• {t('learning_tips.use_examples')}</li>
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
                    {needsSpecialLayout(group.id) ? (
                      // 2x2 grid for numbers 31-100 with larger boxes
                      <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {group.numbers.map((number) => (
                          <div
                            key={number.number}
                            className={`p-6 rounded-lg ${
                              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                            } shadow-lg`}
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center">
                                <span className={`text-2xl font-bold mr-3 flex-shrink-0 ${
                                  theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
                                }`}>
                                  {number.number}
                                </span>
                                <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} text-base`}>
                                  {number.georgian}
                                </span>
                              </div>
                              <button
                                onClick={() => playAudio(number.georgian)}
                                className={`p-2 rounded-full flex-shrink-0 transition-colors ${
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
                                <p className="text-sm italic line-clamp-2">{number.example}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      // Regular 3-column grid for numbers 1-30
                      group.numbers.map((number) => (
                        <div
                          key={number.number}
                          className={`p-6 rounded-lg ${
                            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                          } shadow-lg`}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                              <span className={`text-2xl font-bold mr-3 flex-shrink-0 ${
                                theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
                              }`}>
                                {number.number}
                              </span>
                              <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} text-xl`}>
                                {number.georgian}
                              </span>
                            </div>
                            <button
                              onClick={() => playAudio(number.georgian)}
                              className={`p-2 rounded-full flex-shrink-0 transition-colors ${
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
                              <p className="text-sm italic line-clamp-2">{number.example}</p>
                            )}
                          </div>
                        </div>
                      ))
                    )}
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
            {t('beginner.topics.vocabulary.practice_exercises')}
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
                  {t('beginner.topics.vocabulary.translation_practice')}
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  {t('beginner.topics.vocabulary.translate_words')}
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
                  {exerciseMode === 'translation' ? t('beginner.topics.vocabulary.translation_practice') : 
                   exerciseMode === 'sequence' ? 'Number Sequences' : 'Counting Practice'}
                </h3>
                <button
                  onClick={() => setExerciseMode(null)}
                  className={`px-4 py-2 rounded ${
                    theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {t('common.back')}
                </button>
              </div>
              
              {exerciseMode === 'translation' && (
                <div>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t('beginner.topics.vocabulary.select_translation', { word: translationExercises[currentExerciseIndex].number.toString() })}
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
                          ? t('beginner.topics.vocabulary.correct_answer')
                          : t('beginner.topics.vocabulary.incorrect_answer', { correct: translationExercises[currentExerciseIndex].correct })}
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
                      {t('common.reset')}
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
                        {t('common.next')}
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
                          ? t('beginner.topics.vocabulary.correct_answer')
                          : t('beginner.topics.vocabulary.incorrect_answer', { correct: sequenceExercises[currentExerciseIndex].correct })}
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
                      {t('common.reset')}
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
                        {t('common.next')}
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
                        {t('common.check')}
                      </button>
                    </div>
                    
                    {countingFeedback && (
                      <div className={`mt-4 p-4 rounded-md ${
                        countingFeedback === 'correct'
                          ? (theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800')
                          : (theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800')
                      }`}>
                        {countingFeedback === 'correct'
                          ? t('beginner.topics.vocabulary.correct_answer')
                          : (
                            <>
                              <p>{t('beginner.topics.vocabulary.incorrect_answer', { correct: countingExercises[currentExerciseIndex].correct })}</p>
                              <p className="mt-2">{t('beginner.topics.vocabulary.hint')}: {countingExercises[currentExerciseIndex].hint}</p>
                            </>
                          )}
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
                      {t('common.reset')}
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
                        {t('common.next')}
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