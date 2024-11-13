import { User } from 'src/types/user';
import { PageParams } from 'src/types/pagination';
import { api } from 'src/boot/axios';

export class UserService {
  static path = 'users';

  static getAllByPage = async (params: PageParams) => {
    const res = await api.get<{ data: User[]; total: number }>(
      `${this.path}/pages`,
      {
        params,
      }
    );
    return res.data.data; //data.users
  };

  static async getAll() {
    const res = await api.get(this.path);
    return res.data;
  }

  static async getOne(id: number) {
    const res = await api.get(`${this.path}/${id}`);
    return res.data;
  }

  static async createOne(obj: object) {
    const res = await api.post(this.path, obj);
    return res.data;
  }

  static async updateOne(obj: User) {
    const res = await api.patch(this.path, obj);
    return res.data;
  }

  static async removeOne(id: number) {
    const res = await api.delete(`${this.path}/${id}`);
    return res.data;
  }
}
