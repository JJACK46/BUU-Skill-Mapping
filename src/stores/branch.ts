import { ref } from 'vue';
import { defineStore } from 'pinia';
import { BranchService } from 'src/services/branches';
import type { Branch } from 'src/types/branch';

export const useBranchStore = defineStore('branch', () => {
  const branches = ref<Branch[]>([]);
  const initialBranch: Branch = {
    id: '',
    name: '',
    curriculums: [],
  };
  const editedBranch = ref<Branch>(JSON.parse(JSON.stringify(initialBranch)));

  async function getBranch(id: string) {
    const res = await BranchService.getOne(id);
    editedBranch.value = res.data;
  }

  async function getBranches() {
    const res = await BranchService.getAll();
    branches.value = res.data;
  }

  async function saveBranch() {
    const branch = editedBranch.value;
    if (!branch.id) {
      // Add new
      console.log('Post ' + JSON.stringify(branch));
      await BranchService.apply;
    } else {
      // Update
      console.log('Patch ' + JSON.stringify(branch));
      await BranchService.updateOne(branch);
    }

    await getBranches();
  }

  async function deleteBranch(id: string) {
    await BranchService.removeOne(id);
    await getBranches();
  }

  function clearForm() {
    editedBranch.value = JSON.parse(JSON.stringify(initialBranch));
  }

  return {
    branches,
    getBranches,
    saveBranch,
    deleteBranch,
    editedBranch,
    getBranch,
    clearForm,
  };
});
