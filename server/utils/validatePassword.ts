export default (password: string): void => {
  // between 7 to 15 characters which contain at least one numeric digit and a special character (!@#$%_^&*)
  const re = /^(?=.*[0-9])(?=.*[!@#$%_^&*])[a-zA-Z0-9!@#$%_^&*]{7,15}$/
  if (!re.test(String(password))) {
    throw new Error('Invalid password format')
  }
}
