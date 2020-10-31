import {reactive} from 'vue'
import * as params from "../untils/FormValidation";
import {useForm} from "@ant-design-vue/use";
import {message} from 'ant-design-vue'
export function useFormSet<T extends Object,S extends Object|null>(form:T,apiFunction?:Function,getData?:(data:S)=>void){
    let rulesObj = {}
    const model= reactive<T>(form)
    Object.keys(form).forEach(val=>rulesObj[val] = params[val]||[])
    const rules = reactive(rulesObj)
    const { resetFields, validate, validateInfos } = useForm(model, rules);
    const handleSubmit = ()=>{
        validate().then(async ()=>{
            if(apiFunction){
              const res = await apiFunction(model)
              if(res) {
                  getData&&getData(res)
              }

            }
        }).catch(err=>console.log(err))
    }
    return {resetFields,validate,validateInfos,handleSubmit,model}
}