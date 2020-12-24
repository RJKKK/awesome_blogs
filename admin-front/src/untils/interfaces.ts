import {IConfig} from 'react-router-guard/dist/models'

/**
 * @param path: string
 * @param component: () => void;
 * @param redirect: string;
 * @param exact: boolean;
 * @param canActivate: Array
 * @param routes:RouteConfig[]
 **/
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