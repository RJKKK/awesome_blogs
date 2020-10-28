
export interface EnterPrisePlanDetail {
  planName:string
  price:number
  planId:number
  endTime:number
}

//套餐，采取_id作单键索引
export interface Plan {
  planName:string
  store:number
  memberSize:number
  diskSize:number
  description:string
}




