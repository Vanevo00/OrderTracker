export default (password: string): void => {
  // between 7 to 40 characters which contain at least one capital letter, one lowercase letter and one numeric digit
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{7,})/
  if (!re.test(String(password))) {
    throw new Error('Invalid password format')
  }
}
