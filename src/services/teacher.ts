import { Teacher } from 'src/types/teacher';
import http from './index';

export class TeacherService {
  static path = 'teachers';

  static async getAll() {
    const res = await http.get(this.path);
    return res.data;
  }

  static async getOne(id: number) {
    const res = await http.get(`${this.path}/${id}`);
    return res.data;
  }

  static async createOne(obj: Teacher) {
    const res = await http.post(this.path, obj);
    return res.data;
  }

  static async updateOne(obj: Teacher) {
    const res = await http.patch(this.path, obj);
    return res.data;
  }

  static async removeOne(id: number) {
    const res = await http.delete(`${this.path}/${id}`);
    return res.data;
  }
}
