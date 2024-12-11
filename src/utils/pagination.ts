import { QTableProps } from 'quasar';
import { PageParams } from 'src/types/pagination';

// default pagination of Quasar
export const defaultPagination = {
    sortBy: 'id',
    descending: false,
    page: 1,
    rowsPerPage: 10,
    rowsNumber: undefined,
} as QTableProps['pagination']

export const convertToPageParams = (pag: QTableProps['pagination'], search?: string) => {
    return {
        page: pag?.page || 1,
        limit: pag?.rowsPerPage || 10,
        sort: pag?.sortBy || '',
        order: pag?.descending ? 'DESC' : 'ASC',
        search: search || '',
    } as PageParams
}

export const calMaxPage = (totalItems: number | undefined, rowsPerPage: number | undefined) => {
    return Math.ceil((totalItems || 0) / (rowsPerPage || 10))
}