import { defineStore } from 'pinia';
import SkillService from 'src/services/skill';
import type { Skill } from 'src/types/skill';
import { Dialog, Notify } from 'quasar';
import {
  calMaxPage,
  convertToPageParams,
  defaultPagination,
} from 'src/utils/pagination';

export type TitleFormSkill =
  | 'New Skill'
  | 'Edit Skill'
  | 'Delete Skill'
  | 'Insert Sub-Skill'
  | 'View';

export const useSkillStore = defineStore('skill', {
  state: () => ({
    skills: [] as Skill[],
    form: {} as Partial<Skill>,
    dialogForm: false,
    pagination: defaultPagination,
    search: '',
    titleForm: 'New Skill' as TitleFormSkill,
    qDialog: Dialog,
    parent: {} as Skill,
    totalSkills: 0,
    qNotify: Notify,
    onlyHaveSubs: true,
  }),
  getters: {
    getTitleForm: (state) => state.titleForm,
    getParentId: (state) => state.parent.id,
    getParentName: (s) => s.parent.thaiName,
    getMaxPage: (state) =>
      calMaxPage(state.totalSkills, state.pagination!.rowsPerPage),
    getSkills: (state) => {
      if (state.onlyHaveSubs) {
        return state.skills.filter((skill) => skill.children.length > 0);
      }
      return state.skills;
    },
  },
  actions: {
    // independent skill
    async fetchData() {
      const { data, total } = await SkillService.getAll(
        convertToPageParams(this.pagination, this.search),
      );
      this.skills = data;
      this.totalSkills = total;
    },
    // independent skill
    async handleSave() {
      if (this.parentId) {
        const ok = await SkillService.addSubSkill(this.parentId, this.form);
        if (ok)
          this.qNotify.create({
            type: 'ok',
            message: 'Sub-Skill created successfully',
          });
      } else {
        if (this.form.id) {
          const ok = await SkillService.updateSkill(this.form);
          if (ok)
            this.qNotify.create({
              type: 'ok',
              message: 'Skill updated successfully',
            });
        } else {
          const ok = await SkillService.addSkill(this.form as Skill);
          if (ok)
            this.qNotify.create({
              type: 'ok',
              message: 'Skill created successfully',
            });
        }
      }
      this.fetchData();
      this.dialogForm = false;
      this.resetForm();
      this.parentId = null;
    },
    // independent skill
    async handleRemove({
      id,
      subSkillId,
    }: {
      id: number;
      subSkillId?: number;
    }) {
      this.qDialog
        .create({
          title: 'Confirm',
          message: 'Are you sure you want to delete this item?',
          cancel: true,
          persistent: true,
        })
        .onCancel(() => {
          return;
        })
        .onOk(async () => {
          await SkillService.removeSkill(id);
          if (subSkillId) {
            await SkillService.removeSubSkill(id, subSkillId);
          }
          this.fetchData();
        });
    },
    async toggleDialog({
      form,
      title,
      parent,
    }: {
      form?: Partial<Skill>;
      title?: TitleFormSkill;
      parent?: Partial<Skill>;
    }) {
      this.titleForm = title || 'New Skill';
      this.parent = parent || null;
      if (form) {
        // copy form
        this.form = JSON.parse(JSON.stringify(form));
      } else {
        this.resetForm();
      }
      this.dialogForm = !this.dialogForm;
    },
    resetForm() {
      this.form = {} as Partial<Skill>;
    },
  },
});
