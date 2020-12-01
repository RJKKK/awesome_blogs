<template>
    <div id="background">
        <div id="layerController">
            <h1>
<!--                <span class="kind">种类 </span>-->
                <span class="title">这是手帐标题</span>
            </h1>
            <h5>{{'[ 作 者 ] 勿 忘 我'}}</h5>
            <div class="tip">修改作品信息</div>
            <div id="layers" >
                <div class="test" :style="`background:${colorLibrary[0]}`" :key="index">
                    <span>缩放</span>
                    <span class="setParams">X: <a-input type="number" v-model="layerParams.scaleX"/></span>
                    <span class="setParams">Y: <a-input v-model="layerParams.scaleY"/></span>
                </div>
                <div class="test" :style="`background:${colorLibrary[1]}`" :key="index">
                    <span>旋转</span>
                </div>
                <div class="test" :style="`background:${colorLibrary[2]}`" :key="index">
                    <span>位置</span>
                </div>
                <div class="test" :style="`background:${colorLibrary[3]}`" :key="index">
                    <span>背景颜色</span>
                </div>
                <div class="test" :style="`background:${colorLibrary[4]}`" :key="index">
                    <span>字体颜色</span>
                </div>
                <div class="test" :style="`background:${colorLibrary[5]}`" :key="index">
                    <span>描边</span>
                </div>
                <div class="test" :style="`background:${colorLibrary[6]}`" :key="index">
                    <span></span>
                </div>
            </div>

        </div>
        <header>
            <label for="toggler" class="switch">开关</label>
            <input type="checkbox" id="toggler" style="display: none">
            <div class="menu">
                <div class="selector">
                    <h4>清选择贴纸</h4>
                    <a-tabs tab-position="top" type="line">
                        <a-tab-pane tab="文字" :key="0">
                            <div style="height: 450px;width: 100%;">
                                <ul>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </div>
                        </a-tab-pane>
                        <a-tab-pane tab="美食" :key="1">123</a-tab-pane>
                    </a-tabs>
                </div>
            </div>
        </header>
        <div class="container">
            <div id="main">
                <canvas ref="element" style="width: 100%;height: 100%"></canvas>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
    import {defineComponent, ref, reactive, onMounted, onBeforeMount, nextTick, watch} from "vue";
    import {useLayerController} from "../hooks/useLayerController"


    export default defineComponent({

        setup() {
            const element = ref<HTMLElement>(null)
            const {addText, addImage, layersStatus} = useLayerController(element)
            const layerParams = reactive<object>({
                scaleX:1,
                scaleY:1
            });
            const colorLibrary = ref<string[]>([
                'rgb(164,227,213)',
                'rgb(172,205,232)',
                'rgb(207,223,93)',
                'rgb(254,234,64)',
                'rgb(197,176,238)',
                'rgb(241,169,198)',
                'rgb(223,186,238)',
                'rgb(248,187,137)',
                'rgb(175,216,241)',
                'rgb(183,230,153)',
                'rgb(220,210,114)',
                'rgb(117,220,234)'
            ])
            onBeforeMount(() => {

            })
            onMounted(() => {
                addText('Fire the hot!')
                addImage('https://api.r10086.com/CG系列1.php')
            //     window.setTimeout(() => {
            //         console.log(layersStatus)
            //     }, 5000)
            })

            return {element, layersStatus, colorLibrary,layerParams}
        }
    });
</script>

<style scoped lang="less">
    ::-webkit-scrollbar {
        width: 10px;
        height: 3px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #a1a3a9;
        border-radius: 30px;
    }
    .switch{
        display: inline-block;
        margin-left: 800px  ;
    }

    #background {
        font-family: 'curcle';
        --control-width: 378px;
        background-image: url("../assets/backgrounds/bg_in_a.jpg");
        background-size: cover;
        background-repeat: no-repeat;
        position: relative;


    }
    #layers{
        margin-top: 30px;
        overflow-y: scroll;
        /*background: hska(0,0%,100%,.3);*/
        height: 420px;
        position: relative;
        padding-left: 14px;
        transform: skewY(-9deg);

        &:before{
            /*box-shadow: #4d4d4d 1px 1px 1px 1px;*/
            position: absolute;
            left: 0;
            top:0;
            left: 0;
            right: 0;
            padding-left: 14px;
            height: 100%;
            width: 100%;
            /*z-index: 2;*/
            /*background: url("../assets/backgrounds/bg_in_a.jpg");*/

            /*filter: blur(10px);*/
            content: "";
        }
        /*box-shadow: white 1px 1px 1px 1px;*/
    }
    #layerController {
        position: absolute;
        width: var(--control-width);
        min-height: 100vh;
        box-shadow: rgba(0, 0, 0, 0.29) 1px 1px 10px 0px;
        background: rgba(255, 255, 255, .3);


        > h1 {
            text-align: center;
            margin: 70px 0 0 0;

            .kind {
                color: rgb(77, 34, 15);
                font-size: 28px;
            }

            .title {
                color: rgb(226, 72, 111);
                font-size: 44px;
                line-height: 44px;
            }
        }

        > h5 {
            color: rgb(77, 34, 15);
            font-size: 14px;
            text-align: center;
            margin: 0 0 30px 0;
        }

        > .tip {
            width: 237px;
            font-size: 14px;
            user-select: none;
            height: 50px;
            border-radius: 10px;
            background: rgb(234, 109, 148);
            margin: 0 auto;
            color: white;
            text-align: center;
            line-height: 50px;
            position: relative;

            &:hover {
                background: rgb(236, 131, 165);
            }

            &:before {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: rgb(239, 151, 178);
                content: '';
                display: block;
                position: absolute;
                top: 4px;
                left: 4px;
            }

            &:after {
                color: white;
                font-size: 20px;
                font-weight: 900;
                content: ">";
                position: absolute;
                right: 10px;
                top: 0px;
            }
        }
        .test {
            width: 100%;
            height: 30px;
            color: white;
            padding-left: 1rem;
            line-height: 30px;
            margin: 3px 0;
            transform: skewY(0deg);
            transition: padding-left .3s ease-in-out;
            &:hover {
                padding-left: 2.5rem;
            }
            .setParams{
                display: flow;
                float: right;
                margin-right: 10px;
                >input{
                    width: 30px;
                    border:none;
                    outline:medium;
                    padding: 0px;
                    height: 50%;
                    color: #a1a3a9;
                    text-align: center;
                    &:focus{
                        outline:0px;
                        border:none;
                        box-shadow: none;
                    }
                }
            }
        }
        /*.test:nth-child(1){*/
        /*    margin-top: 30px;*/
        /*}*/
    }

    header {

        height: 60px;
        /*position: fixed;*/

        .menu {
            position: absolute;
            width: 600px;
            height: 800px;
            padding: 109px 104px 139px 95px;
            top: 60px;
            /*left: 50%;*/
            /*transform: translateY(-110%) translateX(-50%);*/
            transform: translateX(-100%);
            /*box-shadow: 1px 1px 1px 1px black;*/
            background-image: url("../assets/components/attention_bg_png-min.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-position: center;
            z-index: 9999999;
            transition: transform ease-out .3s;
            transform-origin: center;

            .selector {
                width: 100%;
                height: 100%;

                h4 {
                    font-size: 20px;
                    text-align: center;
                }

                ul {
                    display: flex;
                    flex-wrap: wrap;
                    list-style: none;
                    height: 400px;
                    width: 100%;

                    li {
                        list-style: none;
                        width: 100px;
                        border-bottom: #ccc 1px dashed;
                        border-right: #ccc 1px dashed;;
                        /*background: aquamarine;*/
                    }

                    li:nth-child(4n), li:nth-last-child(1) {
                        border-right: none;
                    }

                    li:nth-last-child(1), li:nth-last-child(2), li:nth-last-child(3), li:nth-last-child(4) {
                        border-bottom: none;
                    }
                }

                /*background: aqua;*/
            }
        }

        #toggler:checked + .menu {
            /*transform: translateY(0px) translateX(-50%);*/
            transform: translateX(0);
        }


    }

    .container {
        width: 100%;
        /*padding-bottom: 60px;*/
        min-height: calc(100vh - 60px);

    }

    #main {
        width: 700px;
        height: 800px;
        background: url("../assets/backgrounds/bg-mainvisual-01.gif");
        background-color: white;
        box-shadow: rgba(0, 0, 0, 0.29) 1px 1px 10px 0px;
        margin-left: calc(calc(100% - var(--control-width)) / 2);
        overflow: hidden;
        position: relative;
        display: block;
    }


</style>