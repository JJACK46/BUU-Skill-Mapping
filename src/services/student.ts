import { Student } from 'src/types/student';
import { api } from 'boot/axios';
import { PageParams } from 'src/types/pagination';
export class StudentService {

  static async postImportedStudents(items: unknown) {
    const res = await api.post(`${this.path}/import`, items);
    return res.data;
  }
  static path = 'students';

  static async fetchByPage(p: PageParams) {
    const response = await api.get(`${this.path}/pages`, { params: p });
    return response.data;
  }

  static async getAll() {
    const res = await api.get(this.path);
    return res.data;
  }

  static async getOne(id: number) {
    const res = await api.get(`${this.path}/${id}`);
    return res.data;
  }

  static async createOne(obj: Student) {
    const res = await api.post(this.path, obj);
    return res.data;
  }

  static async updateOne(obj: Student) {
    const res = await api.patch(this.path, obj);
    return res.data;
  }

  static async removeOne(id: number) {
    const res = await api.delete(`${this.path}/${id}`);
    return res.data;
  }
}
