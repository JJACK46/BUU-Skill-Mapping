import http from './index';
export class AuthService {
  static async login(email: string, password: string) {
    const response = await http.post('auth/login', {
      email,
      password,
    });
    return response.data;
  }

  static async loginGoogle() {
    const response = await http.post('auth/google', {});
    return response.data;
  }

  static async fetchProfile() {
    const response = await http.get('auth/profile');
    return response.data;
  }
}
