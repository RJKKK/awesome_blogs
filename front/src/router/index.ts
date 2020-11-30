import {RouteRecordRaw, createRouter, createWebHistory} from 'vue-router';
import {getToken} from "../untils/cookies";


const routes: RouteRecordRaw[] = [{
    path: '/',
    // @ts-ignore
    component: () => import('../views/index.vue'),
}, {
    path: "/login",
    // @ts-ignore
    component: () => import('../views/login.vue')
}, {
    path: "/journal",
    // @ts-ignore
    component: () => import("../views/journalIndex.vue")
}, {
    path: "/test",
    // @ts-ignore
    component: () => import("../views/testdemo.vue")
}
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
// router.beforeEach((to, form, next) => {
//     const tokenResult = getToken()
//     if (!tokenResult && !(/(\/login)|(\/register)|(\/test)/).test(to.path)) {
//         next('/login')
//     } else next()
// })

export default router;
