export type PageParams = {
  page: number;
  limit: number;
  sort: string;
  order: 'asc' | 'desc';
  curriculumCode: string;
  code: string;
  facultyThaiName: string;
  facultyEngName: string;
  branchThaiName: string;
  branchEngName: string;
  name: string;
  email: string;
  // wait for remove
  columnId?: string;
  columnName?: string;
};
