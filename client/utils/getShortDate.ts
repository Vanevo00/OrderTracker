const getShortDate = (date: string): string => {
  const dateObject = new Date(date)
  return `${dateObject.getDate()}. ${dateObject.getMonth() + 1}. ${String(dateObject.getFullYear())}`
}

export default getShortDate
