export enum AssemblyType {
    image,
    text,
    sticker
}
export interface Assembly {
    id: number
    componentType: AssemblyType
    centerX: number
    centerY: number
    width?:number
    height?:number
    zIndex?: number
    scale: number
    rotate: number
    stickerId: number
    text?: string
    imageUrl?: string
}
export interface Journal {
    backgroundId: string | number
    Assemblies: Assembly[]
}