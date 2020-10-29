<template>
   <div class="main">
      <div class="login_window">
         <div class="content">
            <a-form layout="inline" :model="model" @submit="handleSubmit" @submit.native.prevent>
               <a-form-item>
                  <a-input v-model:value="model.account" placeholder="输入用户名" />
               </a-form-item>
               <a-form-item>
                  <a-input v-model:value="model.password" placeholder="输入密码" />
               </a-form-item>
               <a-form-item>
                  <a-button
                          type="primary"
                          html-type="submit"
                  >
                     Log in
                  </a-button>
               </a-form-item>
            </a-form>

         </div>
      </div>
   </div>
</template>

<script lang="ts">
    import {defineComponent,reactive,toRefs} from "vue"
    import {loginForm} from "../formInterfaces";
    import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';

    export default defineComponent( {
        name: "login",
        setup(){
           const model = reactive<loginForm>({
              password:"",
              account:""
           })
           const handleSubmit = ():unknown => {
               console.log(model)
           }

         return {
              model,handleSubmit
         }
        }
    })
</script>

<style scoped lang="less">
   @keyframes swing {
      0% {
         transform: rotateZ(-1deg);
   }
      100%{
         transform: rotateZ(1deg);
      }
   }
.main{
   width: 100vw;
   height: 100vh;
   display: flex;
   align-items:center;
   flex-direction:column;
   justify-content:center;
   background-image: url(../assets/backgrounds/deco-wood-02.png),
                     url(../assets/backgrounds/deco-wood-03.png),
                     url(../assets/backgrounds/bg-mainvisual-01.gif);
   background-repeat: no-repeat, no-repeat, repeat;
   background-size: 152px auto, 148px auto, 200px auto;
   background-position: right top, left top, left top;
}
.login_window{
   transform-origin: center top;
   animation: swing 2s infinite ease-in-out alternate;
   width: 25vw;
   height: 450px;
   box-sizing: content-box;
   background-image:url(../assets/components/concept_y_top.gif),
                    url(../assets/components/concept_y_bottom.gif),
                    url(../assets/components/concept_y_bg.png);
   background-repeat: no-repeat, no-repeat,repeat;
   background-size: 25vw auto, 25vw auto, 25vw auto;
   background-position: top, bottom,center;
   /*background-clip: padding-box;*/
   >.content{
      box-sizing: border-box;
      width: inherit;
      height: inherit;
      padding: calc( 25  / 366 * 55 * 1vw) 30px calc( 25  / 366 * 45 * 1vw) 30px;
   }
}
</style>