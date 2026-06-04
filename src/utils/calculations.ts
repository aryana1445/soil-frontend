/**
 * Utility functions for soil nutrient calculations
 */

import { Crop, NutrientLevel, SoilHealthScore, ComparisonData } from '../types';

/**
 * Calculate nutrient status based on optimal range
 */
export const getNutrientStatus = (
  value: number,
  optimal: { min: number; max: number },
): 'deficient' | 'optimal' | 'excess' => {
  if (value < optimal.min) return 'deficient';
  if (value > optimal.max) return 'excess';
  return 'optimal';
};

/**
 * Get color code for nutrient status
 */
export const getStatusColor = (status: 'deficient' | 'optimal' | 'excess'): string => {
  switch (status) {
    case 'deficient':
      return '#ef4444'; // Red
    case 'optimal':
      return '#22c55e'; // Green
    case 'excess':
      return '#f59e0b'; // Amber
    default:
      return '#6b7280'; // Gray
  }
};

/**
 * Calculate soil health score
 */
export const calculateSoilHealthScore = (
  nitrogen: number,
  phosphorus: number,
  potassium: number,
  pH: number,
  moisture: number,
  crop: Crop,
): SoilHealthScore => {
  let score = 0;
  const factors = {
    nutrientBalance: 0,
    phBalance: 0,
    moistureLevel: 0,
    overallFertility: 0,
  };

  // Nutrient balance (0-25 points)
  const nStatus = getNutrientStatus(nitrogen, crop.optimalN);
  const pStatus = getNutrientStatus(phosphorus, crop.optimalP);
  const kStatus = getNutrientStatus(potassium, crop.optimalK);
  const optimalNutrients = [nStatus, pStatus, kStatus].filter((s) => s === 'optimal').length;
  factors.nutrientBalance = (optimalNutrients / 3) * 25;
  score += factors.nutrientBalance;

  // pH balance (0-25 points)
  const phStatus = getNutrientStatus(pH, crop.optimalPH);
  factors.phBalance = phStatus === 'optimal' ? 25 : phStatus === 'deficient' ? 10 : 15;
  score += factors.phBalance;

  // Moisture level (0-25 points)
  const moistureStatus = getNutrientStatus(moisture, crop.optimalMoisture);
  factors.moistureLevel = moistureStatus === 'optimal' ? 25 : moistureStatus === 'deficient' ? 10 : 15;
  score += factors.moistureLevel;

  // Overall fertility (0-25 points)
  const totalNutrients = nitrogen + phosphorus + potassium;
  const avgOptimal = (crop.optimalN.max + crop.optimalP.max + crop.optimalK.max) / 3;
  factors.overallFertility = Math.min((totalNutrients / (avgOptimal * 3)) * 25, 25);
  score += factors.overallFertility;

  // Determine status
  let status: 'poor' | 'fair' | 'good' | 'excellent';
  let color: string;
  if (score >= 85) {
    status = 'excellent';
    color = '#22c55e';
  } else if (score >= 70) {
    status = 'good';
    color = '#84cc16';
  } else if (score >= 50) {
    status = 'fair';
    color = '#f59e0b';
  } else {
    status = 'poor';
    color = '#ef4444';
  }

  return {
    score: Math.round(score),
    status,
    color,
    factors,
  };
};

/**
 * Format nutrient value with unit
 */
export const formatNutrient = (value: number, decimals: number = 2): string => {
  return value.toFixed(decimals);
};

/**
 * Get comparison data for chart
 */
export const getComparisonData = (
  current: number,
  optimal: { min: number; max: number },
  average: number,
  label: string,
): ComparisonData => {
  return {
    label,
    current: Math.round(current),
    optimal: Math.round((optimal.min + optimal.max) / 2),
    average: Math.round(average),
  };
};

/**
 * Calculate recommendation priority
 */
export const getRecommendationPriority = (
  nitrogen: number,
  phosphorus: number,
  potassium: number,
  crop: Crop,
): string => {
  const deficiencies = [];

  if (nitrogen < crop.optimalN.min) deficiencies.push('Nitrogen');
  if (phosphorus < crop.optimalP.min) deficiencies.push('Phosphorus');
  if (potassium < crop.optimalK.min) deficiencies.push('Potassium');

  if (deficiencies.length === 0) return 'Balanced - No major deficiencies detected';
  if (deficiencies.length === 1) return `Priority: ${deficiencies[0]} supplementation needed`;
  return `Priority: ${deficiencies.join(' and ')} supplementation needed`;
};

/**
 * Format currency
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(value);
};

/**
 * Format percentage
 */
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`;
};
