// import type { PageParams } from 'src/types/pagination';
import { api } from 'src/boot/axios';
import { HttpStatusCode } from 'axios';
import type { Subject } from 'src/types/course-spec';

export class CourseSpecService {
  static path = 'course-specs';
  static currPath = 'curriculumId';

  static async getAll() {
    const res = await api.get(this.path);
    return res.data;
  }

  static async getOne(id: number) {
    const res = await api.get(`${this.path}/${id}`);
    return res.data;
  }

  static async findExistSubjectCode(code: string) {
    const res = await api.get(`${this.path}/findExistSubject/${code}`);
    return res.data;
  }

  static async createOne(obj: Partial<Subject>) {
    const res = await api.post(this.path, obj);
    return res.status === HttpStatusCode.Created;
  }

  static async createOneInCurr({
    currId,
    form,
  }: {
    currId: number;
    form: Partial<Subject>;
  }) {
    const res = await api.post(`${this.path}/${this.currPath}/${currId}`, form);
    return res.status === HttpStatusCode.Created;
  }

  static async updateOneInCurr({
    currId,
    form,
  }: {
    currId: number;
    form: Partial<Subject>;
  }) {
    if (!form.id) {
      console.error('Update failed: Missing ID');
    }
    try {
      const res = await api.patch(
        `${this.path}/${this.currPath}/${currId}/`,
        form,
      );
      return res.status === HttpStatusCode.Ok;
    } catch (error) {
      console.error(error);
    }
  }

  static async removeOne(id: number) {
    const res = await api.delete(`${this.path}/${id}`);
    return res.status === HttpStatusCode.Ok;
  }

  static async getSubjectByCurriculums(id: number) {
    const { data } = await api.get(`subjects/filters/${id}`);
    return {
      data: data[0],
      total: data[1],
    };
  }

  static async fetchSubjectByCurriculumId(curriculumId: number) {
    const res = await api.get(`${this.path}/${this.currPath}/${curriculumId}`);
    return res.data;
  }
}
