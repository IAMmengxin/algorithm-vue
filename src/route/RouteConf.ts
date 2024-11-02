const routes = [
    {
        path: '/home',
        name: 'home',
        component: () => import('../components/HelloWorld.vue')
    },
    {
        path: '/lcs',
        name: 'about',
        component: () => import('../algorithm/DP/LCS.vue')
    },
    {
        path: '/',
        redirect: '/subject',
    },
    // {
    //     path: '/subject',
    //     name: 'subject',
    //     component: () => import('../algorithm/subject/Subject.vue')
    // },
    {
        path: '/cj',
        name:'cj',
        component: ()=> import('../algorithm/subject/cj.vue')
    },
    {
        path: '/subject',
        name: 'sub',
        component: ()=> import('../algorithm/subject/subscription.vue')
    }
]
export default routes
