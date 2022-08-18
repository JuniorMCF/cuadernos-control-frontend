// initial state
//import axios from 'axios'
const state = () => ({
    pageTransition: {
        name: "fade",
        mode: "out-in",
        duration: { enter: 800, leave: 1200 }
    },
    isHome: true,
    title_page: "Modulo de administración",
    path: "/",
    actual_page: "",
    drawer:true,
    active_tab:'profile',
    active_tab_child:false,
    items_group: [
        {
            route: "/admin/profile",
            title: "Perfil",
            icon: "mdi-account",
            active: 'profile',
            subitems: [
            ],
        },
        {
            route: "/admin/enterprise",
            title: "Empresa",
            icon: "mdi-domain",
            active: 'enterprise',
            subitems: [
                {
                    route: "/admin/enterprise",
                    active: 'enterprise',
                    title: "Configuración",
                    subitems: [
                    ],
                    icon: "mdi-account",
                },
                {
                    route: "/admin/products",
                    active: 'enterprise',
                    title: "Productos",
                    subitems: [
                    ],
                    icon: "mdi-account",
                },
                {
                    route: "/admin/services",
                    active: 'enterprise',
                    title: "Servicios",
                    subitems: [
                    ],
                    icon: "mdi-account",
                },
                {
                    route: "/admin/clients",
                    active: 'enterprise',
                    title: "Clientes",
                    subitems: [
                    ],
                    icon: "mdi-account",
                },
            ],
        },
        {
            route: "/admin/records",
            title: "Registros",
            icon: "mdi-cash-register",
            active: 'records',
            subitems: [
                {
                    route: "/admin/sales",
                    active: 'records',
                    title: "Ventas",
                    subitems: [
                    ],
                    icon: "mdi-account",
                },
                {
                    route: "/admin/pensions",
                    title: "Servicios o pensiones",
                    active: 'records',
                    subitems: [
                    ],
                    icon: "mdi-account",
                },
            ],
        },


        {
            route: "/admin/statistics",
            title: "Estadísticas",
            icon: "mdi-view-dashboard",
            active: 'statistics',
            subitems: [
                {
                    route: "/admin/about-sales",
                    active: 'statistics',
                    title: "Tus estadisticas",
                    subitems: [
                    ],
                    icon: "mdi-account",
                },
            ],
        },

    ],
})

// getters
const getters = {
    notPublic(state) {

        /**verificamos que la path no sea publica
         * para ver que navbar mostramos
         */
        if (state.path.includes("/admin")) {
            return true
        }
        return false
    },
    getList(state){
        return state.items_group
    },
    getActiveTab(state){
        return state.active_tab
    },
    getActiveTabChild(state){
        return state.active_tab_child
    },
    getDrawer(state){
        return state.drawer
    }

}

// actions
const actions = {

    setPath({ commit }, value) {

        if (value != '/') {
            commit("savePath", value)
            commit('setPath', false)
        } else {
            commit("savePath", value)
            commit('setPath', true)
        }


    },
    saveActualPage({ commit }, value) {
        commit("saveActualPage", value)
    },
    changeTitlePage({ commit }, value) {
        commit('changeTitlePage', value)
    },

    setActiveTab({ commit }, payload) {
        commit('setActiveTab', payload)
    },
    setActiveTabChild({ commit }, payload) {
        commit('setActiveTabChild', payload)
    },
    setDrawer({commit},value){
        commit('setDrawer',value)
    }

}

// mutations
const mutations = {

    setPath(state, value) {
        state.isHome = value
    },
    changeTitlePage(state, value) {
        state.title_page = value
    },
    savePath(state, value) {
        state.path = value
    },
    saveActualPage(state, value) {
        state.actual_page = value
    },
    openPage(state, visita_id) {
        state.visita_id = visita_id
    },
    closeNewsletter(state) {
        state.newsletter = false
    },
    setActiveTab(state, payload) {
        state.active_tab = payload.active
    },
    setActiveTabChild(state,payload){
        state.active_tab_child = payload.active
    },
    setDrawer(state,value){
        state.drawer = value
    }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
