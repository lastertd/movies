<template>
    <div class="card">
        <div ref="icon"
             class="icon"
             :class="[
                 `card-${type}`
             ]"
        >
            <i class="iconfont" :class="icon"></i>
        </div>
        <div class="content">
            <h1 class="title">{{ title }}</h1>
            <p class="des">{{ des }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "s-card",
    props: {
        icon: String,
        type: {
            type: String,
            default: 'main'
        },
        title: String,
        des: String,
    },
}
</script>

<style scoped lang="less">
@import "sss-ui/src/style/variable.less";

.card {
    padding: 7px 7px;
    display: grid;
    grid-template-columns: 55px 1fr;
    column-gap: 20px;
    transition: all .2s ease;
    position: relative;
    border-radius: 5px;
    min-height: 100px;


    .icon {
        height: 55px;
        font-size: 35px;
        color: @color-white3;
        display: grid;
        align-items: center;
        border-radius: 6px;

        & * {
            font-size: inherit;
        }

        &.card-main {
            background-color: @color-main;
        }

        &.card-cyan {
            background-color: @color-blue;
        }

        &.card-info {
            background-color: @color-info;
        }

        &.card-warn {
            background-color: @color-warn;
        }

        &.card-warn {
            background-color: @color-warn;
        }


    }

    .content {
        text-align: left;
        h1{
            font-size: 25px;
            margin-bottom: 10px;
        }
    }


}

</style>