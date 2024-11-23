import { defineStore } from 'pinia';
import AuthService from 'src/services/auth';
import { Payload } from 'src/types/payload';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    profile: {} as Payload | null,
  }),

  getters: {
    isSignIn: (s) => !!s.profile,
    getRole: (s) => s.profile?.role
  },

  actions: {
    async loginGoogle() {
      return AuthService.loginGoogle();
    },

    async getProfile() {
      return (this.profile = await AuthService.fetchProfile());
    },

    async logout() {
      return await AuthService.logout();
    },
  },
});
