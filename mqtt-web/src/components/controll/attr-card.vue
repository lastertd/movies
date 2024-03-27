<template>
    <div class="attr-card-outer">
        <div class="header">
            <h3 class="title">{{ attr }}</h3>
            <div class="control-group">
                <sss-tool-tip title="历史数据" placement="top" dark>
                    <i class="iconfont sss-time" @click="showAttributeHistory()"></i>
                </sss-tool-tip>
                <sss-tool-tip title="时序图表" placement="top" dark>
                    <i class="iconfont sss-chart-line"></i>

                </sss-tool-tip>
                <i class="iconfont sss-other"></i>

            </div>
        </div>
        <div class="body">
            <i class="iconfont" :class="icon"></i>
            <span class="content">{{ value }}</span>
        </div>
        <div class="footer">
            <span>最后更新于:</span>
            <span>{{ lastUpdateTime }}</span>
        </div>
        <sss-dialog
            ref="dialog"
            :title="`history of ${attr}`"
            top="10vh"
        >
            <sss-scrollbar style="height: 600px">
                <div class="his-outer">
                    <div
                        class="his-header"

                    >
                        <span class="his-head-value">属性值</span>
                        <span class="his-head-time">记录时间</span>
                        <span class="his-head-type">记录方式</span>
                    </div>
                    <div
                        class="his-item"
                        v-for="item in history"
                        :key="item.create_time"
                    >
                        <span class="his-item-value">{{ item.value }}</span>
                        <span class="his-item-time">{{ item.create_time }}</span>
                        <sss-tag type="cyan" dark><span class="his-item-type">设备上传</span></sss-tag>
                    </div>
                </div>

            </sss-scrollbar>
        </sss-dialog>

    </div>
</template>

<script>
import api from "@/utils/api";

export default {
    name: "attr-card",
    props: {
        attr: {
            type: String,
            default: "default",
        },
        icon: {
            type: String,
            default: "sss-comps"
        }
    },
    data() {
        return {
            lastUpdateTime: "NULL",
            value: "暂无数据",
            history: [],
            it: undefined
        }
    },
    methods: {
        async update() {
            const {data} = await api.get(`/attribute/${this.attr}`);
            console.log(data.data[0])
            if (data.data[0]) {

                const {value, create_time} = data.data[0];
                this.value = value;
                this.lastUpdateTime = create_time;
            }

        },

        async attributeHistory() {
            const {data} = await api.get(`/attributes/${this.attr}`);
            return data.data;
        },
        async showAttributeHistory() {
            this.history = await this.attributeHistory();
            this.$refs.dialog.toggle();

        },
    },
    mounted() {
        this.update()
        this.attributeHistory();
        this.it = setInterval(() => {
            this.update();
        }, 7000);


    },
    beforeDestroy() {
        clearInterval(this.it);
    }
}
</script>

<style scoped lang="less">
@import "sss-ui/src/style/variable.less";

.attr-card-outer {
    box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
    padding: 7px 14px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    gap: 10px;
}

.header {
    display: flex;

    h3 {
        margin: 0;
        font-size: inherit;
    }

    justify-content: space-between;

    .control-group {
        & > * {
            margin: 0 7px;
            user-focus: none;
            user-select: none;

            &:hover {
                color: @color-main;
            }
        }

        & > *:last-child {
            margin-right: 0;
        }
    }
}

.body {
    font-size: 40px;

    & * {
        font-size: inherit;
    }

    & > * {
        margin-right: 10px;
    }

    text-align: left;
}

.footer {
    color: @color-white1;
    text-align: right;

    & > * {
        margin-left: 10px;
    }
}

.his-outer {
    display: grid;
    align-items: center;
    justify-items: center;
    gap: 20px;
    padding: 20px 10px;
    min-width: 700px;

    .his-header,
    .his-item {
        display: grid;
        column-gap: 30px;
        justify-items: center;
        align-items: center;
        width: 100%;
        grid-template-columns: 200px 1fr 150px;
        border-top: 1px @color-gray solid;
        border-bottom: 1px @color-gray solid;

        .his-item-value,
        .his-item-time {
            color: darken(@color-gray, 50%)
        }
    }

    .his-header {
        font-size: 20px;
        font-weight: 550;
        color: #423737;
        border: none;

    }
}

</style>