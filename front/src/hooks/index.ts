import {reactive, onMounted, onUnmounted, ref, computed, Ref, watch, onBeforeUnmount, onUpdated} from 'vue'
import * as params from "../untils/FormValidation";
import {useForm} from "@ant-design-vue/use";
import {arcTan} from "../untils/helper";

export function useFormSet<T extends Object, S extends Object | null>
(form: T, apiFunction?: Function, getData?: (data: S) => void) {
    let rulesObj = {}
    const model = reactive<T>(form)
    Object.keys(form).forEach(val => rulesObj[val] = params[val] || [])
    const rules = reactive(rulesObj)
    const {resetFields, validate, validateInfos} = useForm(model, rules);
    const handleSubmit = () => {
        validate().then(async () => {
            if (apiFunction) {
                const res = await apiFunction(model)
                if (res) {
                    getData && getData(res)
                }

            }
        }).catch(err => console.log(err))
    }
    return {resetFields, validate, validateInfos, handleSubmit, model}
}

export function useMouse(element?: Ref<HTMLElement>) {
    const xs = ref<number>(0)
    const ys = ref<number>(0)
    const backgroundOffsetX = ref<number>(0)
    const backgroundOffsetY = ref<number>(0)
    const update = (e: MouseEvent) => {
        xs.value = e.pageX
        ys.value = e.pageY
    }
    const x = computed<number>({
        get: () => element ? xs.value - backgroundOffsetX.value : xs.value,
        set: (val) => xs.value = val
    })
    const y = computed<number>({
        get: () => element ? ys.value - backgroundOffsetY.value : ys.value,
        set: (val) => ys.value = val
    })
    const startListen = () => document.addEventListener('mousemove', update)
    const stopListen = () => document.removeEventListener('mousemove', update)
    onMounted(() => {
        backgroundOffsetX.value = element.value.parentElement.offsetLeft
        backgroundOffsetY.value = element.value.parentElement.offsetTop
    })
    onUnmounted(() => stopListen())
    return {x, y, startListen, stopListen, backgroundOffsetX, backgroundOffsetY}
}

export function useElementProxy(proxyX: number, proxyY: number, scale: Ref<number>, element: Ref<HTMLElement>) {
    const {x, y, startListen, stopListen} = useMouse(element)

    const backgroundWidth = ref<number>(0)
    const backgroundHeight = ref<number>(0)
    const width = ref<number>(0)
    const height = ref<number>(0)
    const moveX = computed<number>({
        get: () => {
            if (x.value <= width.value * scale.value / 2)
                return -width.value / 2 * (1 - scale.value)
            else if (x.value >= backgroundWidth.value - width.value * scale.value / 2)
                return backgroundWidth.value - (1 + scale.value) * width.value / 2
            else return x.value - width.value / 2
        }, set: (xVal) => {
            x.value = xVal
        }
    })
    const moveY = computed<number>({
        get: () => {
            if (y.value <= height.value * scale.value / 2)
                return -height.value / 2 * (1 - scale.value)
            else if (y.value >= backgroundHeight.value - height.value * scale.value / 2)
                return backgroundHeight.value - (1 + scale.value) * height.value / 2
            else return y.value - height.value / 2
        }, set: (yVal) => {
            y.value = yVal
        }
    })
    const setProxy = (x: number, y: number) => {
        moveX.value = x + element.value.parentElement.offsetLeft
        moveY.value = y + element.value.parentElement.offsetTop
    }
    onMounted(() => {
        width.value = element.value.offsetWidth
        height.value = element.value.offsetHeight
        backgroundWidth.value = element.value.parentElement.offsetWidth
        backgroundHeight.value = element.value.parentElement.offsetHeight
        setProxy(proxyX, proxyY)
    })
    const stopAndGetData: () => { centerX: number, centerY: number } = () => {
        stopListen()
        return {centerX: x.value, centerY: y.value}
    }

    return {stopAndGetData, startListen, moveX, moveY,setProxy}
}

export function useMouseClick(targetElement: Ref<HTMLElement>) {
    const centerX = ref<number>(0)
    const centerY = ref<number>(0)
    const clickX = ref<number>(0)
    const clickY = ref<number>(0)
    const startClick = (proxyX: number, proxyY: number, e: MouseEvent) => {
        clickX.value = e.pageX - targetElement.value.parentElement.offsetLeft
        clickY.value = e.pageY - targetElement.value.parentElement.offsetTop
        centerX.value = proxyX
        centerY.value = proxyY
    }
    onMounted(() => {
        clickX.value = -targetElement.value.parentElement.offsetLeft
        clickY.value = -targetElement.value.parentElement.offsetTop
        centerX.value = clickX.value
        centerY.value = clickY.value
    })
    return {centerX, centerY, clickX, clickY, startClick}
}

export function useElementScale(initial:number,targetElement: Ref<HTMLElement>) {
    const scale = ref<number>(initial)
    const oldDistance = ref<number|null>(null)
    const {centerX, centerY, clickX, clickY, startClick} = useMouseClick(targetElement)
    const {x, y, startListen, stopListen} = useMouse(targetElement)
    const scaleStart = (proxyX: number, proxyY: number, e: MouseEvent) => {
        startListen();
        startClick(proxyX, proxyY, e)
        if(!oldDistance.value)
            oldDistance.value = Math.sqrt(Math.pow(clickX.value - centerX.value, 2) + Math.pow(clickY.value - centerY.value, 2))/scale.value
    }
    const scaleStop: () => number = () => {
        stopListen();
        return scale.value
    }
    const watcher = watch([x, y], (newVal) => {
        // (x1-x2)^2 + (y1-y2)^2 开根号
        // const oldDistance = Math.sqrt(Math.pow(clickX.value - centerX.value, 2) + Math.pow(clickY.value - centerY.value, 2))
        const newDistance = Math.sqrt(Math.pow(newVal[0] - centerX.value, 2) + Math.pow(newVal[1] - centerY.value, 2))
        scale.value = oldDistance.value === null||oldDistance.value === 0 ? scale.value : newDistance / oldDistance.value
        // console.log(scale.value)
    })
    onBeforeUnmount(() => {
        watcher()
    })
    return {scale, scaleStart, scaleStop}
}

export function useElementRotate(initial:number,targetElement: Ref<HTMLElement>) {
    const deg = ref<number>(initial)
    const preAngle = ref<number|null>(null)
    const {centerX, centerY, clickX, clickY, startClick} = useMouseClick(targetElement)
    const {x, y, startListen, stopListen} = useMouse(targetElement)
    const startRotate = (proxyX: number, proxyY: number, e: MouseEvent) => {
        startListen();
        startClick(proxyX, proxyY, e)
        if(!preAngle.value)preAngle.value = deg.value + arcTan(centerY.value - clickY.value, clickX.value - centerX.value)
    }
    const stopRotate: () => number = () => {
        stopListen();
        return deg.value
    }
    const watcher = watch([x, y], (newVal, oldVal) => {
        // const preAngle = arcTan(centerY.value - clickY.value, clickX.value - centerX.value)
        const newAngle = arcTan(centerY.value - newVal[1], newVal[0] - centerX.value)
        deg.value =  newAngle - preAngle.value
    })
    onBeforeUnmount(() => {
        watcher()
    })
    return {deg, startRotate, stopRotate}
}

