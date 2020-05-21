export default function ({ store, route }) {
    store.dispatch('main/setCurrentRouteName', RoutesAndBreadCrumbs(route.path))
}


function RoutesAndBreadCrumbs(route = '') {
    let BreadCrumb;
    if (route.startsWith('/stop-list/')) {
        BreadCrumb = 'Стоп-лист'
    }
    return BreadCrumb


}
