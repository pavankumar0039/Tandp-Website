import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Signuphome from './components/Signuphome'

import SignupCord from './components/SignupCord';
import Home from './components/Home'
import Toolshome from './screens/Toolshome';
import Companyhome from './screens/Companyhome';
import Calender from './screens/Calender';


function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Signuphome/>}></Route>
        <Route path="/signup" element={<SignupCord/>}></Route>
        <Route path="/home" element={<Home/>}> 
        <Route exact path="Companyhome" element={<Companyhome />}></Route>
        <Route exact path="tools" element={<Toolshome/>}></Route>
        <Route exact path="Calender" element={<Calender/>}></Route>
        </Route>
        
       
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
