<template>
    <canvas id="canvas" width="800" height="800"></canvas>
</template>

<script lang="ts">
    import {defineComponent,onMounted} from "vue";
    import {fabric} from '../untils/fabricjs'
    import {Image} from "fabric/fabric-impl";
    export default defineComponent({
        setup(){
            console.log(fabric)
            onMounted(()=>{
                const canvas =  new fabric.Canvas('canvas');
                let text = new fabric.IText('hello world', { left: 100, top: 100 });
                canvas.add(text);
                fabric.Image.fromURL('src/assets/logo.png', (img:Image) => {
                    img.set({
                        left: 100, // 图片相对画布的左侧距离
                        top: 100, // 图片相对画布的顶部距离
                        angle: 30, // 图片旋转角度
                        opacity: 0.85, // 图片透明度
                        // 这里可以通过scaleX和scaleY来设置图片绘制后的大小，这里为原来大小的一半
                        scaleX: 0.5,
                        scaleY: 0.5
                    });
                    // 添加对象
                    canvas.add(img);
                });
            })
        }
    })
</script>

<style scoped>

</style>