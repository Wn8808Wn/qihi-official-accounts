import scroll from './scroll.vue'

const scrollConponent = {
    install: function (Vue) {
        Vue.component('scroll', scroll)
    }
}
export default scrollConponent;
