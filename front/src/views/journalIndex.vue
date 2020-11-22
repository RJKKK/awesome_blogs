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
        <div id="main" >
            <sticker v-for="(item,index) in state.Assemblies"
                     :background-offset-x="offsetX"
                     :background-offset-y="offsetY"
                     v-model:config="state.Assemblies[index]" :key="index"></sticker>
        </div>
    </div>
</template>

<script lang="ts">
    import {defineComponent,ref,reactive,onMounted,onBeforeMount,nextTick} from "vue";
    import sticker from "../components/sticker.vue";
    import {Assembly, Journal} from "../appInterfaces";

    export default defineComponent({
        components: {
            sticker,
        },
        setup(){
            const offsetX = ref<number>(0)
            const offsetY = ref<number>(0)
            const state = reactive({
                    backgroundId:9,
                    Assemblies:[] as Assembly[]
            })
            onBeforeMount(()=>{
                state.Assemblies = [{
                    id:0,
                    scale:1,
                    imageUrl:'',
                    rotate:45,
                    height:200,
                    width:200,
                    centerX:345,
                    centerY:234,
                    stickerId:0,
                    componentType:1,
                    zIndex:0,
                },{
                    id:1,
                    scale:1,
                    imageUrl:'',
                    rotate:90,
                    height:200,
                    width:200,
                    centerX:35,
                    centerY:34,
                    stickerId:0,
                    componentType:1,
                    zIndex:0,
                },{
                    id:2,
                    scale:3,
                    imageUrl:'',
                    rotate:-67,
                    height:80,
                    width:100,
                    centerX:375,
                    centerY:324,
                    stickerId:0,
                    componentType:1,
                    zIndex:0,
                }]
            })
            onMounted(()=>{

                offsetX.value = 1
                offsetY.value = 0;
            })
            return {state,offsetX,offsetY}
        }
    });
</script>

<style scoped lang="less">
    header{
<<<<<<< Updated upstream
        height: 80px;
    }
    .container{
        width: 100%;
        padding-bottom: 40px;
        /*background-image: url("../assets/backgrounds/bg-mainvisual-01.gif");*/
        background-color: #F3EFE4;
=======
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
        padding-bottom: 60px;
        background-image: url("../assets/backgrounds/bg-contents.gif");
>>>>>>> Stashed changes
    }
    #main {
        width: 700px;
        height: 800px;
        background:  url("../assets/backgrounds/bg-mainvisual-01.gif");
        background-color: white;
        margin: 0 auto;
        overflow: hidden;
        position: relative;
    }
</style>