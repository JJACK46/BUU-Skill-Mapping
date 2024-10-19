export type Skill = {
  id: number;
  name: string;
  description: string;
  domain: LearningDomain;
  parent?: Skill[];
  children: Skill[];
  techSkills: Skill[];
};

export enum LearningDomain {
  Psychomotor = 'Psychomotor', // ทักษะ
  Affective = 'Affective', // คุณลักษณะบุคคล
  Cognitive = 'Cognitive', //  ความรู้
  Ethics = 'Ethics', //  จริยธรรม
}
