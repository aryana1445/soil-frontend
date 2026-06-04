/**
 * History Page - View previous analyses
 */

import React, { useEffect, useState } from 'react';
import { Trash2, Download, Calendar, Leaf } from 'lucide-react';
import { SoilAnalysis } from '../../types';
import { useAnalysis } from '../../hooks/useAnalysis';
import { LoadingSpinner, Alert } from '../../components';
import { CROPS } from '../../data/mockData';

export const HistoryPage: React.FC = () => {
  const { analyses, isLoading, error, clearError, fetchHistory, deleteAnalysis, exportAnalysis } = useAnalysis();
  const [selectedAnalysis, setSelectedAnalysis] = useState<SoilAnalysis | null>(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this analysis?')) {
      await deleteAnalysis(id);
    }
  };

  const handleExport = async (id: string, format: 'pdf' | 'csv') => {
    await exportAnalysis(id, format);
  };

  if (isLoading) {
    return <LoadingSpinner fullScreen message="Loading analysis history..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Analysis History</h1>

      {error && (
        <Alert
          type="error"
          message={error}
          onClose={clearError}
        />
      )}

      {analyses.length === 0 ? (
        <div className="card text-center py-12">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 text-lg">No analyses yet</p>
          <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">Start by creating a new soil analysis</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Analyses List */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {analyses.map((analysis) => {
                const crop = CROPS.find(c => c.id === analysis.cropType);
                const isSelected = selectedAnalysis?.id === analysis.id;

                return (
                  <div
                    key={analysis.id}
                    onClick={() => setSelectedAnalysis(analysis)}
                    className={`card cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Leaf className="w-5 h-5 text-primary-600" />
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {crop?.name || analysis.cropType}
                          </h3>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-4">
                          <div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1\">Nitrogen</p>\n                            <p className=\"text-sm font-bold text-gray-900 dark:text-white\">{analysis.nitrogen.toFixed(1)}</p>\n                          </div>\n                          <div>\n                            <p className=\"text-xs text-gray-600 dark:text-gray-400 mb-1\">Phosphorus</p>\n                            <p className=\"text-sm font-bold text-gray-900 dark:text-white\">{analysis.phosphorus.toFixed(1)}</p>\n                          </div>\n                          <div>\n                            <p className=\"text-xs text-gray-600 dark:text-gray-400 mb-1\">Potassium</p>\n                            <p className=\"text-sm font-bold text-gray-900 dark:text-white\">{analysis.potassium.toFixed(1)}</p>\n                          </div>\n                        </div>\n                      </div>\n                      <div className=\"text-right\">\n                        <p className=\"text-xs text-gray-600 dark:text-gray-400 mb-3\">\n                          {new Date(analysis.timestamp).toLocaleDateString()}\n                        </p>\n                        <div className=\"flex gap-2\">\n                          <button\n                            onClick={(e) => {\n                              e.stopPropagation();\n                              handleExport(analysis.id, 'pdf');\n                            }}\n                            className=\"p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors\"\n                            title=\"Download as PDF\"\n                          >\n                            <Download className=\"w-4 h-4\" />\n                          </button>\n                          <button\n                            onClick={(e) => {\n                              e.stopPropagation();\n                              handleDelete(analysis.id);\n                            }}\n                            className=\"p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors\"\n                            title=\"Delete analysis\"\n                          >\n                            <Trash2 className=\"w-4 h-4\" />\n                          </button>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                );\n              })}\n            </div>\n\n            {/* Details Panel */}\n            <div>\n              {selectedAnalysis ? (\n                <div className=\"card-elevated sticky top-20\">\n                  <h3 className=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">Details</h3>\n                  <div className=\"space-y-4\">\n                    <div>\n                      <p className=\"text-xs text-gray-600 dark:text-gray-400 mb-1\">Date</p>\n                      <p className=\"font-semibold text-gray-900 dark:text-white\">\n                        {new Date(selectedAnalysis.timestamp).toLocaleDateString()}\n                      </p>\n                    </div>\n                    <div>\n                      <p className=\"text-xs text-gray-600 dark:text-gray-400 mb-1\">Crop</p>\n                      <p className=\"font-semibold text-gray-900 dark:text-white\">\n                        {CROPS.find(c => c.id === selectedAnalysis.cropType)?.name || selectedAnalysis.cropType}\n                      </p>\n                    </div>\n                    <div>\n                      <p className=\"text-xs text-gray-600 dark:text-gray-400 mb-1\">pH</p>\n                      <p className=\"font-semibold text-gray-900 dark:text-white\">{selectedAnalysis.pH.toFixed(2)}</p>\n                    </div>\n                    <div>\n                      <p className=\"text-xs text-gray-600 dark:text-gray-400 mb-1\">Moisture</p>\n                      <p className=\"font-semibold text-gray-900 dark:text-white\">{selectedAnalysis.moisture.toFixed(1)}%</p>\n                    </div>\n                    <div className=\"pt-4 border-t border-gray-200 dark:border-gray-700\">\n                      <p className=\"text-xs text-gray-600 dark:text-gray-400 mb-1\">Recommendation</p>\n                      <p className=\"font-semibold text-gray-900 dark:text-white text-sm\">\n                        {selectedAnalysis.recommendation?.fertilizerType || 'N/A'}\n                      </p>\n                    </div>\n                    {selectedAnalysis.recommendation && (\n                      <div>\n                        <p className=\"text-xs text-gray-600 dark:text-gray-400 mb-1\">Dosage</p>\n                        <p className=\"font-semibold text-gray-900 dark:text-white\">\n                          {selectedAnalysis.recommendation.dosage} {selectedAnalysis.recommendation.unit}\n                        </p>\n                      </div>\n                    )}\n                  </div>\n                </div>\n              ) : (\n                <div className=\"card text-center py-8 text-gray-500 dark:text-gray-400\">\n                  <p>Select an analysis to view details</p>\n                </div>\n              )}\n            </div>\n          </div>\n        </div>\n      )}\n    </div>\n  );\n};
