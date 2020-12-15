import {fabric} from "../untils/esModule";
import {nextTick, reactive, ref, Ref, watch, onUnmounted,toRefs} from 'vue'


export function useBrushLibrary(canvas: Ref<fabric.Canvas>) {
    // const brushConfig = reactive({
    //     lineWidth: 30 as number,
    //     lineColor: '#23af34' as string,
    //     shadowColor: '#005A7E' as string,
    //     shadowWidth: 30 as number,
    //     shadowOffset: 4 as number
    // })
    const lineWidth = ref<number>(30)
    const lineColor = ref<string>('#23af34')
    const shadowColor = ref<string>('#005A7E')
    const shadowWidth = ref<number>(30)
    const shadowOffset = ref<number>(4)
    const library = [
        {
            name: 'hLinePatternBrush',
            label: '射线笔刷',
            getPatternSrc: () => {
                const patternCanvas = fabric.document.createElement('canvas');
                patternCanvas.width = patternCanvas.height = 10;
                const ctx = patternCanvas.getContext('2d');
                ctx.strokeStyle = lineColor.value;
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
                ctx.strokeStyle = lineColor.value;
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
                ctx.fillStyle = lineColor.value;
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
                    fill: lineColor.value
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
        // console.log(brushesArray)
        canvas.value.freeDrawingBrush = brushesArray.value[index].brush
        const brush = canvas.value.freeDrawingBrush
        // @ts-ignore
        brush.source = brush.getPatternSrc ? brush.getPatternSrc.call(brush) : null;

        // @ts-ignore
        brush.shadow = new fabric.Shadow({
            blur: shadowWidth.value,
            offsetX: shadowOffset.value,
            offsetY: shadowOffset.value,
            affectStroke: true,
            color: shadowColor.value
        })
        setAllConfig()
        // console.log(canvas.value.freeDrawingBrush)
    }
    const setAllConfig = () => {
        if (canvas.value.freeDrawingBrush) {
            const brush = canvas.value.freeDrawingBrush
            // @ts-ignore
            brush.source = brush.getPatternSrc ? brush.getPatternSrc.call(brush) : null;
            //@ts-ignore
            brush.shadow.blur = shadowWidth.value;
            //@ts-ignore
            brush.shadow.color = shadowColor.value;
            // @ts-ignore
            brush.shadow.offsetX = shadowOffset.value;
            // @ts-ignore
            brush.shadow.offsetY = shadowOffset.value;
            brush.width = lineWidth.value;
            brush.color = lineColor.value
            // console.log(canvas.value.freeDrawingBrush.color)
        }
    }
    const setColor = ()=>{
        if (canvas.value.freeDrawingBrush){
            const brush = canvas.value.freeDrawingBrush;
            // @ts-ignore
            brush.source = brush.getPatternSrc ? brush.getPatternSrc.call(brush) : null;
            brush.color = lineColor.value
        }
    }
    const watcher_1 = watch(lineColor, () => {
        setColor()
    })
    const watcher_2 = watch(lineWidth,()=>{
        if (canvas.value.freeDrawingBrush){
            canvas.value.freeDrawingBrush.width = lineWidth.value
        }
    })
    const watcher_3 = watch(shadowOffset,()=>{
        if (canvas.value.freeDrawingBrush){
            // @ts-ignore
            canvas.value.freeDrawingBrush.shadow.offsetX = shadowOffset.value;
            // @ts-ignore
            canvas.value.freeDrawingBrush.shadow.offsetY = shadowOffset.value;
        }
    })
    const watcher_4 = watch(shadowWidth,()=>{
        if(canvas.value.freeDrawingBrush){
            //@ts-ignore
            canvas.value.freeDrawingBrush.shadow.blur = shadowWidth.value;
        }
    })
    const watcher_5 = watch(shadowColor,()=>{
        if(canvas.value.freeDrawingBrush){
            //@ts-ignore
            canvas.value.freeDrawingBrush.shadow.color = shadowColor.value;
        }
    })
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

        // canvas.value.freeDrawingBrush.color = lineColor.value
        // canvas.value.freeDrawingBrush.width = lineWidth.value
        setBrushMode(0)
        // console.log(canvas.value.freeDrawingBrush)

    })
    onUnmounted(() => {
        watcher_1();
        watcher_2()
        watcher_3()
        watcher_4()
        watcher_5()
    })
    return {lineWidth,lineColor,shadowColor,shadowWidth,shadowOffset, brushesArray, setBrushMode, setAllConfig}
}
