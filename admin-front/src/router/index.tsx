import React from 'react';
import {lazy} from 'react-router-guard'
import {RouteConfig} from '../untils/interfaces'
import {checkLogin} from "../untils/routerGuard";
import CombineTable from "../components/CombineTable";

export const router: RouteConfig[] = [
    {
        path:'/',
        redirect:'/index',
        exact:true,

    },
    {
        path: '/index',
        component: lazy(() => import('../views/MainContent')),
        canActivate: [checkLogin],
        routes: [{
            path:'/index',
            redirect:'/index/main'
        },{
            path:'/index/main',
            component:lazy(() => import('../components/CombineTable')),
            exact: true,
        }
        ]
    },
    {
        path: '/login',
        component: lazy(() => import('../views/Login')),
        exact: true,
        canActivate: []
    },
    {
        path: '/register',
        component: lazy(() => import('../views/Register')),
        exact: true,
        canActivate: []
    },
    {
        path: '/test',
        component:  <>

        </>,
        exact: true,
        canActivate: []
    }
];
