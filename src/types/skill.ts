export interface Skill {
  id?: number;
  name: string;
  description: string;
  domain: 'Ability' | 'Knowledge' | 'Personality' | 'Ethics';
  type: 'Specific' | 'Generic';
  children?: Skill[];
}
