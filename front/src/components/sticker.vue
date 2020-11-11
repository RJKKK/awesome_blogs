<template>

    <div ref="element" :class="`main ${selected?'selected':'unselect'}`"
         @click.stop="dragFn">{{styleMoveX}}|{{styleMoveY}}
    </div>


</template>

<script lang="ts">
    import {defineComponent, computed, ref, onMounted} from "vue";
    import {useMouse,useElementProxy} from '../hooks'
    import {Assembly} from '../appInterfaces'
    import {getStyleDeg, getStylePx} from "../untils/helper";

    export default defineComponent({
        name: "sticker",
        props: {
            config: {
                type: Object,
                required: true,
                default: () => {
                    return {
                        stickerId: 0,
                        rotate: 0,
                        width: 0,
                        stickerMoveX: 0,
                        stickerMoveY: 0,
                        imageUrl: '',
                        scale: 1,
                        height: 0,
                        componentType: 0,
                        id: 0
                    } as Assembly
                },
            },
            backgroundWidth: {type: Number, required: true, default: 0},
            backgroundHeight: {type: Number, required: true, default: 0},
            backgroundOffsetX: {type: Number, required: true, default: 0},
            backgroundOffsetY: {type: Number, required: true, default: 0},

        },
        setup(props, context) {
            const element = ref<HTMLElement>(null)
            const selected = ref<boolean>(false)
            const {x, y, moveX,moveY,stopAndGetData, startListen} = useElementProxy(props.config.stickerMoveX,
                props.config.stickerMoveY,element)

            // const moveX = computed<number>({
            //     get: () => {
            //         if (x.value - props.backgroundOffsetX <= (props.config.width / 2))
            //             return 0
            //         else if (x.value - props.backgroundOffsetX >= props.backgroundWidth - props.config.width / 2)
            //             return props.backgroundWidth - props.config.width
            //         else return x.value - props.backgroundOffsetX - props.config.width / 2
            //     }, set: (val: number) => {
            //         x.value = val
            //     }
            // })
            // const moveY = computed<number>({
            //     get: () => {
            //         if (y.value - props.backgroundOffsetY <= props.config.height / 2)
            //             return 0
            //         else if (y.value - props.backgroundOffsetY >= props.backgroundHeight - (props.config.height / 2))
            //             return props.backgroundHeight - props.config.height
            //         else return y.value - props.backgroundOffsetY - props.config.height / 2
            //     }, set: (val: number) => {
            //         y.value = val
            //     }
            // })
            const styleWidth = computed<string>(() => getStylePx(props.config.width))
            const styleHeight = computed<string>(() => getStylePx(props.config.height))
            const styleMoveX = computed<string>(() => getStylePx(moveX.value))
            const styleMoveY = computed<string>(() => getStylePx(moveY.value))
            // onMounted(() => {
            //     console.log(element.value)
            //     moveX.value = props.config.width
            //     moveY.value = props.config.height
            // })
            const dragFn = () => {
                selected.value ? stopAndGetData() : startListen()
                selected.value = !selected.value
            }
            const color = 'red'
            return {color, styleMoveX, styleMoveY, dragFn, selected, styleWidth, styleHeight,element}
        },
    });
</script>

<style scoped vars="{color,styleMoveX,styleMoveY,styleWidth,styleHeight}" lang="less">
    .main {
        width: var(--styleWidth);
        height: var(--styleHeight);
        transform: translate(var(--styleMoveX), var(--styleMoveY));
        position: absolute;
        background-color: var(--color);
    }

    .selected {
        /*transform: translate(calc(var(--moveX) - 50%), calc(var(--moveY) - 50%));*/
    }

    .unselect {
        /*transform: translate(0px, 0px);*/
    }


</style>