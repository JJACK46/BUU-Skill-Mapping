import type { PageParams } from 'src/types/pagination';
import { api } from 'boot/axios';
import type { Skill } from 'src/types/skill';
class SkillService {
  static path = 'skills';
  static addSkill = async (skill: object) => {
    const res = await api.post(this.path, skill);
    return res.data;
  };

  static addSubSkill = async (id: number, subSkill: object) => {
    const res = await api.post(`${this.path}/${id}/createSubSkills`, subSkill);
    return res.data;
  };

  static addTechSkill = async (id: number, techSkill: Skill[]) => {
    const res = await api.post(
      `${this.path}/${id}/createTechSkills/`,
      techSkill
    );
    return res.data;
  };

  static updateSkill = async (skill: Partial<Skill>) => {
    const res = await api.patch(`${this.path}/${skill.id}`, skill);
    return res.data;
  };

  static removeSubSkill = async (id: number, subSkillId: number) => {
    const res = await api.patch(
      `${this.path}/${id}/removeSubSkill/${subSkillId}`
    );
    return res.data;
  };

  static removeTechSkill = async (id: number, techSkillId: number) => {
    const res = await api.patch(`${this.path}/${id}`, techSkillId);
    return res.data;
  };

  static removeSkill = async (id: number) => {
    const res = await api.delete(`${this.path}/${id}`);
    return res.data;
  };

  static getAll = async () => {
    const res = await api.get(this.path);
    return res.data;
  };

  static getAllByPage = async (params: PageParams) => {
    const res = await api.get<{ data: Skill[]; total: number }>(
      `${this.path}/pages`,
      {
        params,
      }
    );
    return res;
  };

  static getOne = async (id: number) => {
    const res = await api.get<Skill>(`${this.path}/${id}`);
    return res.data;
  };
}

export default SkillService;
