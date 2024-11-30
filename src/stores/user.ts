import { defineStore } from 'pinia';
import { QTableProps } from 'quasar';
import { UserService } from 'src/services/user';
import { PageParams } from 'src/types/pagination';
import { User } from 'src/types/user';
import { convertToPageParams, defaultPagination } from 'src/utils/pagination';

export const useUserStore = defineStore('user', {
  state: () => ({
    form: {} as User, // ฟอร์มสำหรับเพิ่ม/แก้ไขผู้ใช้
    users: [] as User[], // รายชื่อผู้ใช้
    dialogState: false, // สถานะการเปิด/ปิด Dialog
    search: '', // ข้อความค้นหา
    pagination: {
      sortBy: 'id',
      descending: false,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: undefined,
    } as QTableProps['pagination'], // การตั้งค่าการแบ่งหน้า
    editMode: false, // โหมดแก้ไขข้อมูล
    totalUsers: 0, // จำนวนผู้ใช้ทั้งหมด
    editedUser: null as User | null, // ผู้ใช้ที่กำลังถูกแก้ไข
    loading: false, // สถานะโหลดข้อมูล
  }),

  actions: {
    // ดึงข้อมูลผู้ใช้งาน (แบ่งหน้า)
    async fetchData(params: QTableProps['pagination']) {
      this.loading = true;
      const ownPaging = {
        page: params?.page || 1,
        limit: params?.rowsPerPage || 10,
        sort: params?.sortBy || '',
        order: params?.descending ? 'DESC' : 'ASC',
        search: this.search || '',
      } as PageParams;

      try {
        const { data, total } = await UserService.getAll(ownPaging);
        this.users = data;
        this.pagination = { ...this.pagination, rowsNumber: total };
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        this.loading = false;
      }
    },

    // ดึงข้อมูลผู้ใช้ทั้งหมด (ไม่แบ่งหน้า)
    async fetchUsers() {
      this.loading = true;
      try {
        const res = await UserService.getAll();
        this.users = res.data.data;
        this.totalUsers = res.data.total;
      } catch (error) {
        console.error('Error fetching all users:', error);
      } finally {
        this.loading = false;
      }
    },

    // บันทึกข้อมูลผู้ใช้ (สร้างใหม่หรือแก้ไข)
    async handleSave(newForm?: Partial<User>) {
      this.loading = true;
      try {
        if (this.editMode && newForm) {
          await UserService.updateOne(newForm);
        } else {
          await UserService.createOne(this.form);
        }
        await this.fetchUsers();
        this.toggleDialog(); // ปิด Dialog
      } catch (error) {
        console.error('Error saving user:', error);
      } finally {
        this.loading = false;
      }
    },

    // ลบผู้ใช้งาน
    async deleteUser(userId: number) {
      this.loading = true;
      try {
        await UserService.deleteOne(userId);
        await this.fetchUsers(); // รีเฟรชข้อมูล
      } catch (error) {
        console.error('Error deleting user:', error);
      } finally {
        this.loading = false;
      }
    },

    // เปิด/ปิด Dialog
    toggleDialog(editingUser?: User | null) {
      this.dialogState = !this.dialogState;
      this.editedUser = editingUser || null;
    },

    // อัปเดตค่าการแบ่งหน้า
    updatePageParams(params: Partial<PageParams>) {
      this.pagination = { ...this.pagination, ...params };
      this.fetchData(this.pagination);
    },

    // ตั้งค่าการค้นหา
    updateSearch(searchTerm: string) {
      this.search = searchTerm;
      this.fetchData(this.pagination);
    },
  },
});
