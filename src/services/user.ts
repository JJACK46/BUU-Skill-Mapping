import type { User } from 'src/types/user';
import type { PageParams } from 'src/types/pagination';
import { api } from 'src/boot/axios';
import type { DataResponse } from 'src/types/data-response';

export class UserService {
  static path = 'users';

  static async getAll(pag?: Partial<PageParams>) {
    const res = await api.get<DataResponse<User>>(this.path, { params: pag });
    return res.data;
  }

  static async getOne(id: number) {
    const res = await api.get(`${this.path}/${id}`);
    return res.data;
  }

  static async createOne(obj: User) {
    const res = await api.post(this.path, obj);
    return res.data;
  }

  static async updateOne(obj: Partial<User>) {
    const res = await api.patch(`${this.path}/${obj.id}, obj`);
    return res.data;
  }

  static async removeOne(id: string) {
    const res = await api.delete(`${this.path}/${id}`);
    return res.data;
  }
}
