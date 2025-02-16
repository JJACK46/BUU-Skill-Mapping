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
    getSkills: (state) => {
      if (!state.skills) return [];
      if (state.onlyHaveSubs) {
        return state.skills.filter(
          (skill) => skill.subs.length > 0 || !skill.parent,
        );
      }
      return state.skills;
    },
    getSubjects: (s) => s.skills,
  },
  actions: {
    // independent skill
    async fetchData() {
      const { data, total } = await SkillService.getAll(
        convertToPageParams(this.pagination, this.search),
      );
      console.log('Fetched skills:', data);
      this.skills = data;
      this.totalSkills = total;
    },
    async fetchData2() {
      const id = this.curr.getCurriculum.id;
      const data = await SkillService.getSkillByCurr(id);
      console.log('Fetched skills:', data);
      this.skills = data;
      // this.totalSkills = total;
    },
    // independent skill
    async handleSave() {
      console.log(this.form);
      const id = this.curr.getCurriculum;
      this.form.curriculum = id;

      // console.log(this.parent.id)
      if (this.parent) {
        const ok = await SkillService.addSubSkill(this.parent.id, this.form);
        if (ok)
          this.qNotify.create({
            type: 'ok',
            message: 'Sub-Skill created successfully',
          });
      } else {
        if (this.form.id) {
          console.log('Update');
          const ok = await SkillService.updateSkill(this.form);
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
      this.fetchData2();
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
          this.fetchData2();
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
      console.log(this.form);
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
