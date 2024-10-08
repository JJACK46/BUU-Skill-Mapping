import { Skill } from 'src/types/skill';
import http from './index';
import { PageParams } from 'src/types/pagination';
import { SkillCollection } from 'src/types/skill-collection';

export class SkillService {
  static async fetchAll(params?: PageParams) {
    const response = await http.get('skills', { params });
    return response.data;
  }

  static async createOne(s: Skill) {
    const response = await http.post('skills', { ...s });
    return response.data;
  }

  static async updateOne(s: Skill) {
    const response = await http.patch(`skills/${s.id}`, { ...s });
    return response.data;
  }

  static async deleteOne(s: Skill) {
    const response = await http.delete(`skills/${s.id}`);
    return response.data;
  }

  static async mapping(s: SkillCollection[]) {
    const response = await http.post('skills/mapping', { ...s });
    return response.data;
  }
}
