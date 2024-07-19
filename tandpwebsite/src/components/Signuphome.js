import React from 'react'
import { Link } from 'react-router-dom'
import nitsimage from '../images/nitslogo.jpg'

export default function Signuphome() {
    return (
        <div className='parentcontainer'>
            <div className="Maincontainer min-vw-100 min-vh-100 d-flex flex-column justify-content-center">
                <div className="card " style={{ width: "18rem", marginLeft: "10rem" }}>
                    <div className="card-body">
                        <div className="text-center d-flex justify-content-start" >
                            <img src={nitsimage} class="rounded" alt="" style={{height:"5rem"}} />
                        </div>
                        <h1 className="card-title">Welcome</h1>
                        <h4 className="card-title">SignUp</h4>
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <Link to="/" className="btn btn-primary mb-2">Student SignUp</Link>
                        <Link to="/signup" className="btn btn-success">Admin SignUp</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
