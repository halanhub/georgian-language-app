import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const PrivacyPolicyPage: React.FC = () => {
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
                Privacy Policy
              </h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className={`p-8 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow`}>
            <div className="flex items-center mb-6">
              <Lock className={`h-8 w-8 mr-3 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} />
              <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Privacy Policy
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
                At Georgian Language Learning, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile application, or any other services we offer (collectively, the "Services").
              </p>

              <h3 className={`text-xl font-bold mt-6 mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                2. Information We Collect
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                We collect several types of information from and about users of our Services, including:
              </p>
              <ul className={`list-disc pl-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <li>Personal identifiers, such as name and email address</li>
                <li>Account credentials, such as passwords and security questions</li>
                <li>Profile information, such as display name and avatar</li>
                <li>Usage data, such as lessons completed and quiz scores</li>
                <li>Payment information, such as credit card details (processed securely through our payment processor)</li>
                <li>Device and connection information, such as IP address, browser type, and operating system</li>
              </ul>

              <h3 className={`text-xl font-bold mt-6 mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                3. How We Collect Information
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                We collect information:
              </p>
              <ul className={`list-disc pl-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <li>Directly from you when you register for an account, subscribe to our service, or contact us</li>
                <li>Automatically as you navigate through our Services, using cookies and similar technologies</li>
                <li>From third-party service providers, such as payment processors and authentication services</li>
              </ul>

              <h3 className={`text-xl font-bold mt-6 mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                4. How We Use Your Information
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                We use your information to:
              </p>
              <ul className={`list-disc pl-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <li>Provide, maintain, and improve our Services</li>
                <li>Process transactions and manage your account</li>
                <li>Track your progress and personalize your learning experience</li>
                <li>Communicate with you about your account, updates, and promotional offers</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Monitor and analyze usage patterns and trends</li>
                <li>Protect the security and integrity of our Services</li>
              </ul>

              <h3 className={`text-xl font-bold mt-6 mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                5. Disclosure of Your Information
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                We may disclose your personal information to:
              </p>
              <ul className={`list-disc pl-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <li>Service providers who perform services on our behalf, such as payment processing and data analysis</li>
                <li>Professional advisors, such as lawyers, auditors, and insurers</li>
                <li>Government bodies or law enforcement agencies, when required by law</li>
                <li>A buyer or successor in the event of a merger, acquisition, or similar business transaction</li>
              </ul>

              <h3 className={`text-xl font-bold mt-6 mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                6. Data Security
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>

              <h3 className={`text-xl font-bold mt-6 mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                7. Your Data Protection Rights
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className={`list-disc pl-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <li>The right to access and receive a copy of your personal information</li>
                <li>The right to rectify or update your personal information</li>
                <li>The right to erase your personal information</li>
                <li>The right to restrict or object to processing of your personal information</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>

              <h3 className={`text-xl font-bold mt-6 mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                8. Cookies and Similar Technologies
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                We use cookies and similar tracking technologies to track activity on our Services and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Services.
              </p>

              <h3 className={`text-xl font-bold mt-6 mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                9. Children's Privacy
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                Our Services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us.
              </p>

              <h3 className={`text-xl font-bold mt-6 mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                10. Changes to This Privacy Policy
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>

              <h3 className={`text-xl font-bold mt-6 mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                11. Contact Us
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                If you have any questions about this Privacy Policy, please contact us at privacy@georgianlanguage.online.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;