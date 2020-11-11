import {reactive, onMounted, onUnmounted, ref, computed,Ref} from 'vue'
import {getStyleDeg, getStylePx} from "../untils/helper";
import * as params from "../untils/FormValidation";
import {useForm} from "@ant-design-vue/use";

export function useFormSet<T extends Object, S extends Object | null>(form: T, apiFunction?: Function, getData?: (data: S) => void) {
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

export function useMouse() {
    const x = ref<number>(0)
    const y = ref<number>(0)
    const update = (e: MouseEvent) => {
        x.value = e.pageX
        y.value = e.pageY
    }
    const startListen = () => document.addEventListener('mousemove', update)
    const stopListen = () => document.removeEventListener('mousemove', update)
    // onMounted(()=>startListen())
    onUnmounted(() => stopListen())
    return {x, y, startListen, stopListen}
}

export function useElementProxy(proxyX: number, proxyY: number, element: Ref<HTMLElement>) {
    const {x, y, startListen, stopListen} = useMouse()
    const backgroundWidth = ref<number>(0)
    const backgroundHeight = ref<number>(0)
    const backgroundOffsetX = ref<number>(0)
    const backgroundOffsetY = ref<number>(0)
    const width = ref<number>(0)
    const height = ref<number>(0)

    const moveX = computed<number>({
        get: () => {
            if (x.value - backgroundOffsetX.value <= width.value / 2)
                return 0
            else if (x.value - backgroundOffsetX.value >= backgroundWidth.value - width.value / 2)
                return backgroundWidth.value - width.value
            else return x.value - backgroundOffsetX.value - width.value / 2
        }, set: (xVal) => {
            x.value = xVal
        }
    })
    const moveY = computed<number>({
        get: () => {
            if (y.value - backgroundOffsetY.value <= height.value / 2)
                return 0
            else if (y.value - backgroundOffsetY.value >= backgroundHeight.value - height.value / 2)
                return backgroundHeight.value - width.value
            else return y.value - backgroundOffsetY.value - height.value / 2
        }, set: (yVal) => {
            y.value = yVal
        }
    })
    onMounted(() => {
        width.value = element.value.offsetWidth
        height.value = element.value.offsetHeight
        backgroundWidth.value = element.value.parentElement.offsetWidth
        backgroundHeight.value = element.value.parentElement.offsetHeight
        backgroundOffsetX.value = element.value.parentElement.offsetLeft
        backgroundOffsetY.value = element.value.parentElement.offsetTop
        console.log( proxyX + width.value / 2, backgroundOffsetX.value,backgroundWidth.value / 2)
        moveX.value = proxyX + width.value / 2
        moveY.value = proxyY + height.value / 2
    })
    const stopAndGetData: () => { centerX: number, centerY: number } = () => {
        stopListen()
        return {centerX: x.value, centerY: y.value}
    }
    return{stopAndGetData,startListen,x,y,moveX,moveY}
}