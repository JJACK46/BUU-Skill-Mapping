import http from './index';
export class CurriculumService {
  static async fetchAll() {
    const response = await http.get('curriculums');
    return response.data;
  }
}
