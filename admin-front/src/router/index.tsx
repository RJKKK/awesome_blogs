import React from 'react';
import { HashRouter, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { routesRemake } from '../untils/router_config';
import { RouteProps } from 'react-router';
interface VueRoute {
    redirect: any,
    component: any,
    routes: (RouteProps & VueRoute)[]
}
const routes = [{
    path: '/',
    exact:true,
    component: ()=>import('../views/MainContent'),

}];

const Router:any = () => (
    <HashRouter>
        <Switch>
            {renderRoutes(routesRemake(routes as (RouteProps & VueRoute)[]))}
        </Switch>
    </HashRouter>
);

export default Router;