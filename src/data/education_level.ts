export enum EducationLevelTH {
  Associate = 'ระดับอนุปริญญา',
  Bachelors = 'ระดับปริญญาตรี',
  Graduate = 'ระดับบัณฑิตศึกษา', //โท/เอก
  Masters = 'ระดับปริญญาโท',
  Doctoral = 'ระดับปริญญาเอก',
}

export enum EducationLevelEN {
  Associate = 'Associate',
  Bachelors = 'Bachelors',
  Graduate = 'Graduate',
  Masters = 'Masters',
  Doctoral = 'Doctoral',
}

export const OptionEducationLevelTH = Object.values(
  EducationLevelTH,
) as Readonly<string[]>;

export const OptionEducationLevelEN = Object.values(
  EducationLevelEN,
) as Readonly<string[]>;
