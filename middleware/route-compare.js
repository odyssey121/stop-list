export default function ({ store, route }) {
    store.dispatch('main/setCurrentRouteName', RoutesAndBreadCrumbs(route.path))
    const { params } = route;
    if (route.path.startsWith('/stop-list/'))
        if (params && params.page === "page" && parseInt(params.num) !== NaN) {
            store.dispatch('main/setCurrentPage', parseInt(params.num))
        } else {
            store.dispatch('main/setCurrentPage', 1)
        }


}


function RoutesAndBreadCrumbs(route = '') {
    let BreadCrumb;
    if (route.startsWith('/stop-list/')) {
        BreadCrumb = 'Стоп-лист'
    }
    return BreadCrumb


}
