import Cookies from 'js-cookie'

export const getToken = () => Cookies.get('access-token')
export const setToken = (token) => Cookies.set('access-token', token)