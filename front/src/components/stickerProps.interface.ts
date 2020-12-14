interface Props {
    type: Boolean | String | Number | Object | Array<any>
    required?: boolean
    default?: (() => any) | string | number | boolean
}

type PropsType = Boolean | String | Number | Object | Array<any>

interface PropsObj {
    [index: string]: Props | PropsType
}

const afv:PropsObj = {
    border: {
        type: String,
        default: "",
    },
    docId: {
        type: String,
        required: true,
    },
    rotate: {
        type: Number,
        default: 1,
    },
    stickerId: {
        type: String,
        required: true,
    },
    text: {
        type: String,
    },
    zIndex: {
        type: Number,
        required: true,
        default: 0,
    },
    componentType: {
        type: Number,
        required: true,
        default: 0,
    },
    imageTag: {
        type: String,
    },
    backgroundWidth:{
        type:Number,
        required:true,
        default:0
    },
    backgroundHeight:{
        type:Number,
        required:true,
        default:0
    },
    width:{
        type:Number,
        required:true,
        default:0
    },
    height:{
        type:Number,
        required:true,
        default:0
    }
}
export default afv as any