import { defineStore, acceptHMRUpdate } from 'pinia';

type Tabs = 'notifications' | 'settings';

export const useGlobalStore = defineStore('global', {
  state: () => ({
    leftDrawerOpen: false,
    rightDrawerOpen: false,
    isLoading: false,
    currentTab: '' as Tabs,
  }),
  getters: {
    getLoadingState: (s) => s.isLoading,
  },
  actions: {
    setLoading(state: boolean) {
      this.isLoading = state;
    },
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    toggleRightDrawer(tab?: Tabs) {
      if (!tab) {
        this.rightDrawerOpen = false;
        return;
      }
      this.currentTab = tab;
      this.rightDrawerOpen = !this.rightDrawerOpen;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGlobalStore, import.meta.hot));
}
