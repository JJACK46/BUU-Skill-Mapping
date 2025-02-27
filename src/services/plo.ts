import type { PLO } from 'src/types/plo';
import { api } from 'boot/axios';
import type { PageParams } from 'src/types/pagination';
export class PlosService {
  static path = 'plos';
  static async getAll(p?: Partial<PageParams>) {
    const res = await api.get(this.path, { params: p });
    return res.data;
  }

  static async getOne(id: string) {
    const res = await api.get(`${this.path}/${id}`);
    return res.data;
  }

  static async createOne(obj: Partial<PLO>) {
    const res = await api.post(this.path, obj);
    return res.status
  }

  static async updateOne(obj: Partial<PLO>) {
    const res = await api.patch(`${this.path}/${obj.id}`, obj);
    return res.status 
  }

  static async removeOne(id: number) {
    const res = await api.delete(`${this.path}/${id}`);
    return res.status 
  }
}
