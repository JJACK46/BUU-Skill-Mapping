import { useRouter } from 'vue-router';
import http from './index';
import { AxiosError, AxiosResponse } from 'axios';
import { Payload } from 'src/types/payload';

class AuthService {
  private static router = useRouter();
  static async login(email: string, password: string): Promise<AxiosResponse> {
    const res = await http.post('/auth/login', { email, password });
    this.router.push('/');
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
      window.location.reload();
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async profile(): Promise<Payload | null> {
    try {
      const res = await http.get<Payload>('auth/profile');
      if (res.status === 401) {
        this.router.replace('login');
        return null;
      }
      return res.data;
    } catch (err: AxiosError | unknown) {
      if (err instanceof AxiosError && err.response?.status === 401) {
        this.router.replace('/login');
      }
      console.error(err);
      return null;
    }
  }
}
export default AuthService;
