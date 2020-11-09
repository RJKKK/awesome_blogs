export enum AssemblyType {
    image,
    text,
    sticker
}
interface Assembly {
    id: string
    componentType: AssemblyType
    stickerCenterX: number
    stickerCenterY: number
    zIndex: number
    scale: number
    rotate: number
    stickerId?: string
    text?: string
    imageUrl?: string
    whScale?: number
}
export interface Journal {
    backgroundId: string | number
    Assemblies: Assembly[]
}