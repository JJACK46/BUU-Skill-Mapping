import { api } from 'boot/axios';
import type { AxiosResponse } from 'axios';
import type { Payload } from 'src/types/payload';

class AuthService {
  static async login(email: string, password: string) {
    const { data } = await api.post<Payload>('/auth/login', {
      email,
      password,
    });
    return data;
  }

  static async loginGoogle() {
    localStorage.removeItem('token');
    window.location.href = api.defaults.baseURL + '/auth/google';
  }

  static async logout(): Promise<AxiosResponse> {
    try {
      const res = await api.post('/auth/logout', { withCredentials: true });
      localStorage.removeItem('token');
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async fetchProfile(): Promise<Payload | null> {
    try {
      const { data } = await api.get<Payload>('auth/profile');
      if (!data) {
        return null;
      }
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
export default AuthService;
