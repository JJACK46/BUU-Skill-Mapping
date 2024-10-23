import { defineStore } from 'pinia';
import AuthService from 'src/services/auth';
import { UserService } from 'src/services/user';
import { Payload } from 'src/types/payload';
import { User } from 'src/types/user';
import { PageParams } from 'src/types/pagination';
import { computed, reactive, ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  // State
  const profile = ref<Payload | null>(null);
  const dialogState = ref(false);
  const search = ref('');
  const loading = ref(false);

  const pageParams = ref<PageParams>({
    page: 1,
    limit: 10,
    sort: '',
    order: 'ASC',
    search: '',
    columnId: '',
    columnName: '',
  });

  const formUser = reactive<User>({
    id: '',
    email: '',
    password: '',
    role: {
      id: '',
      name: '',
    },
  });

  const isSignIn = computed(() => !!profile.value);
  async function loginGoogle() {
    return await AuthService.loginGoogle();
  }
  async function getProfile() {
    const profileData = await AuthService.fetchProfile();
    profile.value = profileData;
    return profileData; // Ensure it returns the data
  }
  async function logout() {
    await AuthService.logout();
    profile.value = null;
  }

  const users = ref<User[]>([]);
  const totalUsers = ref(0);

  async function fetchUserPage(params: PageParams) {
    const res = await UserService.getAllByPage(params);
    users.value = res.data.data;
    totalUsers.value = res.data.total;
  }
  async function fetchUser() {
    const res = await UserService.getAll();
    users.value = res.data.data;
    totalUsers.value = res.data.total;
  }
  // Getters
  // async function fetchData(
  //   searchQuery?: string,
  //   columnId?: string | null,
  //   columnName?: string | null
  // ) {
  //   loading.value = true;
  //   if (searchQuery) pageParams.value.search = searchQuery;

  //   if (columnId && columnName) {
  //     pageParams.value.columnId = columnId;
  //     pageParams.value.columnName = columnName;
  //   } else {
  //     pageParams.value.columnId = pageParams.value.columnId || '';
  //     pageParams.value.columnName = pageParams.value.columnName || '';
  //   }

  //   if (columnId && columnName === 'null') {
  //     pageParams.value.columnId = '';
  //     pageParams.value.columnName = '';
  //   }

  //   const res = await UserService.fetchByPage(pageParams.value);
  //   users.value = res.data;
  //   loading.value = false;
  // }

  async function handleSave() {
    await UserService.createOne(formUser);
    dialogState.value = false;
    window.location.reload();
  }

  // Return state, getters, and actions
  return {
    profile,
    isSignIn,
    dialogState,
    search,
    loading,
    pageParams,
    formUser,
    users,
    loginGoogle,
    getProfile,
    logout,
    handleSave,
    fetchUserPage,
    fetchUser,
  };
});
