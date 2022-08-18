
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
    logout(context) {
        //this.axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + res.data.access_token
        context.commit('logout')
              
    },
    setUser(context, payload) {
        //console.log(payload)
    
        return new Promise((resolve)=>{
            context.commit('auth', payload)
            resolve(true)
        })
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
