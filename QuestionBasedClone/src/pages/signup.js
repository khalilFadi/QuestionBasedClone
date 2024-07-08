import { useState } from 'react';

// import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import '../css/signup.css';
import closeButton from '../images/XWhitebackgroundPurpleCenter.png';
import { useGoTo } from '../MyContext';

function Signup() {
    const goTo = useGoTo();
    
    const handleNavigation = (path) => {
        goTo(path);
    };

    return (
        <div className="signup">
            <div className='body'>

                    <div className='bigdiv'>
                        <div className='title'>
                            <h1>Signup</h1>
                            <h2 onClick={() => handleNavigation('/login')}>Login</h2>
                        </div>
                        <div className='inputs'>
                            <h3 className=''>Name</h3>
                            <input className='input' type="text" placeholder='Name'/>
                            <h3 className=''>Password</h3>
                            <input className='input' type="text" placeholder='Password'/>
                            <h3 className=''>Password again</h3>
                            <input className='input' type="text" placeholder='Password'/>
                        </div>
                        <div className='buttonsection'>
                            <button className='button' onClick={() => handleNavigation('/CreateAvatar')}>Signup</button>
                        </div>
                        
                    </div>


                    {/* <button className='goBack button'>Go Back</button>
                    <button className='next button'>Next</button> */}
            </div>
            <div className='circle'/>
            <div className='square'/>
        </div>
    );
}
 
export default Signup;