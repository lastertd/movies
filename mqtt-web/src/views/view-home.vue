<template>
    <sss-scrollbar style="height: 100%" >
            <div class="home">
        <div class="swiper-outer">
            <div class="swiper-wrapper">
                <div class="swiper-slide swiper-slide1">
                    <img src="../../public/img/1.png">
                </div>
                <div class="swiper-slide swiper-slide2">
                    <img src="../../public/img/2.png">
                </div>
                <div class="swiper-slide swiper-slide3">
                    <img src="../../public/img/3.png">
                </div>
                <div class="swiper-slide swiper-slide4">
                    <img src="../../public/img/4.png">
                </div>


            </div>

            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
        </div>
        <div class="des-box">
            <h1 class="title">
                <span class="symbol">KINGDOM </span>
                让互联更简单!</h1>
            <p class="des">从智能电表到智能家居，从机器人和隧道无人机，
                从汽车到工业网关，全球将有超过 000 亿设备实现互联互通。
            </p>
            <div class="btn-group">
                <sss-button type="main">转到控制台</sss-button>
                <sss-button>查看文档</sss-button>

            </div>
        </div>

        <div class="characteristic">
            <s-card
                icon="sss-store"
                title="面向设备厂商"
                type="main"
                des="快速拥有设备上云一体化解决方案，从设备开发到落地运营，缩短交付周期，降低不确定性。"
            ></s-card>
            <s-card
                icon="sss-user-group"
                title="面向企业"
                type="cyan"
                des="快速搭建物联网平台基础设施，所有设备统一接入，无需昂贵的定制开发，风险可控，可利用 API 和业务系统无缝对接。"
            ></s-card>
            <s-card
                icon="sss-comps"
                title="面向集成商"
                type="warn"
                des="拥有物联网项目快速落地能力，基于平台搭建任意场景的智能化解决方案，开箱即用的零代码应用开发，全面支持 OEM。"
            ></s-card>
            <s-card
                icon="sss-user-fill"
                title="面向开发者"
                type="info"
                des="赋能硬件开发者和应用开发者，开放友好的协议规范和 API 接口，完善的文档和技术支持。"
            ></s-card>
        </div>


        <div style="height: 300px"></div>
    </div>

    </sss-scrollbar>
</template>

<script>
import Swiper from 'swiper'; // 注意引入的是Swiper
import 'swiper/css/swiper.min.css' // 注意这里的引入
import SCard from "@/components/home/s-card";


export default {
    name: "view-root",
    components: {
        SCard,
    },
    mounted() {
        const swp = new Swiper(".swiper-outer", {
            loop: true,
            speed: 600,
            autoplay: {
                delay: 5000,
                stopOnLastSlide: false,
                disableOnInteraction: false,
            },
            grabCursor: true,
            slidesPerView: "auto",
            centeredSlides: true,
            slideToClickedSlide: true,
            pagination: {
                el: '.swiper-pagination',  // 指示器容器的选择器
                clickable: true  // 设置指示器是否可点击切换
            }

        })
    }
}
</script>


<style scoped lang="less">
@import "sss-ui/src/style/variable.less";



.home {
    width: 100%;
    padding: 0 10px;
}

.swiper-outer {
    width: 100%;
    height: 340px;
    position: relative;
    overflow: hidden;
}

.swiper-wrapper {
    width: 100%;
    height: 300px;
}

.swiper-slide {
    transition: all .5s .2s ease;
    width: 70%;

    & img {
        height: 300px;
        object-fit: contain;
    }

    transform: scale(.9);
}

.swiper-slide-active {
    transform: scale(1.1);
}

.swiper-pagination {
    width: 75%;
    height: 50px;
    margin-left: 97px;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: -15px;
}

.des-box {
    padding: 40px 7px 0;

    .title {
        font-size: 40px;
        margin: 30px 0;

        .symbol {
            color: @color-blue;
        }
    }

    .des {
        font-size: 20px;
        margin-bottom: 30px;
        padding: 0 50px;
    }

    .btn-group {
        font-size: 25px;
    }

}

.characteristic {
    padding-top: 80px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 10px;
    row-gap: 20px;


}

</style>