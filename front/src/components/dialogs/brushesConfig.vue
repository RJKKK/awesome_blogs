<template>
    <diyModelA v-model:window-switch="Switch" title="设置笔刷属性" :footer="null">
        <a-row>
            <a-col :span="22"></a-col>
            <a-col :span="2"> <a-switch v-model:checked="checked" @change="onChange"/></a-col>
            <br>
            <a-col :span="4" style="line-height: 36px">笔刷模式</a-col>
            <a-col> <a-select style="width: 120px;" v-model:value="mode" @change="handleChange" >
                <a-select-option v-for="(item,index) in brushesArray" :value="item.name" :key="index">
                    {{item.label}}
                </a-select-option>
            </a-select></a-col>

        </a-row>
        <br>
        <a-row>
            <a-col :span="4" style="line-height: 36px">笔刷宽度：</a-col>
            <a-col :span="20">
                <a-slider v-model:value="lineWidth" :min="0" :max="20"/>
            </a-col>
        </a-row>
        <br>
        <a-row>
            <a-col :span="4" style="line-height: 36px">笔刷颜色：</a-col>
            <a-col :span="10">
                <a-input type="color"  v-model:value="lineColor" />
            </a-col>
        </a-row>
        <br>
        <a-row>
            <a-col :span="4" style="line-height: 36px">阴影宽度：</a-col>
            <a-col :span="20">
                <a-slider  v-model:value="shadowWidth"  :min="0" :max="20"/>
            </a-col>
        </a-row>
        <br>
        <a-row>
            <a-col :span="4" style="line-height: 36px">阴影颜色：</a-col>
            <a-col :span="10">
                <a-input type="color"  v-model:value="shadowColor" />
            </a-col>
        </a-row>
        <br>
        <a-row>
            <a-col :span="4" style="line-height: 36px">阴影位移：</a-col>
            <a-col :span="20">
                <a-slider   v-model:value="shadowOffset" :min="0" :max="20"/>
            </a-col>
        </a-row>
    </diyModelA>
</template>

<script lang="ts">
    import {defineComponent, ref,inject,Ref} from "vue";
    import diyModelA from '../protoTypes/diyModelA.vue'
    import {fabric} from "../../untils/esModule";
    import {useBrushLibrary} from "../../hooks/useBrushLibrary";
    export const Switch = ref<boolean>(false)
    export default defineComponent({
        components: {diyModelA},
        setup() {
            const mode  = ref<string>('方形笔刷')
            const canvas:Ref<fabric.Canvas> = inject('canvas')
            const checked = ref<boolean>(false)
            const {
                lineWidth,lineColor,shadowColor,
                shadowWidth,shadowOffset, brushesArray,
                setBrushMode,brushSwitch
            } = useBrushLibrary(canvas)
            // onUpdated(()=>{console.log(props.canvas)})
            const handleChange = (value:string)=>{
                const index = brushesArray.value.findIndex((val)=>val.name===value)
                setBrushMode(index)
            }
           const onChange = (checked)=>{
               brushSwitch(checked)
            }
            return {
                Switch,lineWidth,lineColor,shadowColor,shadowWidth,shadowOffset,
                brushesArray, setBrushMode,mode,handleChange,checked,onChange
            }
        }
    })
</script>

<style scoped>

</style>
