<template>
   <div class="main">

   </div>
</template>

<script lang="ts">
    import {defineComponent} from "vue"
    export default defineComponent( {
        name: "login",
        setup(){
         return {}
        }
    })
</script>

<style scoped lang="less">
.main{
   width: 100vw;
   height: 100vh;
   background-image: url(../assets/backgrounds/deco-wood-02.png),
                     url(../assets/backgrounds/deco-wood-03.png),
                     url(../assets/backgrounds/bg-mainvisual-01.gif);
   background-repeat: no-repeat, no-repeat, repeat;
   background-size: 152px auto, 148px auto, 200px auto;
   background-position: right top, left top, left top;
}
</style>