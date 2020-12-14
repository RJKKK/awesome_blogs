import {RouteRecordRaw, createRouter, createWebHistory} from 'vue-router';
import {getToken} from "../untils/cookies";
// @ts-ignore
const Index =  () => import('../views/index.vue')
// @ts-ignore
const Login = () => import('../views/login.vue')
// @ts-ignore
const Journal = () => import("../views/journalIndex.vue")
// @ts-ignore
const Test = () => import("../views/testdemo.vue")
const routes: RouteRecordRaw[] = [{
    path: '/',
    component: Index,
}, {
    path: "/login",
    component: Login
}, {
    path: "/journal",
    component: Journal
}, {
    path: "/test",
    component: Test
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
