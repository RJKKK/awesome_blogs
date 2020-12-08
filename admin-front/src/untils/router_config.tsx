import Loadable from 'react-loadable';
import React from "react";
import {Redirect} from 'react-router-dom';
export function routesRemake(routes) {
    if(!routes)
        return null
    else{
        return routes.map(route=>{
            let redirectPath = route.redirect
            delete route.redirect
            return {
                ...route,
                routes: routesRemake(route.routes),
                render:redirectPath?()=>(<Redirect to={redirectPath}/>):route.render,
                component:Loadable({
                    loader:route.component,
                    loading: () => <div />
                })
            }
        })
    }
}
