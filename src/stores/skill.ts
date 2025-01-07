import { defineStore } from 'pinia';
import SkillService from 'src/services/skill';
import { Skill } from 'src/types/skill';
import { Dialog, Notify } from 'quasar';
import {
  calMaxPage,
  convertToPageParams,
  defaultPagination,
} from 'src/utils/pagination';

type TitleForm =
  | 'New Skill'
  | 'Edit Skill'
  | 'Delete Skill'
  | 'Insert Sub-Skill';

export const useSkillStore = defineStore('skill', {
  state: () => ({
    skills: [] as Skill[],
    form: {} as Partial<Skill>,
    dialogForm: false,
    pagination: defaultPagination,
    search: '',
    titleForm: 'New Skill' as TitleForm,
    qDialog: Dialog,
    parentId: null as number | null,
    totalSkills: 0,
    qNotify: Notify,
    onlyHaveSubs: true,
    onlyHaveSubs: true,
  }),
  getters: {
    getTitleForm: (state) => state.titleForm,
    getParentId: (state) => state.parentId,
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
    async fetchData() {
      const { data, total } = await SkillService.getAll(
        convertToPageParams(this.pagination, this.search)
      );
      this.skills = data;
      this.totalSkills = total;
    },
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
      parentId,
    }: {
      form?: Partial<Skill>;
      title?: TitleForm;
      parentId?: number;
    }) {
      this.titleForm = title || 'New Skill';
      this.parentId = parentId || null;
      if (form) {
        this.form = form;
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
