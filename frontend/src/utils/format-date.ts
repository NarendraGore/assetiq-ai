export function formatDate(
  date: string | Date,
  locale = "en-IN"
) {
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function formatDateTime(
  date: string | Date,
  locale = "en-IN"
) {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}