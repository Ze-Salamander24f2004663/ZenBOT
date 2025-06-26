import React, { useState } from 'react';
import { Music, Heart, Send, Loader } from 'lucide-react';
import { apiService } from '../../services/api';
import { MentalHealthResponse } from '../../types';

export const MentalHealthAgent: React.FC = () => {
  const [mood, setMood] = useState('');
  const [response, setResponse] = useState<MentalHealthResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const moods = ['stressed', 'happy', 'lonely', 'anxious', 'excited', 'tired', 'confident'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mood.trim()) return;

    setIsLoading(true);
    try {
      const result = await apiService.getMentalHealthSuggestions({ mood });
      setResponse(result);
    } catch (error) {
      console.error('Error getting mental health suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            How are you feeling today?
          </label>
          <div className="grid grid-cols-2 gap-2">
            {moods.map((moodOption) => (
              <button
                key={moodOption}
                type="button"
                onClick={() => setMood(moodOption)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  mood === moodOption
                    ? 'bg-purple-100 text-purple-700 border-2 border-purple-300'
                    : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
                }`}
              >
                {moodOption}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={!mood || isLoading}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Getting suggestions...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Get Wellness Tips
            </>
          )}
        </button>
      </form>

      {response && (
        <div className="space-y-4 animate-fadeIn">
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Music className="w-5 h-5 text-purple-600 mr-2" />
              <h4 className="font-semibold text-purple-900">Music Recommendations</h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {response.musicSuggestions.map((music, index) => (
                <div key={index} className="bg-white rounded px-3 py-2 text-sm text-purple-700">
                  {music}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-pink-50 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Heart className="w-5 h-5 text-pink-600 mr-2" />
              <h4 className="font-semibold text-pink-900">Wellness Tips</h4>
            </div>
            <ul className="space-y-2">
              {response.wellnessTips.map((tip, index) => (
                <li key={index} className="text-sm text-pink-700 flex items-start">
                  <span className="w-2 h-2 bg-pink-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
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