<template>
    <sticker :doc-id="12345" :z-index="123" component-type="1"></sticker>
</template>

<script lang="ts">
    import {defineComponent} from "vue";
    import sticker from "../components/sticker.vue";

    export default defineComponent({
        components: {
            sticker,
        },
    });
</script>

<style>
</style>