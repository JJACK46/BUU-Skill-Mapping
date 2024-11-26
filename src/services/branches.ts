import { Branch } from 'src/types/branch';
import { api } from 'boot/axios';
import { PageParams } from 'src/types/pagination';
export class BranchService {
  static path = 'branches';
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

  static async createOne(obj: Partial<Branch>) {
    const dto = {
      facultyId: obj.faculty?.id,
      ...obj,
    }
    const res = await api.post(this.path, dto);
    return res.data;
  }

  static async updateOne(obj: Partial<Branch>) {
    const dto = {
      facultyId: obj.faculty?.id,
      ...obj,
    }
    const res = await api.patch(`${this.path}/${obj.id}`, dto);
    return res.data;
  }

  static async removeOne(id: number) {
    const res = await api.delete(`${this.path}/${id}`);
    return res.data;
  }
}
