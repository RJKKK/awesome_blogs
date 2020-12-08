import * as fabricjs from 'fabric'
// @ts-ignore
const fabric = fabricjs.default.fabric;
export default [
    {
        name: 'hLinePatternBrush',
        label: '射线笔刷',
        getPatternSrc: (color) => {
            const patternCanvas = fabric.document.createElement('canvas');
            patternCanvas.width = patternCanvas.height = 10;
            const ctx = patternCanvas.getContext('2d');
            ctx.strokeStyle = color;
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
        getPatternSrc: (color) => {
            const patternCanvas = fabric.document.createElement('canvas');
            patternCanvas.width = patternCanvas.height = 10;
            const ctx = patternCanvas.getContext('2d');
            ctx.strokeStyle = color;
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
        getPatternSrc: (color) => {
            const squareWidth = 10, squareDistance = 2;
            const patternCanvas = fabric.document.createElement('canvas');
            patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
            const ctx = patternCanvas.getContext('2d');
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, squareWidth, squareWidth);
            return patternCanvas;
        }
    },
    {
        name: 'diamondPatternBrush',
        label: '方块笔刷2',
        getPatternSrc:(color) =>{
            const squareWidth = 10, squareDistance = 5;
            const patternCanvas = fabric.document.createElement('canvas');
            const rect = new fabric.Rect({
                width: squareWidth,
                height: squareWidth,
                angle: 45,
                fill: color
            });

            const canvasWidth = rect.getBoundingRect().width;

            patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
            rect.set({ left: canvasWidth / 2, top: canvasWidth / 2 });

            const ctx = patternCanvas.getContext('2d');
            rect.render(ctx);

            return patternCanvas;
        }
    },
    {
        name:'PencilBrush',
        label:'铅笔笔刷',
        getPatternSrc:null
    },
    {
        name:'CircleBrush',
        label:'圆形笔刷',
        getPatternSrc:null
    },
    {
        name:'SprayBrush',
        label:'喷雾笔刷',
        getPatternSrc:null
    },
    {
        name:'PatternBrush',
        label:'图形笔刷',
        getPatternSrc:null
    }
    ] as { name: string, label: string, getPatternSrc: (color: string) => HTMLElement | null }[]
