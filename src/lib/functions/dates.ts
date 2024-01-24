export function unixepochToDate(n: number) {
  return new Date(n * 1000)
}

export function formatDate(n: number) {
  const date = unixepochToDate(n);
  const intl = new Intl.DateTimeFormat("en", {
    dateStyle: "medium"
  })

  return intl.format(date)
}
