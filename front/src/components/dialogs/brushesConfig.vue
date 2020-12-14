<template>
    <button @click="fn">开关</button>
    <diyModelA v-model:window-switch="Switch" title="设置笔刷属性" :footer="null">
        <a-row>
            <a-col :span="4" style="line-height: 36px">笔刷模式</a-col>
            <a-col> <a-select style="width: 120px;" v-model:value="mode" >
                <a-select-option v-for="(item,index) in brushesArray" :value="item.value" :key="index">
                    Jack
                </a-select-option>
            </a-select></a-col>

        </a-row>
        <br>
        <a-row>
            <a-col :span="4" style="line-height: 36px">笔刷宽度：</a-col>
            <a-col :span="20">
                <a-slider v-model:value="brushConfig.lineWidth" :min="1" :max="20"/>
            </a-col>
        </a-row>
        <br>
        <a-row>
            <a-col :span="4" style="line-height: 36px">笔刷颜色：</a-col>
            <a-col :span="10">
                <a-input type="color"  v-model:value="brushConfig.lineColor" />
            </a-col>
        </a-row>
        <br>
        <a-row>
            <a-col :span="4" style="line-height: 36px">阴影宽度：</a-col>
            <a-col :span="20">
                <a-slider  v-model:value="brushConfig.shadowWidth"  :min="1" :max="20"/>
            </a-col>
        </a-row>
        <br>
        <a-row>
            <a-col :span="4" style="line-height: 36px">阴影颜色：</a-col>
            <a-col :span="10">
                <a-input type="color"  v-model:value="brushConfig.shadowColor" />
            </a-col>
        </a-row>
        <br>
        <a-row>
            <a-col :span="4" style="line-height: 36px">阴影位移：</a-col>
            <a-col :span="20">
                <a-slider   v-model:value="brushConfig.shadowOffset" :min="1" :max="20"/>
            </a-col>
        </a-row>
    </diyModelA>
</template>

<script lang="ts">
    import {defineComponent, ref,onUpdated,toRef} from "vue";
    import diyModelA from '../protoTypes/diyModelA.vue'
    import {fabric} from "../../untils/esModule";
    import {useBrushLibrary} from "../../hooks/brushLibrary";
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
            const selectList = ref<any[]>([
                {
                    value: 'lucy',
                }, {
                    value: 'lucy',
                }, {
                    value: 'lucy',
                }
            ])
            const mode  = ref<number>(0)
            const {brushConfig, brushesArray, setBrushMode} = useBrushLibrary(props.canvas)
            // onUpdated(()=>{console.log(props.canvas)})
            return {Switch,selectList,brushConfig, brushesArray, setBrushMode,mode}
        }
    })
</script>

<style scoped>

</style>
