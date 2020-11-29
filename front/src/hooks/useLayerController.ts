import * as fabricjs from 'fabric'
import {onMounted, nextTick, ref, Ref, onUnmounted, reactive, computed,watch} from 'vue'
import {Object, Image, IEvent} from "fabric/fabric-impl";
import * as ShortcutsJs from 'shortcuts';
import * as lodashjs from "lodash"
// @ts-ignore
const Shortcuts = ShortcutsJs.default.Shortcuts;
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
    const _state = reactive({
        current:null as Object,
        list:[] as Object[],
        state:[] as string[],
        index:0 as number,
        _index: 0 as number,
        action:false as boolean,
        reflash:false as boolean
    })
    const _undo = ()=>{
        console.log(_state)
        if(_state.index<=0)return _state.index = 0
        if(_state.reflash){
            _state.index--;
            _state.reflash = false;
        }
        _state._index = _state.index - 1
        _state.current = _state.list[_state._index];
        _state.current.setOptions(JSON.parse(_state.state[_state._index]));
        _state.index--;
        _state.current.setCoords()
        console.log(_state.current)
        canvas.renderAll()
        _state.action = true
    }
    const _redo = ()=>{
        console.log(_state)
        _state.action = true
        if(_state.index>=_state.state.length - 1)return null;
        _state._index = _state.index+1;
        _state.current = _state.list[_state._index];
        _state.current.setOptions(JSON.parse(_state.state[_state._index]))
        _state.index++;
        _state.current.setCoords();
        canvas.renderAll();
    }
    const _updateCanvasState = (e:IEvent)=>{
        let obj = e.target
        if(_state.action){
            _state.state = [_state.state[_state._index]]
            _state.list = [_state.list[_state._index]]
            _state.action = false
            _state.index = 1;
        }
        // obj.saveState()
        _state.state[_state.index] = JSON.stringify( obj.saveState())
        _state.list[_state.index] = obj
        _state.index++;
        _state._index = _state.index - 1
        _state.reflash = true
        console.log(_state.list)
    }
    const undoStatus = computed<boolean>(() => state.index >0)
    const redoStatus = computed<boolean>(() => state.index < state.canvasState.length - 1)
    const layersStatus = computed<Object[]>(()=>{
        state.index
        return canvas?canvas._objects:[]
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
        // const copyObjects: Object[] = canvas.getActiveObjects()
        // clipboard.value = copyObjects.map(val => {
        //     return lodash.cloneDeep(val) as Object
        // })
        clipboard.value = canvas.getActiveObjects()
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
                // console.log(clone.isType('image'))
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
        // console.log(layersStatus.value)
        if (state.redoFinishedStatus && state.undoFinishedStatus) {
            state.canvasState = state.canvasState.slice(0, state.index+1)
            state.canvasState.push(canvas.toDatalessJSON())
            state.index++
        }
    }
    const undo = () => {
        if (!undoStatus.value) return null;
        else {
            state.undoFinishedStatus = false
            canvas.loadFromJSON(state.canvasState[state.index - 1], () => {
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
    const getOne = (index: number)=>{
       let obj = canvas.item(index)
        // @ts-ignore
        canvas.setActiveObject(obj)
        return obj as unknown as Object
    }

    onMounted(() => {
        canvas = new fabric.Canvas(element.value,{
            height:element.value.offsetHeight,
            width:element.value.offsetWidth
        })
        if (jsonContent) {
            canvas.loadFromJSON(jsonContent, () => {
                state.canvasState.push(canvas.toDatalessJSON())
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
                    // undo()
                    _undo();
                    return false
                },shortcut:"CmdOrCtrl+Z"
            })
            shortcuts.add({
                handler:()=>{
                    // redo()
                    _redo();
                    return false
                },shortcut:"CmdOrCtrl+Shift+Z"
            })
            // canvas.on('object:modified', () => {
            //     updateCanvasState()
            // })
            // canvas.on('object:added', (e) => {
            //     console.log(e.target)
            //     updateCanvasState()
            // })
            // canvas.on('object:removed', () => {
            //     updateCanvasState()
            // })
            canvas.on('object:added',(e)=>{
                _updateCanvasState(e)
            })
            canvas.on('object:modified',(e)=>{
                _updateCanvasState(e)
            })
            canvas.on('object:removed', (e) => {
                _updateCanvasState(e)
            })
        })();
    })
    onUnmounted(() => {
        // document.removeEventListener('keyup', keyCodeForEvent)
        shortcuts.reset()
    })

    return {
        addText, addImage, del, hide, display, setClipboard, paste, undo, redo, state,getOne,layersStatus
    }
}