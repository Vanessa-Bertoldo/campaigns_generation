export function convertDate(value: string | Date): string {
  let date: Date;

  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split('-').map(Number);
    date = new Date(year, month - 1, day); 
  } else if (value instanceof Date) {
    date = value;
  } else {
    throw new Error('Valor inválido para data.');
  }

  const ano = date.getFullYear();
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const dia = String(date.getDate()).padStart(2, '0');

  return `${ano}-${mes}-${dia}`;
}
