import {RouteRecordRaw, createRouter, createWebHistory} from 'vue-router';
import {getToken} from "../untils/cookies";
const Index =  () => import('../views/index.vue')
const Login = () => import('../views/login.vue')
const Journal = () => import("../views/journalIndex.vue")
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
    // @ts-ignore
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
