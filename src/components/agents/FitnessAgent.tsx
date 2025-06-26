import React, { useState } from 'react';
import { Activity, Clock, Send, Loader, Zap } from 'lucide-react';
import { apiService } from '../../services/api';
import { FitnessResponse } from '../../types';

export const FitnessAgent: React.FC = () => {
  const [energyLevel, setEnergyLevel] = useState('');
  const [response, setResponse] = useState<FitnessResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const energyLevels = [
    { value: 'high', label: 'High Energy', icon: '⚡' },
    { value: 'moderate', label: 'Moderate Energy', icon: '🔋' },
    { value: 'tired', label: 'Low Energy/Tired', icon: '😴' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!energyLevel.trim()) return;

    setIsLoading(true);
    try {
      const result = await apiService.getFitnessRecommendations({ energyLevel });
      setResponse(result);
    } catch (error) {
      console.error('Error getting fitness recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            How's your energy level today?
          </label>
          <div className="space-y-2">
            {energyLevels.map((level) => (
              <button
                key={level.value}
                type="button"
                onClick={() => setEnergyLevel(level.value)}
                className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center ${
                  energyLevel === level.value
                    ? 'bg-orange-100 text-orange-700 border-2 border-orange-300'
                    : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
                }`}
              >
                <span className="text-lg mr-3">{level.icon}</span>
                {level.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={!energyLevel || isLoading}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Creating workout...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Get Workout Plan
            </>
          )}
        </button>
      </form>

      {response && (
        <div className="space-y-4 animate-fadeIn">
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Activity className="w-5 h-5 text-orange-600 mr-2" />
              <h4 className="font-semibold text-orange-900">{response.workout.name}</h4>
            </div>
            <div className="flex items-center mb-4 text-orange-700">
              <Clock className="w-4 h-4 mr-2" />
              <span className="text-sm">{response.workout.duration}</span>
            </div>
            <div className="space-y-2">
              {response.workout.exercises.map((exercise, index) => (
                <div key={index} className="bg-white rounded p-3">
                  <div className="text-sm text-orange-700 flex items-center">
                    <span className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-xs font-medium text-orange-600 mr-3">
                      {index + 1}
                    </span>
                    {exercise}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Zap className="w-5 h-5 text-red-600 mr-2" />
              <h4 className="font-semibold text-red-900">Fitness Tips</h4>
            </div>
            <ul className="space-y-2">
              {response.tips.map((tip, index) => (
                <li key={index} className="text-sm text-red-700 flex items-start">
                  <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};