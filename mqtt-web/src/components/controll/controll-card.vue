<template>
    <div class="card">
        <i class="icon iconfont" :class="icon"></i>
        <div class="content">
            <h1 class="title">{{ title }}</h1>
            <p class="des">{{ des }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "controll-card",
    props: {
        icon: String,
        title: String,
        des: String,
    }

}
</script>


<style scoped lang="less">
@import "sss-ui/src/style/variable.less";

.card {
    padding: 14px 7px;
    display: flex;
    box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
    transition: all .2s ease;
    position: relative;
    border-radius: 5px;
    min-height: 100px;

    .icon {
        width: 20%;
        font-size: 30px;
        padding-top: 5px;
        color: @color-blue;
    }


    .content {
        width: 80%;

        & > * {
            text-align: left;
        }

        .title {
            color: @color-blue;
            font-weight: 500;
            font-size: 23px;
            margin-bottom: 5px;
        }
    }

    &:active {
        transform: scale(.97);
        &:after{
        content: "";
        display: block;
        position: absolute;
        top: -4px;
        bottom: -4px;
        left: -4px;
        right: -4px;
        border: 2px solid @color-gray;
        border-radius: 8px;


    }

    }

}

</style>