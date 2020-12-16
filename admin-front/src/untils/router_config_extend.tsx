// import React from "react";
// import {types} from "util";
// // @ts-ignore
// import isPromise = module
// // @ts-ignore
// import * as module from "module";
//
// class AsyncBeforeEnter extends React.Component<any, any>{
//     constructor(props:any) {
//         super(props);
//         this.state = {
//             Component:null,
//             render:null,
//             error:null,
//             completed:false,
//         }
//     }
//     componentDidMount(): void {
//         const {beforeEnter,...props} = this.props
//         const enter = beforeEnter({...props})
//         if(isPromise(enter)){
//             enter.then((next)=>{
//                 this.handleAfterEnter(next)
//             }).catch((error)=>{
//                 console.log(error)
//                 this.setState({error})
//             })
//         }
//         else{
//             this.handleAfterEnter(enter)
//         }
//     }
//     handleAfterEnter(next):void{
//
//     }
// }
export default {}
