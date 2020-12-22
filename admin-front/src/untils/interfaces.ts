import {IConfig} from 'react-router-guard/dist/models'

// @ts-ignore
export interface RouteConfig extends IConfig{
    path: string;
    component?: () => void;
    redirect?: string;
    exact?: boolean;
    canActivate?: Array<Promise<Function>>
    routes?:RouteConfig[]
}
export interface XMLdata<T=null> {
    err:number,
    data:T,
    msg:string
}