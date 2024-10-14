import { Teacher } from 'src/types/teacher';
import http from './index';
import { PageParams } from 'src/types/pagination';

export class TeacherService {
  static async fetchByPage(p: PageParams) {
    const response = await http.get('teachers/pages', { params: p });
    return response.data;
  }
  static async fetchAll() {
    const response = await http.get('teachers');
    return response.data;
  }

  static async createOne(u: Teacher) {
    const response = await http.post('teachers', { ...u });
    return response.data;
  }
}
