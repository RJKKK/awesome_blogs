import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes:RouteRecordRaw[] = [{
    path:"/login",
    component: () => import('../views/login.vue')

}]
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
