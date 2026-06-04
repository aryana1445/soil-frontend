/**
 * Custom hook for managing soil analysis state and operations
 */

import { useState, useCallback } from 'react';
import { SoilAnalysis, FormData } from '../types';
import { apiService } from '../services/api';

export const useAnalysis = () => {
  const [currentAnalysis, setCurrentAnalysis] = useState<SoilAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analyses, setAnalyses] = useState<SoilAnalysis[]>([]);

  const analyzeSoil = useCallback(async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const analysis = await apiService.analyzeSoil(formData);
      await apiService.saveAnalysis(analysis);
      setCurrentAnalysis(analysis);
      return analysis;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze soil';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchHistory = useCallback(async (limit: number = 10) => {
    setIsLoading(true);
    setError(null);
    try {
      const history = await apiService.getAnalysisHistory(limit);
      setAnalyses(history.analyses);
      return history;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch history';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteAnalysis = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await apiService.deleteAnalysis(id);
      setAnalyses((prev) => prev.filter((a) => a.id !== id));
      if (currentAnalysis?.id === id) {
        setCurrentAnalysis(null);
      }
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete analysis';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [currentAnalysis?.id]);

  const exportAnalysis = useCallback(async (id: string, format: 'pdf' | 'csv') => {
    setIsLoading(true);
    setError(null);
    try {
      const blob = await apiService.exportAnalysis(id, format);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `soil-analysis-${id}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to export analysis';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return {
    currentAnalysis,
    isLoading,
    error,
    analyses,
    analyzeSoil,
    fetchHistory,
    deleteAnalysis,
    exportAnalysis,
    clearError,
  };
};
