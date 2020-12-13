<template>
    <button @click="fn">开关</button>
    <diyModelA v-model:window-switch="switch_1" title="设置笔刷属性">
        <a-row>
            <a-col :span="4" style="line-height: 36px">笔刷宽度：</a-col>
            <a-col :span="20">
                <a-slider  :min="1" :max="20"/>
            </a-col>
        </a-row>
    </diyModelA>
</template>

<script lang="ts">
    import {defineComponent, onMounted, ref, onUpdated, nextTick} from "vue";
    import diyModelA from '../components/diyModelA.vue'

    export default defineComponent({
        components: {diyModelA},
        setup() {
            const switch_1 = ref<boolean>(false)
            const fn = () => switch_1.value = true
            return {fn, switch_1}
        }
    })
</script>

<style scoped>

</style>
