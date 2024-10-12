import http from './index';
export class CurriculumService {
  static async getAll() {
    const response = await http.get('curriculums');
    return response.data;
  }
}
