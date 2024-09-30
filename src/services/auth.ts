import http from './index';
import { AxiosResponse } from 'axios';
import { Payload } from 'src/types/payload';

class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse> {
    const res = await http.post('/auth/login', { email, password });
    return res.data;
  }

  static async isAuthenticated(): Promise<boolean> {
    return !!localStorage.getItem('token');
  }

  static loginGoogle() {
    localStorage.removeItem('token');
    window.location.href = http.defaults.baseURL + '/auth/google';
  }

  static async logout(): Promise<AxiosResponse> {
    try {
      const res = await http.post('/auth/logout', { withCredentials: true });
      localStorage.removeItem('token');
      window.location.replace('/login');
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async fetchProfile(): Promise<Payload | null> {
    try {
      const res = await http.get<Payload>('auth/profile');
      if (!res.data) {
        return null;
      }
      return res.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
export default AuthService;
