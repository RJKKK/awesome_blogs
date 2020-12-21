import { Model } from 'react-model'
import {IConfig} from "react-router-guard/dist/models";
type State = {
    routerConfig:IConfig[]
    switch:boolean
}
type ActionParams = {
    setSwitch:boolean
    getSwitch:undefined
}
const model:ModelType<State,ActionParams> = {
    state:{
        switch:false,
        routerConfig:[]
    },
    actions:{
        setSwitch:(set)=>{
            return state => {
                state.switch = set
            }
        },
        getSwitch:()=>{
            return state => {
                return state.switch
            }
        }
    }
}

export default Model(model)