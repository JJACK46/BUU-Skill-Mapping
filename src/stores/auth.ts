import { defineStore } from 'pinia';
import { EnumUserRole } from 'src/enums/roles';
import AuthService from 'src/services/auth';
import type { Payload } from 'src/types/payload';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    profile: null as Payload | null,
  }),

  getters: {
    isSignedIn: (s) => !!s.profile,
    isAdmin: (s) => s.profile?.role === EnumUserRole.ADMIN,
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
      await AuthService.logout();
      window.location.reload();
    },
  },
});
