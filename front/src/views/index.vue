<template>
    <div class="main">
        <div class="content">

        </div>
    </div>
</template>

<script>
    import {defineComponent} from "vue"
    export default defineComponent({
        name: "index"
    })
</script>

<style scoped>
    .main{
        background-image: url(../assets/components/bg-index.png);
        min-width: 320px;
        width: 100vw;
        height: 100vh;
    }
    .content{
        max-width: 960px;
        min-width: inherit;
        height: inherit;
    }
</style>