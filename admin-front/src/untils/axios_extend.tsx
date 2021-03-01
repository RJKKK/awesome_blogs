import Axios, {AxiosResponse} from "axios";
import {message, Spin} from 'antd'
import {get as getCookies} from 'js-cookie'
import React, { useEffect, useState} from "react";
import {XMLdata} from "./interfaces";

const normalReq = Axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 3000,
})

const spinSwitch = {loading: false}

export function get<T>(url: string, params: any, data: any) {
    return normalReq.get<T,AxiosResponse<XMLdata<T>>>(url, {params, data})
}

export function post<T>(url: string, data: any) {
    return normalReq.post<T,AxiosResponse<XMLdata<T>>>(url, data)
}

normalReq.interceptors.request.use(config => {
    spinSwitch.loading = true
    config.headers = { ...config.headers, Authorization: `Bearer ${getCookies('token')}` }
    return config
})
normalReq.interceptors.response.use(res => {
    if (res.data.err !== 0) {
        message.error(res.data.msg, 1)
    }

    spinSwitch.loading = false
    return res.data
}, err => {
    // loadingPublisher.sub();
    spinSwitch.loading = false
    console.log(err.response)
    if (err.response.status === 401) {
        message.error(err.response.message, 1)
    }
    if (err.response.status === 404) {
        message.error('未知接口或接口地址错误', 1)
    } else message.error(err.response.message || err.response.data, 1)
})


// export class MySpin extends Component<{App:any},{loading:boolean}>{
//     constructor(props:any) {
//         super(props);
//         this.state = {
//             loading:false
//         }
//     }
//    componentDidMount(): void {
//        Object.defineProperty(spinSwitch,'loading',{
//            set:(v: any) => {
//                this.setState({loading:v})
//            }
//        })
//    }
//
//     render() {
//       return  <Spin spinning={this.state.loading}>
//             {this.props.App}
//         </Spin>
//     }
// }


export const MySpin = (props: { App: React.ReactNode; }) => {
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        Object.defineProperty(spinSwitch, 'loading', {
            set: (v: boolean) => {
                setLoading(v)
            }
        })
    }, [])
    return (
        <Spin spinning={loading} style={{position:'static'}}>
            {props.App}
        </Spin>
    )
}
