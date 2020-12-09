import * as fabricjs from 'fabric'
import {nextTick, reactive, ref,Ref} from 'vue'
// @ts-ignore
const fabric = fabricjs.default.fabric;

export function useBrushLibrary(canvas: Ref<fabric.Canvas>) {
    const brushConfig = reactive({
        lineWidth: 30 as number,
        lineColor: 'red' as string,
        shadowColor: '#005A7E' as string,
        shadowWidth: 0 as number,
        shadowOffset: 0 as number
    })
    const library = [
        {
            name: 'hLinePatternBrush',
            label: '射线笔刷',
            getPatternSrc: () => {
                const patternCanvas = fabric.document.createElement('canvas');
                patternCanvas.width = patternCanvas.height = 10;
                const ctx = patternCanvas.getContext('2d');
                ctx.strokeStyle = brushConfig.lineColor;
                ctx.lineWidth = 5;
                ctx.beginPath();
                ctx.moveTo(5, 0);
                ctx.lineTo(5, 10);
                ctx.closePath();
                ctx.stroke();
                return patternCanvas;
            }
        },
        {
            name: 'vLinePatternBrush',
            label: '射线笔刷2',
            getPatternSrc: () => {
                const patternCanvas = fabric.document.createElement('canvas');
                patternCanvas.width = patternCanvas.height = 10;
                const ctx = patternCanvas.getContext('2d');
                ctx.strokeStyle = brushConfig.lineColor;
                ctx.lineWidth = 5;
                ctx.beginPath();
                ctx.moveTo(0, 5);
                ctx.lineTo(10, 5);
                ctx.closePath();
                ctx.stroke();
                return patternCanvas;
            }
        },
        {
            name: 'squarePatternBrush',
            label: '方块笔刷',
            getPatternSrc: () => {
                const squareWidth = 10, squareDistance = 2;
                const patternCanvas = fabric.document.createElement('canvas');
                patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
                const ctx = patternCanvas.getContext('2d');
                ctx.fillStyle = brushConfig.lineColor;
                ctx.fillRect(0, 0, squareWidth, squareWidth);
                return patternCanvas;
            }
        },
        {
            name: 'diamondPatternBrush',
            label: '方块笔刷2',
            getPatternSrc: () => {
                const squareWidth = 10, squareDistance = 5;
                const patternCanvas = fabric.document.createElement('canvas');
                const rect = new fabric.Rect({
                    width: squareWidth,
                    height: squareWidth,
                    angle: 45,
                    fill: brushConfig.lineColor
                });

                const canvasWidth = rect.getBoundingRect().width;

                patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
                rect.set({left: canvasWidth / 2, top: canvasWidth / 2});

                const ctx = patternCanvas.getContext('2d');
                rect.render(ctx);

                return patternCanvas;
            }
        },
        {
            name: 'PencilBrush',
            label: '铅笔笔刷',
            getPatternSrc: null
        },
        {
            name: 'CircleBrush',
            label: '圆形笔刷',
            getPatternSrc: null
        },
        {
            name: 'SprayBrush',
            label: '喷雾笔刷',
            getPatternSrc: null
        },
        {
            name: 'PatternBrush',
            label: '图形笔刷',
            getPatternSrc: null
        }
    ] as { name: string, label: string, getPatternSrc: (color: string) => HTMLElement | null }[]
    const brushesArray = ref([])
    const setBrushMode = (index: number) => {
        console.log(brushesArray)
        canvas.value.freeDrawingBrush = brushesArray.value[index].brush
        console.log(canvas.value.freeDrawingBrush)
    }
    const setConfig = () => {
        if (canvas.value.freeDrawingBrush) {
            const brush = canvas.value.freeDrawingBrush
            brush.color = brushConfig.lineColor
            // @ts-ignore
            if (brush.getPatternSrc) {
                // @ts-ignore
                brush.source = brush.getPatternSrc.call(brush);
                brush.width = brushConfig.lineWidth || 1;
                // @ts-ignore
                brush.shadow = new fabric.Shadow({
                    blur: brushConfig.shadowWidth,
                    offsetX: brushConfig.shadowOffset,
                    offsetY: brushConfig.shadowOffset,
                    affectStroke: true,
                    color: brushConfig.lineColor
                })
            }
        }
    }
    nextTick(() => {
        library.forEach((val) => {
            const obj = {} as { name: string, label: string, brush: any };
            obj.name = val.name
            obj.label = val.label
            const brush = val.getPatternSrc ? new fabric.PatternBrush(canvas.value) : new fabric[val.name](canvas.value);
            brush.getPatternSrc = val.getPatternSrc
            obj.brush = brush
            brushesArray.value.push(obj)
        })

        canvas.value.freeDrawingBrush.color = brushConfig.lineColor
        canvas.value.freeDrawingBrush.width = brushConfig.lineWidth
        console.log(canvas.value.freeDrawingBrush)
        // @ts-ignore
        // canvas.value.freeDrawingBrush.shadow.blur = brushConfig.shadowWidth || 0;
        // // @ts-ignore
        // canvas.value.freeDrawingBrush.shadow.offsetX = brushConfig.shadowOffset || 0;
        // // @ts-ignore
        // canvas.value.freeDrawingBrush.shadow.offsetY = brushConfig.shadowOffset || 0;
        setBrushMode(2)
    })
    return {brushConfig, brushesArray, setBrushMode, setConfig}
}
