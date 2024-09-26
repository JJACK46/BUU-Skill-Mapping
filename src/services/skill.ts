import http from './index';

export class SkillService {
  static async fetchAll() {
    const response = await http.get(
      'https://jsonplaceholder.typicode.com/users'
    );
    return response.data;
  }
}
