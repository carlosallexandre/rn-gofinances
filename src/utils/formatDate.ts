function isValidDate(d: any) {
  return d instanceof Date && !isNaN(d.getTime());
}

export function formatDate(
  value: Date,
  options?: Intl.DateTimeFormatOptions
): string {
  let dateFormatted = "";

  if (isValidDate(value)) {
    dateFormatted = value.toLocaleDateString(
      "pt-BR",
      options ? options : { day: "2-digit", month: "2-digit", year: "2-digit" }
    );
  }

  return dateFormatted;
}
