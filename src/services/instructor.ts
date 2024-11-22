import { Instructor } from 'src/types/instructor';
import { PageParams } from 'src/types/pagination';
import { api } from 'src/boot/axios';

export class InstructorService {
  static path = 'instructor';

  static async getAll(p?: Partial<PageParams>) {
    const { data } = await api.get(this.path, { params: p });
    return {
      data: data[0],
      total: data[1],
    };
  }

  static async getOne(id: number) {
    const res = await api.get(`${this.path}/${id}`);
    return res.data;
  }

  static async createOne(obj: Partial<Instructor>) {
    const dto = {
      ...obj,
      userId: obj.user?.id,
      branchId: obj.branch?.id,
      curriculumListId: obj.curriculums?.map((c) => c.id),
    };
    const res = await api.post(this.path, dto);
    return res.data;
  }

  static async updateOne(obj: Instructor) {
    const res = await api.patch(this.path, obj);
    return res.data;
  }

  static async removeOne(id: number) {
    const res = await api.delete(`${this.path}/${id}`);
    return res.data;
  }
}
