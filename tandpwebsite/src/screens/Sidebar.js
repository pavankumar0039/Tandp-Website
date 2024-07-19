import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


function Sidebar() {
    const navigate = useNavigate();

    const toolsopen = () => {
        navigate("/home/tools");
    };
    const Companyhomeopen=()=>{
        navigate("/home/Companyhome");
    }
    const calenderopen=()=>{
        navigate("/home/Calender");
    }

    return (
        <div>
            <div id="nav-bar">
                <input id="nav-toggle" type="checkbox" />
                <div id="nav-header">
                    <Link id="nav-title" to="https://codepen.io" target="_blank">
                        C<i className="fab fa-codepen"></i>DEPEN
                    </Link>
                    <label htmlFor="nav-toggle">
                        <span id="nav-toggle-burger"></span>
                    </label>
                    <hr />
                </div>
                <div id="nav-content">
                    <div className="nav-button"><i className="fas fa-palette"></i><span>Dashboard</span></div>
                    <div className="nav-button"  onClick={Companyhomeopen}><i className="fas fa-images"></i><span>Company Database</span></div>
                    <div className="nav-button"><i className="fas fa-thumbtack"></i><span>Upcoming Companies</span></div>
                    <hr />
                    <div className="nav-button"><i className="fas fa-heart"></i><span>Ongoing Companies</span></div>
                    <div className="nav-button"><i className="fas fa-chart-line"></i><span>Student Database</span></div>
                    <div className="nav-button" onClick={toolsopen}><i className="fas fa-fire"></i><span>Tools</span></div>
                    <div className="nav-button" onClick={calenderopen}><i className="fas fa-magic"></i><span>Calendar</span></div>
                    <hr />
                    <div className="nav-button"><i className="fas fa-gem"></i><span>Notes</span></div>
                    <div id="nav-content-highlight"></div>
                </div>
                <input id="nav-footer-toggle" type="checkbox" />
                <div id="nav-footer">
                    <div id="nav-footer-heading">
                        <div id="nav-footer-avatar">
                            <img src="https://gravatar.com/avatar/4474ca42d303761c2901fa819c4f2547" alt='' />
                        </div>
                        <div id="nav-footer-titlebox">
                            <Link id="nav-footer-title" to="https://codepen.io/uahnbu/pens/public" target="_blank">uahnbu</Link>
                            <span id="nav-footer-subtitle">Admin</span>
                        </div>
                        <label htmlFor="nav-footer-toggle">
                            <i className="fas fa-caret-up"></i>
                        </label>
                    </div>
                    <div id="nav-footer-content"></div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
