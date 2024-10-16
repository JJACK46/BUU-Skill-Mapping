import { User } from 'src/types/user';
import { api } from 'boot/axios';

export class UserService {
  static async getAll() {
    const response = await api.get('users');
    return response.data;
  }

  static async createOne(u: User) {
    const response = await api.post('users', { ...u });
    return response.data;
  }
}
