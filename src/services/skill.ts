import type { PageParams } from 'src/types/pagination';
import { api } from 'boot/axios';
import type { Skill } from 'src/types/skill';
import { HttpStatusCode } from 'axios';
import type { DataResponse } from 'src/types/data-response';
class SkillService {
  static path = 'skills';
  static addSkill = async (skill: Partial<Skill>) => {
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
      `${this.path}/${id}/removeSubSkill/${subSkillId}`,
    );
    return res.status === HttpStatusCode.Ok;
  };

  // static removeTechSkill = async (id: number, techSkillId: number) => {
  //   const res = await api.patch(`${this.path}/${id}`, techSkillId);
  //   return res.data;
  // };

  static removeSkill = async (id: number) => {
    const res = await api.delete(`${this.path}/${id}`);
    // console.log(res.data)
    return res.status === HttpStatusCode.Ok;
  };

  static getAll = async (p?: Partial<PageParams>) => {
    const res = await api.get<DataResponse>(this.path, { params: p });
    return res.data;
  };
  static getSkillByCurr = async (currId: number) => {
    const res = await api.get(`${this.path}/curriculumId/${currId}`);
    return res.data;
  };
  static getOne = async (id: number) => {
    const res = await api.get<Skill>(`${this.path}/${id}`);
    return res.data;
  };
}

export default SkillService;
