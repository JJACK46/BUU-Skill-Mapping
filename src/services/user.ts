import { User } from 'src/types/user';
import http from './index';

export class UserService {
  static async fetchAll() {
    const response = await http.get('users');
    return response.data;
  }

  static async createOne(u: User) {
    const response = await http.post('users', { ...u });
    return response.data;
  }
}
