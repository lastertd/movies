<template>
    <sss-dialog
        ref="dialog"
        title="注册 / 登录"
        top="5vh"
        width="75vw"
        class="dialog"
    >
        <div class="container">
            <sss-nexter>
                <transition name="left">
                    <form v-show="flag" class="sign-in">
                        <h1 class="title">登录个人账户</h1>
                        <sss-input
                            ref="signInEmail"
                            v-model="signIn.email"
                            prefix-icon="sss-email"
                            placeholder="邮箱"
                            clear-able
                            id="signInEmail"

                            @blur="handleEamilIptBlur('signIn')"
                        ></sss-input>
                        <sss-input
                            ref="signInPassword"
                            v-model="signIn.password"
                            prefix-icon="sss-editor"
                            type="password"
                            placeholder="密码"
                            show-password
                            clear-able
                            id="signInPassword"

                            @blur="handleUserPasswordCheck('signIn')"
                        ></sss-input>
                        <sss-button type="main" round @click="login">点击登录</sss-button>
                    </form>
                </transition>
            </sss-nexter>

            <sss-nexter>
                <transition name="right">
                    <form v-show="!flag" class="sign-up">
                        <h1 class="title">注册新的账户</h1>

                        <sss-input
                            ref="signUpEmail"
                            v-model="signUp.email"
                            prefix-icon="sss-email"
                            placeholder="邮箱"
                            clear-able
                            id="signUpEmail"

                            @blur="handleEamilIptBlur('signUp')"
                        ></sss-input>
                        <sss-input
                            ref="signUpUserName"
                            v-model="signUp.username"
                            prefix-icon="sss-user"
                            placeholder="用户名"
                            clear-able
                            id="signUpUserName"

                            @blur="handleUserNameCheck('signUp')"

                        ></sss-input>
                        <sss-input
                            ref="signUpPassword"
                            v-model="signUp.password"
                            type="password"
                            prefix-icon="sss-editor"
                            placeholder="密码"
                            clear-able
                            show-password
                            id="signUpPassword"

                            @blur="handleUserPasswordCheck('signUp')"
                        ></sss-input>
                        <sss-input
                            ref="signUpPasswordRepeat"
                            v-model="signUp.passwordRepeat"
                            type="password"
                            prefix-icon="sss-editor"
                            placeholder="请再次输入密码"
                            clear-able
                            show-password
                            id="signUpPasswordRepeat"

                            @blur="handleUserPasswordRepeatCheck()"
                        ></sss-input>
                        <sss-button
                            type="main"
                            round
                            @click="register"
                        >立即创建
                        </sss-button>
                    </form>
                </transition>
            </sss-nexter>

            <transition name="left">
                <div class="left" v-show="!flag">
                    <h1 class="title">Wellcome Back!</h1>
                    <p class="des">To keep connected with us please login with your personal info</p>
                    <sss-button
                        round
                        type="main"
                        @click="flag = !flag"
                    >Sign in
                    </sss-button>

                </div>

            </transition>
            <transition name="right">
                <div class="right" v-show="flag">
                    <h1 class="title">Hello, Friend!</h1>
                    <p class="des">Enter your personal details and start journey with us</p>
                    <sss-button
                        round
                        type="main"
                        @click="flag = !flag"
                    >Sign up
                    </sss-button>
                </div>

            </transition>
            <div class="mark is-right" ref="mark">

            </div>
        </div>

    </sss-dialog>
</template>

<script>

import api from "@/utils/api";

export default {
    name: "sign-in-up-card",
    data() {
        return {
            flag: true, //控制卡片的显示，通过roggle函数改变
            emailCheck: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:\w(?:[\w-]*\w)?\.)+\w(?:[\w-]*\w)?/,
            usernameCheck: /^\w+$/,
            passwordCheck: /^\w+$/,
            signIn: {
                email: undefined,
                password: undefined
            },
            signUp: {
                email: undefined,
                username: undefined,
                password: undefined,
                passwordRepeat: undefined
            }
        }
    },
    watch: {
        flag() {
            this.$refs.mark.classList.toggle('is-right')
        }
    },
    methods: {
        //控制显示
        toggle() {
            this.$refs.dialog.toggle();
        },
        //登录和注册，不让用signIn,signUp :(悲
        async login() {
            const flagList = await Promise.all([this.handleEamilIptBlur('signIn'),
                this.handleUserPasswordCheck('signIn')]);
            //是否所有检查都通过
            if (!flagList.every((item) => item === true)) {
                return;
            }


            const form = new FormData();
            form.append("userEmail", this.signIn.email);
            form.append("userPassword", this.signIn.password);


            const {data} = await api.post("/login", form)
            if (data.status !== 0) {
                this.$refs.signInPassword.showLabel(data.message)
            } else {
                this.toggle();

                localStorage.setItem("userName",data.userName);


                setTimeout(() => {
                    this.$notify({
                        title: "login successfully!",
                        type: "success",
                        content: `wellcome back ${data.userName} 🥳`
                    })
                }, 500)
            }

        },

        async register() {
            const flagList = await Promise.all([this.handleEamilIptBlur('signUp'),
                this.handleUserNameCheck('signUp'), this.handleUserPasswordCheck('signUp'),
                this.handleUserPasswordRepeatCheck()]);

            if (!flagList.every(item => item === true)) {
                return;
            }

            const form = new FormData();
            form.append("userEmail", this.signUp.email);
            form.append("userName", this.signUp.username);
            form.append("userPassword", this.signUp.password);


            const {data} = await api.post("/register", form);
            if (data.status !== 0) {
                this.$refs.signUpPasswordRepeat.showLabel(data.message);
                return
            }

            this.toggle();
            setTimeout(() => {
                this.$notify({
                    title: "register successfully!",
                    type: "success",
                    content: "plz check your email. 💟"
                })
            }, 500)


        },
        async handleEamilIptBlur(tag) {
            //登录
            if (tag === 'signIn') {
                if (!this.$refs.signInEmail.value) {
                    this.$refs.signInEmail.showLabel("输入不能为空")
                    return false
                }
                if (!this.emailCheck.test(this.$refs.signInEmail.value)) {
                    this.$refs.signInEmail.showLabel("邮箱格式不正确")
                    return false
                }
                return true
            }
            //注册
            else {
                if (!this.$refs.signUpEmail.value) {
                    this.$refs.signUpEmail.showLabel("输入不能为空哦.")
                    return false
                }
                if (!this.emailCheck.test(this.$refs.signUpEmail.value)) {
                    this.$refs.signUpEmail.showLabel("邮箱格式不正确")
                    return false
                }

                const {data} = await api.get(`/checkEmail/${this.signUp.email}`);
                if (data.status !== 0) {
                    this.$refs.signUpEmail.showLabel(data.message)
                    return false
                }
                return true
            }
        },
        async handleUserNameCheck(tag) {
            if (tag === 'signUp') {
                if (!this.signUp.username) {
                    this.$refs.signUpUserName.showLabel("用户名不能为空");
                    return false
                }
                if (!this.usernameCheck.test(this.signUp.username)) {
                    this.$refs.signUpUserName.showLabel("用户名仅由大小写字母、数字、下划线组成")
                    return false
                }

                const {data} = await api.get(`/checkUserName/${this.signUp.username}`);
                if (data.status !== 0) {
                    this.$refs.signUpUserName.showLabel(data.message)
                    return false
                }
                return true


            }
        },
        async handleUserPasswordCheck(tag) {
            if (tag === 'signIn') {
                if (!this.signIn.password) {
                    this.$refs.signInPassword.showLabel("密码不能为空");
                    return false
                }
                return true;
            }
            if (tag === 'signUp') {
                if (!this.signUp.password) {
                    this.$refs.signUpPassword.showLabel("密码不能为空");
                    return false;
                }
                if (!this.passwordCheck.test(this.signUp.password)) {
                    this.$refs.signUpPassword.showLabel("密码仅由大小写字母、数字、下划线组成");
                    return false
                }
                return true;
            }

        },
        async handleUserPasswordRepeatCheck() {
            if (!this.signUp.password) {
                this.$refs.signUpPassword.showLabel("密码不能为空");
                return false
            }
            if (this.signUp.passwordRepeat !== this.signUp.password) {
                this.$refs.signUpPasswordRepeat.showLabel("两次输入的密码不一致");
                return false
            }
            return true
        },
        async asyncIsLogin() {
            const {data} = await api.post("/authorize");
            console.log(data)
            return data.status === 0;

        }
    },
}
</script>

<style scoped lang="less">
@import "sss-ui/src/style/variable.less";

.container {
    max-width: 800px;
    min-width: 600px;
    min-height: 470px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    margin: 40px auto;
    border-radius: 20px;
    position: relative;
    overflow: hidden;

}


.mark {
    height: 100%;
    width: 50%;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(to left, #DB5B6C, darken(#DB5B6C, -5%));
    transition: all .4s .05s linear;

    &.is-right {
        left: 100%;
        transform: translateX(-100%);
    }
}

.sign-in,
.sign-up,
.right,
.left {
    width: 50%;
    padding: 20px 30px;
    height: 470px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    & > * {
        margin: 12px 0;
    }

    & > *:not(:first-child,:last-child) {
        width: 80%;
    }

    & > *:last-child {
        width: 50%;
    }

}

.sign-in {
    position: absolute;
    top: 0;
    left: 0;
}

.sign-up {
    position: absolute;
    top: 0;
    right: 0;
}

.left {
    text-align: center;
    top: 0;
    left: 0;
    width: 50%;
    z-index: 10;
    color: @color-white3;
    position: absolute;
}

.right {
    text-align: center;
    top: 0;
    right: 0;
    width: 50%;
    z-index: 10;
    color: @color-white3;
    position: absolute;
}

//动画
/*淡出*/
.left-enter-active {
    opacity: 1;
    transition: all 500ms 100ms ease;
}

.left-leave-active {
    opacity: 1;
    transition: all 500ms ease;
}

.left-enter,
.left-leave-to {
    opacity: 0;
    transform: translateX(-30px);
}

.right-enter-active {
    opacity: 1;
    transition: all 500ms 50ms ease;
}

.right-leave-active {
    opacity: 1;
    transition: all 500ms ease;
}

.right-enter,
.right-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

</style>