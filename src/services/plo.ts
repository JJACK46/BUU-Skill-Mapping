import { api } from 'boot/axios';
import { HttpStatusCode } from 'axios';
import type { Plo } from 'src/types/plo';
import type { PageParams } from 'src/types/pagination';
class PloService {
  static path = 'plos';
  static addPlo = async (plo: object) => {
    const res = await api.post(this.path, plo);
    return res.status === HttpStatusCode.Created;
  };

  static updatePlo = async (plo: Partial<Plo>) => {
    const res = await api.patch(`${this.path}/${plo.id}`, plo);
    return res.status === HttpStatusCode.Ok;
  };

  static removePlo = async (id: string) => {
    const res = await api.delete(`${this.path}/${id}`);
    return res.status === HttpStatusCode.Ok;
  };

  static getAll = async (p?: Partial<PageParams>) => {
    const { data } = await api.get(this.path, { params: p });
    return {
      data: data[0],
      total: data[1],
    };
  };
  static async getOne(id: string) {
    const res = await api.get(`${this.path}/${id}`);
    return res.data;
  }
}

export default PloService;
