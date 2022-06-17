import { encrypt, decrypt } from './encrypt'
import dayjs from 'dayjs'
export const setItem = (key, value) => {
  const valueJson = JSON.stringify(value)
  const encryptValue = encrypt(valueJson)
  localStorage.setItem(key, encryptValue)
}

export const getItem = key => decrypt(localStorage.getItem(key))

export const removeItem = key => localStorage.removeItem(key)

// export const formatDate = () => dayjs()
