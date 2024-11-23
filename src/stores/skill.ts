import { defineStore } from 'pinia';
import SkillService from 'src/services/skill';
import { Skill } from 'src/types/skill';
import { Dialog } from 'quasar'
import { convertToPageParams, defaultPagination } from 'src/utils/pagination';

type TitleForm = 'New Skill' | 'Edit Skill' | 'Delete Skill' | 'Insert Sub-Skill';

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
    }),
    getters: {
        getTitleForm: (state) => state.titleForm,
    },
    actions: {
        async fetchData() {
            this.skills = (await SkillService.getAll(convertToPageParams(this.pagination))).data;
        },
        async handleSave() {
            if (this.parentId) {
                await SkillService.addSubSkill(this.parentId, this.form);
            } else {
                if (this.form.id) {
                    await SkillService.updateSkill(this.form);
                } else {
                    await SkillService.addSkill(this.form as Skill);
                }
            }
            this.fetchData()
            this.dialogForm = false;
            this.resetState()
        },
        async handleRemove({ id, subSkillId }: { id: number, subSkillId?: number }) {
            this.qDialog.create({
                title: 'Confirm',
                message: 'Are you sure you want to delete this item?',
                cancel: true,
                persistent: true
            }).onCancel(() => {
                return
            }).onOk(async () => {
                await SkillService.removeSkill(id);
                if (subSkillId) {
                    await SkillService.removeSubSkill(id, subSkillId);
                }
                this.fetchData()
            })
        },
        async toggleDialog({ form, title, parentId }: { form?: Partial<Skill>, title?: TitleForm, parentId?: number }) {
            this.titleForm = title || 'New Skill';
            this.parentId = parentId || null
            if (form) {
                this.form = form;
            } else {
                this.resetState()
            }
            this.dialogForm = !this.dialogForm;
        },
        resetState() {
            this.form = {} as Partial<Skill>;
            this.parentId = null
        },
    },
});