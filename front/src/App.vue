<template>
  <router-view />
</template>

<script lang="ts">
import {onBeforeMount} from 'vue'

export default {
  name: 'App',
  setup(props,context){
    onBeforeMount(()=>{
      console.log(context)
    })
  }
}
</script>
