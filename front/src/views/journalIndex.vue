<template>
    <header>
        <label for="toggler">开关</label>
        <input type="checkbox" id="toggler" style="display: none">
        <div class="menu">
            <div class="selector" >
                <h4>清选择贴纸</h4>
                <a-tabs tab-position="top" type="line">
                    <a-tab-pane tab="文字" :key="0" >
                        <div style="height: 450px;width: 100%;" >
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
    <div v-for="(item,index) in controller.layersStatus.value" :key="index" >{{item}}</div>
</template>

<script lang="ts">
    import {defineComponent,ref,reactive,onMounted,onBeforeMount,nextTick} from "vue";
    import {useLayerController} from "../hooks/useLayerController"


    export default defineComponent({

        setup(){
            const element = ref<HTMLElement>(null)
            const controller = useLayerController(element)
            onBeforeMount(()=>{

            })
            nextTick(()=>{
                controller.addText('Fire the hot!')
                controller.addImage('https://api.r10086.com/CG系列1.php')
                // window.setInterval(()=>{
                //     console.log(controller.layersStatus.value)
                // },1000)
            })
            return {element,controller}
        }
    });
</script>

<style scoped lang="less">
    header{
        font-family: 'curcle';
        height: 60px;
        /*position: fixed;*/
        .menu{
            position: absolute;
            width: 600px;
            height:800px;
            padding:  109px 104px 139px 95px;
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
            .selector{
                width: 100%;
                height: 100%;
                h4{
                    font-size: 20px;
                    text-align: center;
                }
                ul{
                    display: flex;
                    flex-wrap: wrap;
                    list-style: none;
                    height: 400px;
                    width: 100%;
                    li{
                        list-style: none;
                        width: 100px;
                        border-bottom: #ccc 1px dashed;
                        border-right: #ccc 1px dashed;;
                        /*background: aquamarine;*/
                    }
                    li:nth-child(4n), li:nth-last-child(1){
                       border-right:none;
                    }
                    li:nth-last-child(1),li:nth-last-child(2),li:nth-last-child(3),li:nth-last-child(4){
                       border-bottom:none;
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
    .container{
        width: 100%;
        /*padding-bottom: 60px;*/
        min-height: calc(100vh - 60px);
        background-image: url("../assets/backgrounds/bg-contents.gif");
    }
    #main {
        width: 700px;
        height: 800px;
        background:  url("../assets/backgrounds/bg-mainvisual-01.gif");
        background-color: white;
        margin: 0 auto;
        overflow: hidden;
        position: relative;
        display: block;
    }
</style>