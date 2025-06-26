import {
  MentalHealthInput,
  MentalHealthResponse,
  DietInput,
  DietResponse,
  FitnessInput,
  FitnessResponse,
  GoalTrackerInput,
  GoalTrackerResponse
} from '../types';

class ApiService {
  private baseUrl = '/api';

  async getMentalHealthSuggestions(input: MentalHealthInput): Promise<MentalHealthResponse> {
    await new Promise(resolve => setTimeout(resolve, 1500));

    const responses: Record<string, MentalHealthResponse> = {
      stressed: {
        musicSuggestions: ['Lo-fi Hip Hop', 'Nature Sounds', 'Classical Piano', 'Ambient Meditation'],
        wellnessTips: [
          'Try the 4-7-8 breathing technique',
          'Take a 10-minute walk outside',
          'Practice progressive muscle relaxation',
          'Write down 3 things you\'re grateful for'
        ]
      },
      happy: {
        musicSuggestions: ['Upbeat Pop', 'Feel-Good Indie', 'Energetic Rock', 'Dance Music'],
        wellnessTips: [
          'Share your joy with a friend',
          'Capture this moment in a journal',
          'Do something creative',
          'Plan something to look forward to'
        ]
      },
      lonely: {
        musicSuggestions: ['Acoustic Folk', 'Soothing Vocals', 'Indie Ballads', 'Gentle Jazz'],
        wellnessTips: [
          'Reach out to a friend or family member',
          'Join a virtual study group',
          'Practice self-compassion meditation',
          'Consider volunteering in your community'
        ]
      },
      anxious: {
        musicSuggestions: ['Calming Instrumentals', 'Guided Meditation', 'Soft Acoustic', 'Nature Soundscapes'],
        wellnessTips: [
          'Practice grounding: 5 things you see, 4 you hear, 3 you touch',
          'Try gentle yoga or stretching',
          'Use a meditation app for 10 minutes',
          'Break overwhelming tasks into smaller steps'
        ]
      }
    };

    return responses[input.mood.toLowerCase()] || responses.stressed;
  }

  async getDietRecommendations(input: DietInput): Promise<DietResponse> {
    await new Promise(resolve => setTimeout(resolve, 1200));

    const responses: Record<string, DietResponse> = {
      'muscle gain': {
        mealPlan: {
          breakfast: 'Greek yogurt with berries, granola, and protein powder',
          lunch: 'Grilled chicken quinoa bowl with vegetables',
          dinner: 'Salmon with sweet potato and steamed broccoli',
          snacks: ['Protein smoothie', 'Mixed nuts', 'Hard-boiled eggs']
        },
        tips: [
          'Aim for 1.6-2.2g protein per kg body weight',
          'Eat within 30 minutes after workouts',
          'Include complex carbs for energy',
          'Stay hydrated with 8-10 glasses of water daily'
        ]
      },
      'weight loss': {
        mealPlan: {
          breakfast: 'Oatmeal with fresh fruits and almonds',
          lunch: 'Large salad with lean protein and olive oil dressing',
          dinner: 'Grilled fish with roasted vegetables',
          snacks: ['Apple with peanut butter', 'Carrot sticks', 'Herbal tea']
        },
        tips: [
          'Create a moderate calorie deficit',
          'Fill half your plate with vegetables',
          'Eat slowly and mindfully',
          'Plan and prep meals in advance'
        ]
      },
      'glowing skin': {
        mealPlan: {
          breakfast: 'Avocado toast with tomatoes and hemp seeds',
          lunch: 'Colorful Buddha bowl with tahini dressing',
          dinner: 'Baked cod with roasted rainbow vegetables',
          snacks: ['Blueberries', 'Green tea', 'Walnuts']
        },
        tips: [
          'Eat foods rich in omega-3 fatty acids',
          'Include antioxidant-rich berries daily',
          'Drink plenty of water for hydration',
          'Limit processed foods and sugar'
        ]
      }
    };

    return responses[input.goal.toLowerCase()] || responses['weight loss'];
  }

  async getFitnessRecommendations(input: FitnessInput): Promise<FitnessResponse> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const responses: Record<string, FitnessResponse> = {
      high: {
        workout: {
          name: 'High-Intensity Circuit Training',
          duration: '45 minutes',
          exercises: [
            'Warm-up: 5-min light cardio',
            'Burpees: 3 sets of 12',
            'Mountain climbers: 3 sets of 20',
            'Jump squats: 3 sets of 15',
            'Push-ups: 3 sets of 12',
            'Cool-down: 5-min stretching'
          ]
        },
        tips: [
          'Stay hydrated throughout your workout',
          'Listen to your body and rest when needed',
          'Maintain proper form over speed',
          'Cool down properly to prevent injury'
        ]
      },
      moderate: {
        workout: {
          name: 'Balanced Strength & Cardio',
          duration: '30 minutes',
          exercises: [
            'Warm-up: 5-min walking',
            'Bodyweight squats: 2 sets of 15',
            'Modified push-ups: 2 sets of 10',
            'Plank hold: 2 sets of 30 seconds',
            'Walking lunges: 2 sets of 12',
            'Gentle stretching: 5 minutes'
          ]
        },
        tips: [
          'Focus on consistent movement',
          'Breathe deeply during exercises',
          'Progress gradually over time',
          'Make it enjoyable with good music'
        ]
      },
      tired: {
        workout: {
          name: 'Gentle Recovery Session',
          duration: '20 minutes',
          exercises: [
            'Gentle neck and shoulder rolls',
            'Cat-cow stretches: 10 repetitions',
            'Seated spinal twists: 5 each side',
            'Light walking: 10 minutes',
            'Deep breathing exercises: 5 minutes'
          ]
        },
        tips: [
          'Honor your body\'s need for rest',
          'Focus on gentle movement and breathing',
          'Consider a short nap if possible',
          'Ensure you\'re getting quality sleep'
        ]
      }
    };

    return responses[input.energyLevel.toLowerCase()] || responses.moderate;
  }

  async getGoalTrackerSummary(input: GoalTrackerInput): Promise<GoalTrackerResponse> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const waterScore = Math.min(input.waterIntake / 8, 1) * 100;
    const sleepScore = input.sleepHours >= 7 && input.sleepHours <= 9 ? 100 : 
                     Math.max(0, 100 - Math.abs(8 - input.sleepHours) * 20);
    const focusScore = Math.min(input.focusHours / 6, 1) * 100;

    const overallScore = Math.round((waterScore + sleepScore + focusScore) / 3);

    let summary = '';
    const recommendations: string[] = [];

    if (overallScore >= 80) {
      summary = 'Excellent work! You\'re maintaining great wellness habits.';
    } else if (overallScore >= 60) {
      summary = 'Good progress! There\'s room for improvement in some areas.';
    } else {
      summary = 'Let\'s work together to build better wellness habits.';
    }

    if (input.waterIntake < 8) {
      recommendations.push(`Increase water intake - aim for ${8 - input.waterIntake} more glasses today`);
    }

    if (input.sleepHours < 7) {
      recommendations.push('Try to get more sleep - aim for 7-9 hours per night');
    } else if (input.sleepHours > 9) {
      recommendations.push('Consider if you might be oversleeping - 7-9 hours is optimal');
    }

    if (input.focusHours < 4) {
      recommendations.push('Set aside more focused study time - even 25-minute blocks help');
    }

    if (recommendations.length === 0) {
      recommendations.push('Keep up the great work with your current routine!');
    }

    return {
      score: overallScore,
      summary,
      recommendations
    };
  }
}

export const apiService = new ApiService();