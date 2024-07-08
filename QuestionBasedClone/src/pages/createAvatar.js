import { useState } from 'react';

// import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import '../css/createAvatar.css';
import closeButton from '../images/XWhitebackgroundPurpleCenter.png';
import avatar1 from '../images/Avatar1.png';
import avatar2 from '../images/Avatar2.png';
import avatar3 from '../images/Avatar3.png';
import avatar4 from '../images/Avatar4.png';
import { useGoTo } from '../MyContext.js';

function CreateAvatar() {
    const goTo = useGoTo();
    
    const handleNavigation = (path) => {
        goTo(path);
    };
    return (
        <div className="createAvatar">
            <button className='loginButton' onClick={() => handleNavigation('/login')}>Login</button>
            <div className='body'>
                    <div className='serverName bigdiv'>
                        <h3 className='title'>What should we call you </h3>
                        <input className='input' type="text" placeholder='Nickname'/>
                    </div>
                    <div className='AvatarImages'>
                    <img src={avatar1}/>
                    <img src={avatar2}/>
                    <img src={avatar3}/>
                    <img src={avatar4}/>

                    </div>
                    <div className='Buttons'>
                        <button>Go Back</button>
                        <div className='space'>.</div>
                        <button onClick={() => handleNavigation('/waitingRoom')}>Next</button>
                    </div>
                    {/* <button className='goBack button'>Go Back</button>
                    <button className='next button'>Next</button> */}
            </div>
            <div className='circle'/>
            <div className='square'/>
        </div>
    );
}
 
export default CreateAvatar;