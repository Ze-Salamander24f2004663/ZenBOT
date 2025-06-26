export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface MentalHealthInput {
  mood: string;
}

export interface MentalHealthResponse {
  musicSuggestions: string[];
  wellnessTips: string[];
}

export interface DietInput {
  goal: string;
}

export interface DietResponse {
  mealPlan: {
    breakfast: string;
    lunch: string;
    dinner: string;
    snacks: string[];
  };
  tips: string[];
}

export interface FitnessInput {
  energyLevel: string;
}

export interface FitnessResponse {
  workout: {
    name: string;
    duration: string;
    exercises: string[];
  };
  tips: string[];
}

export interface GoalTrackerInput {
  waterIntake: number;
  sleepHours: number;
  focusHours: number;
}

export interface GoalTrackerResponse {
  score: number;
  summary: string;
  recommendations: string[];
}