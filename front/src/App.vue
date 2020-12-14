<template id="app-component">
    <a-spin :spinning="Switch" size="large">
        <router-view/>
    </a-spin>
</template>

<script lang="ts">
    import {defineComponent, ref} from 'vue'

    export const Switch = ref<boolean>(false)
    export default defineComponent({
        name: 'App',
        setup() {
            return {Switch}
        }
    })
</script>
<style scoped>
    #app-component {
        font-family: 'curcle';
    }

    ::v-deep .ant-spin-container {
        overflow: hidden
    }
</style>
