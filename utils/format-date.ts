const DATE_TIME_FORMAT: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "long",
  year: "numeric",
};

export default function (date: string) {
  return Intl
    .DateTimeFormat("en", DATE_TIME_FORMAT)
    .format(
      new Date(date),
    );
}
