<template>
    <header>
        <a href="/" class="symbol">
            <img src="/favicon.ico" alt="">
            <h1 class="symbol-content">
                KingDom
            </h1>
        </a>
        <sss-button @click="func">login comp</sss-button>



    </header>
</template>

<script>
import sign from "@/utils/sign";
export default {
    name: "s-hedaer",
    methods:{
        async func(){
	        sign.toggle();

        }
    }
}
</script>

<style scoped lang="less">
@import "sss-ui/src/style/variable.less";
header {
    height: 60px;
    width: 100%;
    max-width: inherit;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1%;
}
.symbol{
    height: inherit;
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    color: @color-black2;

    img{
        height: 75%;
    }
    .symbol-content{
        font-size: 22px;
        margin-left: 5px;
    }
}

</style>