import type { PageParams } from 'src/types/pagination';
import { api } from 'src/boot/axios';
import type { Subject } from 'src/types/subject';
import { HttpStatusCode } from 'axios';

export class SubjectService {
  static path = 'subjects';

  static async getAll(p?: Partial<PageParams>) {
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

  static async createOne(obj: Partial<Subject>) {
    const res = await api.post(this.path, obj);
    return res.status === HttpStatusCode.Created;
  }

  static async updateOne(obj: Partial<Subject>) {
    try {
      const res = await api.patch(`${this.path}/${obj.id}`, obj);
      return res.status === HttpStatusCode.Ok;
    } catch (error) {
      console.error(error);
    }
  }

  static async removeOne(id: string) {
    const res = await api.delete(`${this.path}/${id}`);
    return res.status === HttpStatusCode.Ok;
  }
}
