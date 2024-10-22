import { api } from 'boot/axios';
import { AxiosResponse } from 'axios';
import { Payload } from 'src/types/payload';

class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse> {
    const res = await api.post('/auth/login', { email, password });
    return res.data;
  }

  static async isAuthenticated(): Promise<boolean> {
    return !!localStorage.getItem('token');
  }

  static async loginGoogle() {
    localStorage.removeItem('token');
    window.location.href = api.defaults.baseURL + '/auth/google';
  }

  static async logout(): Promise<AxiosResponse> {
    try {
      const res = await api.post('/auth/logout', { withCredentials: true });
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
      const res = await api.get<Payload>('auth/profile');
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
