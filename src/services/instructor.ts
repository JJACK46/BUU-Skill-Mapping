import type { Instructor } from 'src/types/instructor';
import type { PageParams } from 'src/types/pagination';
import { api } from 'src/boot/axios';
import type { DataResponse } from 'src/types/data-response';

export class InstructorService {
  static path = 'instructors';

  static async getAll(p?: Partial<PageParams>) {
    const res = await api.get<DataResponse>(this.path, { params: p });
    return res.data;
  }

  static async getOne(id: number) {
    const res = await api.get(`${this.path}/${id}`);
    return res.data;
  }

  static async findExistCode(code: string) {
    const res = await api.get(this.path, { params: { code } });
    return !!res.data;
  }

  static async createOne(obj: Partial<Instructor>) {
    const res = await api.post(this.path, obj);
    return res.data;
  }

  static async updateOne(obj: Instructor) {
    const res = await api.patch(this.path, obj);
    return res.data;
  }

  static async removeOne(id: number) {
    const res = await api.delete(`${this.path}/${id}`);
    return res.data;
  }
}
