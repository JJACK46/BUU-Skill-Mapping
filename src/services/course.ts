import type { Course } from 'src/types/course';
import { api } from 'boot/axios';
import type { PageParams } from 'src/types/pagination';
import type { DataResponse } from 'src/types/data-response';

export class CourseService {
  static path = 'courses';

  static async importStudents() {
    // ! need new implement
    // const res = await api.patch(
    //   `${this.path}/${id}/import-students`,
    //   studentListId,
    // );
    // return res.data;
  }
  static async getAll(p?: Partial<PageParams>) {
    const res = await api.get<DataResponse>(this.path, { params: p });
    return res.data;
  }

  static async getOne(id: number) {
    const res = await api.get(`${this.path}/${id}`);
    return res.data;
  }
  static async getEnrollment(id: number) {
    const res = await api.get(`${this.path}/${id}/enrollments`);
    return res.data;
  }

  static async createOne(obj: Course) {
    const dto = {
      ...obj,
      instructorListId: obj.instructors?.map((t) => t.id),
      // curriculumId: obj.curriculum?.id,
      subjectId: obj.subject?.id,
    };
    const res = await api.post(this.path, dto);
    return res.data;
  }

  static async updateOne(obj: Course) {
    const res = await api.patch(this.path, obj);
    return res.data;
  }

  static async removeOne(id: string) {
    const res = await api.delete(`${this.path}/${id}`);
    return res.data;
  }
}
