import { Student } from 'src/types/student';
import http from './index';
export class StudentService {
  static path = 'student';

  static async getAll() {
    const res = await http.get(this.path);
    return res.data;
  }

  static async getOne(id: number) {
    const res = await http.get(`${this.path}/${id}`);
    return res.data;
  }

  static async createOne(obj: Student) {
    const res = await http.post(this.path, obj);
    return res.data;
  }

  static async updateOne(obj: Student) {
    const res = await http.patch(this.path, obj);
    return res.data;
  }

  static async removeOne(id: number) {
    const res = await http.delete(`${this.path}/${id}`);
    return res.data;
  }
}
