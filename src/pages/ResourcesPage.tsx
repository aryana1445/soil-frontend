/**
 * Resources Page - Educational content
 */

import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { RESOURCES, FAQ } from '../../data/mockData';

export const ResourcesPage: React.FC = () => {
  const [expandedResource, setExpandedResource] = useState<string | null>(null);
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const resourcesByCategory = {
    nutrient: RESOURCES.filter(r => r.category === 'nutrient'),
    crop: RESOURCES.filter(r => r.category === 'crop'),
    practice: RESOURCES.filter(r => r.category === 'practice'),
    problem: RESOURCES.filter(r => r.category === 'problem'),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Resources & Learning</h1>

      {/* Educational Resources */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Educational Resources</h2>

        {/* Nutrients Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Understanding Soil Nutrients</h3>
          <div className="space-y-4">
            {resourcesByCategory.nutrient.map(resource => (
              <div
                key={resource.id}
                className="card cursor-pointer transition-all duration-200 hover:shadow-lg"
                onClick={() =>
                  setExpandedResource(expandedResource === resource.id ? null : resource.id)
                }
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {resource.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {resource.description}
                    </p>
                  </div>
                  <button className="ml-4 flex-shrink-0 text-primary-600 dark:text-primary-400">
                    {expandedResource === resource.id ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {expandedResource === resource.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {resource.content}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Practices Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4\">Best Practices</h3>
          <div className="space-y-4">
            {resourcesByCategory.practice.map(resource => (
              <div
                key={resource.id}
                className="card cursor-pointer transition-all duration-200 hover:shadow-lg"
                onClick={() =>
                  setExpandedResource(expandedResource === resource.id ? null : resource.id)
                }
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {resource.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {resource.description}
                    </p>
                  </div>
                  <button className="ml-4 flex-shrink-0 text-primary-600 dark:text-primary-400">
                    {expandedResource === resource.id ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {expandedResource === resource.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {resource.content}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {FAQ.map(faq => (
            <div
              key={faq.id}
              className="card cursor-pointer transition-all duration-200 hover:shadow-lg"
              onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 capitalize">
                    {faq.category}
                  </p>
                </div>
                <button className="ml-4 flex-shrink-0 text-primary-600 dark:text-primary-400">
                  {expandedFAQ === faq.id ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>

              {expandedFAQ === faq.id && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-700 dark:text-gray-300">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Additional Info Box */}
      <div className="mt-16 bg-primary-50 dark:bg-primary-900/20 rounded-lg p-8 border border-primary-200 dark:border-primary-800">
        <div className="flex items-start space-x-4">
          <BookOpen className="w-6 h-6 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100 mb-2">
              Need More Information?
            </h3>
            <p className="text-sm text-primary-800 dark:text-primary-200">
              For detailed agricultural information and best practices, consult your local agricultural extension office
              or contact our support team. Always follow local regulations and recommendations for fertilizer application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
