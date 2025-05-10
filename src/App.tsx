import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';

import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ConfirmationPage from './pages/auth/ConfirmationPage';

import BeginnerLevelPage from './pages/levels/BeginnerLevelPage';
import IntermediateLevelPage from './pages/levels/IntermediateLevelPage';
import AdvancedLevelPage from './pages/levels/AdvancedLevelPage';

import AlphabetPage from './pages/lessons/AlphabetPage';
import BasicVocabularyPage from './pages/lessons/BasicVocabularyPage';
import ColorsAndShapesPage from './pages/lessons/ColorsAndShapesPage';
import NumbersPage from './pages/lessons/NumbersPage';
import MonthsAndSeasonsPage from './pages/lessons/MonthsAndSeasonsPage';
import FoodAndDrinksPage from './pages/lessons/FoodAndDrinksPage';
import HumanBodyPage from './pages/lessons/HumanBodyPage';
import AnimalsPage from './pages/lessons/AnimalsPage';
import DailyActivitiesPage from './pages/lessons/DailyActivitiesPage';

import GrammarPage from './pages/lessons/GrammarPage';
import DailyConversationsPage from './pages/lessons/DailyConversationsPage';
import CommonWordsPage from './pages/lessons/CommonWordsPage';
import ReadingPracticePage from './pages/lessons/ReadingPracticePage';
import WritingExercisesPage from './pages/lessons/WritingExercisesPage';
import SentenceConstructionPage from './pages/lessons/SentenceConstructionPage';

import VocabularyPage from './pages/VocabularyPage';
import QuizPage from './pages/quiz/QuizPage';
import QuizHubPage from './pages/quiz/QuizHubPage';
import GrammarQuiz from './pages/quiz/GrammarQuiz';
import SentenceConstructionQuiz from './pages/quiz/SentenceConstructionQuiz';
import CommonWordsQuiz from './pages/quiz/CommonWordsQuiz';
import ConversationsQuiz from './pages/quiz/ConversationsQuiz';
import ReadingQuiz from './pages/quiz/ReadingQuiz';
import WritingQuiz from './pages/quiz/WritingQuiz';

import ProfileSettingsPage from './pages/settings/ProfileSettingsPage';
import SupportPage from './pages/SupportPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

import ProtectedRoute from './components/auth/ProtectedRoute';
import AchievementsPage from './pages/AchievementsPage';
import LearningTipsPage from './pages/LearningTipsPage';
import PricingPage from './pages/PricingPage';
import TermsOfServicePage from './pages/legal/TermsOfServicePage';
import PrivacyPolicyPage from './pages/legal/PrivacyPolicyPage';
import DatabaseTestPage from './pages/DatabaseTestPage';
import FAQPage from './pages/FAQPage';

import AdvancedGrammarPage from './pages/lessons/AdvancedGrammarPage';
import AdvancedCulturePage from './pages/lessons/AdvancedCulturePage';
import AdvancedIdiomsPage from './pages/lessons/AdvancedIdiomsPage';
import AdvancedWritingPage from './pages/lessons/AdvancedWritingPage';
import AdvancedListeningPage from './pages/lessons/AdvancedListeningPage';
import AdvancedLiteraturePoetryPage from './pages/lessons/AdvancedLiteraturePoetryPage';

const ADMIN_USER_ID = "d4c7b2a1-f3e9-4b8d-a6c5-e9d8f7g6h5j4";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <LanguageProvider>
            <Layout>
              <Routes>
                {/* Auth Pages */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/confirmation" element={<ConfirmationPage />} />
                
                {/* Legal Pages */}
                <Route path="/terms-of-service" element={<TermsOfServicePage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                
                {/* Settings Pages */}
                <Route path="/settings" element={<ProfileSettingsPage />} />
                
                {/* Support Pages */}
                <Route path="/support" element={<SupportPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faq" element={<FAQPage />} />
                
                {/* Pricing Page */}
                <Route path="/pricing" element={<PricingPage />} />
                
                {/* Learning Levels */}
                <Route path="/beginner" element={<BeginnerLevelPage />} />
                <Route path="/intermediate" element={<IntermediateLevelPage />} />
                <Route path="/advanced" element={<AdvancedLevelPage />} />
                
                {/* Beginner Level Pages */}
                <Route path="/beginner/alphabet" element={<AlphabetPage />} />
                <Route path="/beginner/basic-vocabulary" element={<BasicVocabularyPage />} />
                <Route path="/beginner/colors-and-shapes" element={<ColorsAndShapesPage />} />
                <Route path="/beginner/numbers" element={<NumbersPage />} />
                <Route path="/beginner/months-and-seasons" element={<MonthsAndSeasonsPage />} />
                <Route path="/beginner/food-and-drinks" element={<FoodAndDrinksPage />} />
                <Route path="/beginner/human-body" element={<HumanBodyPage />} />
                <Route path="/beginner/animals" element={<AnimalsPage />} />
                <Route path="/beginner/daily-activities" element={<DailyActivitiesPage />} />
                
                {/* Intermediate Level Pages */}
                <Route path="/intermediate/grammar" element={<GrammarPage />} />
                <Route path="/intermediate/sentences" element={<SentenceConstructionPage />} />
                <Route path="/intermediate/common-words" element={<CommonWordsPage />} />
                <Route path="/intermediate/conversations" element={<DailyConversationsPage />} />
                <Route path="/intermediate/reading" element={<ReadingPracticePage />} />
                <Route path="/intermediate/writing" element={<WritingExercisesPage />} />
                
                {/* Advanced Level Pages */}
                <Route path="advanced/grammar" element={<AdvancedGrammarPage />} />
                <Route path="advanced/culture" element={<AdvancedCulturePage />} />
                <Route path="advanced/idioms" element={<AdvancedIdiomsPage />} />
                <Route path="advanced/writing" element={<AdvancedWritingPage />} />
                <Route path="advanced/listening" element={<AdvancedListeningPage />} />
                <Route path="advanced/literature" element={<AdvancedLiteraturePoetryPage />} />
                
                {/* Quiz Pages */}
                <Route path="/quizzes" element={<QuizHubPage />} />
                <Route path="/beginner/quiz/:topic" element={<QuizPage />} />
                <Route path="/intermediate/quiz/grammar" element={<GrammarQuiz />} />
                <Route path="/intermediate/quiz/sentences" element={<SentenceConstructionQuiz />} />
                <Route path="/intermediate/quiz/common-words" element={<CommonWordsQuiz />} />
                <Route path="/intermediate/quiz/conversations" element={<ConversationsQuiz />} />
                <Route path="/intermediate/quiz/reading" element={<ReadingQuiz />} />
                <Route path="/intermediate/quiz/writing" element={<WritingQuiz />} />
                
                {/* Other Pages */}
                <Route path="/vocabulary" element={<VocabularyPage />} />
                <Route path="/achievements" element={<AchievementsPage />} />
                <Route path="/tips" element={<LearningTipsPage />} />
                <Route path="/database-test" element={<DatabaseTestPage />} />
                <Route path="/404" element={<NotFoundPage />} />
                
                {/* Home Page */}
                <Route path="/" element={<HomePage />} />
                
                {/* Fallback */}
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </Layout>
          </LanguageProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;