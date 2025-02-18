import type { Clo } from 'src/types/clo';
import { api } from 'boot/axios';
import type { PageParams } from 'src/types/pagination';
import { HttpStatusCode } from 'axios';
import type { DataResponse } from 'src/types/data-response';
export class ClosService {
  static path = 'clos';
  static async getAll(p?: Partial<PageParams>) {
    const res = await api.get<DataResponse>(this.path, { params: p });
    return res.data;
  }

  static async getOne(id: number) {
    const res = await api.get(`${this.path}/${id}`);
    return res.data;
  }
  static async getAllBySubject(id: number) {
    const res = await api.get<DataResponse>(`${this.path}`, {
      params: { subjectId: id },
    });
    return res.data;
  }

  static async createOne(obj: Partial<Clo>) {
    console.log(obj);
    const res = await api.post(this.path, obj);
    return res.status === HttpStatusCode.Created;
  }

  static async updateOne(obj: Partial<Clo>) {
    console.log(obj);
    const res = await api.patch(`${this.path}/${obj.id}`, obj);
    return res.status === HttpStatusCode.Ok;
  }

  static async removeOne(id: number) {
    const res = await api.delete(`${this.path}/${id}`);
    return res.status === HttpStatusCode.Ok;
  }
}
