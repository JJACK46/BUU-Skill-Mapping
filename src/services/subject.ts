import { Teacher } from 'src/types/teacher';
import { PageParams } from 'src/types/pagination';
import { api } from 'src/boot/axios';
import { Subject } from 'src/types/subject';

export class SubjectService {
  static path = 'subjects';

  static async fetchByPage(p: PageParams) {
    const response = await api.get(`${this.path}/pages`, { params: p });
    return response.data;
  }

  static async getAll() {
    const res = await api.get(this.path);
    return res.data;
  }

  static async getOne(id: number) {
    const res = await api.get(`${this.path}/${id}`);
    return res.data;
  }

  static async createOne(obj: Partial<Subject>) {
    const dto = {
      ...obj,
      skillListId: obj.skills?.map((s) => s.id),
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
