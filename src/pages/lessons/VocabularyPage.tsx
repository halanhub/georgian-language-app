import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Book, Play, Volume2 } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

// Vocabulary data for different categories
const vocabularyData = {
  colors: [
    { georgian: 'წითელი', latin: 'tsiteli', english: 'red', audio: '#' },
    { georgian: 'ლურჯი', latin: 'lurji', english: 'blue', audio: '#' },
    { georgian: 'ყვითელი', latin: 'qviteli', english: 'yellow', audio: '#' },
    { georgian: 'მწვანე', latin: 'mtsvane', english: 'green', audio: '#' },
    { georgian: 'შავი', latin: 'shavi', english: 'black', audio: '#' },
    { georgian: 'თეთრი', latin: 'tetri', english: 'white', audio: '#' },
    { georgian: 'ნაცრისფერი', latin: 'natsrisperi', english: 'gray', audio: '#' },
    { georgian: 'ვარდისფერი', latin: 'vardisperi', english: 'pink', audio: '#' },
    { georgian: 'ნარინჯისფერი', latin: 'narinjisperi', english: 'orange', audio: '#' },
    { georgian: 'იისფერი', latin: 'iisperi', english: 'purple', audio: '#' },
  ],
  numbers: [
    { georgian: 'ერთი', latin: 'erti', english: 'one', audio: '#' },
    { georgian: 'ორი', latin: 'ori', english: 'two', audio: '#' },
    { georgian: 'სამი', latin: 'sami', english: 'three', audio: '#' },
    { georgian: 'ოთხი', latin: 'otkhi', english: 'four', audio: '#' },
    { georgian: 'ხუთი', latin: 'khuti', english: 'five', audio: '#' },
    { georgian: 'ექვსი', latin: 'ekvsi', english: 'six', audio: '#' },
    { georgian: 'შვიდი', latin: 'shvidi', english: 'seven', audio: '#' },
    { georgian: 'რვა', latin: 'rva', english: 'eight', audio: '#' },
    { georgian: 'ცხრა', latin: 'tskhra', english: 'nine', audio: '#' },
    { georgian: 'ათი', latin: 'ati', english: 'ten', audio: '#' },
  ],
  months: [
    { georgian: 'იანვარი', latin: 'ianuari', english: 'January', audio: '#' },
    { georgian: 'თებერვალი', latin: 'tebervali', english: 'February', audio: '#' },
    { georgian: 'მარტი', latin: 'marti', english: 'March', audio: '#' },
    { georgian: 'აპრილი', latin: 'aprili', english: 'April', audio: '#' },
    { georgian: 'მაისი', latin: 'maisi', english: 'May', audio: '#' },
    { georgian: 'ივნისი', latin: 'ivnisi', english: 'June', audio: '#' },
    { georgian: 'ივლისი', latin: 'ivlisi', english: 'July', audio: '#' },
    { georgian: 'აგვისტო', latin: 'agosto', english: 'August', audio: '#' },
    { georgian: 'სექტემბერი', latin: 'sektemberi', english: 'September', audio: '#' },
    { georgian: 'ოქტომბერი', latin: 'oktomberi', english: 'October', audio: '#' },
    { georgian: 'ნოემბერი', latin: 'noemberi', english: 'November', audio: '#' },
    { georgian: 'დეკემბერი', latin: 'dekemberi', english: 'December', audio: '#' },
  ],
  food: [
    { georgian: 'პური', latin: 'puri', english: 'bread', audio: '#' },
    { georgian: 'ყველი', latin: 'qveli', english: 'cheese', audio: '#' },
    { georgian: 'ხაჭაპური', latin: 'khachapuri', english: 'cheese bread', audio: '#' },
    { georgian: 'ხინკალი', latin: 'khinkali', english: 'dumplings', audio: '#' },
    { georgian: 'მწვადი', latin: 'mtsvadi', english: 'shish kebab', audio: '#' },
    { georgian: 'სალათა', latin: 'salata', english: 'salad', audio: '#' },
    { georgian: 'ხილი', latin: 'khili', english: 'fruit', audio: '#' },
    { georgian: 'ბოსტნეული', latin: 'bostneuli', english: 'vegetables', audio: '#' },
    { georgian: 'ტკბილეული', latin: 'tkbileuli', english: 'sweets', audio: '#' },
    { georgian: 'ღვინო', latin: 'ghvino', english: 'wine', audio: '#' },
  ],
  greetings: [
    { georgian: 'გამარჯობა', latin: 'gamarjoba', english: 'hello', audio: '#' },
    { georgian: 'როგორ ხარ?', latin: 'rogor khar?', english: 'how are you?', audio: '#' },
    { georgian: 'კარგად, შენ?', latin: 'kargad, shen?', english: 'good, and you?', audio: '#' },
    { georgian: 'ნახვამდის', latin: 'nakhvamdis', english: 'goodbye', audio: '#' },
    { georgian: 'დილა მშვიდობისა', latin: 'dila mshvidobisa', english: 'good morning', audio: '#' },
    { georgian: 'საღამო მშვიდობისა', latin: 'saghamo mshvidobisa', english: 'good evening', audio: '#' },
    { georgian: 'ღამე მშვიდობისა', latin: 'ghame mshvidobisa', english: 'good night', audio: '#' },
    { georgian: 'მადლობა', latin: 'madloba', english: 'thank you', audio: '#' },
    { georgian: 'არაფრის', latin: 'arapris', english: "you're welcome", audio: '#' },
    { georgian: 'ბოდიში', latin: 'bodishi', english: 'sorry', audio: '#' },
  ],
};

// Category titles and images
const categoryInfo = {
  colors: {
    title: 'Colors - ფერები',
    description: 'Learn the essential color names in Georgian language',
    image: '/src/assets/images/colors.png',
  },
  numbers: {
    title: 'Numbers - რიცხვები',
    description: 'Learn to count in Georgian from 1 to 100',
    image: '/src/assets/images/numbers.png',
  },
  months: {
    title: 'Months & Seasons - თვეები & სეზონები',
    description: 'Learn the months, seasons, and time expressions',
    image: '/src/assets/images/months.png',
  },
  food: {
    title: 'Food & Drinks - საჭმელი & სასმელი',
    description: 'Essential vocabulary for Georgian cuisine',
    image: '/src/assets/images/food-drinks.png',
  },
  greetings: {
    title: 'Greetings & Phrases - მისალმებები & ფრაზები',
    description: 'Common expressions for everyday conversations',
    image: '/src/assets/images/greetings.png',
  },
};

// Navigation map for next and previous categories
const navigationMap = {
  colors: { prev: null, next: 'numbers' },
  numbers: { prev: 'colors', next: 'months' },
  months: { prev: 'numbers', next: 'food' },
  food: { prev: 'months', next: 'greetings' },
  greetings: { prev: 'food', next: null },
};

const VocabularyPage: React.FC = () => {
  const { theme } = useTheme();
  const { category } = useParams<{ category: string }>();
  
  // Type guard to ensure category is a valid key
  const validCategory = category as keyof typeof vocabularyData;
  
  if (!validCategory || !vocabularyData[validCategory]) {
    return (
      <div className="pt-16 flex flex-col items-center justify-center min-h-screen px-4">
        <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Category not found
        </h2>
        <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          The vocabulary category you're looking for doesn't exist.
        </p>
        <Link
          to="/beginner"
          className={`px-4 py-2 rounded font-medium ${
            theme === 'dark' ? 'bg-red-700 text-white hover:bg-red-800' : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          Return to Beginner Level
        </Link>
      </div>
    );
  }

  const vocabulary = vocabularyData[validCategory];
  const info = categoryInfo[validCategory];
  const navigation = navigationMap[validCategory];

  const playAudio = (audio: string) => {
    // In a real implementation, this would play the audio file
    console.log('Playing audio:', audio);
  };

  return (
    <div className="pt-16 pb-16">
      {/* Hero section */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-green-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-green-400' : 'text-green-600'}>{info.title}</span>
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {info.description}
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
                  to={`/beginner/quiz/${validCategory}`}
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' ? 'bg-green-700 text-white hover:bg-green-800' : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  Take Quiz
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="hidden md:block md:w-1/3">
              <img 
                src={info.image} 
                alt={info.title} 
                className="rounded-lg shadow-xl object-cover h-48 w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vocabulary List */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Vocabulary List
              </h2>
              <button
                onClick={() => console.log('Playing all audio')}
                className={`flex items-center px-4 py-2 rounded ${
                  theme === 'dark' 
                    ? 'bg-green-700 text-white hover:bg-green-800' 
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                <Volume2 size={18} className="mr-2" />
                Play All
              </button>
            </div>
            
            <div className={`p-4 rounded-lg mb-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-green-50'}`}>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Click on any word to hear its pronunciation. Practice saying each word aloud to improve your speaking skills.
              </p>
            </div>
          </div>

          {/* Vocabulary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vocabulary.map((word, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg border ${
                  theme === 'dark' 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-200'
                } shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {word.georgian}
                    </h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {word.latin}
                    </p>
                  </div>
                  <button
                    onClick={() => playAudio(word.audio)}
                    className={`p-2 rounded-full ${
                      theme === 'dark' 
                        ? 'bg-gray-700 text-green-400 hover:bg-gray-600' 
                        : 'bg-gray-100 text-green-600 hover:bg-gray-200'
                    }`}
                    aria-label="Play pronunciation"
                  >
                    <Play size={18} />
                  </button>
                </div>
                <div className={`flex items-center px-3 py-1 rounded-full text-sm w-fit ${
                  theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
                }`}>
                  {word.english}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className={`py-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between">
            {navigation.prev ? (
              <Link
                to={`/beginner/vocabulary/${navigation.prev}`}
                className={`flex items-center px-4 py-2 rounded ${
                  theme === 'dark' 
                    ? 'bg-gray-700 text-white hover:bg-gray-600' 
                    : 'bg-white text-gray-800 hover:bg-gray-100'
                }`}
              >
                <ArrowLeft size={18} className="mr-2" />
                {categoryInfo[navigation.prev as keyof typeof categoryInfo].title.split(' - ')[0]}
              </Link>
            ) : (
              <div></div>
            )}
            
            <Link
              to="/beginner"
              className={`flex items-center px-4 py-2 rounded ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-white text-gray-800 hover:bg-gray-100'
              }`}
            >
              <Book size={18} className="mr-2" />
              All Topics
            </Link>
            
            {navigation.next ? (
              <Link
                to={`/beginner/vocabulary/${navigation.next}`}
                className={`flex items-center px-4 py-2 rounded ${
                  theme === 'dark' 
                    ? 'bg-green-700 text-white hover:bg-green-800' 
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {categoryInfo[navigation.next as keyof typeof categoryInfo].title.split(' - ')[0]}
                <ArrowRight size={18} className="ml-2" />
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </section>
      
      {/* Practice Section */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`p-8 rounded-lg text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-green-50'}`}>
            <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Ready to Test Your Knowledge?
            </h2>
            <p className={`max-w-2xl mx-auto mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Take a quiz to reinforce what you've learned about {info.title.split(' - ')[0].toLowerCase()} in Georgian.
            </p>
            <Link
              to={`/beginner/quiz/${validCategory}`}
              className={`inline-flex items-center px-6 py-3 rounded-lg font-medium ${
                theme === 'dark' ? 'bg-green-700 text-white hover:bg-green-800' : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              Start {info.title.split(' - ')[0]} Quiz
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VocabularyPage;