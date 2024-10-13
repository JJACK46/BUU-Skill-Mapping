import { api } from 'boot/axios';
export class CurriculumService {
  static async getAll() {
    const response = await api.get('curriculums');
    return response.data;
  }
}
