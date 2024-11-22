import { PageParams } from 'src/types/pagination';
import { api } from 'src/boot/axios';
import { Subject } from 'src/types/subject';

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
    return res.data;
  }

  static async updateOne(obj: Partial<Subject>) {
    try {
      await api.patch(`${this.path}/${obj.id}`, obj);
    } catch (error) {
      console.error(error)
    }
  }

  static async removeOne(id: string) {
    const res = await api.delete(`${this.path}/${id}`);
    return res.data;
  }
}
