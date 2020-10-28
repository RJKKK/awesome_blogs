import { Account } from '../types';

export class DefaultRes<T>{
  err:number
  data?:T|null
  msg:string
  constructor(data?:T,err?:number,msg?:string){
    this.err = err||0
    this.msg = msg||''
    this.data = data||null
  }
}


export class SetLoginToken implements Account{
  account:string|null
  password:string|null
}
