import { useState } from 'react';

// import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import '../css/createServer.css';
function CreateServer() {
    
    return (
        <div className="createServer">
            <div className='sideBar'>
                <div className='logoSection'>

                </div>
                <div className='selectingServer'>

                </div>
                <div className='dashboardMenu'>

                </div>
                <div className='userInfo'>

                </div>
            </div>
            <div className='topBar'>
                <div className='title'>
                    <h1>Server Name</h1>
                    <p>Pin: 5432</p>
                </div>
            </div>
            <div className='body'>
                <div className='leftSide'>
                    <div className='box1'>
                    
                    </div>
                    <div className='box2'>

                    </div>
                </div>
                <div className='rightSide'>
                    <div className='box1'>

                    </div>
                    <div className='box2'>

                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default CreateServer;