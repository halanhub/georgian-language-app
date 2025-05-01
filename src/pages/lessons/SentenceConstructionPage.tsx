import React from 'react';
import { Book } from 'lucide-react';

const SentenceConstructionPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <Book className="mx-auto h-12 w-12 text-indigo-600" />
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Sentence Construction
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Learn how to build proper Georgian sentences
          </p>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Basic Sentence Structure
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                Subject-Object-Verb (SOV) Order
              </h3>
              <p className="text-gray-600">
                Georgian typically follows an SOV (Subject-Object-Verb) word order, unlike English's SVO structure.
              </p>
            </div>

            <div className="bg-indigo-50 p-4 rounded-md">
              <h4 className="text-lg font-medium text-indigo-900 mb-2">Example:</h4>
              <div className="space-y-2">
                <p className="text-indigo-700">გიორგი წიგნს კითხულობს</p>
                <p className="text-gray-600">Giorgi (S) + book (O) + reads (V)</p>
                <p className="text-gray-600">"Giorgi reads a book"</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Practice Exercises
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                Arrange the Words
              </h3>
              <p className="text-gray-600">
                Practice arranging words to form correct Georgian sentences.
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-md">
              <h4 className="text-lg font-medium text-green-900 mb-2">Try this:</h4>
              <div className="space-y-2">
                <p className="text-green-700">Arrange: კაცი, პურს, ჭამს</p>
                <p className="text-gray-600">Form a sentence using these words</p>
                <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                  Check Answer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentenceConstructionPage;