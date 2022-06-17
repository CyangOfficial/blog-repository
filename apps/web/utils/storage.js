export const setItem = (key, value) => {
  const encryptValue = JSON.stringify(value)
  localStorage.setItem(key, encryptValue)
  return value
}

export const getItem = key => {
  return JSON.parse(localStorage.getItem(key))
}

export const removeItem = key => localStorage.removeItem(key)