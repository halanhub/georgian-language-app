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

import AdvanceIdiomsPage from './pages/lessons/AdvanceIdiomsPage';
import AdvanceWritingPage from './pages/lessons/AdvanceWritingPage';
import AdvancedListeningPage from './pages/lessons/AdvancedListeningPage';
import AdvanceLiteraturePoetryPage from './pages/lessons/AdvanceLiteraturePoetryPage';

const ADMIN_USER_ID = "d4c7b2a1-f3e9-4b8d-a6c5-e9d8f7g6h5j4";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <LanguageProvider>
            <Routes>
              {/* Advanced Level Custom Pages */}
              <Route path="/advanced/literature" element={<AdvanceLiteraturePoetryPage />} />
              <Route path="/advanced/idioms" element={<AdvanceIdiomsPage />} />
              <Route path="/advanced/culture" element={<AdvancedCulturePage />} />
              <Route path="/advanced/writing" element={<AdvanceWritingPage />} />
              <Route path="/advanced/listening" element={<AdvancedListeningPage />} />

              <Route path="/" element={<Layout />}>
                {/* ... keep your existing routes here (unchanged) ... */}
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Route>
            </Routes>
          </LanguageProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
