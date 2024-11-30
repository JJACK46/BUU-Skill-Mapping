export type PageParams = {
  page: number;
  limit: number;
  sort: string;
  order: 'ASC' | 'DESC';
  search: string;
  columnId?: string;
  columnName?: string;
  bySubject?: string;
};
