import type { PageParams } from 'src/types/pagination';
import { api } from 'boot/axios';
import type { Skill } from 'src/types/skill';

function addSkill(skill: object) {
  return api.post('/skills', skill);
}

function addSubSkill(id: string, subSkill: object) {
  return api.post(`/skills/${id}/createSubSkills`, subSkill); // Corrected URL
}

function addTechSkill(id: string, techSkill: Skill[]) {
  return api.post(`/skills/${id}/createTechSkills/`, techSkill);
}
function updateSkill(skill: Skill) {
  return api.patch(`/skills/${skill.id}`, skill);
}
function removeSubSkill(id: string, subSkillId: string) {
  console.log('Test Removing subSkill', subSkillId);
  return api.patch(`/skills/${id}/removeSubSkill/${subSkillId}`);
}
function removeTechSkill(id: string, techSkillId: string) {
  return api.patch(`/skills/${id}`, techSkillId);
}
function delSkill(id: string) {
  return api.delete(`/skills/${id}`);
}

function getSkills() {
  return api.get<Skill[]>('/skills');
}
function getSkillsByPage(params: PageParams) {
  return api.get<{ data: Skill[]; total: number }>('/skills/pages', {
    params,
  });
}

function getSkill(id: string) {
  return api.get<Skill>(`/skills/${id}`);
}

export default {
  addSkill,
  addSubSkill,
  addTechSkill,
  updateSkill,
  removeSubSkill,
  removeTechSkill,
  delSkill,
  getSkills,
  getSkillsByPage,
  getSkill,
};
