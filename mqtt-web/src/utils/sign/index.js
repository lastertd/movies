import signInUpCard from "./src/sign-in-up-card.vue";
import Vue from "vue";

const executor = Vue.extend(signInUpCard);

const vm = new executor();

const div = document.createElement('div');
document.body.appendChild(div);


vm.$nextTick(() => {
    vm.$mount(div);
})


export default vm
