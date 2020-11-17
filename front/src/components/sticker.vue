<template>
    <div ref="element" class="main"

    >
        <div id="scale"
             @mousedown.stop.prevent.self="scaleStart(centerX,centerY,$event)"
             @mouseup.stop.self="scaleStop"
        ></div>
        <div id="delete"></div>
        <div id="rotate"
             @mousedown.stop.prevent.self="startRotate(centerX,centerY,$event)"
             @mouseup.stop.self="stopRotate"
        ></div>
        <img id="image" @mousedown.stop.prevent.self="startListen" src="https://api.r10086.com/CG系列1.php" alt="随机图片"
             @mouseup.stop.self="stopMove"
             style="width: 100%;height: 100%">
    </div>
</template>

<script lang="ts">
    import {defineComponent, computed, ref, onMounted, onBeforeMount, watch} from "vue";
    import {useElementProxy, useElementScale, useElementRotate} from '../hooks'
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
                        centerY: 0,
                        centerX: 0,
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
            const centerX = ref(props.config.centerX)
            const centerY = ref(props.config.centerY)
            const {scale, scaleStart, scaleStop} = useElementScale(props.config.scale,element)
            const {moveX, moveY, stopAndGetData, startListen, setProxy} = useElementProxy(
                centerX.value, centerY.value, scale, element
            )
            const {deg, startRotate, stopRotate} = useElementRotate(element)

            const styleWidth = computed<string>(() => getStylePx(props.config.width))
            const styleHeight = computed<string>(() => getStylePx(props.config.height))
            const styleMoveX = computed<string>(() => getStylePx(moveX.value))
            const styleMoveY = computed<string>(() => getStylePx(moveY.value))
            const styleDeg = computed<string>(() => getStyleDeg(deg.value))
            const stopDoing = () => {
                const data = stopAndGetData()
                centerX.value = data.centerX
                centerY.value = data.centerY
            }
            const stopMove = () => {
                const data = stopAndGetData()
                centerX.value = data.centerX
                centerY.value = data.centerY
                context.emit('update:config', {...props.config, centerY: centerY.value, centerX: centerX.value})
                // context.emit('check',123)
            }
            const testStop = (e) => {
                console.log(e)
            }
            watch([() => props.config.centerX, () => props.config.centerY], (newVal) => {
                if(!(newVal[0]===centerX.value&&newVal[1]===centerY.value)){
                    console.log(1111)
                    setProxy(newVal[0],newVal[1])
                }

            }, {deep: true})
            onMounted(() => document.body.addEventListener('mouseup', testStop))
            onBeforeMount(() => document.body.removeEventListener('mouseup', testStop))
            return {
                styleMoveX, styleMoveY,
                startListen, scaleStart, startRotate, scaleStop, stopAndGetData, stopDoing,
                styleWidth, styleHeight, stopRotate,
                element, centerX, centerY, scale, styleDeg, stopMove
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

    #rotate {
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