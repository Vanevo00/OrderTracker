const formatDate = (date: string | undefined, withTime?: boolean): string | undefined => {
  if (!date) return
  const dateObject = new Date(date)

  const addZeroIfNecessary = (item: number): string => ('0' + String(item)).slice(-2)

  const dateWithoutTime = `${dateObject.getDate()}. ${dateObject.getMonth() + 1}. ${String(dateObject.getFullYear())}`
  const dateWithTime = `${dateWithoutTime} ${dateObject.getHours()}:${addZeroIfNecessary(dateObject.getMinutes())}`

  if (withTime) {
    return dateWithTime
  }
  return dateWithoutTime
}

export default formatDate
