// import { encrypt, decrypt } from './encrypt'
export const setItem = (key, value) => {
  // const encryptValue = encrypt(JSON.stringify(value))
  const encryptValue = JSON.stringify(value)
  localStorage.setItem(key, encryptValue)
}

export const getItem = key => {
  return localStorage.getItem(key)
}

export const removeItem = key => localStorage.removeItem(key)
