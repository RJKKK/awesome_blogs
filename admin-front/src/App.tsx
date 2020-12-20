import React from 'react';
import logo from './logo.svg';
import './App.css';
import {router} from './router';
import {RouterGuard} from "react-router-guard/dist";
import {MySpin} from './untils/axios_extend'

function App() {
    return (
        <MySpin App={(
            <div className="App">
                <RouterGuard config={router}/>
            </div>
        )}/>
    );
}

export default App;
