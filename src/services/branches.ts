import { Branch } from 'src/types/branch';
import { api } from 'boot/axios';
export class BranchService {
  static path = 'branches';
  static async getAll() {
    const res = await api.get(this.path);
    return res.data;
  }

  static async getOne(id: number) {
    const res = await api.get(`${this.path}/${id}`);
    return res.data;
  }

  static async createOne(obj: Branch) {
    const res = await api.post(this.path, obj);
    return res.data;
  }

  static async updateOne(obj: Branch) {
    const res = await api.patch(this.path, obj);
    return res.data;
  }

  static async removeOne(id: number) {
    const res = await api.delete(`${this.path}/${id}`);
    return res.data;
  }
}
