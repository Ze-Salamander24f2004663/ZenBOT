import { LoginCredentials, RegisterData, AuthResponse, User } from '../types';

class AuthService {
  private baseUrl = '/api/auth';

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful login
    if (credentials.email === 'demo@zenbot.com' && credentials.password === 'password') {
      const response: AuthResponse = {
        user: {
          id: '1',
          name: 'Demo User',
          email: credentials.email
        },
        token: 'mock-jwt-token-' + Date.now()
      };
      
      localStorage.setItem('zenbot_token', response.token);
      localStorage.setItem('zenbot_user', JSON.stringify(response.user));
      
      return response;
    }
    
    throw new Error('Invalid credentials');
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const response: AuthResponse = {
      user: {
        id: '1',
        name: data.name,
        email: data.email
      },
      token: 'mock-jwt-token-' + Date.now()
    };
    
    localStorage.setItem('zenbot_token', response.token);
    localStorage.setItem('zenbot_user', JSON.stringify(response.user));
    
    return response;
  }

  logout(): void {
    localStorage.removeItem('zenbot_token');
    localStorage.removeItem('zenbot_user');
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('zenbot_user');
    return userStr ? JSON.parse(userStr) : null;
  }

  getToken(): string | null {
    return localStorage.getItem('zenbot_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const authService = new AuthService();