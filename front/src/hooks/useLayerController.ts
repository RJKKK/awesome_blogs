import * as fabricjs from 'fabric'
// @ts-ignore
const fabric = fabricjs.default.fabric;
import {onMounted, nextTick, ref} from 'vue'
import {Object} from "fabric/fabric-impl";

export function useLayerController(element: HTMLElement, jsonContent?: Object) {
    const canvas = ref<fabric.Canvas>(null)
    const clipboard = ref<Object[]>([])
    const context = canvas.value
    const addText = (text: string = "") => {
        const newText = new fabric.IText(text)
        context.add(newText)
    }
    const addImage = (url: string) => {
        const newImage = new fabric.Image.fromURL(url)
        context.add(newImage)

    }
    const hide = () => {
        context.getActiveObject().set('opacity', 0)
        context.requestRenderAll()
    }
    const display = () => {
        context.getActiveObject().set('opacity', 1)
        context.requestRenderAll()
    }
    const setClipboard = () => {
        const copyObjects: Object[] = context.getActiveObjects()
        clipboard.value = copyObjects
    }
    const paste = () => {
        context.discardActiveObject()
        clipboard.value.forEach(val => {
            val.clone(clone => {
                clone.set({
                    left: clone.left + 20,
                    top: clone.top + 20,
                    evented: true
                } as Partial<Object>)
                context.add(clone)
                val.left += 20;
                val.top += 20;
                context.setActiveObject(clone)
            })
        })
    }
    const del = ()=>{
        const delObjects:Object[] = context.getActiveObjects()
        delObjects.forEach(val=>context.remove(val))
    }
    onMounted(() => {
        canvas.value = fabric.Canvas(element.id)
        if (jsonContent)
            canvas.value.loadFromJSON(jsonContent, () => {})
    })
}