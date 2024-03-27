<template>
    <div id="app">
        <s-header></s-header>


        <main class="main">
            <transition name="rootRoute" mode="out-in">
                <router-view></router-view>
            </transition>

        </main>



        <s-footer></s-footer>




    </div>
</template>

<script>
import SHeader from "./components/global/s-hedaer"
import SFooter from "@/components/global/s-footer";
import sign from "@/utils/sign";

export default {
    name: 'App',
    components: {
        SHeader,
        SFooter,


    },
}
</script>

<style lang="less">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    position: relative;
    margin: 0 auto;

    width: 100%;
    max-width: 800px;
    height: 100vh;
    overflow: hidden;

    display: flex;
    flex-flow: column nowrap;

}

.main {
    flex: 1;
    overflow: hidden;
    max-width: inherit;
    padding-top: 20px;


}

.home {
    //height: 1000px;
    width: 100%;
    display: flex;
    flex-flow: column;


}


.rootRoute-leave-active{
    transition: all  600ms  cubic-bezier(0.23, 1, 0.72, 1);
}
.rootRoute-enter-active{
    opacity: 1;
    transition: all 500ms  cubic-bezier(0.23, 1, 0.72, 1);
}



.rootRoute-enter{
    opacity: 0;
    transform: translateX(-55%);
}
.rootRoute-leave-to {
    opacity: 0;
    transform: translateX(95%);
}

</style>
