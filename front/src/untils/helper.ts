export const getStylePx: (val: number) => string = (val) => val + 'px'
export const getStyleDeg: (val: number) => string = (val) => val + 'deg'
export const arcTan: (y: number, x: number) => number = (x, y) => Math.atan2(y , x) * 180 / Math.PI
