import Vue from "vue";
import VueRouter from "vue-router";


import home from "@/router/src/home";
import controll from "@/router/src/controll";
import user from "@/router/src/user";

Vue.use(VueRouter)

const routes = [
    home,
    controll,
    user
]


const router = new VueRouter({
    routes,

})


export default router

