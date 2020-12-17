import React from 'react';
import {createMemo} from 'react-use'
import logo from './logo.svg';
import './App.css';
import {router} from './router';
import {RouterGuard} from "react-router-guard/dist";
import {Spin} from 'antd';
export const Switch = createMemo((val:boolean)=>val)
function App() {
    const result = Switch(false)
    return (
        <Spin spinning={result}>
            <div className="App">
                {/* {(props.route&&renderRoutes(props.route.routes))} */}
                <RouterGuard config={router}/>
            </div>
        </Spin>
    );
}

export default App;
