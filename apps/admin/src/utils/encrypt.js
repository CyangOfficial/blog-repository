import { AES, enc } from 'crypto-js'
const key = 'blog-admin'
export const encrypt = text => {
  return AES.encrypt(text, key, 256).toString()
}

export const decrypt = text => {
  return AES.decrypt(text, key, 256).toString(enc.Utf8)
}
