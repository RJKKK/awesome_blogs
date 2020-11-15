<template>
    <div ref="element" :class="`main ${selected?'selected':'unselect'}`"
         @click.stop.prevent="dragFn">
        <div id="scale"
             @click.stop.prevent="scaleStart(props.config.stickerMoveX,props.config.stickerMoveY,$event)"></div>
        <div id="delete"></div>
        <div id="rotate"
             @click.stop.prevent="startRotate(props.config.stickerMoveX,props.config.stickerMoveY,$event)"
        ></div>
        <img id="image" src="https://api.r10086.com/CG系列1.php" alt="随机图片" style="width: 100%;height: 100%">
    </div>
</template>

<script lang="ts">
    import {defineComponent, computed, ref, onMounted} from "vue";
    import {useMouse, useElementProxy, useElementScale, useElementRotate} from '../hooks'
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
            const {x, y, moveX, moveY, stopAndGetData, startListen} = useElementProxy(
                props.config.stickerMoveX, props.config.stickerMoveY, element
            )
            const {scale, scaleStart} = useElementScale(element)
            const {deg, startRotate} = useElementRotate(element)
            const styleWidth = computed<string>(() => getStylePx(props.config.width))
            const styleHeight = computed<string>(() => getStylePx(props.config.height))
            const styleMoveX = computed<string>(() => getStylePx(moveX.value))
            const styleMoveY = computed<string>(() => getStylePx(moveY.value))
            const styleDeg = computed<string>(() => getStyleDeg(deg.value))
            const dragFn = (e: MouseEvent) => {
                selected.value ? stopAndGetData() : startListen()
                console.log(props.config)
                selected.value = !selected.value
            }

            return {
                styleMoveX, styleMoveY,
                dragFn, scaleStart, startRotate,
                selected, styleWidth, styleHeight,
                element, props, scale, styleDeg
            }
        },
    });
</script>

<style scoped vars="{styleMoveX,styleMoveY,styleWidth,styleHeight,scale,styleDeg}" lang="less">
    .main {
        width: var(--styleWidth);
        height: var(--styleHeight);
        transform: translate(var(--styleMoveX), var(--styleMoveY)) scale(var(--scale)) rotate(var(--styleDeg));
        position: absolute;
        background: red;
        overflow: hidden;
        user-select: none;
    }

    #scale {
        background-image: url("../assets/components/concept_y_bg.png");
        background-size: cover;
        width: 20px;
        height: 20px;
        position: absolute;
        overflow: hidden;
        bottom: 0px;
        right: 0px;
    }
    #rotate{
        background-image: url("../assets/components/rotate-icon.png");
        background-size: cover;
        width: 20px;
        height: 20px;
        position: absolute;
        overflow: hidden;
        top: 0px;
        right: 0px;
    }

    .selected {
        /*transform: translate(calc(var(--moveX) - 50%), calc(var(--moveY) - 50%));*/
    }

    .unselect {
        /*transform: translate(0px, 0px);*/
    }


</style>