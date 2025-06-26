import React from 'react';
import { LogOut, Leaf, Brain, Apple, Dumbbell, Target } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { MentalHealthAgent } from '../agents/MentalHealthAgent';
import { DietAgent } from '../agents/DietAgent';
import { FitnessAgent } from '../agents/FitnessAgent';
import { GoalTrackerAgent } from '../agents/GoalTrackerAgent';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login
  };

  return (
    <div className="min-h-screen bg-black text-purple-600">
      {/* Header */}
      <header className="bg-black border-b border-purple-600 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="ml-4">
                <h1 className="text-xl font-semibold text-purple-600">ZenBot</h1>
                <p className="text-sm text-purple-600">Welcome back, {user?.name}!</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-white rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Welcome Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-purple-600 mb-4">
            Your Wellness Dashboard
          </h2>
          <p className="text-lg text-purple-600 max-w-2xl mx-auto">
            Connect with your AI wellness agents to improve your mental health, diet, fitness, and daily goals.
          </p>
        </div>

        {/* Agent Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mental Health Agent */}
          <div className="bg-black border border-purple-600 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-white">Mental Health Agent</h3>
                  <p className="text-purple-100">Mood-based wellness support</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <MentalHealthAgent />
            </div>
          </div>

          {/* Diet Agent */}
          <div className="bg-black border border-green-600 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                  <Apple className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-white">Diet Agent</h3>
                  <p className="text-green-100">Personalized nutrition plans</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <DietAgent />
            </div>
          </div>

          {/* Fitness Agent */}
          <div className="bg-black border border-orange-600 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                  <Dumbbell className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-white">Fitness Agent</h3>
                  <p className="text-orange-100">Energy-based workouts</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <FitnessAgent />
            </div>
          </div>

          {/* Goal Tracker Agent */}
          <div className="bg-black border border-blue-600 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-white">Goal Tracker Agent</h3>
                  <p className="text-blue-100">Daily wellness tracking</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <GoalTrackerAgent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
