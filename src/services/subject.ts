import http from './index';
export class SubjectService {
  static async fetchAll() {
    try {
      const response = await http.get('subjects');
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
