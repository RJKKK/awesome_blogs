<template>
    <div id="sad">
        <div :class="`main ${selected?'selected':'unselect'}`"
             @click.stop="dragFn">{{moveX}}|{{moveY}}
        </div>
    </div>

</template>

<script lang="ts">
    import {defineComponent, computed, ref} from "vue";
    import {useMouse} from '../hooks'
    import Props from './stickerProps.interface'

    export default defineComponent({
        name: "sticker",
        props: Props,
        setup(props, context) {
            const selected = ref<boolean>(false)
            const {x, y, stopListen, startListen} = useMouse()
            const moveX = computed<string>(() => x.value + 'px')
            const moveY = computed<string>(() => y.value + 'px')
            const dragFn = () => {
                selected.value ? stopListen() : startListen()
                selected.value = !selected.value``
            }
            const color = 'red'
            return {color, moveX, moveY, dragFn, selected}
        },
    });
</script>

<style scoped vars="{color,moveX,moveY}" lang="less">
    .main {
        width: 200px;
        height: 200px;
        transform: translate(calc(var(--moveX) - 50%), calc(var(--moveY) - 50%));
        position: absolute;
        background-color: var(--color);
    }

    .selected {
        /*transform: translate(calc(var(--moveX) - 50%), calc(var(--moveY) - 50%));*/
    }

    .unselect {
        /*transform: translate(0px, 0px);*/
    }

    #sad {
        width: 700px;
        height: 800px;
        background: aqua;
    }
</style>