/**Routes for SPA */

const routes = [


    { path: '*',component: () => import('../pages/notfound/404.vue') },

       /**publics */

    {
        path: '/',
        component: () => import('../pages/home/Index.vue'),
        name: 'home',
    },

    {
        path: '/login',
        component: () => import('../pages/auth/login/Index.vue'),
        name: 'login',
    },
    {
        path: '/register',
        component: () => import('../pages/auth/register/Index.vue'),
        name: 'register',
    },


 
    {
        path: '/admin',
        component: () => import('../pages/admin/Index.vue'),
        children: [
            {
                path: "profile",
                name: "profile",
                component: () => import('../pages/admin/profile/Index.vue')
            },
            {
                path: "enterprise",
                name: "enterprise",
                component: () => import('../pages/admin/enterprise/enterprise/Index.vue')
            },
            {
                path: "products",
                name: "products",
                component: () => import('../pages/admin/enterprise/products/create/Index.vue')
            },
            {
                path: "products/:id/edit",
                name: "products_edit",
                component: () => import('../pages/admin/enterprise/products/edit/Index.vue')
            },
            {
                path: "services",
                name: "services",
                component: () => import('../pages/admin/enterprise/services/create/Index.vue')
            },
            {
                path: "services/:id/edit",
                name: "services_edit",
                component: () => import('../pages/admin/enterprise/services/edit/Index.vue')
            },
            {
                path: "clients",
                name: "clients",
                component: () => import('../pages/admin/enterprise/clients/create/Index.vue')
            },
            {
                path: "clients/:id/edit",
                name: "clients_edit",
                component: () => import('../pages/admin/enterprise/clients/edit/Index.vue')
            },


            {
                path: "sales",
                name: "sales",
                component: () => import('../pages/admin/records/sales/Index.vue')
            },
            {
                path: "pensions",
                name: "pensions",
                component: () => import('../pages/admin/records/pensions/Index.vue')
            },


            {
                path: "about-sales",
                name: "about-sales",
                component: () => import('../pages/admin/statistics/about_sales/Index.vue')
            },

        ],
        meta: {
            requiresAuth: true
        }

    },


]


export default routes
