//vue3创建路由
import { createRouter, createWebHistory } from "vue-router";
import routes from "./RouteConf.ts";

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router
