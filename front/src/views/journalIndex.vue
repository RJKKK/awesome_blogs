<template>
    <div id="sad" ref="price">
    <sticker v-for="item in dataSource.Assemblies"
             :background-offset-x="offsetX"
             :background-offset-y="offsetY"
             :config="item" :key="item.id"></sticker>
    </div>
</template>

<script lang="ts">
    import {defineComponent,ref,reactive,onMounted,onUpdated} from "vue";
    import sticker from "../components/sticker.vue";
    import {Journal} from "../appInterfaces";

    export default defineComponent({
        components: {
            sticker,
        },
        setup(){
            const price = ref<HTMLElement>(null)
            const offsetX = ref<number>(0)
            const offsetY = ref<number>(0)
            const dataSource = reactive<Journal>({
                    backgroundId:9,
                    Assemblies:[{
                        id:0,
                        scale:1,
                        imageUrl:'',
                        rotate:0,
                        height:200,
                        width:200,
                        stickerMoveY:345,
                        stickerMoveX:234,
                        stickerId:0,
                        componentType:1,
                        zIndex:0,
                    },{
                        id:1,
                        scale:1,
                        imageUrl:'',
                        rotate:0,
                        height:200,
                        width:200,
                        stickerMoveY:35,
                        stickerMoveX:34,
                        stickerId:0,
                        componentType:1,
                        zIndex:0,
                    }]
            })
            onMounted(()=>{
                offsetX.value = price.value.offsetLeft
                offsetY.value = price.value.offsetTop===0?document.body.scrollTop:price.value.offsetTop;
                console.log(price.value.offsetLeft)
            })
            return {dataSource,price,offsetX,offsetY}
        }
    });
</script>

<style scoped>
    #sad {
        width: 700px;
        height: 800px;
        background: aqua;
        margin-top: 50px;
        margin-left: 50px;
        overflow: hidden;
        position: relative;
    }
</style>