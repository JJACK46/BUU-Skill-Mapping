import type { PageParams } from 'src/types/pagination';
import http from './index';
import type { Skill } from 'src/types/skill';

function addSkill(skill: object) {
  return http.post('/skills', skill);
}

function addSubSkill(id: string, subSkill: object) {
  return http.post(`/skills/${id}/createSubSkills`, subSkill); // Corrected URL
}

function addTechSkill(id: string, techSkill: Skill[]) {
  return http.post(`/skills/${id}/createTechSkills/`, techSkill);
}
function updateSkill(skill: Skill) {
  return http.patch(`/skills/${skill.id}`, skill);
}
function removeSubSkill(id: string, subSkillId: string) {
  console.log('Test Removing subSkill', subSkillId);
  return http.patch(`/skills/${id}/removeSubSkill/${subSkillId}`);
}
function removeTechSkill(id: string, techSkillId: string) {
  return http.patch(`/skills/${id}`, techSkillId);
}
function delSkill(id: string) {
  return http.delete(`/skills/${id}`);
}

function getSkills() {
  return http.get<Skill[]>('/skills');
}
function getSkillsByPage(params: PageParams) {
  return http.get<{ data: Skill[]; total: number }>('/skills/pages', {
    params,
  });
}

function getSkill(id: string) {
  return http.get<Skill>(`/skills/${id}`);
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
