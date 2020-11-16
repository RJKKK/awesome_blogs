<template>
    <div ref="element"  :class="`main ${selected?'selected':'unselect'}`"

    >
        <div id="scale"
             @mousedown.stop.prevent.self="scaleStart(props.config.stickerMoveX,props.config.stickerMoveY,$event)"

        ></div>
        <div id="delete"></div>
        <div id="rotate"
             @mousedown.stop.prevent.self="startRotate(props.config.stickerMoveX,props.config.stickerMoveY,$event)"
        ></div>
        <img id="image" @click.stop.prevent.self="dragFn" src="https://api.r10086.com/CG系列1.php" alt="随机图片" style="width: 100%;height: 100%">
    </div>
</template>

<script lang="ts">
    import {defineComponent, computed, ref, onMounted,onBeforeMount} from "vue";
    import { useElementProxy, useElementScale, useElementRotate} from '../hooks'
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
            }

        },
        setup(props, context) {
            const element = ref<HTMLElement>(null)
            const selected = ref<boolean>(false)
            const {x, y, moveX, moveY, stopAndGetData, startListen} = useElementProxy(
                props.config.stickerMoveX, props.config.stickerMoveY, element
            )
            const {scale, scaleStart,scaleStop} = useElementScale(element)
            const {deg, startRotate,stopRotate} = useElementRotate(element)
            const styleWidth = computed<string>(() => getStylePx(props.config.width))
            const styleHeight = computed<string>(() => getStylePx(props.config.height))
            const styleMoveX = computed<string>(() => getStylePx(moveX.value))
            const styleMoveY = computed<string>(() => getStylePx(moveY.value))
            const styleDeg = computed<string>(() => getStyleDeg(deg.value))
            const stopDoing = () =>{
                scaleStop()
                stopRotate()
            }
            const dragFn = () => {
                selected.value ? stopAndGetData() : startListen()
                selected.value = !selected.value
            }
            onMounted(()=>{
                document.body.addEventListener('mouseup',stopDoing)
            })
            onBeforeMount(()=>document.body.removeEventListener('mouseup',stopDoing))
            return {
                styleMoveX, styleMoveY,
                dragFn, scaleStart, startRotate,scaleStop,
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