import * as fabricjs from 'fabric'
// @ts-ignore
const fabric = fabricjs.default.fabric;
import {onMounted, nextTick, ref,Ref,reactive} from 'vue'
import {Object,Image} from "fabric/fabric-impl";

export function useLayerController(element: Ref<HTMLElement>, jsonContent?: Object) {
    let canvas:fabric.Canvas = null
    const clipboard = ref<Object[]>([])
    const addText = (text: string = "") => {
        const newText = new fabric.IText(text)
        canvas.add(newText)
    }
    const addImage = (url: string) => {
        fabric.Image.fromURL(url,(img:Image)=>{
            img.set({
                left: 100, // 图片相对画布的左侧距离
                top: 100, // 图片相对画布的顶部距离
                opacity: 0.85, // 图片透明度
                // 这里可以通过scaleX和scaleY来设置图片绘制后的大小，这里为原来大小的一半
                scaleX: 0.5,
                scaleY: 0.5,
                lockRotation:false,
            });
            canvas.add(img)
        })


    }
    const hide = () => {
        canvas.getActiveObject().set('opacity', 0)
        canvas.requestRenderAll()
    }
    const display = () => {
        canvas.getActiveObject().set('opacity', 1)
        canvas.requestRenderAll()
    }
    const setClipboard = () => {
        const copyObjects: Object[] = canvas.getActiveObjects()
        clipboard.value = copyObjects
    }
    const paste = () => {
        canvas.discardActiveObject()
        clipboard.value.forEach(val => {
            val.clone(clone => {
                clone.set({
                    left: clone.left + 20,
                    top: clone.top + 20,
                    evented: true
                } as Partial<Object>)
                canvas.add(clone)
                val.left += 20;
                val.top += 20;
                canvas.setActiveObject(clone)
            })
        })
    }
    const del = ()=>{
        const delObjects:Object[] = canvas.getActiveObjects()
        delObjects.forEach(val=>canvas.remove(val))
    }
    nextTick(() => {
        // console.log(document.getElementById('canvas'))
        canvas = new fabric.Canvas(element.value)
        console.log(canvas)
        if (jsonContent)
            canvas.loadFromJSON(jsonContent, () => {})
    })
    return {
        addText,addImage,del,hide,display,setClipboard,paste
    }
}