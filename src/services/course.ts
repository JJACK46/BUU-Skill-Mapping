import { Course } from 'src/types/course';
import { api } from 'boot/axios';

export class CourseService {
  static path = 'teachers';

  static async getAll() {
    const res = await api.get(this.path);
    return res.data;
  }

  static async getOne(id: number) {
    const res = await api.get(`${this.path}/${id}`);
    return res.data;
  }

  static async createOne(obj: Course) {
    const res = await api.post(this.path, obj);
    return res.data;
  }

  static async updateOne(obj: Course) {
    const res = await api.patch(this.path, obj);
    return res.data;
  }

  static async removeOne(id: number) {
    const res = await api.delete(`${this.path}/${id}`);
    return res.data;
  }
}
