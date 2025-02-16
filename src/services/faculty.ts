import { api } from 'src/boot/axios';
import type { PageParams } from 'src/types/pagination';
import type { Faculty } from 'src/types/faculty';

export class FacultyService {
  static path = 'faculties';

  static async getAll(p?: Partial<PageParams>) {
    const res = await api.get(this.path, { params: p });
    return res.data;
  }

  static async getOne(id: string) {
    const res = await api.get(`${this.path}/${id}`);
    return res.data;
  }

  static async createOne(obj: Partial<Faculty>) {
    delete obj.branch;
    const res = await api.post(this.path, obj);
    return res.data;
  }

  static async updateOne(obj: Partial<Faculty>) {
    delete obj.branch;
    const res = await api.patch(`${this.path}/${obj.id}`, obj);
    return res.data;
  }

  static async removeOne(id: string) {
    const res = await api.delete(`${this.path}/${id}`);
    return res.data;
  }
}
