import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Skill } from 'src/types/skill';
import skillService from 'src/services/skill';
import type { PageParams } from 'src/types/pagination';

export const useSkillStore = defineStore('skill', () => {
  const skills = ref<Skill[]>([]);
  const skillss = ref<Skill[]>([]);
  const dataInit = ref(true);
  const totalSkills = ref(0);
  const initialSkill: Skill = {
    id: '',
    name: '',
    description: '',
    domain: '',
    parent: [],
    children: [],
    techSkills: [],
  };

  const editedSkill = ref<Skill>({ ...initialSkill });

  async function fetchSkill(id: string) {
    dataInit.value = false;
    editedSkill.value = await skillService.getOne(id);
    console.log(editedSkill.value);
    dataInit.value = true;
  }

  async function fetchSkills() {
    skillss.value = await skillService.getAll();
  }

  async function fetchSkillsPage(params: PageParams) {
    const res = await skillService.getAllByPage(params);
    skills.value = res.data.data;
    totalSkills.value = res.data.total;
  }

  async function addSkill(addSkill: object) {
    console.log(addSkill);
    await skillService.addSkill(addSkill);
  }

  // async function addSubSkill(addSubSkill: any) {
  //   console.log(addSubSkill)
  //   await skillService.addSubSkill(addSubSkill)
  // }

  // async function addTechSkill(addTechSkill: any) {
  //   console.log(addTechSkill)
  //   await skillService.addTechSkill(addTechSkill)
  // }

  async function updateSkill(updatedSkill: Skill) {
    console.log(updatedSkill);
    await skillService.updateSkill(updatedSkill);
  }

  async function deleteSkill(id: string) {
    await skillService.delSkill(id);
    await fetchSkills();
  }

  async function deleteSubSkill(id: string, subSkillId: string) {
    await skillService.removeSubSkill(id, subSkillId);
  }

  async function deleteTechSkill(id: string, techSkillId: string) {
    await skillService.removeTechSkill(id, techSkillId);
  }

  function clearForm() {
    editedSkill.value = { ...initialSkill };
  }

  return {
    skills,
    skillss,
    dataInit,
    editedSkill,
    totalSkills,
    addSkill,
    // addSubSkill,
    // addTechSkill,
    updateSkill,
    fetchSkill,
    fetchSkillsPage,
    fetchSkills,
    deleteSkill,
    deleteSubSkill,
    deleteTechSkill,
    clearForm,
  };
});
