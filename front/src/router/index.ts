import { RouteRecordRaw, createRouter, createWebHistory,onBeforeRouteUpdate } from 'vue-router';
import {getToken} from "../untils/cookies";

const routes:RouteRecordRaw[] = [{
    path:'/',
    component:() => import('../views/index.vue')
},{
    path:"/login",
    component: () => import('../views/login.vue')

}];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
router.beforeEach((to,form,next)=>{
    const tokenResult = getToken()
    if(!tokenResult&&!(/(\/login)|(\/register)/).test(to.path)){
        next('/login')
    }
    else next()
})

export default router;
