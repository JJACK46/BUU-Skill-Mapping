import { Skill } from 'src/types/skill';
import http from './index';
import { SkillMapping } from 'src/types/skill_mapping';

export class SkillService {
  static async fetchAll() {
    const response = await http.get(
      'https://jsonplaceholder.typicode.com/users'
    );
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

  static async mapping(s: SkillMapping) {
    const response = await http.post('skill-mapping', { ...s });
    return response.data;
  }
}
