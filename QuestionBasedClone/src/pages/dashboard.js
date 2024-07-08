import { useState } from 'react';

// import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import '../css/dashboard.css';
import closeButton from '../images/XWhitebackgroundPurpleCenter.png';
import MediumUserSize from '../components/User.js';
import {useNavigate} from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();

    const goTo = (link) => {
        navigate(link);
    }
    return (
        <div className="Dashboard">
            <div className='sideBar'>
                <div className='logoSection'>
                    <h1>kahoot</h1>
                    <img src={closeButton} style={{width:'20%'}}/>
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
                    <div className='box1 mainbox'>
                        <h1 className='UserNumber'>251</h1>
                        <h2 className='SubUserText'>Users</h2>
                    </div>
                    <div className='box2 mainbox'>
                    <button className='publishServer'> Publish Server</button>
                    <button className='EditQuestions' onClick={() => goTo('/questionsPreview')}> Edit Questions</button>
                    <button className='EditServerSettings'> Export Data</button>
                    <button className='MoreSettings'> More Settings </button>
                    </div>
                </div>
                <div className='rightSide'>
                    <div className='box1 mainbox'>
                        
                    <div className='User_medium_info'>
                        <MediumUserSize className='user_info' percentage={12} username={'name 1'} timetaken={'12:23'}/>
                        <MediumUserSize className='user_info' percentage={98} username={'name 2'} timetaken={'43:12'}/>
                        <MediumUserSize className='user_info' percentage={100} username={'name 3'} timetaken={'Nan'}/>
                        </div>
                    </div>
                    <div className='box2 mainbox'>

                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Dashboard;