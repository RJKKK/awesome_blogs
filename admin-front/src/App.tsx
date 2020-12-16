import React, {useContext} from 'react';
import logo from './logo.svg';
import './App.css';
import {router} from './router';
import {RouterGuard} from "react-router-guard/dist";
import {IConfig} from 'react-router-guard/dist/models'

function App() {
    const [setRouter,config] = useContext<IConfig[]>(router)
  return (
    <div className="App">
      {/* {(props.route&&renderRoutes(props.route.routes))} */}
      <RouterGuard config={router}/>
    </div>
  );
}

export default App;
