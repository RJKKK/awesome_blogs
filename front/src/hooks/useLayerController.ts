import * as fabricjs from 'fabric'
// @ts-ignore
const fabric = fabricjs.default.fabric;
import {onMounted, nextTick, ref,Ref,onUnmounted} from 'vue'
import {Object,Image} from "fabric/fabric-impl";
import extend  from 'extend2'

export function useLayerController(element: Ref<HTMLElement>, jsonContent?: Object) {
    let canvas:fabric.Canvas = null
    const clipboard = ref<Object[]>([])
    console.log(extend)
    const addText = (text: string = "") => {
        const newText = new fabric.IText(text)
        canvas.add(newText)
    }
    const addImage = (url: string) => {
        fabric.Image.fromURL(url,(img:Image)=>{
            img.scaleToHeight(100)
            img.scaleToWidth(100)
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
        clipboard.value = copyObjects.map(val=> {
            return extend(true,{},val) as Object
        })
    }
    const paste = () => {
        canvas.discardActiveObject()
        clipboard.value.forEach((val,index) => {
            val.clone(clone => {
                clone.set({
                    left: clone.left + 20,
                    top: clone.top + 20,
                    evented: true
                } as Partial<Object>)
                canvas.add(clone)
                clipboard.value[index] = clone
                canvas.setActiveObject(clone)
            })
        })
    }
    const del = ()=>{
        const delObjects:Object[] = canvas.getActiveObjects()
        delObjects.forEach(val=>canvas.remove(val))
    }
    function keyCodeForEvent(e:KeyboardEvent) {
        if(!!~["C",'c'].indexOf(e.key)&&e.ctrlKey){
            setClipboard()
            e.preventDefault()
        }
        if(!!~["V",'v'].indexOf(e.key)&&e.ctrlKey){
            paste();
            e.preventDefault()
        }
        if(!!~["Z",'z'].indexOf(e.key)&&e.ctrlKey){
            console.log('按了')
            e.preventDefault()
        }
    }
    onMounted(()=>{
        document.addEventListener('keyup',keyCodeForEvent)
    })
    onUnmounted(()=>{
        document.removeEventListener('keyup',keyCodeForEvent)
    })
    nextTick(() => {
        canvas = new fabric.Canvas(element.value)
        if (jsonContent)
            canvas.loadFromJSON(jsonContent, () => {})
    })
    return {
        addText,addImage,del,hide,display,setClipboard,paste
    }
}