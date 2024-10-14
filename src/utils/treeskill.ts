// const convertToSkill = (items: {
//   map: (
//     arg0: (item: {
//       Subject_ID: string;
//       Skill_ID: string;
//       Expected_Level: string;
//       Expected_Mean: string;
//     }) => object
//   ) => SkillCollection[];
// }): SkillCollection[] => {
//   return items.map((item): SkillCollection => {
//     return {
//       subject: { id: Number(item.Subject_ID) },
//       skill: { id: Number(item.Skill_ID) },
//       level: item.Expected_Mean as SkillLevel,
//       passed: null,
//       score: 0,
//     };
//   });
// };

// const convertToNodes = (items: SkillCollection[]): QTreeNode[] => {
//   const groupedBySubject = groupBy(items, (items): string =>
//     items.subject.id!.toString()
//   );

//   return Object.entries(groupedBySubject).map(([subject, skillCollect]) => {
//     return {
//       label: `Subject ID: ${subject}`,
//       children: skillCollect.map((item) => ({
//         label: `Skill ID: ${item.skill.id}`,
//         children: [
//           {
//             label: `Expected Level: ${item.level}`,
//           },
//         ],
//       })),
//     };
//   });
// };
