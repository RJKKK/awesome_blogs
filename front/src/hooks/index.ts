import {reactive} from 'vue'
import * as params from "../untils/FormValidation";
import {useForm} from "@ant-design-vue/use";

export function useFormSet<T extends Object>(form:T,callback?:Function,msg?:string){
    let rulesObj = {}
    const model= reactive<T>(form)
    Object.keys(form).forEach(val=>rulesObj[val] = params[val])
    const rules = reactive(rulesObj)
    const { resetFields, validate, validateInfos } = useForm(model, rules);
    const handleSubmit = ()=>{
        validate().then(async ()=>{
            if(callback){
              const res = await callback(model)
                console.log(res,msg)
            }
        }).catch(err=>console.log(err))
    }
    return {resetFields,validate,validateInfos,handleSubmit,model}
}