export default function ({ store, route }) {
    const { params } = route;
    if (params && params.page === "page" && parseInt(params.num) !== NaN) {
        store.dispatch('main/setCurrentPage', parseInt(params.num))
    } else {
        store.dispatch('main/setCurrentPage', 1)
    }
}

