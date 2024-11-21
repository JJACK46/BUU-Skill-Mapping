import { api } from 'boot/axios';
import type { Curriculum } from 'src/types/curriculum';
import type { PageParams } from 'src/types/pagination';

export class CurriculumService {
  static path = 'curriculums';

  static async addCurriculum(curriculum: Curriculum) {
    console.log(curriculum);
    const res = await api.post(this.path, curriculum);
    return res.data;
  }

  static async updateCurriculum(curriculum: Curriculum) {
    return api.patch(`/curriculums/${curriculum.id}`, curriculum);
  }

  static async delCurriculum(id: string) {
    return api.delete(`/curriculums/${id}`);
  }

  static async getAll() {
    const res = await api.get(this.path);
    return res.data;
  }

  static async getCurriculum(id: string) {
    return api.get<Curriculum>(`/curriculums/${id}`);
  }

  static async addCoordinator(curriculumId: string, teacher: { id: string }[]) {
    console.log(teacher, 'from service'); // For debugging
    return api.patch(`/curriculums/${curriculumId}/coordinators`, teacher);
  }

  static async addSubject(curriculumId: string, subjects: { id: string }[]) {
    console.log(subjects, 'from service'); // For debugging
    return api.patch(`/curriculums/${curriculumId}/subjects`, subjects);
  }

  static async getCurriculumsByPage(params: PageParams) {
    return api.get<{ data: Curriculum[]; total: number }>(
      '/curriculums/pages',
      {
        params,
      }
    );
  }
}
