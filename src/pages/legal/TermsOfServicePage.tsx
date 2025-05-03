import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const TermsOfServicePage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="pt-16 pb-16">
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* Header */}
        <div className={`py-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <Link
                to="/signup"
                className={`mr-4 p-2 rounded-full ${
                  theme === 'dark' 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <ArrowLeft size={20} />
              </Link>
              <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Terms of Service
              </h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className={`p-8 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow`}>
            <div className="flex items-center mb-6">
              <FileText className={`h-8 w-8 mr-3 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} />
              <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Terms of Service
              </h2>
            </div>

            <div className={`prose max-w-none ${theme === 'dark' ? 'prose-invert' : ''}`}>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                Last Updated: May 1, 2025
              </p>

              <h3 className={`text-xl font-bold mt-6 mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                1. Introduction
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                Welcome to Georgian Language Learning ("we," "our," or "us"). By accessing or using our website, mobile application, or any other services we offer (collectively, the "Services"), you agree to be bound by these Terms of Service. Please read these terms carefully before using our Services.
              </p>

              <h3 className={`text-xl font-bold mt-6 mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                2. Account Registration
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                To access certain features of our Services, you may need to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your password and for all activities that occur under your account.
              </p>

              <h3 className={`text-xl font-bold mt-6 mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                3. Subscription and Payments
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                3.1. We offer both free and premium subscription plans. By selecting a premium plan, you agree to pay the subscription fees indicated for your selected plan.
              </p>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                3.2. Subscription fees are billed in advance on a monthly or annual basis, depending on the subscription plan you select.
              </p>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                3.3. Your subscription will automatically renew unless you cancel it at least 24 hours before the end of the current billing period.
              </p>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                3.4. You can cancel your subscription at any time through your account settings. Upon cancellation, you will continue to have access to premium features until the end of your current billing period.
              </p>

              <h3 className={`text-xl font-bold mt-6 mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                4. User Content
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                4.1. Our Services may allow you to post, link, store, share, or otherwise provide content ("User Content"). You retain ownership rights in your User Content.
              </p>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                4.2. By posting User Content, you grant us a non-exclusive, transferable, sub-licensable, royalty-free, worldwide license to use, copy, modify, create derivative works based on, distribute, publicly display, and publicly perform your User Content in connection with operating and providing our Services.
              </p>

              <h3 className={`text-xl font-bold mt-6 mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                5. Prohibited Conduct
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                You agree not to:
              </p>
              <ul className={`list-disc pl-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <li>Use the Services for any illegal purpose or in violation of any laws</li>
                <li>Violate or infringe other people's intellectual property, privacy, or other rights</li>
                <li>Interfere with or disrupt the Services or servers or networks connected to the Services</li>
                <li>Attempt to gain unauthorized access to any part of the Services</li>
                <li>Use the Services to send spam or other unsolicited communications</li>
                <li>Impersonate any person or entity or falsely state or misrepresent your affiliation with a person or entity</li>
              </ul>

              <h3 className={`text-xl font-bold mt-6 mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                6. Intellectual Property
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                6.1. The Services and their original content, features, and functionality are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
              </p>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                6.2. You may not copy, modify, create derivative works from, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Services, except as incidental to normal web browsing or as expressly permitted in these Terms.
              </p>

              <h3 className={`text-xl font-bold mt-6 mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                7. Termination
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                We may terminate or suspend your account and access to the Services immediately, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the Services will immediately cease.
              </p>

              <h3 className={`text-xl font-bold mt-6 mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                8. Disclaimer of Warranties
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                The Services are provided on an "as is" and "as available" basis. We disclaim all warranties of any kind, whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
              </p>

              <h3 className={`text-xl font-bold mt-6 mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                9. Limitation of Liability
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Services.
              </p>

              <h3 className={`text-xl font-bold mt-6 mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                10. Changes to Terms
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>

              <h3 className={`text-xl font-bold mt-6 mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                11. Governing Law
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                These Terms shall be governed by and construed in accordance with the laws of Georgia, without regard to its conflict of law provisions.
              </p>

              <h3 className={`text-xl font-bold mt-6 mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                12. Contact Us
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                If you have any questions about these Terms, please contact us at support@georgianlanguage.online.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;