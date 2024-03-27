<template>
    <sss-scrollbar style="height: 100%">
        <div style="display: grid;justify-items: center;align-items: center">
                        <div class="controll">
        <controll-card
            icon="sss-star2"
            title="属性监控"
            des="🌻 查看属性的上报的历史数据"
            @click.native="pathToAttributes()"
        ></controll-card>
        <controll-card
            icon="sss-star2"
            title="事件捕获"
            des="💮 监听设备发出的事件"
        ></controll-card>
        <controll-card
            icon="sss-star2"
            title="设备控制"
            des="🌸 远程控制设备"
        ></controll-card>
        <controll-card
            icon="sss-star2"
            title="远程监控"
            des="🌺 监控摄像头"
        ></controll-card>
    </div>
            <div >
                        <router-view></router-view>

            </div>

        </div>
    </sss-scrollbar>

</template>

<script>
import controllCard from "@/components/controll/controll-card";

export default {
    name: "view-controll",
    components: {
        controllCard,
    },
    methods:{
        pathToAttributes(){
                this.$router.push({
                    name:"attributes"
                }).catch(() => {})
        }
    }
}
</script>

<style scoped lang="less">
.controll {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 20px;
    padding: 40px 40px;

}

</style>