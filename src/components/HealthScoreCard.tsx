/**
 * Health Score Card Component
 */

import React from 'react';
import { SoilHealthScore } from '../../types';

interface HealthScoreCardProps {
  score: SoilHealthScore;
}

export const HealthScoreCard: React.FC<HealthScoreCardProps> = ({ score }) => {
  const getStatusMessage = () => {
    switch (score.status) {
      case 'excellent':
        return 'Your soil is in excellent condition with optimal nutrient balance!';
      case 'good':
        return 'Your soil health is good. Minor adjustments recommended.';
      case 'fair':
        return 'Your soil health needs improvement. Follow recommendations carefully.';
      case 'poor':
        return 'Your soil health requires significant attention and management.';
      default:
        return 'Soil health assessment pending.';
    }
  };

  return (
    <div className="card-elevated">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Soil Health Score</h2>

        <div className="flex justify-center">
          <div className="relative w-48 h-48">
            <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="12"
              />
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke={score.color}
                strokeWidth="12"
                strokeDasharray={`${(score.score / 100) * 565.5} 565.5`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold" style={{ color: score.color }}>
                {score.score}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400 mt-2 capitalize">
                {score.status}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <p className="text-sm text-gray-700 dark:text-gray-300 text-center">{getStatusMessage()}</p>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">Health Factors</h3>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Nutrient Balance</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">{Math.round(score.factors.nutrientBalance)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-primary-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${score.factors.nutrientBalance}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">pH Balance</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">{Math.round(score.factors.phBalance)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${score.factors.phBalance}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Moisture Level</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">{Math.round(score.factors.moistureLevel)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${score.factors.moistureLevel}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Fertility</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">{Math.round(score.factors.overallFertility)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-amber-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${score.factors.overallFertility}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
