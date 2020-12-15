import {onMounted, onUnmounted, ref, Ref} from 'vue'
import {Image, Object} from "fabric/fabric-impl";
import {fabric, Shortcuts} from "../untils/esModule";
import {useCanvasState} from "./useCanvsState";
import {useCanvasAction} from "./useCanvasAction";

const shortcuts = new Shortcuts({target: document, capture: false});
export function useLayerController(element: Ref<HTMLElement>, jsonContent?: Object) {
    let canvas: fabric.Canvas = null
    const _canvas = ref<fabric.Canvas>(null)
    let clipboard:Object = null
    const {undo,redo,redoStatus,undoStatus} = useCanvasState(_canvas,jsonContent)
    const {hide,display,del,brushSwitch} = useCanvasAction(_canvas)
    const addText = (text: string = "") => {
        const newText = new fabric.IText(text)
        canvas.add(newText)
    }
    const addImage = (url: string) => {
        fabric.Image.fromURL(url, (img: Image) => {
            img.scaleToHeight(100)
            img.scaleToWidth(100)
            canvas.add(img)
        })
    }
    const setClipboard = () => {
        canvas.getActiveObject().clone(clone=>{
            clipboard = clone
        })
    }
    const paste = () => {
        clipboard.clone((clone) => {
            canvas.discardActiveObject()
            clone.set({
                left: clone.left + 20,
                top: clone.top + 20,
                evented: true
            } as Object)
            if (clone.type === 'activeSelection') {
                // active selection needs a reference to the canvas.
                clone.canvas = canvas;
                clone.forEachObject(function(obj) {
                    canvas.add(obj);
                });
                // this should solve the unselectability
                clone.setCoords();
            } else {
                canvas.add(clone);
            }
            clipboard.top += 10;
            clipboard.left += 10;
            canvas.setActiveObject(clone);
            canvas.requestRenderAll();
        })
    }
    onMounted(() => {
        canvas = new fabric.Canvas(element.value, {
            height: element.value.offsetHeight,
            width: element.value.offsetWidth,
            isDrawingMode: false
        })
        _canvas.value = canvas
        if (jsonContent) {
            console.log(jsonContent)
        }
        (()=>{
            shortcuts.add({
                handler: () => {
                    paste();
                    return false
                }, shortcut: "CmdOrCtrl+V"
            })
            shortcuts.add({
                handler: () => {
                    setClipboard();
                    return false
                }, shortcut: "CmdOrCtrl+C"
            })
        })()
    })
    onUnmounted(() => {
        shortcuts.reset()
    })
    return {
        addText, addImage, del, hide, display,_canvas,undo,redo,redoStatus,undoStatus
    }
}
