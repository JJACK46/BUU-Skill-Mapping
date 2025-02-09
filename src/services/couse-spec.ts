// import type { PageParams } from 'src/types/pagination';
import { api } from 'src/boot/axios';
import { HttpStatusCode } from 'axios';
import type { CourseSpec } from 'src/types/course-spec';

export class CourseSpecService {
  static path = 'course-specs';

  static async getAll() {
    const res = await api.get(this.path);
    return res.data;
  }

  static async getOne(id: number) {
    const res = await api.get(`${this.path}/${id}`);
    return res.data;
  }

  static async createOne(obj: Partial<CourseSpec>) {
    const res = await api.post(this.path, obj);
    return res.status === HttpStatusCode.Created;
  }

  static async updateOne(obj: Partial<CourseSpec>) {
    try {
      const res = await api.patch(`${this.path}/${obj.subjectCode}`, obj);
      return res.status === HttpStatusCode.Ok;
    } catch (error) {
      console.error(error);
    }
  }

  static async removeOne(id: string) {
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

  static async fetchSubjectByCurriculums(curriculumId: number) {
    const res = await api.get(`${this.path}/curriculumId/${curriculumId}`);
    return res.data;
  }
}
