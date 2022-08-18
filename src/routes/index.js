import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import routes from './routes'

Vue.use(Router)


let router = new Router(
    {
        mode: 'history',
        base: process.env.BASE_URL,
        routes: routes
    }
)

router.beforeEach((to, from, next) => {
    
    if(to.fullPath == "/login"){ //si el usuario esta loggeado y vuelve al login
        if (store.getters['auth/getToken'] != '') {

            return next({ name: 'profile' })
        }
    }


    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters['auth/isAuth'] == true) {

            return  next();

        } else {
            return  next({ name: 'login' })
        }
    } else {
        return  next()
    }
})

export default router