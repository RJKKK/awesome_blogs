import Cookies from './jsCookies'
export const getToken:()=>string|null = ()=>Cookies.get('token')
export const setToken = (val:string) =>Cookies.set('token',val)
