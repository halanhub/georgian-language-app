import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, ChevronDown, ChevronUp, Volume2, X, ArrowLeft, ArrowRight, Heart, Check, Play } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useUserProgress } from '../hooks/useUserProgress';
import { useAuth } from '../contexts/AuthContext';

interface Author {
  id: string;
  name: string;
  georgianName: string;
  years: string;
  period: string;
  bio: string;
  majorWorks: string[];
  imageUrl: string;
}

interface Poem {
  id: string;
  title: string;
  georgianTitle: string;
  author: string;
  year: string;
  text: string;
  georgianText: string;
  translation: string;
  analysis: string;
}

interface LiteraryPeriod {
  id: string;
  name: string;
  georgianName: string;
  years: string;
  description: string;
  keyFeatures: string[];
  notableAuthors: string[];
}

const LiteraturePoetryPage: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { updateProgress } = useUserProgress();
  const [expandedAuthor, setExpandedAuthor] = useState<string | null>(null);
  const [expandedPeriod, setExpandedPeriod] = useState<string | null>(null);
  const [expandedPoem, setExpandedPoem] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [exerciseMode, setExerciseMode] = useState<'analysis' | 'interpretation' | 'historical' | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [favoritePoems, setFavoritePoems] = useState<string[]>([]);
  
  const authorRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const periodRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const poemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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
      updateProgress('literature-poetry', { timeSpent: 1 });
    }
    
    // Save progress when component unmounts
    return () => {
      if (user && timeSpent > 0) {
        // Calculate progress based on time spent and exercise completion
        const exerciseCompletion = (showFeedback ? 1 : 0) + 
                                  (favoritePoems.length > 0 ? 1 : 0);
        
        // Mark as completed if user has spent significant time or completed exercises
        const completed = timeSpent > 15 || exerciseCompletion >= 3;
        
        updateProgress('literature-poetry', { 
          timeSpent, 
          completed: completed,
          favorites: favoritePoems
        });
      }
    };
  }, [user, timeSpent, showFeedback, favoritePoems, updateProgress]);

  const authors: Author[] = [
    {
      id: 'rustaveli',
      name: 'Shota Rustaveli',
      georgianName: 'შოთა რუსთაველი',
      years: '12th century',
      period: 'Medieval',
      bio: 'Shota Rustaveli is Georgia\'s national poet and one of the greatest contributors to Georgian literature. Little is known about his life, but he is believed to have been a high official at Queen Tamar\'s court. His epic poem "The Knight in the Panther\'s Skin" is considered the Georgian national epic.',
      majorWorks: ['The Knight in the Panther\'s Skin (ვეფხისტყაოსანი)'],
      imageUrl: 'https://images.pexels.com/photos/5082581/pexels-photo-5082581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 'chavchavadze',
      name: 'Ilia Chavchavadze',
      georgianName: 'ილია ჭავჭავაძე',
      years: '1837-1907',
      period: '19th Century',
      bio: 'Ilia Chavchavadze was a Georgian writer, poet, journalist and lawyer who spearheaded the revival of the Georgian national movement in the second half of the 19th century. He is widely regarded as one of the founding fathers of modern Georgia. His works often addressed the necessity of preserving Georgian culture while also embracing European values.',
      majorWorks: ['Is that a Man?! (კაცია ადამიანი?!)', 'The Hermit', 'The Pauper\'s Tale', 'Letters of a Traveler', 'The Phantom'],
      imageUrl: 'https://images.pexels.com/photos/4644812/pexels-photo-4644812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 'tsereteli',
      name: 'Akaki Tsereteli',
      georgianName: 'აკაკი წერეთელი',
      years: '1840-1915',
      period: '19th Century',
      bio: 'Akaki Tsereteli was a prominent Georgian poet and national liberation movement figure. He is the author of hundreds of patriotic, historical, lyrical and satiric poems, as well as poetic tales, representing the classic example of Georgian poetry. His famous poem "Suliko" has been translated into many languages.',
      majorWorks: ['Suliko', 'Gamzrdeli (The Tutor)', 'Tornike Eristavi', 'Natela'],
      imageUrl: 'https://images.pexels.com/photos/4644807/pexels-photo-4644807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 'vazha-pshavela',
      name: 'Vazha-Pshavela',
      georgianName: 'ვაჟა-ფშაველა',
      years: '1861-1915',
      period: '19th-20th Century',
      bio: 'Vazha-Pshavela, a pseudonym of Luka Razikashvili, was a Georgian poet and writer. His poetry is inspired by Georgian folklore and is filled with philosophical and psychological insights. His works often feature the beauty of nature and the conflicts between individuals and society, tradition and progress.',
      majorWorks: ['Host and Guest (სტუმარ-მასპინძელი)', 'Snake Eater (გველის მჭამელი)', 'Aluda Ketelauri', 'Bakhtrioni'],
      imageUrl: 'https://images.pexels.com/photos/5240511/pexels-photo-5240511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 'tabidze',
      name: 'Galaktion Tabidze',
      georgianName: 'გალაკტიონ ტაბიძე',
      years: '1892-1959',
      period: '20th Century',
      bio: 'Galaktion Tabidze was a Georgian poet who has been called "the greatest Georgian lyrical poet." His early works were influenced by Symbolism, but he developed his own distinctive style blending classical and modernist elements. His poetry captures the complex emotions of love, nature, and patriotism.',
      majorWorks: ['The Moon of Mtatsminda (მთაწმინდის მთვარე)', 'Blue Horses', 'The Wind Blows', 'Without Love', 'Artistic Flowers'],
      imageUrl: 'https://images.pexels.com/photos/5240515/pexels-photo-5240515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ];

  const poems: Poem[] = [
    {
      id: 'knight',
      title: 'The Knight in the Panther\'s Skin (Excerpt)',
      georgianTitle: 'ვეფხისტყაოსანი (ნაწყვეტი)',
      author: 'Shota Rustaveli',
      year: '12th century',
      text: 'Who is like unto Him who, having created the firmament by His mighty power, set up the luminaries therein; from Him are we, the sentient creation, by Him endowed with the power of vision, by Him moved, by Him established, by Him are all souls empowered; but from God Himself comes all that is good.',
      georgianText: 'რომელმან შექმნა სამყარო ძალითა მით ძლიერითა,\nზეგარდმო არსნი სულითა ყვნა ზეცით მონაბერითა,\nჩვენ, კაცთა, მოგვცა ქვეყანა, გვაქვს უთვალავი ფერითა,\nმისგან არს ყოვლი ხელმწიფე სახითა მის მიერითა.',
      translation: 'Who created the firmament by His mighty power,\nMade spiritual beings above with a breath from heaven,\nTo us, men, He gave the earth, of countless colors,\nFrom Him is every sovereign in His own image.',
      analysis: 'The opening stanza of "The Knight in the Panther\'s Skin" sets a theological foundation for the epic. Rustaveli begins by acknowledging God as the creator of the universe and the source of all power and goodness. This reflects the Christian worldview prevalent in medieval Georgia while also establishing the philosophical framework for the rest of the poem, which explores themes of love, friendship, and chivalry.'
    },
    {
      id: 'suliko',
      title: 'Suliko (Excerpt)',
      georgianTitle: 'სულიკო (ნაწყვეტი)',
      author: 'Akaki Tsereteli',
      year: '1895',
      text: 'I sought my own soul\'s solace,\nMy own heart\'s companion.\nI roamed both vale and mountain,\nBut what availed my searching?',
      georgianText: 'ვეძებდი სათუთ სულსა,\nსულს დანაკარგს ვეძებდი,\nმთას შევფოფდი, ბარს დავეშვი\nდა ვერსად ვერ მივაგენი.',
      translation: 'I was searching for a tender soul,\nA lost soul I was seeking,\nI climbed mountains, descended to valleys,\nAnd nowhere could I find it.',
      analysis: 'Suliko, which translates as "little soul," is one of Tsereteli\'s most beloved poems. It tells the story of a person searching for their loved one\'s soul after death. The excerpt captures the essence of longing and the universal human experience of loss. The poem\'s musical quality has made it a popular Georgian folk song. The poem\'s structure, with its repeating pattern, mirrors the circular nature of the narrator\'s search, emphasizing both persistence and despair.'
    },
    {
      id: 'host-guest',
      title: 'Host and Guest (Excerpt)',
      georgianTitle: 'სტუმარ-მასპინძელი (ნაწყვეტი)',
      author: 'Vazha-Pshavela',
      year: '1893',
      text: 'Though we differ in our faith,\nIs that cause for enmity?\nA good man can respect\nAnother\'s piety.',
      georgianText: 'თუმცა სხვა გვაქვს სარწმუნება,\nმაინც ნუ გვაქვს მტრობაო,\nლამაზს ადამიანობას\nუხდება მოყვრობაო.',
      translation: 'Although we have different faiths,\nLet us not be enemies,\nBeautiful humanity\nIs adorned by friendship.',
      analysis: 'In "Host and Guest," Vazha-Pshavela explores the conflict between personal ethics and communal laws. The poem tells the story of a Muslim Kist who gives shelter to a Christian Georgian, defying his community\'s desire for revenge. This excerpt encapsulates a central theme of the work: the universal values of hospitality and humanity that transcend religious and ethnic divisions. The poem is considered one of the greatest expressions of the humanitarian ideals in Georgian literature.'
    },
    {
      id: 'mtatsminda-moon',
      title: 'The Moon of Mtatsminda',
      georgianTitle: 'მთაწმინდის მთვარე',
      author: 'Galaktion Tabidze',
      year: '1915',
      text: 'Once more the familiar moon appeared above Mtatsminda,\nBringing old memories like a recurring dream.\nOh, how many times has that same moon risen above Mtatsminda!\nHow many times will it rise when I\'m no longer here!',
      georgianText: 'კვლავ შორეული ვარსკვლავები ცაზე აკიაფდნენ, \nაჰა, მთვარემაც მთაწმინდის თავზე გადმოანათა, \nემშვიდობება მთები ღამესთან, მთებიც დაღამდნენ, \nმთვარე მთაწმინდას ევედრება, მთვარე ატირდა.',
      translation: 'Again the distant stars flickered in the sky,\nBehold, the moon shined over Mtatsminda,\nThe mountains bid farewell to night, the mountains darkened,\nThe moon implores Mtatsminda, the moon wept.',
      analysis: 'In "The Moon of Mtatsminda," Tabidze demonstrates his mastery of symbolism and imagery. Mtatsminda, a mountain overlooking Tbilisi, becomes a timeless witness to human transience. The moon serves as a bridge between past and present, highlighting both continuity and impermanence. The poem captures a moment of solitary reflection that expands into a meditation on time, memory, and mortality. Tabidze\'s lyrical voice combines personal emotion with universal contemplation.'
    },
    {
      id: 'nine-brothers',
      title: 'Nine Brothers Kherkheulidze',
      georgianTitle: 'ცხრა ძმა ხერხეულიძე',
      author: 'Ilia Chavchavadze',
      year: '1872',
      text: 'They gave their lives for their homeland,\nTheir names echo through the years.\nNine brothers, one mother\'s children,\nFell together, without tears.',
      georgianText: 'ცხრა ძმანი ერთისა დედისა,\nცხრავ ერთად გაიზარდენით, \nცხრავ ერთად შესძენით სახელი \nთქვენს სამშობლო გმირთა მხარესა.',
      translation: 'Nine brothers from one mother,\nAll nine grew up together,\nAll nine brought honor\nTo your homeland, the land of heroes.',
      analysis: 'This patriotic ballad commemorates the legendary sacrifice of the nine Kherkheulidze brothers who died protecting Queen Tamar\'s flag during the Battle of Garisi. Chavchavadze uses the historical tale to inspire national pride and patriotism in the Georgian people during a time of Russian imperial control. The poem exemplifies his belief that literature should serve as a vehicle for national consciousness and identity.'
    }
  ];

  const literaryPeriods: LiteraryPeriod[] = [
    {
      id: 'medieval',
      name: 'Medieval Period',
      georgianName: 'შუა საუკუნეები',
      years: '5th-18th century',
      description: 'The medieval period of Georgian literature began after Christianization and was heavily influenced by religious themes. The culmination of this era was Shota Rustaveli\'s epic poem "The Knight in the Panther\'s Skin" in the 12th century, which marked the golden age of Georgian secular literature.',
      keyFeatures: [
        'Religious hagiographies and translations of Christian texts',
        'Development of secular literature in royal courts',
        'Epic poetry with chivalric themes',
        'Synthesis of Eastern and Western literary traditions'
      ],
      notableAuthors: ['Shota Rustaveli', 'Ioane Shavteli', 'Chakhrukhadze', 'Mose Khoneli']
    },
    {
      id: 'nineteenth',
      name: '19th Century Revival',
      georgianName: 'მე-19 საუკუნის აღორძინება',
      years: '1800-1900',
      description: 'The 19th century marked a revival of Georgian literature after centuries of foreign domination. This period, also known as the era of Georgian Romanticism and Realism, saw the emergence of writers who used literature as a means of preserving national identity and advocating for social and political reform.',
      keyFeatures: [
        'Romantic poetry with nationalistic themes',
        'Realist prose addressing social issues',
        'Folk-inspired literary forms',
        'Literature as a vehicle for national awakening'
      ],
      notableAuthors: ['Ilia Chavchavadze', 'Akaki Tsereteli', 'Alexander Kazbegi', 'Vazha-Pshavela', 'Nikoloz Baratashvili']
    },
    {
      id: 'modernism',
      name: 'Georgian Modernism',
      georgianName: 'ქართული მოდერნიზმი',
      years: '1915-1937',
      description: 'In the early 20th century, Georgian literature was transformed by modernist and symbolist movements. The "Blue Horns" literary group led this transformation, bringing European modernist trends into Georgian poetry and prose. This flourishing was later suppressed during the Soviet period.',
      keyFeatures: [
        'Symbolism and avant-garde experimentation',
        'Urban themes and industrial imagery',
        'Complex metaphorical language',
        'Focus on individual psychology and perception'
      ],
      notableAuthors: ['Galaktion Tabidze', 'Paolo Iashvili', 'Titsian Tabidze', 'Konstantine Gamsakhurdia', 'Grigol Robakidze']
    },
    {
      id: 'soviet',
      name: 'Soviet Period',
      georgianName: 'საბჭოთა პერიოდი',
      years: '1921-1991',
      description: 'During the Soviet era, Georgian literature existed under ideological constraints but still produced significant works. Writers had to navigate censorship while trying to maintain Georgian cultural identity. Some conformed to Soviet requirements, while others found subtle ways to express national themes or developed apolitical styles focusing on universal human experiences.',
      keyFeatures: [
        'Socialist realism in early decades',
        'Historical novels as allegorical commentary',
        'Metaphorical language to evade censorship',
        'Gradual liberalization in the post-Stalin era'
      ],
      notableAuthors: ['Mikheil Javakhishvili', 'Otar Chiladze', 'Irakli Abashidze', 'Ana Kalandadze', 'Chabua Amirejibi']
    },
    {
      id: 'contemporary',
      name: 'Contemporary Georgian Literature',
      georgianName: 'თანამედროვე ქართული ლიტერატურა',
      years: '1991-present',
      description: 'After Georgia regained independence, its literature experienced a new freedom of expression. Contemporary Georgian writers engage with global literary trends while addressing the unique challenges of post-Soviet transformation. Themes of identity, memory, and Georgia\'s place between East and West are prominent.',
      keyFeatures: [
        'Postmodern narrative techniques',
        'Exploration of post-Soviet identity',
        'Engagement with global literary movements',
        'Growing international recognition through translations'
      ],
      notableAuthors: ['Aka Morchiladze', 'Lasha Bugadze', 'Zaza Burchuladze', 'Nino Kharatishvili', 'Dato Turashvili']
    }
  ];

  // Exercise data
  const analysisExercises = [
    {
      prompt: "What literary device is most prominent in this excerpt from Rustaveli's 'The Knight in the Panther's Skin': 'Who is like unto Him who, having created the firmament by His mighty power...'?",
      options: [
        "Rhetorical question",
        "Metaphor",
        "Alliteration",
        "Personification"
      ],
      correct: "Rhetorical question",
      explanation: "The passage opens with a rhetorical question ('Who is like unto Him...') that doesn't expect an answer but rather emphasizes God's incomparable nature and power."
    },
    {
      prompt: "In Vazha-Pshavela's 'Host and Guest', the central conflict represents:",
      options: [
        "The struggle between religious dogma and human compassion",
        "The historical conflict between Georgians and Kists",
        "The battle between good and evil forces",
        "The tension between urban and rural values"
      ],
      correct: "The struggle between religious dogma and human compassion",
      explanation: "The poem explores the tension between tribal/religious laws and universal human values, particularly how personal ethics (compassion, hospitality) can conflict with communal expectations and traditions."
    },
    {
      prompt: "Galaktion Tabidze's 'The Moon of Mtatsminda' primarily explores themes of:",
      options: [
        "Temporality and eternity",
        "Political resistance",
        "Romantic love",
        "Religious devotion"
      ],
      correct: "Temporality and eternity",
      explanation: "Tabidze juxtaposes the permanence of natural features (the mountain, the moon) with human transience, creating a meditation on time, mortality, and the relationship between momentary human experience and eternal cycles."
    },
    {
      prompt: "Which of these is NOT a characteristic feature of the Georgian Modernist movement?",
      options: [
        "Socialist realism",
        "Symbolism",
        "Urban imagery",
        "Psychological introspection"
      ],
      correct: "Socialist realism",
      explanation: "While symbolism, urban imagery, and psychological introspection were key features of Georgian Modernism, socialist realism was the officially sanctioned Soviet literary method that came later and was often at odds with modernist experimentation."
    },
    {
      prompt: "Identify the poetic form used in Akaki Tsereteli's 'Suliko':",
      options: [
        "Ballad",
        "Sonnet",
        "Epic",
        "Free verse"
      ],
      correct: "Ballad",
      explanation: "Suliko is structured as a ballad - a narrative poem often with a recurring refrain, typically set to music, which tells a story in a direct and emotionally evocative way."
    }
  ];

  const interpretationExercises = [
    {
      prompt: "What does the panther skin symbolize in Rustaveli's epic?",
      options: [
        "Passionate love and nobility of character",
        "The hunt for wisdom and knowledge",
        "The danger of pride and arrogance",
        "The wildness of nature versus civilization"
      ],
      correct: "Passionate love and nobility of character",
      explanation: "The panther skin represents both passionate love and nobility of character. It symbolizes the blend of strength, beauty, and devotion that characterizes the ideal knight in Rustaveli's chivalric world."
    },
    {
      prompt: "In Chavchavadze's works, what does the character of the 'traveler' often represent?",
      options: [
        "A Georgian exposed to European ideas returning to their homeland",
        "A symbolic pilgrimage to religious sites",
        "The nomadic lifestyle of mountain peoples",
        "The journey from youth to old age"
      ],
      correct: "A Georgian exposed to European ideas returning to their homeland",
      explanation: "The 'traveler' in Chavchavadze's works typically represents Georgians educated in Europe who return with new ideas and must reconcile Western influences with Georgian traditions - reflecting his own 'third way' philosophy of modernization with cultural preservation."
    },
    {
      prompt: "What is the significance of nature imagery in Vazha-Pshavela's poetry?",
      options: [
        "Nature represents moral purity against corrupting social conventions",
        "Natural settings are merely decorative backgrounds",
        "Nature symbolizes the threatening forces against civilization",
        "Natural imagery is used to promote agricultural development"
      ],
      correct: "Nature represents moral purity against corrupting social conventions",
      explanation: "For Vazha-Pshavela, nature often represents moral purity and authenticity in contrast to potentially corrupting social conventions and tribal laws. His mountain characters are often portrayed as having an innate moral sense derived from their close relationship with nature."
    },
    {
      prompt: "In Tabidze's poetry, what does 'blue' color symbolism often represent?",
      options: [
        "Transcendence and artistic inspiration",
        "Patriotic sentiment for Georgia",
        "Melancholy and depression",
        "The influence of Russian literature"
      ],
      correct: "Transcendence and artistic inspiration",
      explanation: "In Tabidze's symbolist poetry, blue (particularly in works like 'Blue Horses') represents transcendence, artistic inspiration, and the mystical dimension - connecting his work to broader European symbolist traditions while maintaining distinctly Georgian cultural contexts."
    },
    {
      prompt: "In contemporary Georgian literature, how is the Soviet past typically represented?",
      options: [
        "As a complex memory requiring critical examination",
        "With straightforward nostalgia",
        "As a purely positive period of development",
        "As completely irrelevant to modern identity"
      ],
      correct: "As a complex memory requiring critical examination",
      explanation: "Contemporary Georgian literature tends to represent the Soviet past as a complex memory requiring critical examination - neither with simple rejection nor nostalgia, but as an ambivalent heritage that continues to shape present identities and social realities in ways that must be understood."
    }
  ];

  const historicalExercises = [
    {
      prompt: "Which historical event had the most profound impact on 19th century Georgian literature?",
      options: [
        "The Treaty of Georgievsk and subsequent Russian annexation",
        "The Napoleonic Wars",
        "The Industrial Revolution",
        "The Ottoman-Persian Wars"
      ],
      correct: "The Treaty of Georgievsk and subsequent Russian annexation",
      explanation: "The Treaty of Georgievsk (1783) and the subsequent full Russian annexation of Georgian kingdoms in the early 19th century fundamentally shaped Georgian literature of that period. Writers responded to the loss of independence by using literature as a means of preserving national identity and language."
    },
    {
      prompt: "During which period did Georgian hagiographic literature flourish?",
      options: [
        "5th-10th centuries",
        "12th-13th centuries",
        "15th-16th centuries",
        "18th-19th centuries"
      ],
      correct: "5th-10th centuries",
      explanation: "Georgian hagiographic literature (lives of saints) flourished primarily during the 5th-10th centuries, following Georgia's Christianization. This period saw the development of a substantial body of religious texts, both original works and translations from Greek."
    },
    {
      prompt: "What was the significance of the 'Blue Horns' group in Georgian literature?",
      options: [
        "They introduced European modernist movements to Georgian literature",
        "They focused exclusively on preserving folkloric traditions",
        "They promoted socialist realist principles before the Soviet period",
        "They specialized in children's literature and education"
      ],
      correct: "They introduced European modernist movements to Georgian literature",
      explanation: "The 'Blue Horns' (Tsisperi Kantsebi) literary group, active 1915-1931, was crucial in introducing European modernist movements - particularly symbolism and elements of futurism and expressionism - to Georgian literature, creating a renaissance in Georgian poetry before Soviet repression."
    },
    {
      prompt: "Which literary theme became especially prominent during the Soviet era in Georgia?",
      options: [
        "Historical novels as allegorical national commentary",
        "Overtly religious themes and biblical allegories",
        "Capitalist economic principles and individualism",
        "Direct criticism of Communist ideology"
      ],
      correct: "Historical novels as allegorical national commentary",
      explanation: "During the Soviet period, Georgian writers often turned to historical novels as a way to discuss national identity and subtly comment on contemporary political situations through allegory, as direct expressions of nationalism or criticism were censored."
    },
    {
      prompt: "What characterizes the post-Soviet era of Georgian literature?",
      options: [
        "Explorations of identity in a globalized context and engagement with trauma",
        "A return to strictly classical literary forms and religious themes",
        "The dominance of socialist realist aesthetics",
        "A decrease in literary production and readership"
      ],
      correct: "Explorations of identity in a globalized context and engagement with trauma",
      explanation: "Post-Soviet Georgian literature is characterized by explorations of Georgian identity in a globalized context, engagement with historical and recent traumas (Soviet repression, civil wars, territorial conflicts), and experimentation with diverse literary forms including postmodernism."
    }
  ];

  const toggleAuthor = (authorId: string) => {
    updateActivity();
    if (expandedAuthor === authorId) {
      setExpandedAuthor(null);
    } else {
      setExpandedAuthor(authorId);
      setTimeout(() => {
        if (authorRefs.current[authorId]) {
          authorRefs.current[authorId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const togglePeriod = (periodId: string) => {
    updateActivity();
    if (expandedPeriod === periodId) {
      setExpandedPeriod(null);
    } else {
      setExpandedPeriod(periodId);
      setTimeout(() => {
        if (periodRefs.current[periodId]) {
          periodRefs.current[periodId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const togglePoem = (poemId: string) => {
    updateActivity();
    if (expandedPoem === poemId) {
      setExpandedPoem(null);
    } else {
      setExpandedPoem(poemId);
      setTimeout(() => {
        if (poemRefs.current[poemId]) {
          poemRefs.current[poemId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const playAudio = (text: string) => {
    updateActivity();
    if (isPlaying === text) {
      setIsPlaying(null);
    } else {
      setIsPlaying(text);
      // Here you would normally play the audio file
      setTimeout(() => setIsPlaying(null), 2000);
    }
  };

  const toggleFavorite = (poemId: string) => {
    updateActivity();
    if (favoritePoems.includes(poemId)) {
      setFavoritePoems(favoritePoems.filter(id => id !== poemId));
    } else {
      setFavoritePoems([...favoritePoems, poemId]);
    }
  };

  const handleExerciseAnswer = (answer: string) => {
    updateActivity();
    setSelectedOption(answer);
    setShowFeedback(true);
  };

  const nextExercise = () => {
    updateActivity();
    if (exerciseMode === 'analysis' && currentExerciseIndex < analysisExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else if (exerciseMode === 'interpretation' && currentExerciseIndex < interpretationExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else if (exerciseMode === 'historical' && currentExerciseIndex < historicalExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
    setSelectedOption(null);
    setShowFeedback(false);
  };

  const resetExercise = () => {
    updateActivity();
    setCurrentExerciseIndex(0);
    setSelectedOption(null);
    setShowFeedback(false);
  };

  const isCorrectAnswer = () => {
    if (exerciseMode === 'analysis' && selectedOption) {
      return selectedOption === analysisExercises[currentExerciseIndex].correct;
    } else if (exerciseMode === 'interpretation' && selectedOption) {
      return selectedOption === interpretationExercises[currentExerciseIndex].correct;
    } else if (exerciseMode === 'historical' && selectedOption) {
      return selectedOption === historicalExercises[currentExerciseIndex].correct;
    }
    return false;
  };

  return (
    <div className="pt-16 pb-16" onClick={updateActivity}>
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-purple-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>Georgian Literature</span> - ქართული ლიტერატურა
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Explore classic and modern Georgian literature, from medieval epics to contemporary prose and poetry.
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' 
                      ? 'bg-gray-700 text-white hover:bg-gray-600' 
                      : 'bg-white text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </button>
                <button
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' ? 'bg-purple-700 text-white hover:bg-purple-800' : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  Reading List
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="hidden md:block md:w-1/3 mt-6 md:mt-0">
              <div className={`p-6 rounded-lg shadow-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                <BookOpen className={`w-12 h-12 mb-4 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Why Georgian Literature?
                </h3>
                <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• Rich tradition spanning 15 centuries</li>
                  <li>• Unique literary heritage at crossroads of East and West</li>
                  <li>• Home to one of the world's greatest medieval epics</li>
                  <li>• Growing international recognition in contemporary literature</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Authors Section */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Notable Georgian Authors
          </h2>
          
          <div className="space-y-6">
            {authors.map((author) => (
              <div
                key={author.id}
                ref={el => authorRefs.current[author.id] = el}
                className={`rounded-lg overflow-hidden transition-all duration-300 ${
                  theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <button
                  onClick={() => toggleAuthor(author.id)}
                  className="w-full"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-200 mr-4">
                          <img 
                            src={author.imageUrl} 
                            alt={author.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="text-left">
                          <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {author.name} <span className="text-sm font-normal">{author.georgianName}</span>
                          </h3>
                          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                            {author.years} • {author.period}
                          </p>
                        </div>
                      </div>
                      {expandedAuthor === author.id ? (
                        <ChevronUp className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                      ) : (
                        <ChevronDown className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                      )}
                    </div>
                  </div>
                </button>

                {expandedAuthor === author.id && (
                  <div className={`p-6 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="md:flex">
                      <div className="md:w-1/3 mb-4 md:mb-0 md:mr-6">
                        <div className="rounded-lg overflow-hidden h-48 md:h-auto">
                          <img 
                            src={author.imageUrl} 
                            alt={author.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="md:w-2/3">
                        <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {author.bio}
                        </p>
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          Major Works:
                        </h4>
                        <ul className={`list-disc pl-5 mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {author.majorWorks.map((work, index) => (
                            <li key={index}>{work}</li>
                          ))}
                        </ul>
                        <button
                          className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                            theme === 'dark' ? 'bg-purple-700 hover:bg-purple-600 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'
                          }`}
                        >
                          Read {author.name}'s Works
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Literary Periods Section */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-purple-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Literary Periods in Georgian History
          </h2>
          
          <div className="space-y-6">
            {literaryPeriods.map((period) => (
              <div
                key={period.id}
                ref={el => periodRefs.current[period.id] = el}
              >
                <button
                  onClick={() => togglePeriod(period.id)}
                  className={`w-full p-6 rounded-lg text-left transition-colors ${
                    theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                  } shadow-lg`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {period.name} <span className="text-sm font-normal">{period.georgianName}</span>
                      </h3>
                      <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                        {period.years}
                      </p>
                    </div>
                    {expandedPeriod === period.id ? (
                      <ChevronUp className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                    ) : (
                      <ChevronDown className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                    )}
                  </div>
                </button>

                {expandedPeriod === period.id && (
                  <div className={`mt-4 p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
                    <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {period.description}
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          Key Features:
                        </h4>
                        <ul className={`list-disc pl-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {period.keyFeatures.map((feature, index) => (
                            <li key={index} className="mb-1">{feature}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          Notable Authors:
                        </h4>
                        <ul className={`list-disc pl-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {period.notableAuthors.map((author, index) => (
                            <li key={index} className="mb-1">{author}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Poems Section */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Classical Georgian Poetry
          </h2>
          
          <div className="space-y-6">
            {poems.map((poem) => (
              <div
                key={poem.id}
                ref={el => poemRefs.current[poem.id] = el}
                className={`rounded-lg overflow-hidden transition-all duration-300 ${
                  theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
                } shadow-lg border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <div className={`p-6 ${expandedPoem === poem.id ? (theme === 'dark' ? 'border-b border-gray-700' : 'border-b border-gray-200') : ''}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {poem.title}
                      </h3>
                      <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                        {poem.author} • {poem.year}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => toggleFavorite(poem.id)}
                        className={`p-2 rounded-full mr-2 transition-colors ${
                          favoritePoems.includes(poem.id)
                            ? (theme === 'dark' ? 'text-red-400' : 'text-red-500')
                            : (theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600')
                        }`}
                      >
                        <Heart
                          size={20}
                          fill={favoritePoems.includes(poem.id) ? "currentColor" : "none"}
                        />
                      </button>
                      <button
                        onClick={() => togglePoem(poem.id)}
                        className={`p-2 rounded-full transition-colors ${
                          theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        {expandedPoem === poem.id ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {expandedPoem === poem.id && (
                  <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            Original Text:
                          </h4>
                          <button
                            onClick={() => playAudio(poem.georgianText)}
                            className={`p-2 rounded-full transition-colors ${
                              isPlaying === poem.georgianText
                                ? (theme === 'dark' ? 'bg-purple-600' : 'bg-purple-500')
                                : (theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200')
                            }`}
                          >
                            {isPlaying === poem.georgianText ? (
                              <X size={16} className="text-white" />
                            ) : (
                              <Volume2 size={16} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />
                            )}
                          </button>
                        </div>
                        <div className={`p-4 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} mb-4`}>
                          <p className={`whitespace-pre-line ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} font-medium`}>
                            {poem.georgianText}
                          </p>
                          <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            {poem.georgianTitle}
                          </p>
                        </div>
                        
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          Translation:
                        </h4>
                        <div className={`p-4 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <p className={`whitespace-pre-line ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            {poem.translation}
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          Analysis:
                        </h4>
                        <div className={`p-4 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} mb-4`}>
                          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                            {poem.analysis}
                          </p>
                        </div>
                        
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          Excerpt in English:
                        </h4>
                        <div className={`p-4 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <p className={`italic ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            "{poem.text}"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Exercises Section */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-purple-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Literary Analysis Practice
          </h2>
          
          {!exerciseMode ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={() => setExerciseMode('analysis')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Stylistic Analysis
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Identify literary devices, techniques, and stylistic features in Georgian literature
                </p>
              </button>
              
              <button
                onClick={() => setExerciseMode('interpretation')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Thematic Interpretation
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Explore symbolic meanings and thematic elements in classical and modern Georgian works
                </p>
              </button>
              
              <button
                onClick={() => setExerciseMode('historical')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Historical Context
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Test your knowledge of the historical and cultural contexts of Georgian literary movements
                </p>
              </button>
            </div>
          ) : (
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {exerciseMode === 'analysis' ? 'Stylistic Analysis' : 
                   exerciseMode === 'interpretation' ? 'Thematic Interpretation' : 'Historical Context'}
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
              
              {exerciseMode === 'analysis' && (
                <div>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {analysisExercises[currentExerciseIndex].prompt}
                  </p>
                  
                  <div className="mb-6">
                    <div className="space-y-3">
                      {analysisExercises[currentExerciseIndex].options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleExerciseAnswer(option)}
                          className={`w-full text-left p-4 rounded-lg transition-colors ${
                            selectedOption === option
                              ? option === analysisExercises[currentExerciseIndex].correct
                                ? (theme === 'dark' ? 'bg-green-900 text-white' : 'bg-green-100 text-green-800')
                                : (theme === 'dark' ? 'bg-red-900 text-white' : 'bg-red-100 text-red-800')
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
                        <p>
                          {isCorrectAnswer()
                            ? 'Correct! '
                            : `Incorrect. The correct answer is "${analysisExercises[currentExerciseIndex].correct}". `}
                          {analysisExercises[currentExerciseIndex].explanation}
                        </p>
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
                    
                    {currentExerciseIndex < analysisExercises.length - 1 && (
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
              
              {exerciseMode === 'interpretation' && (
                <div>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {interpretationExercises[currentExerciseIndex].prompt}
                  </p>
                  
                  <div className="mb-6">
                    <div className="space-y-3">
                      {interpretationExercises[currentExerciseIndex].options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleExerciseAnswer(option)}
                          className={`w-full text-left p-4 rounded-lg transition-colors ${
                            selectedOption === option
                              ? option === interpretationExercises[currentExerciseIndex].correct
                                ? (theme === 'dark' ? 'bg-green-900 text-white' : 'bg-green-100 text-green-800')
                                : (theme === 'dark' ? 'bg-red-900 text-white' : 'bg-red-100 text-red-800')
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
                        <p>
                          {isCorrectAnswer()
                            ? 'Correct! '
                            : `Incorrect. The correct answer is "${interpretationExercises[currentExerciseIndex].correct}". `}
                          {interpretationExercises[currentExerciseIndex].explanation}
                        </p>
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
                    
                    {currentExerciseIndex < interpretationExercises.length - 1 && (
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
              
              {exerciseMode === 'historical' && (
                <div>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {historicalExercises[currentExerciseIndex].prompt}
                  </p>
                  
                  <div className="mb-6">
                    <div className="space-y-3">
                      {historicalExercises[currentExerciseIndex].options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleExerciseAnswer(option)}
                          className={`w-full text-left p-4 rounded-lg transition-colors ${
                            selectedOption === option
                              ? option === historicalExercises[currentExerciseIndex].correct
                                ? (theme === 'dark' ? 'bg-green-900 text-white' : 'bg-green-100 text-green-800')
                                : (theme === 'dark' ? 'bg-red-900 text-white' : 'bg-red-100 text-red-800')
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
                        <p>
                          {isCorrectAnswer()
                            ? 'Correct! '
                            : `Incorrect. The correct answer is "${historicalExercises[currentExerciseIndex].correct}". `}
                          {historicalExercises[currentExerciseIndex].explanation}
                        </p>
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
                    
                    {currentExerciseIndex < historicalExercises.length - 1 && (
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
            </div>
          )}
        </div>
      </section>

      {/* Additional Resources */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Further Reading
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Books in Translation
              </h3>
              <ul className={`list-disc pl-5 space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Rustaveli, S. <em>The Knight in the Panther's Skin</em>, tr. Lyn Coffin (2015)</li>
                <li>Vazha-Pshavela, <em>The Snake-Eater and Other Poems</em>, tr. Donald Rayfield (2012)</li>
                <li>Gamsakhurdia, K. <em>The Hand of a Great Master</em>, tr. Natela Urushadze (2003)</li>
                <li>Morchiladze, A. <em>Journey to Karabakh</em>, tr. Elizabeth Heighway (2018)</li>
                <li>Iashvili, P. <em>Selected Poems</em>, tr. Rebecca Gould (2020)</li>
                <li>Kharatishvili, N. <em>The Eighth Life</em>, tr. Charlotte Collins & Ruth Martin (2019)</li>
              </ul>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Literary Resources
              </h3>
              <ul className={`list-disc pl-5 space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Rayfield, D. <em>The Literature of Georgia: A History</em> (2013)</li>
                <li>Hulme, K. <em>The Bone People: Contemporary Georgian Fiction</em> (2017)</li>
                <li><em>Georgian Literature and Culture Series</em> by Tbilisi State University Press</li>
                <li><em>Contemporary Georgian Fiction</em>, ed. Elizabeth Heighway (2012)</li>
                <li>Orbeliani, S-S. <em>The Georgian Dictionary</em>, tr. Mikheil Chikovani (2008)</li>
                <li><em>Words Without Borders: Georgian Issue</em> (online literary magazine)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LiteraturePoetryPage;