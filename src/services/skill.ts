import type { PageParams } from 'src/types/pagination';
import { api } from 'boot/axios';
import type { Skill } from 'src/types/skill';
import { HttpStatusCode } from 'axios';
class SkillService {
  static path = 'skills';
  static addSkill = async (skill: object) => {
    const res = await api.post(this.path, skill);
    return res.status === HttpStatusCode.Created;
  };

  static addSubSkill = async (id: number, subSkill: object) => {
    const res = await api.post(`${this.path}/${id}/createSubSkills`, subSkill);
    return res.status === HttpStatusCode.Created;
  };

  // static addTechSkill = async (id: number, techSkill: Skill[]) => {
  //   const res = await api.post(
  //     `${this.path}/${id}/createTechSkills/`,
  //     techSkill
  //   );
  //   return res.data;
  // };

  static updateSkill = async (skill: Partial<Skill>) => {
    const res = await api.patch(`${this.path}/${skill.id}`, skill);
    return res.status === HttpStatusCode.Ok;
  };

  static removeSubSkill = async (id: number, subSkillId: number) => {
    const res = await api.patch(
      `${this.path}/${id}/removeSubSkill/${subSkillId}`
    );
    return res.status === HttpStatusCode.Ok;
  };

  // static removeTechSkill = async (id: number, techSkillId: number) => {
  //   const res = await api.patch(`${this.path}/${id}`, techSkillId);
  //   return res.data;
  // };

  static removeSkill = async (id: number) => {
    const res = await api.delete(`${this.path}/${id}`);
    return res.status === HttpStatusCode.Ok;
  };

  static getAll = async (p?: Partial<PageParams>) => {
    const { data } = await api.get(this.path, { params: p });
    return {
      data: data[0],
      total: data[1],
    };
  };

  static getOne = async (id: number) => {
    const res = await api.get<Skill>(`${this.path}/${id}`);
    return res.data;
  };
}

export default SkillService;
