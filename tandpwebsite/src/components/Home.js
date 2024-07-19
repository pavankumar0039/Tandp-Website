import React, { useState } from 'react'
import Companyhome from '../screens/Companyhome'

import { Routes, Route } from "react-router-dom";
import Nav from '../screens/Nav'

import Sidebar from '../screens/Sidebar'
import Toolshome from '../screens/Toolshome';
import Dashboard from '../screens/Dashboard';
import Calender from '../screens/Calender';
function Home() {
      const [companydt,setcompanydt]=useState({})
      const [tempcomp,settempcomp]=useState(false)
    return (
        <div>
            <div>
                <Nav />
            </div>
            <Sidebar />

            <div>
                <Routes>
                     <Route exact path="/" element={<Dashboard />}></Route>
                    <Route exact path="/Companyhome" element={<Companyhome  setcompanydt={setcompanydt} tempcomp={tempcomp} settempcomp={settempcomp}/>}></Route>
                    <Route exact path="/tools" element={<Toolshome companydt={companydt} settempcomp={settempcomp}/>}></Route>
                    <Route exact path="/Calender" element={<Calender/>}></Route>
                </Routes>
            </div>
        </div>

    )
}

export default Home
