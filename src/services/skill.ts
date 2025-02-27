import type { PageParams } from 'src/types/pagination';
import { api } from 'boot/axios';
import type { Skill } from 'src/types/skill';
import type { DataResponse } from 'src/types/data-response';
class SkillService {
  static path = 'skills';
  static addSkill = async (skill: Partial<Skill>) => {
    const res = await api.post(this.path, skill);
    return res.status
  };

  static addSubSkill = async (parentId: number, skill: Partial<Skill>) => {
    skill.parentId = parentId;
    const res = await api.post(`${this.path}`, skill);
    return res.status
  };
  static updateSkill = async (id: number, skill: Partial<Skill>) => {
    // dto validation
    delete skill.id;
    delete skill.parent;
    delete skill.parentId;
    delete skill.subs;
    delete skill.curriculum;
    const res = await api.patch(`${this.path}/${id}`, skill);
    return res.status
  };

  static removeSubSkill = async (id: number, subSkillId: number) => {
    const res = await api.patch(
      `${this.path}/${id}/removeSubSkill/${subSkillId}`,
    );
    return res.status 
  };

  static removeSkill = async (id: number) => {
    const res = await api.delete(`${this.path}/${id}`);
    // console.log(res.data)
    return res.status
  };

  static getAll = async (p?: Partial<PageParams>) => {
    const res = await api.get<DataResponse<Skill>>(this.path, { params: p });
    return res.data;
  };
  static getSkillByCurr = async (curriculumCode: string) => {
    const res = await api.get<DataResponse<Skill>>(`${this.path}`, {
      params: { curriculumCode },
    });
    return res.data;
  };
  static getOne = async (id: number) => {
    const res = await api.get<Skill>(`${this.path}/${id}`);
    return res.data;
  };
}

export default SkillService;
