import http from './index';

export class UserService {
  static async fetchAll() {
    const response = await http.get(
      'https://jsonplaceholder.typicode.com/users'
    );
    return response.data;
  }
}
