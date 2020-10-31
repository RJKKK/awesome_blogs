import Cookies from 'js-cookie'
interface CookiesParams{
    domain?:string
    secure?:boolean
    expires?:number
    path?:string
}

interface RemoveConfig extends CookiesParams{
    path?:string
    domain?:string
}

interface withConverterConfig{
    read:(value:any,name:string)=>any
    write:(value:any,name:string)=>any
}

 declare module Cookies{
    function get(keyName?:string):any
    function set(keyName:string,val:any,config?:CookiesParams):unknown
    function noConflict():Cookies
    function withConverter(config:withConverterConfig):unknown
    function getJSON(name?:string):object|null
    function remove(keyName?:string,config?:RemoveConfig):unknown
}
// declare interface Cookies {
//      get:Function
//      set:Function
//      noConflict:()=>Cookies
// }
export default Cookies