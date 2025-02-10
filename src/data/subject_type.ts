export enum EnumSubjectType {
  Compulsory = 'บังคับ',
  Core = 'แกน',
  General = 'ทั่วไป',
  Elective = 'บังคับเลือก',
  FreeElective = 'เสรี',
  CWIE = 'CWIE',
}

export const OptionSubjectType = Object.values(EnumSubjectType) as Readonly<
  EnumSubjectType[]
>;
