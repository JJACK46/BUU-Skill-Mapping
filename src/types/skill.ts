type Skill = {
  id: number;
  name: string;
  description: string;
  domain: string;
  parent?: Skill[];
  children: Skill[];
  techSkills: Skill[];
};

export type { Skill };
