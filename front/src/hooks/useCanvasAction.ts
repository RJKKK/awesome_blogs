import {fabric, Shortcuts} from "../untils/esModule";
import {ref, Ref, nextTick, onUnmounted} from 'vue'
import {Image, Object} from "fabric/fabric-impl";

const shortcuts = new Shortcuts({target: document, capture: false});

export function useCanvasAction(canvas: Ref<fabric.Canvas>) {
    const currentSelect = ref<Object>(null)
    const hide = () => {
        canvas.value.getActiveObject().set('opacity', 0)
        canvas.value.requestRenderAll()
    }
    const display = () => {
        canvas.value.getActiveObject().set('opacity', 1)
        canvas.value.requestRenderAll()
    }
    const del = () => {
        const delObjects: Object[] = canvas.value.getActiveObjects()
        delObjects.forEach(val => canvas.value.remove(val))
    }
    nextTick(() => {
        (() => {
            canvas.value.on('selection:created', (e) => {
                currentSelect.value = e.target
            })
        })();
    })
    onUnmounted(() => {
        shortcuts.reset()
    })
    return {
        hide, display, del
    }
}