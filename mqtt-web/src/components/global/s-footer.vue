<template>
    <footer ref="outer">
        <div class="footer-item"
             @click="handleClick('home')"
        >
            <i class="iconfont sss-home"></i>
            <span>首页</span>
        </div>
        <div class="footer-item"
             @click="handleClick('controll')"
        >
            <i class="iconfont sss-controll"></i>
            <span>控制台</span>
        </div>
        <div class="footer-item"
             @click="handleClick('user')"
        >
            <i class="iconfont sss-user2"></i>
            <span>个人中心</span>
        </div>
        <div class="mark" ref="mark"></div>
    </footer>
</template>

<script>
import api from "@/utils/api";

export default {
    name: "s-footer",
    watch: {
        '$route.path'(newPath) {
            this.watchPath(newPath);
        }
    },

    methods: {
        async handleClick(tag) {
            if (tag === 'home') {
                this.activeChange(0);
                this.$router.push("/").catch(() => {
                })
            } else if (tag === 'controll') {
                this.activeChange(1);
                const userName = localStorage.getItem("userName");
                this.$router.push(`/controll/${userName}`).catch(() => {
                })


            } else if (tag === 'user') {
                this.$router.push("/user").catch(() => {
                })
                this.activeChange(2);


            }

        },
        activeChange(index) {
            if (index === 0) {
                this.$refs.mark.style.left = '10%';
            } else if (index === 1) {
                {
                    this.$refs.mark.style.left = '43.5%';

                }
            } else if (index === 2) {
                this.$refs.mark.style.left = '76.6%';

            }
            const itemList = this.$refs.outer.querySelectorAll('.footer-item');
            itemList.forEach(item => {
                item.classList.remove('is-active');
            })
            setTimeout(() => {
                itemList[index].classList.add('is-active');


            }, 200)
        },
        watchPath(path) {
            const list = path.split("/");
            if (list[1] === 'controll') {
                this.activeChange(1);
            } else if (list[1] === 'user') {
                this.activeChange(2);
            } else {
                this.activeChange(0);
            }
        }

    },
    mounted() {
        this.watchPath(this.$route.path)
    }
}
</script>

<style scoped lang="less">
@import "sss-ui/src/style/variable.less";

footer {
    width: 100%;
    max-width: inherit;
    min-height: 70px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    bottom: 0;
    position: relative;
}

.footer-item {
    padding: 5px 0;
    user-select: none;
    display: grid;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 40%;
    transition: all .2s cubic-bezier(0.23, 1, 0.72, 1);

    & > i {
        font-size: 30px;
        margin: 5px 0;
    }

    & > span {
        font-size: 14px;
    }

    &:hover {
    }
}

.is-active {
    color: @color-main;
    background-color: darken(@color-gray, -5%);
}

.mark {
    position: absolute;
    top: 0;
    height: 100%;
    width: 13%;
    background-color: darken(@color-gray, -5%) !important;
    opacity: .99;
    transition: all .5s ease;
    z-index: -1;
}
</style>