export function groupBy<T>(
  items: T[],
  getKey: (item: T) => string
): { [key: string]: T[] } {
  return items.reduce((acc: { [key: string]: T[] }, item: T) => {
    const groupKey = getKey(item); // Get key using callback
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {});
}

// *** Usage example ***
// * use with CSV items *
// const groupedByStudentID = groupBy(sheetItems.value, (i: { student_id: string }) => i.student_id);
// * use with Object items *
// const groupedBySubject = groupBy(items, (items): string => items.subject.id!.toString());
