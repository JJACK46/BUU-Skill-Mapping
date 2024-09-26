export interface SkillMapping {
  id?: number;
  subjectId: number;
  skillId: number;
  expectedLevel: 1 | 2 | 3 | 4 | 5;
  expectedMean: ExpectedMean;
}

export enum ExpectedMean {
  The1Basic = '1 - Basic',
  The1Imitation = '1 - Imitation',
  The2Intermediate = '2 - Intermediate',
  The2Manipulation = '2 - Manipulation',
  The2Understand = '2 - Understand',
  The3Apply = '3 - Apply',
  The3Precision = '3 - Precision',
}

export enum SkillDomain {
  Ability = 'Ability',
  Knowledge = 'Knowledge',
  Personality = 'Personality',
  Ethics = 'Ethics',
}
