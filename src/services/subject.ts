// import type { PageParams } from 'src/types/pagination';
import { api } from 'src/boot/axios';
import type { Subject } from 'src/types/subject';
import type { DataResponse } from 'src/types/data-response';
import type { PageParams } from 'src/types/pagination';

export class SubjectService {
  static path = 'subjects';
  static currPath = 'curriculumId';

  static async getAll(params?: Partial<PageParams>) {
    const res = await api.get<DataResponse<Subject>>(this.path, { params });
    return res.data;
  }

  static async getOne(id: number) {
    const res = await api.get(`${this.path}/${id}`);
    return res.data;
  }

  static async findExistSubjectCode(code: string) {
    const res = await api.get<DataResponse<Subject>>(`${this.path}`, {
      params: { code },
    });
    return res.data.data[0];
  }

  static async createOne(obj: Partial<Subject>) {
    // validation
    delete obj.lesson;
    delete obj.clos;
    const res = await api.post(this.path, obj);
    return res.status
  }

  static async createOneInCurr({
    currId,
    form,
  }: {
    currId: number;
    form: Partial<Subject>;
  }) {
    const res = await api.post(`${this.path}/${this.currPath}/${currId}`, form);
    return res.status
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
      return res.status
    } catch (error) {
      console.error(error);
    }
  }

  static async updateOne(id: number, obj: Partial<Subject>) {
    // validation
    delete obj.lesson;
    delete obj.clos;
    delete obj.curriculums;
    const res = await api.patch(`${this.path}/${id}`, obj);
    return res.status
  }

  static async removeOne(id: number) {
    const res = await api.delete(`${this.path}/${id}`);
    return res.status
  }

  static async getSubjectByCurriculums(id: number) {
    const { data } = await api.get(`subjects/filters/${id}`);
    return {
      data: data[0],
      total: data[1],
    };
  }
}
