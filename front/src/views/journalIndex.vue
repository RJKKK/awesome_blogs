<template>
    <div id="background">
        <div id="layerController">
            <h1>
<!--                <span class="kind">种类 </span>-->
                <span class="title">这是手帐标题</span>
            </h1>
            <h5>{{'[ 作 者 ] 无 名 氏'}}</h5>
            <div class="tip">修改作品信息</div>
            <div id="layers" >
                <div class="test" :style="`background:${colorLibrary[0]}`" >
                    <span>上移一层</span>
                </div>
                <div class="test" :style="`background:${colorLibrary[1]}`" >
                    <span>上移到最顶层</span>
                    <span class="setParams"></span>
                </div>
                <div class="test" :style="`background:${colorLibrary[2]}`" >
                    <span>下移一层</span>
                </div>
                <div class="test" :style="`background:${colorLibrary[3]}`" >
                    <span>下移到最底层</span>
                </div>
                <div class="test" :style="`background:${colorLibrary[4]}`" @click="redoStatus&&redo()" >
                    <span>重做</span>
                    <span class="setParams">Ctrl+Shift+Z</span>
                </div>
                <div class="test" :style="`background:${colorLibrary[5]}`" @click="undoStatus&&undo()" >
                    <span>撤回</span>
                    <span class="setParams">Ctrl+Z</span>
                </div>
                <div class="test" :style="`background:${colorLibrary[6]}`" >
                    <span>复制</span>
                    <span class="setParams">Ctrl+C</span>
                </div>
                <div class="test" :style="`background:${colorLibrary[7]}`" >
                    <span>粘贴</span>
                    <span class="setParams">Ctrl+V</span>
                </div>
                <div class="test" :style="`background:${colorLibrary[8]}`" >
                    <span>描边</span>
                    <span class="setParams"><SettingFilled /></span>
                </div>
                <div class="test" :style="`background:${colorLibrary[9]}`" >
                    <span>字体设置</span>
                    <span class="setParams"><SettingFilled /></span>
                </div>
                <div class="test" :style="`background:${colorLibrary[10]}`" >
                    <span>背景颜色</span>
                    <span class="setParams">颜色值: <a-input type="color" style="height: 20px;border: 0; outline:none"/></span>
                </div>
                <div class="test" :style="`background:${colorLibrary[11]}`" >
                    <span>涂鸦模式</span>
                    <span class="setParams"><SettingFilled @click="Switch = true"/></span>
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
        <brushesConfig></brushesConfig>
    </div>
</template>

<script lang="ts">
    import {defineComponent, ref, reactive, onMounted, onBeforeMount,toRefs,provide,Ref} from "vue";
    import brushesConfig,{Switch} from '../components/dialogs/brushesConfig.vue'
    import {SettingFilled} from '@ant-design/icons-vue';
    import {useLayerController} from "../hooks/useLayerController"


    export default defineComponent({
        components:{SettingFilled,brushesConfig},
        setup() {
            const element = ref<HTMLElement>(null)
            const {addText, addImage,_canvas,undo,redo,redoStatus,undoStatus} = useLayerController(element)
            provide<(Ref<fabric.Canvas>)>('canvas',_canvas)
            const layerParams = reactive<object>({
                scaleX:1,
                scaleY:1,
                rotate:0,
                positionX:0,
                positionY:0
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
                // addText('Fire the hot!')
                addImage('https://www.madoka-magica.com/img/character.png')
            //     window.setTimeout(() => {
            //         console.log(layersStatus)
            //     }, 5000)
            })

            return {element, colorLibrary,...toRefs(layerParams),Switch,undo,redo,redoStatus,undoStatus}
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
    ::-webkit-color-swatch-wrapper{background-color:#ffffff;}
    ::-webkit-color-swatch{position: relative;}
    .switch{
        display: inline-block;
        margin-left: 800px;
    }

    #background {
        font-family: 'curcle';
        --control-width: 378px;
        background-image: url("../assets/backgrounds/bg (1).jpg");
        background-color: #E0E0E0;
        /*background-size: cover;*/
        background-position: top center;
        background-repeat: no-repeat;
        position: relative;

    }
    #layers{
        margin-top: 30px;
        /*overflow-y: scroll;*/
        /*background: hska(0,0%,100%,.3);*/
        height: 420px;
        position: relative;
        /*padding-left: 14px;*/
        transform: skewY(-9deg);

        &:before{
            /*box-shadow: #4d4d4d 1px 1px 1px 1px;*/
            position: absolute;
            left: 0;
            top:0;
            left: 0;
            right: 0;
            /*padding-left: 14px;*/
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
        left: calc(calc(100vw - 1600px) / 2);
        /*box-shadow: rgba(0, 0, 0, 0.29) 1px 1px 10px 0px;*/
        background: rgba(255, 255, 255, .5);


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
            user-select: none;
            cursor: pointer;
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
    @media screen and (max-width: 1600px){
        #layerController{
            left: 0px;
        }
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
