import { useState, useEffect } from 'react';
import { User } from '../types';
import { authService } from '../services/auth';

interface AuthResponse {
  user: User | null;
  token?: string;
  error?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize user on mount
    const init = async () => {
      setIsLoading(true);
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch {
        setUser(null);
        // optionally set error here
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  const login = async (credentials: { email: string; password: string }): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.login(credentials);
      if (response.user) {
        setUser(response.user);
      } else {
        setUser(null);
      }
      return response;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      setUser(null);
      return { user: null, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: { name: string; email: string; password: string }): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.register(data);
      if (response.user) {
        setUser(response.user);
      } else {
        setUser(null);
      }
      return response;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setError(message);
      setUser(null);
      return { user: null, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
};
