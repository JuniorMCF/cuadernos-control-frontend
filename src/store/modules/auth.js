// initial state
import axios from 'axios'

const state = () => ({
    token: '',
    token_type: '',
    expired_at: null,
    userLoadStatus: false,
    user: null,
    roles: [],
    permissions: [],
})

// getters
const getters = {
    isAuth(state) {

        if (state.user == null)
            return false

        return true
    },
    getUserLoadStatus(state) {
        return function () {
            return state.userLoadStatus;
        }
    },
    getUserId(state) {
        return state.user.id
    },
    getUser(state) {
        return state.user
    },
    getToken(state) {
        return state.token
    }



}

// actions

const actions = {
    logout(context, payload) {

        return new Promise((resolve, reject) => {

            const url_base = 'http://127.0.0.1:8000/api/'

            axios({
                method: 'post',
                url: url_base + "logout",
                headers: { Authorization: "Bearer " + payload.token },

            }).then(res => {

                //this.axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + res.data.access_token
                context.commit('logout')
                resolve(res.data)
            }).catch(err => {
                //context.commit('logout')
                reject(err)
            })
        })
    },
    setUser(context, payload) {
        //console.log(payload)
        context.commit('auth', payload)
    },
    setUserProfile(context,payload){
        context.commit('user',payload)
    }
}

// mutations
const mutations = {
    auth(state, payload) {
        state.token = payload.token
        state.user = payload.user
    },
    logout(state) {
        state.token = ''
        state.user = null
    },
    user(state,payload){
        state.user = payload.user
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
