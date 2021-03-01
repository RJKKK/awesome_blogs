export type Route = {
  id:number,
  url:string,
  name:string
}
export default [
  {
    id:0,
    url:'adminManage/person',
    name:'管理员管理/人员管理'
  },
  {
    id:1,
    url:'fileManage/stamp',
    name:'文件管理/贴纸管理'
  },
  {
    id:2,
    url:'fileManage/fontFamily',
    name:'文件管理/字体管理'
  },
  {
    id:3,
    url:'accountManage/user',
    name:'账户管理/用户管理'
  }
] as Route[]
