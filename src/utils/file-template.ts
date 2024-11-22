export function downloadTemplateForStudents() {
    const rows = [
        { id: '65160001' },
        { id: '65160002' },
        { id: '65160003' },
    ];
    const csvContent = 'ID\n' + rows.map((r) => r.id).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'example_import_students.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}