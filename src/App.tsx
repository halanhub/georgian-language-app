import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
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
import VocabularyPage from './pages/lessons/VocabularyPage';
import GrammarPage from './pages/lessons/GrammarPage';
import DailyConversationsPage from './pages/lessons/DailyConversationsPage';
import CommonWordsPage from './pages/lessons/CommonWordsPage';
import ReadingPracticePage from './pages/lessons/ReadingPracticePage';
import WritingExercisesPage from './pages/lessons/WritingExercisesPage';
import SentenceConstructionPage from './pages/lessons/SentenceConstructionPage';
import QuizPage from './pages/quiz/QuizPage';
import QuizHubPage from './pages/quiz/QuizHubPage';
import ProfileSettingsPage from './pages/settings/ProfileSettingsPage';
import SupportPage from './pages/SupportPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AchievementsPage from './pages/AchievementsPage';
import LearningTipsPage from './pages/LearningTipsPage';
import PricingPage from './pages/PricingPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignupPage />} />
              <Route path="pricing" element={<PricingPage />} />
              
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
                <ProtectedRoute>
                  <ColorsAndShapesPage />
                </ProtectedRoute>
              } />
              <Route path="beginner/numbers" element={
                <ProtectedRoute>
                  <NumbersPage />
                </ProtectedRoute>
              } />
              <Route path="beginner/months-and-seasons" element={
                <ProtectedRoute>
                  <MonthsAndSeasonsPage />
                </ProtectedRoute>
              } />
              <Route path="beginner/food-and-drinks" element={
                <ProtectedRoute>
                  <FoodAndDrinksPage />
                </ProtectedRoute>
              } />
              <Route path="beginner/human-body" element={
                <ProtectedRoute>
                  <HumanBodyPage />
                </ProtectedRoute>
              } />
              <Route path="beginner/animals" element={
                <ProtectedRoute>
                  <AnimalsPage />
                </ProtectedRoute>
              } />
              <Route path="beginner/daily-activities" element={
                <ProtectedRoute>
                  <DailyActivitiesPage />
                </ProtectedRoute>
              } />
              <Route path="beginner/quiz/:topic" element={
                <ProtectedRoute>
                  <QuizPage />
                </ProtectedRoute>
              } />
              
              <Route path="intermediate" element={
                <ProtectedRoute requiresSubscription={true}>
                  <IntermediateLevelPage />
                </ProtectedRoute>
              } />
              <Route path="intermediate/grammar" element={
                <ProtectedRoute requiresSubscription={true}>
                  <GrammarPage />
                </ProtectedRoute>
              } />
              <Route path="intermediate/conversations" element={
                <ProtectedRoute requiresSubscription={true}>
                  <DailyConversationsPage />
                </ProtectedRoute>
              } />
              <Route path="intermediate/common-words" element={
                <ProtectedRoute requiresSubscription={true}>
                  <CommonWordsPage />
                </ProtectedRoute>
              } />
              <Route path="intermediate/reading" element={
                <ProtectedRoute requiresSubscription={true}>
                  <ReadingPracticePage />
                </ProtectedRoute>
              } />
              <Route path="intermediate/writing" element={
                <ProtectedRoute requiresSubscription={true}>
                  <WritingExercisesPage />
                </ProtectedRoute>
              } />
              <Route path="intermediate/sentences" element={
                <ProtectedRoute requiresSubscription={true}>
                  <SentenceConstructionPage />
                </ProtectedRoute>
              } />
              <Route path="intermediate/quiz/:topic" element={
                <ProtectedRoute requiresSubscription={true}>
                  <QuizPage />
                </ProtectedRoute>
              } />
              
              <Route path="advanced" element={
                <ProtectedRoute requiresSubscription={true}>
                  <AdvancedLevelPage />
                </ProtectedRoute>
              } />
              <Route path="advanced/quiz/:topic" element={
                <ProtectedRoute requiresSubscription={true}>
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
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;