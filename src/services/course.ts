import { Course } from 'src/types/course';
import { api } from 'boot/axios';
import { PageParams } from 'src/types/pagination';

export class CourseService {
  static path = 'courses';

  static async importStudents(id: string, studentListId: string[]) {
    const res = await api.patch(
      `${this.path}/${id}/import-students`,
      studentListId
    );
    return res.data;
  }
  static async getAll(p?: Partial<PageParams>) {
    const { data } = await api.get(this.path, { params: p });
    return {
      data: data[0],
      total: data[1],
    };
  }

  static async getOne(id: string) {
    const res = await api.get(`${this.path}/${id}`);
    return res.data;
  }
  static async getEnrollment(id: string) {
    const res = await api.get(`${this.path}/${id}/enrollments`);
    return res.data;
  }

  static async createOne(obj: Course) {
    const dto = {
      ...obj,
      teacherListId: obj.teachers.map((t) => t.id),
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
