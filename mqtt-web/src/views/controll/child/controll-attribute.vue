<template>
    <div class="outer">
        <attr-card
            v-for="attr in attrList"
            :key="attr.key"
            :attr="attr.key"
        >

        </attr-card>
    </div>
</template>

<script>
import attrCard from "@/components/controll/attr-card";
import api from "@/utils/api";

export default {
    name: "controll-attribute",
    data() {
        return {
            attrList:null
        }
    },
    components:{
        attrCard
    },
    async mounted() {
        const {data} = await api.get("/attributeList");
        this.attrList = data.data;
        console.log(this.attrList)
    }
}
</script>

<style scoped lang="less">
.outer{
    width: 95%;
    display: grid;
    grid-template-columns: repeat(2,1fr);
    gap: 20px;


}

</style>