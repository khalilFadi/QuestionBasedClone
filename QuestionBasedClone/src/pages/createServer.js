import { useState } from 'react';

// import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import '../css/createServer.css';
import closeButton from '../images/XWhitebackgroundPurpleCenter.png';
function CreateServer() {
    
    return (
        <div className="createServer">
            <div className='body'>
                <form>
                    <div className='serverName bigdiv'>
                        <h3 className='title'>Server Name</h3>
                        <input className='input' type="text" placeholder='Server Name'/>
                    </div>
                    <div className='creatorName bigdiv'>
                        <h3 className='title'>Creator Name</h3>
                        <input className='input' type="text" placeholder='Creator Name'/>
                    </div>
                    <div className='serverDescription bigdiv'>
                        <h3 className='title'>Server Description</h3>
                        <textarea className='input' rows = "5" cols = "60" name = "description" placeholder='Enter Details Here ....'>

                        </textarea>
                    </div>
                </form>
                    <button className='goBack button'>Go Back</button>
                    <button className='next button'>Next</button>
            </div>
            <div className='circle'/>
            <div className='square'/>
        </div>
    );
}
 
export default CreateServer;