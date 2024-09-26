import http from './index';

export class UserService {
  static async fetchUsers() {
    const response = await http.get(
      'https://jsonplaceholder.typicode.com/users'
    );
    return response.data;
  }
}
