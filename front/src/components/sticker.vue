<template>
    
</template>

<script lang="ts">
    import {defineComponent} from 'vue'
    export default defineComponent( {
        name: "sticker",
        props:{
            selected:{
                type:Boolean,
                required:true,
                default:true
            },
            border:{
                type: String,
                default: ''
            },
        },
        setup(props){

        }
    })
</script>

<style scoped>

</style>