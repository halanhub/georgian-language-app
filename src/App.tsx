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
import VocabularyPage from './pages/lessons/VocabularyPage';
import GrammarPage from './pages/lessons/GrammarPage';
import DailyConversationsPage from './pages/lessons/DailyConversationsPage';
import QuizPage from './pages/quiz/QuizPage';
import ChatPage from './pages/ChatPage';
import ProfileSettingsPage from './pages/settings/ProfileSettingsPage';
import SupportPage from './pages/SupportPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

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
              <Route path="beginner/vocabulary/:category" element={
                <ProtectedRoute>
                  <VocabularyPage />
                </ProtectedRoute>
              } />
              <Route path="beginner/quiz/:topic" element={
                <ProtectedRoute>
                  <QuizPage level="beginner" />
                </ProtectedRoute>
              } />
              
              <Route path="intermediate" element={
                <ProtectedRoute>
                  <IntermediateLevelPage />
                </ProtectedRoute>
              } />
              <Route path="intermediate/grammar" element={
                <ProtectedRoute>
                  <GrammarPage />
                </ProtectedRoute>
              } />
              <Route path="intermediate/conversations" element={
                <ProtectedRoute>
                  <DailyConversationsPage />
                </ProtectedRoute>
              } />
              <Route path="intermediate/quiz/:topic" element={
                <ProtectedRoute>
                  <QuizPage level="intermediate" />
                </ProtectedRoute>
              } />
              
              <Route path="advanced" element={
                <ProtectedRoute>
                  <AdvancedLevelPage />
                </ProtectedRoute>
              } />
              <Route path="advanced/quiz/:topic" element={
                <ProtectedRoute>
                  <QuizPage level="advanced" />
                </ProtectedRoute>
              } />
              
              <Route path="chat" element={
                <ProtectedRoute>
                  <ChatPage />
                </ProtectedRoute>
              } />

              <Route path="settings" element={
                <ProtectedRoute>
                  <ProfileSettingsPage />
                </ProtectedRoute>
              } />

              <Route path="support" element={<SupportPage />} />
              
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