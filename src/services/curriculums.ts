import { api } from 'boot/axios';
import { PageParams } from 'src/types/pagination';
export class CurriculumService {
  static async getAll(p: Partial<PageParams>) {
    const { data } = await api.get('curriculums', { params: p });
    return {
      data: data[0],
      total: data[1],
    };
  }
}
