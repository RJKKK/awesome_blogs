<template>
    <canvas  ref="canvasElement" width="800" height="800"></canvas>
</template>

<script lang="ts">
    import {defineComponent,onMounted,ref,onUpdated,nextTick} from "vue";
    import {useLayerController} from '../hooks/useLayerController'
    export default defineComponent({
        setup(){
            const canvasElement = ref<HTMLElement>(null)
            const {addText,addImage,del,hide,display,setClipboard,paste } = useLayerController(canvasElement)
            nextTick(()=>{
                addImage('https://api.r10086.com/CG系列1.php')
                addText('aabb')
            })
            return{canvasElement}
        }
    })
</script>

<style scoped>

</style>