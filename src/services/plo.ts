import type { PLO } from 'src/types/plo';
import { api } from 'boot/axios';
import type { PageParams } from 'src/types/pagination';
import { HttpStatusCode } from 'axios';
export class PlosService {
  static path = 'plos';
  static async getAll(p?: Partial<PageParams>) {
    const { data } = await api.get(this.path, { params: p });
    return {
      data: data[0],
      total: data[1],
    };
  }

  static async getAllInCurr(currId: number) {
    const res = await api.get(`${this.path}/curriculumId/${currId}`);
    return res.data;
  }

  static async getOne(id: string) {
    const res = await api.get(`${this.path}/${id}`);
    return res.data;
  }

  static async createOne(obj: Partial<PLO>) {
    const res = await api.post(this.path, obj);
    return res.status === HttpStatusCode.Created;
  }

  static async updateOne(obj: Partial<PLO>) {
    const res = await api.patch(`${this.path}/${obj.id}`, obj);
    return res.status === HttpStatusCode.Ok;
  }

  static async removeOne(id: number) {
    const res = await api.delete(`${this.path}/${id}`);
    return res.status === HttpStatusCode.Ok;
  }
}
