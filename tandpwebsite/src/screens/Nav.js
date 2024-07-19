import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
  return (
    <div>
         <header>
                <div className="navbar">

                    <div className="nlcontainer">
                       
                        <div className="name">
                            <p className="hpara">Gym</p>
                            <p className="hpara1">Assistant</p>
                            <Link to="/home/tools">tools</Link>
                        </div>
                    </div>

                </div>

            </header>
      
    </div>
  )
}

export default Nav
