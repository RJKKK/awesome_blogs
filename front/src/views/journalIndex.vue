<template>
    <header></header>
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
        height: 80px;
    }
    .container{
        width: 100%;
        padding-bottom: 40px;
        /*background-image: url("../assets/backgrounds/bg-mainvisual-01.gif");*/
        background-color: #F3EFE4;
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