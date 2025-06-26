import React, { useState } from 'react';
import { Droplets, Moon, Focus, TrendingUp, Send, Loader } from 'lucide-react';
import { apiService } from '../../services/api';
import { GoalTrackerResponse } from '../../types';

export const GoalTrackerAgent: React.FC = () => {
  const [formData, setFormData] = useState({
    waterIntake: 0,
    sleepHours: 0,
    focusHours: 0
  });
  const [response, setResponse] = useState<GoalTrackerResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    try {
      const result = await apiService.getGoalTrackerSummary(formData);
      setResponse(result);
    } catch (error) {
      console.error('Error getting goal tracker summary:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: Math.max(0, value)
    }));
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          {/* Water Intake */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Droplets className="w-5 h-5 text-blue-600 mr-2" />
              <label className="text-sm font-medium text-blue-900">
                Water Intake (glasses today)
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => handleChange('waterIntake', formData.waterIntake - 1)}
                className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 hover:bg-blue-300"
              >
                -
              </button>
              <span className="text-2xl font-bold text-blue-700 min-w-[3ch] text-center">
                {formData.waterIntake}
              </span>
              <button
                type="button"
                onClick={() => handleChange('waterIntake', formData.waterIntake + 1)}
                className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 hover:bg-blue-300"
              >
                +
              </button>
              <span className="text-sm text-blue-600 ml-2">/ 8 glasses</span>
            </div>
          </div>

          {/* Sleep Hours */}
          <div className="bg-indigo-50 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Moon className="w-5 h-5 text-indigo-600 mr-2" />
              <label className="text-sm font-medium text-indigo-900">
                Sleep Hours (last night)
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => handleChange('sleepHours', formData.sleepHours - 0.5)}
                className="w-8 h-8 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-700 hover:bg-indigo-300"
              >
                -
              </button>
              <span className="text-2xl font-bold text-indigo-700 min-w-[3ch] text-center">
                {formData.sleepHours}
              </span>
              <button
                type="button"
                onClick={() => handleChange('sleepHours', formData.sleepHours + 0.5)}
                className="w-8 h-8 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-700 hover:bg-indigo-300"
              >
                +
              </button>
              <span className="text-sm text-indigo-600 ml-2">hours</span>
            </div>
          </div>

          {/* Focus Hours */}
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Focus className="w-5 h-5 text-purple-600 mr-2" />
              <label className="text-sm font-medium text-purple-900">
                Focused Study/Work Hours (today)
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => handleChange('focusHours', formData.focusHours - 0.5)}
                className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center text-purple-700 hover:bg-purple-300"
              >
                -
              </button>
              <span className="text-2xl font-bold text-purple-700 min-w-[3ch] text-center">
                {formData.focusHours}
              </span>
              <button
                type="button"
                onClick={() => handleChange('focusHours', formData.focusHours + 0.5)}
                className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center text-purple-700 hover:bg-purple-300"
              >
                +
              </button>
              <span className="text-sm text-purple-600 ml-2">hours</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Analyzing progress...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Get Wellness Summary
            </>
          )}
        </button>
      </form>

      {response && (
        <div className="space-y-4 animate-fadeIn">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                <h4 className="font-semibold text-blue-900">Wellness Score</h4>
              </div>
              <div className={`px-4 py-2 rounded-full font-bold text-lg ${getScoreColor(response.score)}`}>
                {response.score}%
              </div>
            </div>
            <p className="text-blue-800 mb-4">{response.summary}</p>
            
            <div className="space-y-2">
              <h5 className="font-medium text-blue-900 mb-2">Recommendations:</h5>
              {response.recommendations.map((rec, index) => (
                <div key={index} className="bg-white rounded p-3">
                  <div className="text-sm text-blue-700 flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {rec}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};