import { User } from 'src/types/user';
import { PageParams } from 'src/types/pagination';
import { api } from 'src/boot/axios';

export class UserService {
  static path = 'users';

  static async getAll(pag?: PageParams) {
    const { data } = await api.get(this.path, { params: pag });
    return {
      data: data[0],
      total: data[1],
    };
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
    const res = await api.patch(`${this.path}/${obj.id}`, obj);
    return res.data;
  }

  static async removeOne(id: number) {
    const res = await api.delete(`${this.path}/${id}`);
    return res.data;
  }
}
