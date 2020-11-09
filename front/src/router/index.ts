import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import { getToken } from "../untils/cookies";

const routes: RouteRecordRaw[] = [{
    path: '/',
    component: () => import('../views/index.vue'),
}, {
    path: "/login",
    component: () => import('../views/login.vue')
},
{
    path: "/journal",
    component: () => import("../views/journalIndex.vue")
}];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
router.beforeEach((to, form, next) => {
    const tokenResult = getToken()
    if (!tokenResult && !(/(\/login)|(\/register)/).test(to.path)) {
        next('/login')
    }
    else next()
})

export default router;
