import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Book, ChevronDown, ChevronUp, Play, Volume2, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface ReadingText {
  id: string;
  title: string;
  georgianText: string;
  englishText: string;
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

interface Category {
  name: string;
  description: string;
  texts: ReadingText[];
}

const readingCategories: Category[] = [
  {
    name: "Georgian Cuisine",
    description: "Explore traditional Georgian dishes and wine culture",
    texts: [
      {
        id: "khachapuri",
        title: "ხაჭაპური - საქართველოს ეროვნული კერძი",
        georgianText: "ხაჭაპური საქართველოს ყველაზე ცნობილი კერძია. ეს არის ცომში გამომცხვარი ყველიანი პური. არსებობს ხაჭაპურის რამდენიმე სახეობა: იმერული, აჭარული, მეგრული. აჭარული ხაჭაპური ნავის ფორმისაა და კვერცხი აქვს შუაში. იმერული ხაჭაპური მრგვალია და ყველი შიგნით აქვს. მეგრული ხაჭაპური კი იმერულს ჰგავს, მაგრამ ზემოდანაც აყრია ყველი.",
        englishText: "Khachapuri is Georgia's most famous dish. It is cheese-filled bread. There are several types of khachapuri: Imeretian, Adjarian, and Megrelian. Adjarian khachapuri is boat-shaped and has an egg in the middle. Imeretian khachapuri is round with cheese inside. Megrelian khachapuri is similar to Imeretian but also has cheese on top.",
        vocabulary: [
          { word: "ხაჭაპური", pronunciation: "khachapuri", translation: "cheese bread" },
          { word: "ცნობილი", pronunciation: "tsnobili", translation: "famous" },
          { word: "ყველი", pronunciation: "qveli", translation: "cheese" },
          { word: "ცომი", pronunciation: "tsomi", translation: "dough" },
          { word: "კვერცხი", pronunciation: "kvertsxi", translation: "egg" }
        ],
        questions: [
          {
            question: "How many types of khachapuri are mentioned in the text?",
            options: ["Two", "Three", "Four", "Five"],
            correctAnswer: 1
          },
          {
            question: "Which type of khachapuri has an egg in the middle?",
            options: ["Imeretian", "Adjarian", "Megrelian", "None of them"],
            correctAnswer: 1
          },
          {
            question: "What distinguishes Megrelian khachapuri from Imeretian?",
            options: [
              "It has no cheese",
              "It has cheese on top",
              "It has an egg",
              "It is square-shaped"
            ],
            correctAnswer: 1
          }
        ]
      },
      {
        id: "wine",
        title: "ქართული ღვინო",
        georgianText: "საქართველო ღვინის სამშობლოა. აქ ღვინის დაყენების 8000 წლიანი ტრადიცია არსებობს. ქართული ღვინო ქვევრში დაყენებული ღვინით არის განთქმული. ქვევრი არის დიდი თიხის ჭურჭელი, რომელიც მიწაშია ჩაფლული. საქართველოში 500-ზე მეტი ვაზის ჯიში არსებობს. ყველაზე ცნობილი ღვინოებია: საფერავი, რქაწითელი და ქინძმარაული.",
        englishText: "Georgia is the homeland of wine. There is an 8000-year tradition of winemaking here. Georgian wine is famous for being made in qvevri. Qvevri is a large clay vessel buried in the ground. There are more than 500 grape varieties in Georgia. The most famous wines are: Saperavi, Rkatsiteli, and Kindzmarauli.",
        vocabulary: [
          { word: "ღვინო", pronunciation: "ghvino", translation: "wine" },
          { word: "ქვევრი", pronunciation: "kvevri", translation: "clay wine vessel" },
          { word: "ვაზი", pronunciation: "vazi", translation: "grapevine" },
          { word: "თიხა", pronunciation: "tikha", translation: "clay" },
          { word: "ჯიში", pronunciation: "jishi", translation: "variety" }
        ],
        questions: [
          {
            question: "How old is the Georgian winemaking tradition?",
            options: ["5000 years", "6000 years", "7000 years", "8000 years"],
            correctAnswer: 3
          },
          {
            question: "What is a qvevri?",
            options: [
              "A type of wine",
              "A clay vessel for making wine",
              "A grape variety",
              "A winemaker"
            ],
            correctAnswer: 1
          },
          {
            question: "How many grape varieties are there in Georgia?",
            options: [
              "Less than 300",
              "More than 400",
              "More than 500",
              "More than 600"
            ],
            correctAnswer: 2
          }
        ]
      },
      {
        id: "khinkali",
        title: "ხინკალი - ქართული სამზარეულოს საგანძური",
        georgianText: "ხინკალი არის ქართული წვნიანი ცომის ნაწარმი, რომელიც შევსებულია ხორცით, სოკოთი ან კარტოფილით. ტრადიციულად, ხინკალი მზადდება დაკეპილი ხორცით, სუნელებით და ბულიონით. ხინკალის ჭამას აქვს თავისი წესები - უნდა დაიჭიროთ 'კუდით' და ფრთხილად მოწუწნოთ წვენი.",
        englishText: "Khinkali is a Georgian dumpling filled with meat, mushrooms, or potatoes. Traditionally, khinkali is made with minced meat, spices, and broth. Eating khinkali has its own rules - you should hold it by the 'tail' and carefully suck out the broth.",
        vocabulary: [
          { word: "ხინკალი", pronunciation: "khinkali", translation: "dumpling" },
          { word: "ხორცი", pronunciation: "khortsi", translation: "meat" },
          { word: "სოკო", pronunciation: "soko", translation: "mushroom" },
          { word: "სუნელები", pronunciation: "sunelebi", translation: "spices" },
          { word: "წვენი", pronunciation: "tsveni", translation: "juice/broth" }
        ],
        questions: [
          {
            question: "What are the traditional fillings for khinkali?",
            options: [
              "Only meat",
              "Meat, mushrooms, or potatoes",
              "Only vegetables",
              "Only cheese"
            ],
            correctAnswer: 1
          },
          {
            question: "How should you eat khinkali?",
            options: [
              "Cut it with a knife",
              "Hold it by the tail and suck the broth",
              "Eat it with a fork",
              "Break it in half"
            ],
            correctAnswer: 1
          }
        ]
      },
      {
        id: "churchkhela",
        title: "ჩურჩხელა - ქართული ტკბილეული",
        georgianText: "ჩურჩხელა არის ტრადიციული ქართული ტკბილეული, რომელიც მზადდება ყურძნის წვენისგან და კაკლისგან. ჯერ მზადდება თათარა (ყურძნის წვენის და ფქვილის ნარევი), შემდეგ მასში იძირება კაკლის ასხმულა. ჩურჩხელა ითვლება ჯანსაღ და ენერგიის მომცემ საკვებად.",
        englishText: "Churchkhela is a traditional Georgian candy made from grape juice and walnuts. First, tatara (a mixture of grape juice and flour) is prepared, then a string of walnuts is dipped into it. Churchkhela is considered a healthy and energy-giving food.",
        vocabulary: [
          { word: "ჩურჩხელა", pronunciation: "churchkhela", translation: "traditional candy" },
          { word: "თათარა", pronunciation: "tatara", translation: "grape juice mixture" },
          { word: "კაკალი", pronunciation: "kakali", translation: "walnut" },
          { word: "ყურძენი", pronunciation: "qurdzeni", translation: "grape" },
          { word: "ფქვილი", pronunciation: "pkvili", translation: "flour" }
        ],
        questions: [
          {
            question: "What are the main ingredients of churchkhela?",
            options: [
              "Chocolate and nuts",
              "Grape juice and walnuts",
              "Sugar and flour",
              "Honey and nuts"
            ],
            correctAnswer: 1
          },
          {
            question: "What is tatara?",
            options: [
              "A type of nut",
              "A mixture of grape juice and flour",
              "A cooking tool",
              "A type of grape"
            ],
            correctAnswer: 1
          }
        ]
      }
    ]
  },
  {
    name: "Georgian Nature",
    description: "Discover Georgia's diverse landscapes and natural beauty",
    texts: [
      {
        id: "mountains",
        title: "კავკასიონის მთები",
        georgianText: "საქართველოს ჩრდილოეთით კავკასიონის მთები მდებარეობს. კავკასიონის უმაღლესი მწვერვალია მყინვარწვერი (5047 მ). საქართველოში ბევრი ლამაზი ხეობა და მდინარეა. ყველაზე დიდი მდინარეა მტკვარი. ქვეყანაში არის სუბტროპიკული სანაპირო ზოლი, ტყეები და მაღალმთიანი რეგიონები.",
        englishText: "The Caucasus Mountains are located in northern Georgia. The highest peak of the Caucasus is Mount Kazbek (5047 m). Georgia has many beautiful valleys and rivers. The largest river is the Mtkvari. The country has a subtropical coastline, forests, and high mountain regions.",
        vocabulary: [
          { word: "მთა", pronunciation: "mta", translation: "mountain" },
          { word: "მწვერვალი", pronunciation: "mtsvervali", translation: "peak" },
          { word: "ხეობა", pronunciation: "kheoba", translation: "valley" },
          { word: "მდინარე", pronunciation: "mdinare", translation: "river" },
          { word: "ტყე", pronunciation: "tqe", translation: "forest" }
        ],
        questions: [
          {
            question: "What is the height of Mount Kazbek?",
            options: ["4047 m", "5047 m", "6047 m", "7047 m"],
            correctAnswer: 1
          },
          {
            question: "Which is the largest river in Georgia?",
            options: ["Rioni", "Mtkvari", "Enguri", "Alazani"],
            correctAnswer: 1
          }
        ]
      },
      {
        id: "blacksea",
        title: "შავი ზღვა და სანაპირო",
        georgianText: "საქართველოს დასავლეთით შავი ზღვა მდებარეობს. სანაპირო ზოლი 310 კილომეტრია. აქ სუბტროპიკული კლიმატია, ზაფხულში ცხელა და ზამთარში თბილი. ბათუმი და ქობულეთი მთავარი საკურორტო ქალაქებია. სანაპიროზე პალმები და ციტრუსის ბაღები იზრდება.",
        englishText: "The Black Sea is located in western Georgia. The coastline is 310 kilometers long. It has a subtropical climate, hot in summer and warm in winter. Batumi and Kobuleti are the main resort cities. Palm trees and citrus gardens grow along the coast.",
        vocabulary: [
          { word: "ზღვა", pronunciation: "zghva", translation: "sea" },
          { word: "სანაპირო", pronunciation: "sanapiro", translation: "coast" },
          { word: "კლიმატი", pronunciation: "klimati", translation: "climate" },
          { word: "საკურორტო", pronunciation: "sakurorto", translation: "resort" },
          { word: "პალმა", pronunciation: "palma", translation: "palm tree" }
        ],
        questions: [
          {
            question: "How long is Georgia's coastline?",
            options: ["210 km", "310 km", "410 km", "510 km"],
            correctAnswer: 1
          },
          {
            question: "What type of climate does the Georgian coast have?",
            options: ["Continental", "Mediterranean", "Subtropical", "Alpine"],
            correctAnswer: 2
          }
        ]
      },
      {
        id: "kolkheti",
        title: "კოლხეთის ეროვნული პარკი",
        georgianText: "კოლხეთის ეროვნული პარკი უნიკალური ჭაობიანი ეკოსისტემაა. აქ ბევრი იშვიათი ფრინველი და მცენარე ბინადრობს. პარკში არის ტბები, ჭაობები და უძველესი ტყეები. ეს ადგილი განსაკუთრებით მნიშვნელოვანია გადამფრენი ფრინველებისთვის.",
        englishText: "Kolkheti National Park is a unique wetland ecosystem. Many rare birds and plants live here. The park has lakes, marshes, and ancient forests. This place is especially important for migratory birds.",
        vocabulary: [
          { word: "ჭაობი", pronunciation: "chaopi", translation: "marsh" },
          { word: "ფრინველი", pronunciation: "prinveli", translation: "bird" },
          { word: "მცენარე", pronunciation: "mtsenare", translation: "plant" },
          { word: "ტბა", pronunciation: "tba", translation: "lake" },
          { word: "გადამფრენი", pronunciation: "gadampreni", translation: "migratory" }
        ],
        questions: [
          {
            question: "What makes Kolkheti National Park unique?",
            options: [
              "Its mountains",
              "Its wetland ecosystem",
              "Its desert landscape",
              "Its urban areas"
            ],
            correctAnswer: 1
          },
          {
            question: "Why is this place especially important?",
            options: [
              "For agriculture",
              "For mining",
              "For migratory birds",
              "For tourism"
            ],
            correctAnswer: 2
          }
        ]
      }
    ]
  },
  {
    name: "Georgian Traditions",
    description: "Learn about Georgian cultural traditions and hospitality",
    texts: [
      {
        id: "supra",
        title: "ქართული სუფრა",
        georgianText: "სუფრა ქართული კულტურის მნიშვნელოვანი ნაწილია. სუფრას თამადა უძღვება, რომელიც სადღეგრძელოებს წარმოთქვამს. სუფრაზე ბევრი კერძი და ღვინოა. სტუმრებს პატივს სცემენ და მასპინძლები ყველაფერს აკეთებენ, რომ მათ კარგად იგრძნონ თავი.",
        englishText: "Supra (feast) is an important part of Georgian culture. The supra is led by a tamada (toastmaster) who makes toasts. There are many dishes and wine at the supra. Guests are respected, and hosts do everything to make them feel comfortable.",
        vocabulary: [
          { word: "სუფრა", pronunciation: "supra", translation: "feast table" },
          { word: "თამადა", pronunciation: "tamada", translation: "toastmaster" },
          { word: "სადღეგრძელო", pronunciation: "sadghegrdzelo", translation: "toast" },
          { word: "სტუმარი", pronunciation: "stumari", translation: "guest" },
          { word: "მასპინძელი", pronunciation: "maspindzeli", translation: "host" }
        ],
        questions: [
          {
            question: "Who leads the Georgian supra?",
            options: ["The oldest person", "The tamada", "The host", "The guest"],
            correctAnswer: 1
          },
          {
            question: "What is a sadghegrdzelo?",
            options: ["A dish", "A dance", "A toast", "A song"],
            correctAnswer: 2
          }
        ]
      },
      {
        id: "wedding",
        title: "ქართული ქორწილი",
        georgianText: "ქართული ქორწილი დიდი ზეიმია. ტრადიციულად, ქორწილში ბევრი სტუმარი, ცეკვა-სიმღერა და კერძებია. პატარძალი თეთრ კაბაში და სიძე კოსტიუმშია. ქორწილში აუცილებელია ქართული ცეკვები, განსაკუთრებით 'ქართული' და 'აჭარული'.",
        englishText: "A Georgian wedding is a big celebration. Traditionally, weddings have many guests, dancing, singing, and dishes. The bride wears a white dress and the groom wears a suit. Georgian dances are essential at weddings, especially 'Kartuli' and 'Acharuli'.",
        vocabulary: [
          { word: "ქორწილი", pronunciation: "kortsili", translation: "wedding" },
          { word: "პატარძალი", pronunciation: "patardzali", translation: "bride" },
          { word: "სიძე", pronunciation: "sidze", translation: "groom" },
          { word: "ცეკვა", pronunciation: "tsekva", translation: "dance" },
          { word: "ზეიმი", pronunciation: "zeimi", translation: "celebration" }
        ],
        questions: [
          {
            question: "What dances are essential at Georgian weddings?",
            options: [
              "Waltz and Tango",
              "Kartuli and Acharuli",
              "Ballet and Jazz",
              "Modern dances"
            ],
            correctAnswer: 1
          },
          {
            question: "What color dress does the bride traditionally wear?",
            options: ["Red", "Blue", "White", "Gold"],
            correctAnswer: 2
          }
        ]
      },
      {
        id: "hospitality",
        title: "ქართული სტუმართმოყვარეობა",
        georgianText: "საქართველოში სტუმარი ღვთისაა. სტუმრის მიღება დიდი პატივია. მასპინძელი სტუმარს საუკეთესო საჭმელს და სასმელს სთავაზობს. ტრადიციულად, სტუმარს საუკეთესო ოთახში აძინებენ და ყველანაირად ასიამოვნებენ.",
        englishText: "In Georgia, a guest is a gift from God. Hosting a guest is a great honor. The host offers the best food and drinks to the guest. Traditionally, the guest sleeps in the best room and is treated with utmost respect.",
        vocabulary: [
          { word: "სტუმართმოყვარეობა", pronunciation: "stumartmoqvareoba", translation: "hospitality" },
          { word: "პატივი", pronunciation: "pativi", translation: "honor" },
          { word: "საუკეთესო", pronunciation: "sauketeso", translation: "best" },
          { word: "მასპინძელი", pronunciation: "maspindzeli", translation: "host" },
          { word: "ოთახი", pronunciation: "otakhi", translation: "room" }
        ],
        questions: [
          {
            question: "How are guests viewed in Georgian culture?",
            options: [
              "As a burden",
              "As a gift from God",
              "As ordinary people",
              "As tourists"
            ],
            correctAnswer: 1
          },
          {
            question: "What do hosts traditionally offer to guests?",
            options: [
              "Only drinks",
              "Only accommodation",
              "The best food and drinks",
              "Basic necessities"
            ],
            correctAnswer: 2
          }
        ]
      }
    ]
  },
  {
    name: "Georgian History",
    description: "Explore key historical events and cultural heritage",
    texts: [
      {
        id: "alphabet",
        title: "ქართული ანბანი",
        georgianText: "ქართული ანბანი მსოფლიოს უძველესი ანბანებიდან ერთ-ერთია. მას 33 ასო აქვს. ქართული დამწერლობა UNESCO-ს მსოფლიო კულტურული მემკვიდრეობის სიაშია. ქართული ენა კავკასიურ ენათა ოჯახის ქართველურ ჯგუფს მიეკუთვნება.",
        englishText: "The Georgian alphabet is one of the oldest alphabets in the world. It has 33 letters. Georgian script is included in UNESCO's World Cultural Heritage list. The Georgian language belongs to the Kartvelian group of Caucasian language family.",
        vocabulary: [
          { word: "ანბანი", pronunciation: "anbani", translation: "alphabet" },
          { word: "ასო", pronunciation: "aso", translation: "letter" },
          { word: "დამწერლობა", pronunciation: "damtserloba", translation: "script" },
          { word: "ენა", pronunciation: "ena", translation: "language" },
          { word: "მემკვიდრეობა", pronunciation: "memkvidreoba", translation: "heritage" }
        ],
        questions: [
          {
            question: "How many letters are in the Georgian alphabet?",
            options: ["31", "32", "33", "34"],
            correctAnswer: 2
          },
          {
            question: "What organization recognized Georgian script as cultural heritage?",
            options: ["UN", "UNESCO", "EU", "NATO"],
            correctAnswer: 1
          }
        ]
      },
      {
        id: "christianity",
        title: "ქრისტიანობის შემოსვლა საქართველოში",
        georgianText: "ქრისტიანობა საქართველოში IV საუკუნეში შემოვიდა. წმინდა ნინომ ქრისტიანობა იქადაგა და მეფე მირიანი მოაქცია. ჯვარი ვაზისგან შეკრა და საქართველო ქრისტიანულ ქვეყნად იქცა. მას შემდეგ ბევრი ეკლესია და მონასტერი აშენდა.",
        englishText: "Christianity came to Georgia in the 4th century. Saint Nino preached Christianity and converted King Mirian. She made a cross from grapevine, and Georgia became a Christian country. Many churches and monasteries were built afterward.",
        vocabulary: [
          { word: "ქრისტიანობა", pronunciation: "kristianoba", translation: "Christianity" },
          { word: "წმინდა", pronunciation: "tsminda", translation: "saint" },
          { word: "ჯვარი", pronunciation: "jvari", translation: "cross" },
          { word: "ეკლესია", pronunciation: "eklesia", translation: "church" },
          { word: "მონასტერი", pronunciation: "monasteri", translation: "monastery" }
        ],
        questions: [
          {
            question: "When did Christianity come to Georgia?",
            options: [
              "3rd century",
              "4th century",
              "5th century",
              "6th century"
            ],
            correctAnswer: 1
          },
          {
            question: "What did Saint Nino make the cross from?",
            options: [
              "Wood",
              "Stone",
              "Grapevine",
              "Metal"
            ],
            correctAnswer: 2
          }
        ]
      },
      {
        id: "goldenage",
        title: "საქართველოს ოქროს ხანა",
        georgianText: "XII საუკუნე საქართველოს ოქროს ხანა იყო. თამარ მეფის დროს ქვეყანა ყველაზე ძლიერი გახდა. ამ პერიოდში აშენდა ბევრი ციხე-სიმაგრე და ტაძარი. პოეტმა შოთა რუსთაველმა დაწერა 'ვეფხისტყაოსანი'.",
        englishText: "The 12th century was Georgia's Golden Age. During Queen Tamar's reign, the country became the strongest. Many fortresses and temples were built during this period. The poet Shota Rustaveli wrote 'The Knight in the Panther's Skin'.",
        vocabulary: [
          { word: "ოქროს ხანა", pronunciation: "okros khana", translation: "golden age" },
          { word: "მეფე", pronunciation: "mepe", translation: "king/queen" },
          { word: "ციხე-სიმაგრე", pronunciation: "tsikhe-simagre", translation: "fortress" },
          { word: "ტაძარი", pronunciation: "tadzari", translation: "temple" },
          { word: "პოეტი", pronunciation: "poeti", translation: "poet" }
        ],
        questions: [
          {
            question: "When was Georgia's Golden Age?",
            options: [
              "11th century",
              "12th century",
              "13th century",
              "14th century"
            ],
            correctAnswer: 1
          },
          {
            question: "What famous work did Shota Rustaveli write?",
            options: [
              "The Georgian Chronicles",
              "The Knight in the Panther's Skin",
              "The Life of Saint Nino",
              "The History of Georgia"
            ],
            correctAnswer: 1
          }
        ]
      }
    ]
  }
];

const ReadingPracticePage: React.FC = () => {
  const { theme } = useTheme();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const toggleCategory = (categoryName: string) => {
    if (expandedCategory === categoryName) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryName);
      setTimeout(() => {
        if (categoryRefs.current[categoryName]) {
          categoryRefs.current[categoryName]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const playAudio = (text: string) => {
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

  return (
    <div className="pt-16 pb-16">
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}>Reading Practice</span>
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Improve your Georgian reading comprehension with these engaging texts
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
                  to="/intermediate/quiz/reading"
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' ? 'bg-blue-700 text-white hover:bg-blue-800' : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Take Quiz
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="hidden md:block md:w-1/3">
              <div className={`p-6 rounded-lg shadow-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                <Book className={`w-12 h-12 mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Reading Tips
                </h3>
                <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• Read the text multiple times</li>
                  <li>• Focus on understanding the main idea first</li>
                  <li>• Use context clues for unfamiliar words</li>
                  <li>• Practice reading aloud for pronunciation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8">
            {readingCategories.map((category) => (
              <div
                key={category.name}
                ref={el => categoryRefs.current[category.name] = el}
                className={`rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg overflow-hidden`}
              >
                <button
                  onClick={() => toggleCategory(category.name)}
                  className={`w-full p-6 text-left transition-colors ${
                    theme === 'dark' ? 'hover:bg-gray-750' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {category.name}
                      </h3>
                      <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                        {category.description}
                      </p>
                    </div>
                    {expandedCategory === category.name ? (
                      <ChevronUp className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                    ) : (
                      <ChevronDown className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                    )}
                  </div>
                </button>

                {expandedCategory === category.name && (
                  <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="space-y-8">
                      {category.texts.map((text) => (
                        <div key={text.id} className="space-y-4">
                          <h4 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {text.title}
                          </h4>
                          
                          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <div className="flex justify-between items-center mb-4">
                              <button
                                onClick={() => playAudio(text.georgianText)}
                                className={`flex items-center gap-2 px-3 py-1 rounded ${
                                  theme === 'dark'
                                    ? 'bg-gray-600 text-gray-200 hover:bg-gray-500'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                {isPlaying === text.georgianText ? (
                                  <X size={16} />
                                ) : (
                                  <Volume2 size={16} />
                                )}
                                {isPlaying === text.georgianText ? 'Stop' : 'Listen'}
                              </button>
                            </div>
                            <p className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                              {text.georgianText}
                            </p>
                            <p className={`mt-4 italic ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                              {text.englishText}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {text.vocabulary.map((word, index) => (
                              <div
                                key={index}
                                className={`p-3 rounded-lg ${
                                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
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
                                        ? 'hover:bg-gray-600'
                                        : 'hover:bg-gray-200'
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

                          <div className="space-y-4">
                            {text.questions.map((question, qIndex) => (
                              <div
                                key={qIndex}
                                className={`p-4 rounded-lg ${
                                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                                }`}
                              >
                                <p className={`font-medium mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                  {question.question}
                                </p>
                                <div className="space-y-2">
                                  {question.options.map((option, oIndex) => {
                                    const questionId = `${text.id}-${qIndex}`;
                                    const isSelected = selectedAnswer === `${questionId}-${oIndex}`;
                                    const showResult = selectedAnswer?.startsWith(questionId);
                                    const isCorrect = oIndex === question.correctAnswer;

                                    return (
                                      <button
                                        key={oIndex}
                                        onClick={() => {
                                          setSelectedAnswer(`${questionId}-${oIndex}`);
                                          setShowExplanation(true);
                                        }}
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

export default ReadingPracticePage;