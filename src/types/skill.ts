export interface Skill {
  id?: number;
  name: string;
  description: string;
  domain: 'Ability' | 'Psychomotor' | 'Personal Attributes' | 'Ethics';
  type: 'Specific' | 'Generic';
  children?: Skill[];
}
