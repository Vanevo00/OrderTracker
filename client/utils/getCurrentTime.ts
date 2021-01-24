const getCurrentTime = () => {
  const now = new Date()
  const addZeroIfNecessary = (time: number) => ('0' + time).slice(-2)
  return `${now.getHours()}:${addZeroIfNecessary(now.getMinutes())}:${addZeroIfNecessary(now.getSeconds())}`
}

export default getCurrentTime
