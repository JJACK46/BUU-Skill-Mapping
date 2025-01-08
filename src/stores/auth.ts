import { defineStore } from 'pinia';
import { UserRole } from 'src/enums/roles';
import AuthService from 'src/services/auth';
import type { Payload } from 'src/types/payload';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    profile: {} as Payload | null,
  }),

  getters: {
    isSignIn: (s) => !!s.profile,
    isAdmin: (s) => s.profile?.role === UserRole.Admin,
    getRole: (s) => s.profile?.role,
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
