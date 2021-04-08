import './App.css';
import React from 'react';
import {Route , BrowserRouter} from "react-router-dom";
import Owner from './Owner';
import { SeeAllTask } from './com/SeeAllTask';
function App() {

  return (
    <BrowserRouter>
    <div className="App" style={{backgroundColor: '#808080'}}>
            <Route path='/'
            render={ () => <Owner/> }/>
             {/* <Route path='/'
            render={ () =><SeeAllTask/> }/> */}
    </div>
    
    </BrowserRouter>

  );
}

export default App;
