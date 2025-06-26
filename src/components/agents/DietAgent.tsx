import React, { useState } from 'react';
import { Utensils, Target, Send, Loader } from 'lucide-react';
import { apiService } from '../../services/api';
import { DietResponse } from '../../types';

export const DietAgent: React.FC = () => {
  const [goal, setGoal] = useState('');
  const [response, setResponse] = useState<DietResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const goals = ['weight loss', 'muscle gain', 'glowing skin', 'energy boost', 'better focus'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal.trim()) return;

    setIsLoading(true);
    try {
      const result = await apiService.getDietRecommendations({ goal });
      setResponse(result);
    } catch (error) {
      console.error('Error getting diet recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What's your health goal?
          </label>
          <div className="grid grid-cols-1 gap-2">
            {goals.map((goalOption) => (
              <button
                key={goalOption}
                type="button"
                onClick={() => setGoal(goalOption)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all text-left ${
                  goal === goalOption
                    ? 'bg-green-100 text-green-700 border-2 border-green-300'
                    : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
                }`}
              >
                {goalOption}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={!goal || isLoading}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-4 rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Creating meal plan...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Get Diet Plan
            </>
          )}
        </button>
      </form>

      {response && (
        <div className="space-y-4 animate-fadeIn">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Utensils className="w-5 h-5 text-green-600 mr-2" />
              <h4 className="font-semibold text-green-900">Today's Meal Plan</h4>
            </div>
            <div className="space-y-3">
              <div className="bg-white rounded p-3">
                <div className="font-medium text-green-800 text-sm mb-1">Breakfast</div>
                <div className="text-sm text-green-700">{response.mealPlan.breakfast}</div>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-medium text-green-800 text-sm mb-1">Lunch</div>
                <div className="text-sm text-green-700">{response.mealPlan.lunch}</div>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-medium text-green-800 text-sm mb-1">Dinner</div>
                <div className="text-sm text-green-700">{response.mealPlan.dinner}</div>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-medium text-green-800 text-sm mb-1">Snacks</div>
                <div className="text-sm text-green-700">
                  {response.mealPlan.snacks.join(' • ')}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Target className="w-5 h-5 text-emerald-600 mr-2" />
              <h4 className="font-semibold text-emerald-900">Diet Tips</h4>
            </div>
            <ul className="space-y-2">
              {response.tips.map((tip, index) => (
                <li key={index} className="text-sm text-emerald-700 flex items-start">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
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