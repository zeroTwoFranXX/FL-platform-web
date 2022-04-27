export const setStoreCache = (vm) => {
    // 全局监听，页面刷新的时候将store里state的值存到sessionStorage中，然后从sessionStorage中获取，再赋值给store。然后再把session里面存的删除即可，相当于中间件的作用。
    // 在页面加载时读取sessionStorage里的状态信息
    if (window.sessionStorage.getItem('store')) {
        vm.$store.replaceState(
            Object.assign(
                {},
                vm.$store.state,
                JSON.parse(window.sessionStorage.getItem('store'))
            )
        )
        window.sessionStorage.removeItem('store')
    }

    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('store', JSON.stringify(vm.$store.state))
    })
}
