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
import VocabularyPage from './pages/VocabularyPage';
import GrammarPage from './pages/lessons/GrammarPage';
import DailyConversationsPage from './pages/lessons/DailyConversationsPage';
import CommonWordsPage from './pages/lessons/CommonWordsPage';
import ReadingPracticePage from './pages/lessons/ReadingPracticePage';
import WritingExercisesPage from './pages/lessons/WritingExercisesPage';
import SentenceConstructionPage from './pages/lessons/SentenceConstructionPage';
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
import LiteraturePoetryPage from './pages/lessons/LiteraturePoetryPage';

// Admin user ID - replace with the actual ID of admin@georgianlanguage.online
const ADMIN_USER_ID = "d4c7b2a1-f3e9-4b8d-a6c5-e9d8f7g6h5j4";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <LanguageProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignupPage />} />
                <Route path="confirmation" element={<ConfirmationPage />} />
                <Route path="pricing" element={<PricingPage />} />
                <Route path="terms-of-service" element={<TermsOfServicePage />} />
                <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="database-test" element={<DatabaseTestPage />} />
                <Route path="faq" element={<FAQPage />} />
                
                <Route path="beginner" element={
                  <ProtectedRoute>
                    <BeginnerLevelPage />
                  </ProtectedRoute>
                } />
                <Route path="beginner/alphabet" element={
                  <ProtectedRoute>
                    <AlphabetPage />
                  </ProtectedRoute>
                } />
                <Route path="beginner/basic-vocabulary" element={
                  <ProtectedRoute>
                    <BasicVocabularyPage />
                  </ProtectedRoute>
                } />
                <Route path="beginner/colors-and-shapes" element={
                  <ProtectedRoute requiresSubscription={true} adminId={ADMIN_USER_ID}>
                    <ColorsAndShapesPage />
                  </ProtectedRoute>
                } />
                <Route path="beginner/numbers" element={
                  <ProtectedRoute requiresSubscription={true} adminId={ADMIN_USER_ID}>
                    <NumbersPage />
                  </ProtectedRoute>
                } />
                <Route path="beginner/months-and-seasons" element={
                  <ProtectedRoute requiresSubscription={true} adminId={ADMIN_USER_ID}>
                    <MonthsAndSeasonsPage />
                  </ProtectedRoute>
                } />
                <Route path="beginner/food-and-drinks" element={
                  <ProtectedRoute requiresSubscription={true} adminId={ADMIN_USER_ID}>
                    <FoodAndDrinksPage />
                  </ProtectedRoute>
                } />
                <Route path="beginner/human-body" element={
                  <ProtectedRoute requiresSubscription={true} adminId={ADMIN_USER_ID}>
                    <HumanBodyPage />
                  </ProtectedRoute>
                } />
                <Route path="beginner/animals" element={
                  <ProtectedRoute requiresSubscription={true} adminId={ADMIN_USER_ID}>
                    <AnimalsPage />
                  </ProtectedRoute>
                } />
                <Route path="beginner/daily-activities" element={
                  <ProtectedRoute requiresSubscription={true} adminId={ADMIN_USER_ID}>
                    <DailyActivitiesPage />
                  </ProtectedRoute>
                } />
                <Route path="beginner/quiz/:topic" element={
                  <ProtectedRoute requiresSubscription={true} adminId={ADMIN_USER_ID}>
                    <QuizPage />
                  </ProtectedRoute>
                } />
                
                <Route path="intermediate" element={
                  <ProtectedRoute>
                    <IntermediateLevelPage />
                  </ProtectedRoute>
                } />
                <Route path="intermediate/grammar" element={
                  <ProtectedRoute requiresSubscription={true} adminId={ADMIN_USER_ID}>
                    <GrammarPage />
                  </ProtectedRoute>
                } />
                <Route path="intermediate/conversations" element={
                  <ProtectedRoute requiresSubscription={true} adminId={ADMIN_USER_ID}>
                    <DailyConversationsPage />
                  </ProtectedRoute>
                } />
                <Route path="intermediate/common-words" element={
                  <ProtectedRoute requiresSubscription={true} adminId={ADMIN_USER_ID}>
                    <CommonWordsPage />
                  </ProtectedRoute>
                } />
                <Route path="intermediate/reading" element={
                  <ProtectedRoute requiresSubscription={true} adminId={ADMIN_USER_ID}>
                    <ReadingPracticePage />
                  </ProtectedRoute>
                } />
                <Route path="intermediate/writing" element={
                  <ProtectedRoute requiresSubscription={true} adminId={ADMIN_USER_ID}>
                    <WritingExercisesPage />
                  </ProtectedRoute>
                } />
                <Route path="intermediate/sentences" element={
                  <ProtectedRoute requiresSubscription={true} adminId={ADMIN_USER_ID}>
                    <SentenceConstructionPage />
                  </ProtectedRoute>
                } />
                <Route path="intermediate/quiz/grammar" element={
                  <ProtectedRoute requiresSubscription={true} adminId={ADMIN_USER_ID}>
                    <GrammarQuiz />
                  </ProtectedRoute>
                } />
                <Route path="intermediate/quiz/sentences" element={
                  <ProtectedRoute requiresSubscription={true} adminId={ADMIN_USER_ID}>
                    <SentenceConstructionQuiz />
                  </ProtectedRoute>
                } />
                <Route path="intermediate/quiz/common-words" element={
                  <ProtectedRoute requiresSubscription={true} adminId={ADMIN_USER_ID}>
                    <CommonWordsQuiz />
                  </ProtectedRoute>
                } />
                <Route path="intermediate/quiz/conversations" element={
                  <ProtectedRoute requiresSubscription={true} adminId={ADMIN_USER_ID}>
                    <ConversationsQuiz />
                  </ProtectedRoute>
                } />
                <Route path="intermediate/quiz/reading" element={
                  <ProtectedRoute requiresSubscription={true} adminId={ADMIN_USER_ID}>
                    <ReadingQuiz />
                  </ProtectedRoute>
                } />
                <Route path="intermediate/quiz/writing" element={
                  <ProtectedRoute requiresSubscription={true} adminId={ADMIN_USER_ID}>
                    <WritingQuiz />
                  </ProtectedRoute>
                } />
                <Route path="intermediate/quiz/:topic" element={
                  <ProtectedRoute requiresSubscription={true} adminId={ADMIN_USER_ID}>
                    <QuizPage />
                  </ProtectedRoute>
                } />
                
                <Route path="advanced" element={
                  <ProtectedRoute>
                    <AdvancedLevelPage />
                  </ProtectedRoute>
                } />
                <Route path="advanced/grammar" element={
                  <ProtectedRoute requiresSubscription={true} adminId={ADMIN_USER_ID}>
                    <AdvancedGrammarPage />
                  </ProtectedRoute>
                } />
                <Route path="advanced/culture" element={
                  <ProtectedRoute requiresSubscription={true} adminId={ADMIN_USER_ID}>
                    <AdvancedCulturePage />
                  </ProtectedRoute>
                } />
                <Route path="advanced/literature" element={
                  <ProtectedRoute requiresSubscription={true} adminId={ADMIN_USER_ID}>
                    <LiteraturePoetryPage />
                  </ProtectedRoute>
                } />
                <Route path="advanced/idioms" element={
                  <ProtectedRoute requiresSubscription={true} adminId={ADMIN_USER_ID}>
                    <NotFoundPage />
                  </ProtectedRoute>
                } />
                <Route path="advanced/writing" element={
                  <ProtectedRoute requiresSubscription={true} adminId={ADMIN_USER_ID}>
                    <NotFoundPage />
                  </ProtectedRoute>
                } />
                <Route path="advanced/listening" element={
                  <ProtectedRoute requiresSubscription={true} adminId={ADMIN_USER_ID}>
                    <NotFoundPage />
                  </ProtectedRoute>
                } />
                <Route path="advanced/quiz/:topic" element={
                  <ProtectedRoute requiresSubscription={true} adminId={ADMIN_USER_ID}>
                    <QuizPage />
                  </ProtectedRoute>
                } />

                <Route path="settings" element={
                  <ProtectedRoute>
                    <ProfileSettingsPage />
                  </ProtectedRoute>
                } />

                <Route path="support" element={<SupportPage />} />
                <Route path="contact" element={<ContactPage />} />
                
                <Route path="vocabulary" element={
                  <ProtectedRoute>
                    <VocabularyPage />
                  </ProtectedRoute>
                } />
                
                <Route path="quizzes" element={
                  <ProtectedRoute>
                    <QuizHubPage />
                  </ProtectedRoute>
                } />
                
                <Route path="achievements" element={
                  <ProtectedRoute>
                    <AchievementsPage />
                  </ProtectedRoute>
                } />
                
                <Route path="learning-tips" element={
                  <ProtectedRoute>
                    <LearningTipsPage />
                  </ProtectedRoute>
                } />
                
                <Route path="404" element={<NotFoundPage />} />
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