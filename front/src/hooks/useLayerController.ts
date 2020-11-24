import * as fabricjs from 'fabric'
// @ts-ignore
const fabric  =  fabricjs.default.fabric;
import {onMounted,nextTick,ref} from 'vue'
export function useLayerController(element:HTMLElement,jsonContent?:Object) {
    const canvas = ref<fabric.Canvas>(null)
    const addText = (text:string="")=>{
        const newText = new fabric.IText(text)
        canvas.value.add(newText)
    }
    const addImage = (url:string)=>{
        const newImage = new fabric.Image.fromURL(url)
        canvas.value.add(newImage)

    }
    onMounted(()=>{
        canvas.value = fabric.Canvas(element.id)
        if(jsonContent)
            canvas.value.loadFromJSON(jsonContent,()=>{})

    })
}