import { api } from 'boot/axios';
export class SubjectService {
  static async getAll() {
    try {
      const response = await api.get('subjects');
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
