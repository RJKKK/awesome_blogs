<template>
    <div class="main">
        <div class="login_window">
            <div class="content">
                <h1>欢迎你 (≧▽≦)/</h1>
                <a-form layout="block" @submit="handleSubmit" @submit.native.prevent>
                    <a-form-item v-bind="validateInfos.account" class="my-input">
                        <FormOutlined style="font-size:28px;color: rgba(0, 0, 0,.25);line-height: inherit"/>
                        <a-input v-model:value="model.account" placeholder="输入用户名"/>
                    </a-form-item>
                    <a-form-item v-bind="validateInfos.password" class="my-input">
                        <LockOutlined style="font-size:28px;color: rgba(0, 0, 0,.25);line-height: inherit"/>
                        <a-input
                                v-model:value="model.password"
                                type="password"
                                placeholder="输入密码"
                        />
                    </a-form-item>
                    <a-form-item>
                        <a-button type="dashed" shape="round" block html-type="submit" style="margin-bottom: 10px"> 登录
                        </a-button>
                        <a-button type="dashed" shape="round" block>注册</a-button>
                    </a-form-item>

                </a-form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {defineComponent} from "vue";
    import {useFormSet} from "../hooks";
    import {loginApi} from "../api";
    import {loginForm} from "../formInterfaces";
    import {LoginRes} from "../responseInterfaces";
    import {useRouter} from "vue-router";
    import {setToken} from "../untils/cookies";
    import {FormOutlined, LockOutlined} from '@ant-design/icons-vue';

    export default defineComponent({
        name: "login",
        components: {FormOutlined, LockOutlined},
        setup() {
            const $router = useRouter();
            const {
                resetFields,
                validate,
                validateInfos,
                handleSubmit,
                model,
            } = useFormSet<loginForm, LoginRes>(
                {
                    password: "",
                    account: "",
                },
                loginApi, (res) => {
                    setToken(res.token);
                    console.log($router);
                    $router.replace("/");
                }
            );
            return {
                model,
                handleSubmit,
                validateInfos,
            };
        },
    });
</script>

<style lang="less" scoped>
    @keyframes swing {
        0% {
            transform: rotateZ(-1deg);
        }

        100% {
            transform: rotateZ(1deg);
        }
    }

    .main {
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        background-image: url("../assets/backgrounds/deco-wood-02.png"),
        url(../assets/backgrounds/deco-wood-03.png),
        url(../assets/backgrounds/bg-mainvisual-01.gif);
        background-repeat: no-repeat, no-repeat, repeat;
        background-size: 152px auto, 148px auto, 200px auto;
        background-position: right top, left top, left top;
    }

    .login_window {
        transform-origin: center top;
        animation: swing 2s infinite ease-in-out alternate;
        width: 300px;
        height: 450px;
        box-sizing: content-box;
        background-image: url(../assets/components/concept_y_top.gif),
        url(../assets/components/concept_y_bottom.gif),
        url(../assets/components/concept_y_bg.png);
        background-repeat: no-repeat, no-repeat, repeat;
        background-size: 300px auto, 300px auto, 300px auto;
        background-position: top, bottom, center;
        /*background-clip: padding-box;*/
    }

    .content {
        > h1 {
            text-align: center;
            color: #4d4d4d;
            margin-bottom: 40px;
        }

        width: inherit;
        height: inherit;
        padding: calc(300 / 366 * 55 * 1px) 30px calc(300 / 366 * 45 * 1px) 30px;
    }

    .my-input ::v-deep .ant-form-item-children {
        display: flex;
        justify-content: space-between;

        > span {
            flex: 1;
        }

        > input {
            flex: 6;
        }
    }
</style>
