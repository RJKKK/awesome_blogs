import * as fabricjs from 'fabric'
import {onMounted, nextTick, ref, Ref, onUnmounted, reactive, computed} from 'vue'
import {Object, Image} from "fabric/fabric-impl";
import * as ShortcutsJs from 'shortcuts';
import * as lodashjs from "lodash"
// @ts-ignore
const Shortcuts = ShortcutsJs.default.Shortcuts
// @ts-ignore
const fabric = fabricjs.default.fabric;
// @ts-ignore
const lodash = lodashjs.default
const shortcuts = new Shortcuts ({target:document,capture:false});
export function useLayerController(element: Ref<HTMLElement>, jsonContent?: Object) {
    let canvas: fabric.Canvas = null
    const state = reactive({
        canvasState: [] as any[],
        index: -1 as number,
        undoFinishedStatus: true as boolean,
        redoFinishedStatus: true as boolean
    })
    const undoStatus = computed<boolean>(() => state.index >0)
    const redoStatus = computed<boolean>(() => state.index < state.canvasState.length - 1)
    const layersStatus = computed({
        get: () => {
            // @ts-ignore
            return state.index>0?state.canvasState[state.index].objects:[]
        }, set: () => {

        }
    })
    const clipboard = ref<Object[]>([])
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
        clipboard.value = copyObjects.map(val => {
            return lodash.cloneDeep(val) as Object
        })
    }
    const paste = () => {
        canvas.discardActiveObject()
        clipboard.value.forEach((val, index) => {
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
    const del = () => {
        const delObjects: Object[] = canvas.getActiveObjects()
        delObjects.forEach(val => canvas.remove(val))
    }
    const updateCanvasState = () => {
        if (state.redoFinishedStatus && state.undoFinishedStatus) {
            state.canvasState = state.canvasState.slice(0, state.index+1)
            state.canvasState.push(canvas.toJSON())
            state.index++
        }
        console.log(state.index)
    }
    const undo = () => {
        state.undoFinishedStatus = false
        if (!undoStatus.value) return null;
        else canvas.loadFromJSON(state.canvasState[state.index - 1], () => {
            state.index--
            state.undoFinishedStatus = true
            console.log(layersStatus.value)
        })
    }
    const redo = () => {
        state.redoFinishedStatus = false
        if (!redoStatus.value) return null
        else canvas.loadFromJSON(state.canvasState[state.index + 1], () => {
            state.index++
            state.redoFinishedStatus = true
        })
    }

    onMounted(() => {
        canvas = new fabric.Canvas(element.value,{
            height:element.value.offsetHeight,
            width:element.value.offsetWidth
        })
        if (jsonContent) {
            canvas.loadFromJSON(jsonContent, () => {
                state.canvasState.push(canvas.toJSON())
                state.index++
            })
        }
        else {
            state.canvasState.push({})
            state.index++
        }
        (()=>{
            shortcuts.add({
                handler:()=>{
                    paste();
                    return false
                },shortcut:"CmdOrCtrl+V"
            })
            shortcuts.add({
                handler:()=>{
                    setClipboard();
                    return false
                },shortcut:"CmdOrCtrl+C"
            })
            shortcuts.add({
                handler:()=>{
                    undo()
                    return false
                },shortcut:"CmdOrCtrl+Z"
            })
            shortcuts.add({
                handler:()=>{
                    redo()
                    return false
                },shortcut:"CmdOrCtrl+Shift+Z"
            })
        })();
    })
    onUnmounted(() => {
        // document.removeEventListener('keyup', keyCodeForEvent)
        shortcuts.reset()
    })
    nextTick(() => {
        canvas.on('object:modified', () => {
            updateCanvasState()
        })
        canvas.on('object:added', () => {
            updateCanvasState()
        })
        canvas.on('object:removed', () => {
            updateCanvasState()
        })
    })
    return {
        addText, addImage, del, hide, display, setClipboard, paste, undo, redo, state
    }
}