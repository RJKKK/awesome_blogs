<template>
    <diyModelA v-model:window-switch="Switch" title="设置笔刷属性" :footer="null">
        <a-row>
            <a-col :span="4" style="line-height: 36px">笔刷模式</a-col>
            <a-col> </a-col>

        </a-row>
        <br>
        <a-row>
            <a-col :span="4" style="line-height: 36px">笔刷宽度：</a-col>
            <a-col :span="20">
                <a-slider :min="1" :max="20"/>
            </a-col>
        </a-row>
        <br>
        <a-row>
            <a-col :span="4" style="line-height: 36px">笔刷颜色：</a-col>
            <a-col :span="10">
                <a-input type="color"/>
            </a-col>
        </a-row>
        <br>
        <a-row>
            <a-col :span="4" style="line-height: 36px">阴影宽度：</a-col>
            <a-col :span="20">
                <a-slider :min="1" :max="20"/>
            </a-col>
        </a-row>
        <br>
        <a-row>
            <a-col :span="4" style="line-height: 36px">阴影颜色：</a-col>
            <a-col :span="10">
                <a-input type="color"/>
            </a-col>
        </a-row>
        <br>
        <a-row>
            <a-col :span="4" style="line-height: 36px">阴影颜色：</a-col>
            <a-col :span="20">
                <a-slider :min="1" :max="20"/>
            </a-col>
        </a-row>
    </diyModelA>
</template>

<script lang="ts">
    import {defineComponent, ref} from "vue";
    import diyModelA from '../components/protoTypes/diyModelA.vue'
    import {useBrushLibrary} from "../hooks/useBrushLibrary";
    export const Switch = ref<boolean>(false)
    export default defineComponent({
        props:{
            canvas:{
                type:Object,
                required:true,
                default:()=>null
            }
        },
        components: {diyModelA},
        setup(props) {
            const mode  = ref<number>(0)
            const {brushConfig, brushesArray, setBrushMode} = useBrushLibrary(props.canvas)
            return {Switch,brushConfig, brushesArray, setBrushMode,mode}
        }
    })
</script>

<style scoped>

</style>
