import { AxiosError, HttpStatusCode } from 'axios';
import { api } from 'boot/axios';
import type { Curriculum } from 'src/types/curriculum';
import type { PageParams } from 'src/types/pagination';
export class CurriculumService {
  static path = 'curriculums';
  static async getAll(p?: Partial<PageParams>) {
    const { data } = await api.get(this.path, { params: p });
    return {
      data: data[0],
      total: data[1],
    };
  }

  static async getOneByCode(code: string) {
    try {
      const res = await api.get(`${this.path}/${code}`);
      if (res.data.statusCode !== 404) {
        return res.data;
      }
      return null;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response.status === 404) {
          return null;
        }
      }
      throw error;
    }
  }

  static async createOne(obj: Partial<Curriculum>) {
    const res = await api.post(this.path, obj);
    return res.status === HttpStatusCode.Created;
  }

  static async updateOne(obj: Partial<Curriculum>) {
    if (!obj.id) {
      console.error('Update failed: Missing ID');
      return false;
    }
    const res = await api.patch(`${this.path}/${obj.id}`, obj);
    return res.status === HttpStatusCode.Ok;
  }

  static async removeOne(id: number) {
    const res = await api.delete(`${this.path}/${id}`);
    return res.status === HttpStatusCode.Ok;
  }
}
