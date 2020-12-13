import React from 'react';
import logo from './logo.svg';
import './App.css';
import Router from './router';
// import {renderRoutes} from 'react-router-config';
function App() {
  return (
    <div className="App">
      {/* {(props.route&&renderRoutes(props.route.routes))} */}
      <Router/>
    </div>
  );
}

export default App;
