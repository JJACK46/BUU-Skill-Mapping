import type { QTableProps } from 'quasar';
import type { FilterModel } from 'src/types/filter';
import type { PageParams } from 'src/types/pagination';

// default pagination of Quasar
export const defaultPagination = {
  sortBy: 'id',
  descending: false,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: undefined,
} as QTableProps['pagination'];

export const convertToPageParams = (
  pag: QTableProps['pagination'],
  search?: string,
  filterModel?: Partial<FilterModel>,
) => {
  return {
    page: pag?.page || 1,
    limit: pag?.rowsPerPage || 10,
    sort: pag?.sortBy || '',
    order: pag?.descending ? 'desc' : 'asc',
    branchThaiName: filterModel?.branchThaiName || undefined,
    curriculumCode: filterModel?.curriculumCode || undefined,
    facultyThaiName: filterModel?.facultyThaiName || undefined,
    code: filterModel?.code || undefined,
    name: filterModel?.name || undefined,
    email: filterModel?.email || undefined,
  } as Partial<PageParams>;
};

export const calMaxPage = (
  totalItems: number | undefined,
  rowsPerPage: number | undefined,
) => {
  return Math.ceil((totalItems || 0) / (rowsPerPage || 10));
};
