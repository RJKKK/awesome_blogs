import {useAsyncFn} from "react-use";
import * as ApiFunction from "../api";

export function useApi<T = {}>(Fn: Function, deps?: []) {
    const [state , fetch] = useAsyncFn(async () => {
        const res  = (await Fn)();
        return res as {list:T[],total:number}
    }, deps)
    return {state, fetch}
}
