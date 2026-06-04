/**
 * Form validation utilities
 */

export interface ValidationError {
  field: string;
  message: string;
}

export const validateSoilData = (data: any): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Nitrogen validation (0-300 mg/kg)
  if (!Number.isFinite(data.nitrogen) || data.nitrogen < 0 || data.nitrogen > 300) {
    errors.push({
      field: 'nitrogen',
      message: 'Nitrogen must be between 0 and 300 mg/kg',
    });
  }

  // Phosphorus validation (0-150 mg/kg)
  if (!Number.isFinite(data.phosphorus) || data.phosphorus < 0 || data.phosphorus > 150) {
    errors.push({
      field: 'phosphorus',
      message: 'Phosphorus must be between 0 and 150 mg/kg',
    });
  }

  // Potassium validation (0-300 mg/kg)
  if (!Number.isFinite(data.potassium) || data.potassium < 0 || data.potassium > 300) {
    errors.push({
      field: 'potassium',
      message: 'Potassium must be between 0 and 300 mg/kg',
    });
  }

  // pH validation (0-14)
  if (!Number.isFinite(data.pH) || data.pH < 0 || data.pH > 14) {
    errors.push({
      field: 'pH',
      message: 'pH must be between 0 and 14',
    });
  }

  // Moisture validation (0-100%)
  if (!Number.isFinite(data.moisture) || data.moisture < 0 || data.moisture > 100) {
    errors.push({
      field: 'moisture',
      message: 'Moisture must be between 0 and 100%',
    });
  }

  // Temperature validation
  if (!Number.isFinite(data.temperature) || data.temperature < -50 || data.temperature > 60) {
    errors.push({
      field: 'temperature',
      message: 'Temperature must be between -50°C and 60°C',
    });
  }

  // Humidity validation (0-100%)
  if (!Number.isFinite(data.humidity) || data.humidity < 0 || data.humidity > 100) {
    errors.push({
      field: 'humidity',
      message: 'Humidity must be between 0 and 100%',
    });
  }

  // Crop type validation
  if (!data.cropType || typeof data.cropType !== 'string') {
    errors.push({
      field: 'cropType',
      message: 'Please select a crop type',
    });
  }

  // Soil type validation
  if (!data.soilType || typeof data.soilType !== 'string') {
    errors.push({
      field: 'soilType',
      message: 'Please select a soil type',
    });
  }

  // Region validation
  if (!data.region || typeof data.region !== 'string') {
    errors.push({
      field: 'region',
      message: 'Please select a region',
    });
  }

  return errors;
};

/**
 * Get validation error message for a field
 */
export const getFieldError = (field: string, errors: ValidationError[]): string | null => {
  const error = errors.find((e) => e.field === field);
  return error ? error.message : null;
};

/**
 * Check if there are any validation errors
 */
export const hasValidationErrors = (errors: ValidationError[]): boolean => {
  return errors.length > 0;
};
