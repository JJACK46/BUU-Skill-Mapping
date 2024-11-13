import { api } from 'boot/axios';
import { Role } from 'src/types/role';
export class RoleService {
    static path = 'roles';

    static async getAll() {
        const res = await api.get(this.path);
        return res.data;
    }

    static async getOne(id: number) {
        const res = await api.get(`${this.path}/${id}`);
        return res.data;
    }

    static async createOne(obj: Role) {
        const res = await api.post(this.path, obj);
        return res.data;
    }

    static async updateOne(obj: Role) {
        const res = await api.patch(this.path, obj);
        return res.data;
    }

    static async removeOne(id: number) {
        const res = await api.delete(`${this.path}/${id}`);
        return res.data;
    }
}
