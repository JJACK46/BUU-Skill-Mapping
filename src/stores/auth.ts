import { defineStore } from 'pinia';
import { SessionStorage } from 'quasar';
import { EnumUserRole } from 'src/data/roles';
import AuthService from 'src/services/auth';
import type { Payload } from 'src/types/payload';
import { type Router, useRouter } from 'vue-router';

export interface AuthState {
  payload: Payload | null;
  form: {
    email: string;
    password: string;
  };
  isAuthenticated: boolean;
  router: Router;
}

export const useAuthStore = defineStore('auth', {
  hydrate(storeState) {
    const storedPayload = SessionStorage.getItem('userPayload');
    if (storedPayload) {
      storeState.payload = JSON.parse(JSON.stringify(storedPayload));
      storeState.isAuthenticated = true;
    }
  },
  state: (): AuthState => ({
    payload: null,
    form: {
      email: '',
      password: '',
    },
    isAuthenticated: false,
    router: useRouter(),
  }),

  getters: {
    isSignedIn: (s) => !!s.payload,
    isAdmin: (s) => s.payload?.user.role === EnumUserRole.ADMIN,
    getRole: (s) => s.payload?.user.role,
    getAvatarUrl: (s) => s.payload?.user.avatarUrl,
    getAccessToken: (s) => s.payload?.accessToken,
  },

  actions: {
    async loginGoogle() {
      return AuthService.loginGoogle();
    },

    async login() {
      const data = await AuthService.login(this.form.email, this.form.password);
      if (data) {
        this.payload = data;
        SessionStorage.set('user-payload', data);
        this.router.push('dashboard');
      }
    },

    handleForgetPassword() {
      // * not implement yet
    },
    async getProfile() {
      return (this.payload = await AuthService.fetchProfile());
    },

    async logout() {
      await AuthService.logout();
      window.location.reload();
    },

    setUserPayload(payload: Payload) {
      this.payload = payload;
      // Save to session storage
      SessionStorage.setItem('userPayload', payload);
    },
    loadUserFromSession() {
      const storedPayload = SessionStorage.getItem('userPayload');
      if (storedPayload) {
        this.payload = storedPayload;
      }
    },
  },
});
