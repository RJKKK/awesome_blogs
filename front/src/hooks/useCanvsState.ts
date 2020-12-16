import {computed, reactive, Ref, nextTick, onUnmounted} from "vue";
import {fabric, Shortcuts} from "../untils/esModule";
import {Object} from "fabric/fabric-impl";

const shortcuts = new Shortcuts({target: document, capture: false});

export function useCanvasState(canvas: Ref<fabric.Canvas>, jsonContent?: Object) {
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
            state.canvasState.push(canvas.value.toDatalessJSON())
            state.index++
        }
    }
    const undo = () => {
        if (!undoStatus.value) return null;
        else {
            state.undoFinishedStatus = false
            canvas.value.loadFromJSON(state.canvasState[state.index - 1], () => {
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
            canvas.value.loadFromJSON(state.canvasState[state.index + 1], () => {
                state.index++
                state.redoFinishedStatus = true
                // console.log(canvas.getObjects())
            })
        }
    }
    nextTick(() => {
        if (jsonContent) {
            canvas.value.loadFromJSON(jsonContent, (_canvas) => {
                canvas.value = _canvas
                state.canvasState.push(canvas.value.toDatalessJSON())
                state.index++
            })
        } else {
            state.canvasState.push({})
            state.index++
        }
        (() => {
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
            canvas.value.on('object:modified', () => {
                updateCanvasState()
            })
            canvas.value.on('object:added', (e) => {
                // console.log(e.target)
                updateCanvasState()
            })
            canvas.value.on('object:removed', () => {
                updateCanvasState()
            })
        })();
    })
    onUnmounted(() => {
        shortcuts.reset()
    })
    return {undoStatus, redoStatus, undo, redo}
}
