import { Teacher } from 'src/types/teacher';
import { api } from 'boot/axios';

export class TeacherService {
  static path = 'teachers';

  static async getAll() {
    const res = await api.get(this.path);
    return res.data;
  }

  static async getOne(id: number) {
    const res = await api.get(`${this.path}/${id}`);
    return res.data;
  }

  static async createOne(obj: Partial<Teacher>) {
    const dto = {
      ...obj,
      userId: obj.user?.id,
      branchId: obj.branch?.id,
      curriculumListId: obj.curriculums?.map((c) => c.id),
    };
    const res = await api.post(this.path, dto);
    return res.data;
  }

  static async updateOne(obj: Teacher) {
    const res = await api.patch(this.path, obj);
    return res.data;
  }

  static async removeOne(id: number) {
    const res = await api.delete(`${this.path}/${id}`);
    return res.data;
  }
}