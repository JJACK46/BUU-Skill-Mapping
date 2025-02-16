import type { Student } from 'src/types/student';
import { api } from 'boot/axios';
import type { PageParams } from 'src/types/pagination';
export class StudentService {
  static async postImportedStudents(items: unknown) {
    const res = await api.post(`${this.path}/import`, items);
    return res.data;
  }
  static path = 'students';

  static async fetchData(p?: Partial<PageParams>) {
    const { data } = await api.get(this.path, { params: p });
    return {
      data: data[0],
      total: data[1],
    };
  }

  static async getOne(id: number) {
    const res = await api.get(`${this.path}/${id}`);
    return res.data;
  }

  static async getSkillTree(id: number) {
    const res = await api.get(`${this.path}/skill-tree/${id}`);
    return res.data;
  }

  static async createOne(obj: Partial<Student>) {
    const res = await api.post(this.path, obj);
    return res.data;
  }

  static async updateOne(obj: Partial<Student>) {
    const res = await api.patch(`${this.path}/${obj.id}`, obj);
    return res.data;
  }

  static async removeOne(id: number) {
    const res = await api.delete(`${this.path}/${id}`);
    return res.data;
  }
}
