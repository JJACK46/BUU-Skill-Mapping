import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', {
    state: () => ({
        isLoading: false
    }),
    getters: {
        getLoadingState: (s) => s.isLoading
    },
    actions: {
        setLoading(state: boolean) {
            this.isLoading = state
        }
    }
})