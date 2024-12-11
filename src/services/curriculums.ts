import { HttpStatusCode } from 'axios';
import { api } from 'boot/axios';
import { Curriculum } from 'src/types/curriculum';
import { PageParams } from 'src/types/pagination';
export class CurriculumService {
  static path = 'curriculums';
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

  static async createOne(obj: Partial<Curriculum>) {
    const dto = {
      ...obj,
      branchId: obj.branch?.id ? String(obj.branch.id) : undefined,
      coordinatorListId: obj.coordinators?.map((c) => String(c.id)),
      subjectListId: obj.subjects?.map((s) => String(s.id)),
    };

    delete dto.branch;
    delete dto.coordinators;
    delete dto.subjects;

    const res = await api.post(this.path, dto);
    return res.status === HttpStatusCode.Created
  }

  static async updateOne(obj: Partial<Curriculum>) {
    const res = await api.patch(`${this.path}/${obj.id}`, obj);
    return res.status === HttpStatusCode.Ok
  }

  static async removeOne(id: string) {
    const res = await api.delete(`${this.path}/${id}`);
    return res.status === HttpStatusCode.Ok
  }
}
