import { defineStore } from 'pinia';
import { SessionStorage } from 'quasar';
import { EnumUserRole } from 'src/data/roles';
import AuthService from 'src/services/auth';
import type { Payload } from 'src/types/payload';

export interface AuthState {
  payload: Payload | null;
  form: {
    email: string;
    password: string;
  };
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    payload: null,
    form: {
      email: '',
      password: '',
    },
  }),

  getters: {
    isAdmin: (s) => s.payload?.user.role === EnumUserRole.ADMIN,
    getRole: (s) => s.payload?.user.role,
    getAvatarUrl: (s) => s.payload?.user.avatarUrl,
    getAccessToken: (s) => s.payload?.accessToken,
    getName: (s) =>
      s.payload?.user.instructor?.thaiName ||
      s.payload?.user.student?.thaiName ||
      s.payload?.user.email,
  },

  actions: {
    loginGoogle() {
      return AuthService.loginGoogle();
    },

    async login() {
      const data = await AuthService.login(this.form.email, this.form.password);
      if (data) {
        this.payload = data;
        SessionStorage.set('userPayload', data);
        await this.router.push('dashboard');
      }
    },

    handleForgetPassword() {
      // * not implement yet
    },
    async getProfile() {
      return (this.payload = await AuthService.fetchProfile());
    },

    async logout() {
      if (!this.payload) {
        return;
      }
      await AuthService.logout(this.payload?.user.id);
    },

    setUserPayload(payload: Payload) {
      this.payload = payload;
      // Save to session storage
      SessionStorage.setItem('userPayload', payload);
    },
    loadUserFromSession() {
      const storedPayload = SessionStorage.getItem('userPayload');
      if (storedPayload) {
        this.payload = JSON.parse(JSON.stringify(storedPayload));
      }
    },
  },
});
