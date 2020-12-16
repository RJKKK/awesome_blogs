import {computed, onMounted, onUnmounted, reactive, ref, Ref} from 'vue'
import {Image, Object} from "fabric/fabric-impl";
import {fabric, Shortcuts} from "../untils/esModule";
import {useCanvasState} from "./useCanvsState";
import {useCanvasAction} from "./useCanvasAction";

const shortcuts = new Shortcuts({target: document, capture: false});
export function useLayerController(element: Ref<HTMLElement>, jsonContent?: Object) {
    let canvas: fabric.Canvas = null
    const _canvas = ref<fabric.Canvas>(null)
    let clipboard:Object = null
    // const {undo,redo,redoStatus,undoStatus} = useCanvasState(_canvas,jsonContent)
    const state = reactive({
        canvasState: [] as any[],
        index: -1 as number,
        undoFinishedStatus: true as boolean,
        redoFinishedStatus: true as boolean
    })
    const undoStatus = computed<boolean>(() => state.index > 0)
    const redoStatus = computed<boolean>(() => state.index < state.canvasState.length - 1)
    const updateCanvasState = () => {
        // console.log(layersStatus.value)
        if (state.redoFinishedStatus && state.undoFinishedStatus) {
            state.canvasState = state.canvasState.slice(0, state.index + 1)
            state.canvasState.push(canvas.toDatalessJSON())
            state.index++
        }
    }
    const undo = () => {
        if (!undoStatus.value) return null;
        else {
            state.undoFinishedStatus = false
            canvas.loadFromJSON(state.canvasState[state.index - 1], () => {
                // canvas.value
                state.index--
                state.undoFinishedStatus = true
            })
        }
    }
    const redo = () => {
        if (!redoStatus.value) return null
        else {
            state.redoFinishedStatus = false
            canvas.loadFromJSON(state.canvasState[state.index + 1], () => {
                state.index++
                state.redoFinishedStatus = true
                // console.log(canvas.getObjects())
            })
        }
    }
    const {hide,display,del} = useCanvasAction(_canvas)
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
            canvas.loadFromJSON(jsonContent, () => {
                state.canvasState.push(canvas.toDatalessJSON())
                state.index++
            })
        } else {
            state.canvasState.push({})
            state.index++
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
            shortcuts.add({
                handler: () => {
                    undo()
                    return false
                }, shortcut: "CmdOrCtrl+Z"
            })
            shortcuts.add({
                handler: () => {
                    redo()
                    return false
                }, shortcut: "CmdOrCtrl+Shift+Z"
            })
            canvas.on('object:modified', () => {
                updateCanvasState()
            })
            canvas.on('object:added', (e) => {
                // console.log(e.target)
                updateCanvasState()
            })
            canvas.on('object:removed', () => {
                updateCanvasState()
            })
        })()
    })
    onUnmounted(() => {
        shortcuts.reset()
    })
    return {
        addText, addImage, del, hide, display,_canvas,undo,redo,redoStatus,undoStatus,
    }
}
