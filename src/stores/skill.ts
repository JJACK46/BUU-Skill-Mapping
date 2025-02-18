import { defineStore } from 'pinia';
import SkillService from 'src/services/skill';
import type { Skill } from 'src/types/skill';
import { Dialog, Notify } from 'quasar';
import {
  calMaxPage,
  convertToPageParams,
  defaultPagination,
} from 'src/utils/pagination';
import { useCurriculumStore } from './curriculum';

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
    curr: useCurriculumStore(),
  }),
  getters: {
    getTitleForm: (state) => state.titleForm,
    getParentId: (state) => state.parent.id,
    getParentName: (s) => s.parent.thaiName,
    getMaxPage: (state) =>
      calMaxPage(state.totalSkills, state.pagination!.rowsPerPage),
    getSkills: (state) => state.skills || [],
    getSubjects: (s) => s.skills,
  },
  actions: {
    // independent skill
    async fetchData() {
      const { data, total } = await SkillService.getAll(
        convertToPageParams(this.pagination, this.search),
      );
      if (total > 0) {
        this.skills = data;
        this.totalSkills = total;
      }
    },
    async fetchDataInCurr() {
      const code = this.curr.getCode;
      const { data, total } = await SkillService.getSkillByCurr(code);
      if (total > 0) {
        this.skills = data;
        this.totalSkills = total;
      }
    },
    // independent skill
    async handleSave() {
      const curId = this.curr.getInsertId;
      this.form = {
        ...this.form,
        curriculumId: curId,
      } as Partial<Skill>;

      if (this.parent) {
        const ok = await SkillService.addSubSkill(this.parent.id, this.form);
        if (ok)
          this.qNotify.create({
            type: 'ok',
            message: 'Sub-Skill created successfully',
          });
      } else {
        if (this.form.id) {
          const ok = await SkillService.updateSkill(this.form.id, this.form);
          if (ok)
            this.qNotify.create({
              type: 'ok',
              message: 'Skill updated successfully',
            });
        } else {
          const ok = await SkillService.addSkill(this.form);
          if (ok)
            this.qNotify.create({
              type: 'ok',
              message: 'Skill created successfully',
            });
        }
      }
      await this.fetchDataInCurr();
      this.dialogForm = false;
      this.resetForm();
    },
    // independent skill
    async handleRemove({ id }: { id: number; subSkillId?: number }) {
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
          const ok = await SkillService.removeSkill(id);
          if (ok) {
            this.qNotify.create({
              type: 'ok',
              message: 'Skill delete successfully',
            });
          }
          this.fetchDataInCurr();
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
