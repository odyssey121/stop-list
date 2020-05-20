import { db } from "~/plugins/fire";
export const actions = {
    setCurrentRouteName(vuexContext, payload) {
        vuexContext.commit('SET_CURRENT_ROUTE_NAME', payload)
    },
    setPerPage(vuexContext, payload) {
        vuexContext.commit('SET_PER_PAGE', payload)
    },
    fetchPhones(vuexContext, page) {
        vuexContext.commit("SET_LOADING", true);
        db.collection("phones").orderBy('created_at', 'desc').get()
            .then(querySnapshot => {
                const phones = querySnapshot.docs.map(doc => {
                    let id = doc.id
                    let data = doc.data()
                    return ({ ...data, id })
                });
                vuexContext.commit("SET_PHONES", phones)
                vuexContext.commit("SET_LOADING", false);
            }).catch(e => {
                vuexContext.error(e);
                vuexContext.commit("SET_LOADING", false)
            });

    },
    setCurrentPage(vuexContext, page) {
        vuexContext.commit('SET_CURRENT_PAGE', page)


    },
    addPhone(vuexContext, data) {
        var collection = db.collection("phones");
        collection.add(data).then(resp => {
            const { id } = resp
            vuexContext.commit("ADD_PHONE", { ...data, id })
        });
    },
    deletePhone(vuexContext, id) {
        db.collection('phones').doc(id).delete().then(resp => {
            vuexContext.commit("DELETE_PHONE", id)
        })
    },
    setSearch(vuexContext, payload) {
        vuexContext.commit("SET_SEARCH", payload)

    },
    removeSearch(vuexContext, _payload) {
        vuexContext.commit("RESET_SEARCH")

    },
    editPhone(vuexContext, { id, number }) {
        db.collection('phones').doc(id).update({ number }).then(resp => vuexContext.commit("EDIT_PHONE", { id, number }));

    },
}

export const mutations = {
    EDIT_PHONE(state, { id, number }) {
        state.phones = state.phones.map(record => {
            if (record.id === id) {
                return ({ ...record, number })
            } else {
                return ({ ...record })
            }
        })

    },
    SET_LOADING(state, payload) {
        state.fetching = payload

    },
    DELETE_PHONE(state, id) {
        let filtered = state.phones.filter(record => record.id !== id)
        state.phones = filtered

    },
    SET_SEARCH(state, payload) {
        state.search = payload
    },
    RESET_SEARCH(state, _payload) {
        state.search = ""
    },
    ADD_PHONE(state, data) {
        state.phones.unshift(data)
    },
    SET_CURRENT_PAGE(state, page) {
        state.currentPage = page
    },
    SET_CURRENT_ROUTE_NAME(state, name) {
        state.currentRoute = name
    },
    SET_PHONES(state, phonesArray) {
        state.phones = phonesArray
    },
    SET_PER_PAGE(state, payload) {
        state.perPage = payload
    },


}

export const getters = {
    getBreadCrumbs: (state, _getters) =>
        state.currentRoute
    ,
    getPhones: (state, _getters) => page => {
        let result = state.phones.slice((page - 1) * state.perPage, (page - 1) * state.perPage + state.perPage)
        return result
    }
    ,
    getPerPage: (state, _getters) =>
        state.perPage,
    getTotalPage: (state, _getters) =>
        Math.ceil(state.phones.length / state.perPage),
    getCurrentPage: (state, _getters) =>
        state.currentPage,
    getSearchStr: (state, _getters) =>
        state.search,
    getLoading: (state, _getters) =>
        state.fetching


}

export const state = () => ({ currentRoute: '', phones: [], perPage: 5, currentPage: 1, search: "", fetching: false })