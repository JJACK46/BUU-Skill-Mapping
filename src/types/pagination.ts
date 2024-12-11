export type PageParams = {
  page: number;
  limit: number;
  sort: string;
  order: 'ASC' | 'DESC';
  search: string;
  columnId?: string;
  columnName?: string;
  subjectName?: string; //need backend change too
  curriculumName?: string
  facultyName?: string
  branchName?: string
};
