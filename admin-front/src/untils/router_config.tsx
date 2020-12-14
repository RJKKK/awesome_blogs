import Loadable from 'react-loadable';
import React from "react";
import {RouteProps} from 'react-router'
import {Redirect} from 'react-router-dom';
interface VueRoute{
    redirect:any,
    component:any,
    routes:(RouteProps&VueRoute)[]
}
export function routesRemake(routes:(RouteProps&VueRoute)[]) :any{
    if(!routes)
        return null
    else{
        return routes.map((route)=>{
            const redirectPath = route.redirect
            delete route.redirect
            return {
                ...route,
                routes: routesRemake(route.routes),
                render:redirectPath?()=>(<Redirect to={redirectPath}/>):route.render,
                component:Loadable({
                    loader:route.component,
                    /*eslint-disable*/
                    loading: () => <div/>
                    /*eslint-disable*/
                })
            }
        })
    }
}
