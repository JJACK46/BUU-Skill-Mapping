import type { PageParams } from 'src/types/pagination';
import { api } from 'src/boot/axios';
import type { Lesson } from 'src/types/lesson';
import type { DataResponse } from 'src/types/data-response';

export class LessonService {
  static path = 'lessons';

  static async getAll(p?: Partial<PageParams>) {
    const res = await api.get<DataResponse>(this.path, { params: p });
    return res.data;
  }

  static async getOne(id: number) {
    const res = await api.get(`${this.path}/${id}`);
    return res.data;
  }

  static async createOne(obj: Partial<Lesson>) {
    const res = await api.post(this.path, obj);
    return res.status 
  }

  static async updateOne(obj: Partial<Lesson>) {
    try {
      const res = await api.patch(`${this.path}/${obj.id}`, obj);
      return res.status
    } catch (error) {
      console.error(error);
    }
  }

  static async removeOne(id: string) {
    const res = await api.delete(`${this.path}/${id}`);
    return res.status 
  }

  static async getSubjectByCurriculums(id: number) {
    const { data } = await api.get(`${this.path}/filters/${id}`);
    return {
      data: data[0],
      total: data[1],
    };
  }
}
