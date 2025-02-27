import type { Branch } from 'src/types/branch';
import { api } from 'boot/axios';
import type { PageParams } from 'src/types/pagination';
import type { DataResponse } from 'src/types/data-response';
export class BranchService {
  static path = 'branches';
  static async getAll(p?: Partial<PageParams>) {
    const res = await api.get<DataResponse<Branch>>(this.path, { params: p });
    return res.data;
  }

  static async getOptions() {
    const res = await api.get(`${this.path}/options`);
    return res.data;
  }

  static async getOne(id: string) {
    const res = await api.get(`${this.path}/${id}`);
    return res.data;
  }

  static async createOne(obj: Partial<Branch>) {
    delete obj.faculty;
    const res = await api.post(this.path, obj);
    return res.status 
  }

  static async updateOne(obj: Partial<Branch>) {
    delete obj.faculty;
    const res = await api.patch(`${this.path}/${obj.id}`, obj);
    return res.status
  }

  static async removeOne(id: string) {
    const res = await api.delete(`${this.path}/${id}`);
    return res.status
  }
}
