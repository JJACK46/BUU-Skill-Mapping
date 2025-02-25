import { api } from 'boot/axios';
import type { AxiosResponse } from 'axios';
import type { Payload } from 'src/types/payload';

class AuthService {
  static async login(email: string, password: string) {
    const res = await api.post<Payload>('/auth/login', {
      email,
      password,
    });
    return res?.data;
  }

  static async loginGoogle() {
    localStorage.removeItem('token');
    window.location.href = api.defaults.baseURL + '/auth/google';
  }

  static async logout(userId: number): Promise<AxiosResponse> {
    try {
      const res = await api.get(`/auth/logout/${userId}`, {
        withCredentials: true,
      });
      sessionStorage.removeItem('userPayload');
      window.location.reload();
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
