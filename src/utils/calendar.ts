export function getMonthYearLabel(date: Date): string {
  return date.toLocaleString("default", { month: "long", year: "numeric" });
}

export function getCalendarMatrix(date: Date): (number | null)[][] {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const matrix: (number | null)[][] = [];
  let week: (number | null)[] = Array(firstDayIndex).fill(null);

  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day);

    if (week.length === 7) {
      matrix.push(week);
      week = [];
    }
  }

  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    matrix.push(week);
  }

  return matrix;
}
