export function groupBy<T>(items: T[], key: keyof T): { [key: string]: T[] } {
  return items.reduce((acc: { [key: string]: T[] }, item: T) => {
    const groupKey = item[key] as unknown as string; // Convert key value to string
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {});
}

// Usage example
// const groupedByStudentID = groupBy(sheetItems.value, 'student_id');
// const groupedByClass = groupBy(sheetItems.value, 'class_id'); // Or any other key
