import React from 'react';
import {lazy} from 'react-router-guard'
import {IConfig} from 'react-router-guard/dist/models'

export const router: IConfig[] = [
    {
        path: '/',
        component: lazy(() => import('../views/MainContent')),
        exact:true,
        canActivate:[]
    },
    {
        path: '/login',
        component: lazy(() => import('../views/Login')),
        exact:true,
        canActivate:[]
    },
    {
        path: '/register',
        component: lazy(() => import('../views/Register')),
        exact:true,
        canActivate:[]
    }
];
