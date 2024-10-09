const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../components/HelloWorld.vue')
    },
    {
        path: '/lcs',
        name: 'about',
        component: () => import('../algorithm/DP/LCS.vue')
    }
]
export default routes
