/**
 * Nutrient gauge component for displaying nutrient levels
 */

import React from 'react';
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

interface NutrientGaugeProps {
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  status: 'deficient' | 'optimal' | 'excess';
}

export const NutrientGauge: React.FC<NutrientGaugeProps> = ({
  label,
  value,
  min,
  max,
  unit,
  status,
}) => {
  const percentage = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

  const statusConfig = {
    deficient: {
      color: 'bg-red-500',
      textColor: 'text-red-700 dark:text-red-300',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
      icon: AlertCircle,
      label: 'Deficient',
    },
    optimal: {
      color: 'bg-green-500',
      textColor: 'text-green-700 dark:text-green-300',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      icon: CheckCircle,
      label: 'Optimal',
    },
    excess: {
      color: 'bg-amber-500',
      textColor: 'text-amber-700 dark:text-amber-300',
      bgColor: 'bg-amber-100 dark:bg-amber-900/30',
      icon: AlertTriangle,
      label: 'Excess',
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className="card">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{label}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {min}-{max} {unit}
            </p>
          </div>
          <div className={`flex items-center space-x-2 ${config.textColor} ${config.bgColor} px-3 py-1 rounded-full`}>
            <Icon className="w-4 h-4" />
            <span className="text-xs font-semibold">{config.label}</span>
          </div>
        </div>

        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          {value.toFixed(1)} <span className="text-lg text-gray-600 dark:text-gray-400">{unit}</span>
        </div>

        <div className="space-y-2">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full ${config.color} transition-all duration-300`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
            <span>Min: {min}</span>
            <span>Max: {max}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
