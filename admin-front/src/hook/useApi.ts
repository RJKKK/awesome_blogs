import {useAsyncFn} from "react-use";
import * as ApiFunction from "../api";

export function useApi<T = null>(Fn: Promise<Function>) {
    const [state , fetch] = useAsyncFn(async () => {
        const res  = (await Fn)();
        return res as T
    }, [])
    return {state, fetch}
}
