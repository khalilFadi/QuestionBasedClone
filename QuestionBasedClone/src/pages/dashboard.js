import { useState, useEffect } from 'react';

// import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import '../css/dashboard.css';
import closeButton from '../images/XWhitebackgroundPurpleCenter.png';
import MediumUserSize from '../components/User.js';
import {useNavigate} from 'react-router-dom';
import { useMyContext } from '../MyContext.js';
import axios from 'axios';
function Dashboard() {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const { myGlobalGamePin, setMyGamePin } = useMyContext();
    const [serverStatusText, setServerStatusText] = useState('Publish Server');
    const getStudents = async () => {
        const response = await axios.post('http://localhost:9999/get-students-in-server', {serverPIN: myGlobalGamePin});

        console.log('response: ', response.data);
        setStudents(response.data);
    }
    const goTo = (link) => {
        navigate(link);
    }

    const advanceServer = async () => {
        let currentStatus = await axios.post('http://localhost:9999/api/get-server-status', {serverPIN: myGlobalGamePin});
        const questionsLength = await axios.post('http://localhost:9999/get-questions', {serverPIN: myGlobalGamePin});
        console.log('currentStatus: ', currentStatus.data);
        console.log('quesitons: ', questionsLength.data);
        if(currentStatus.data == 'Offline'){
            const response = await axios.post('http://localhost:9999/api/change-server-status', {serverPIN: myGlobalGamePin, newStatus: '0'});
        }else if(Number(currentStatus.data) + 1 >= questionsLength.data.length){
            const response = await axios.post('http://localhost:9999/api/change-server-status', {serverPIN: myGlobalGamePin, newStatus: 'Offline'});
        }else{
            const response = await axios.post('http://localhost:9999/api/change-server-status', {serverPIN: myGlobalGamePin, newStatus: (Number(currentStatus.data) + 1).toString()});
        }
        currentStatus = await axios.post('http://localhost:9999/api/get-server-status', {serverPIN: myGlobalGamePin});
        setupServerStatusText(currentStatus.data, questionsLength.data.length);
    }

    const checkCurrentServerStatus = async () => {
        const currentStatus = await axios.post('http://localhost:9999/api/get-server-status', {serverPIN: myGlobalGamePin});
        const questionsLength = await axios.post('http://localhost:9999/get-questions', {serverPIN: myGlobalGamePin});
        console.log('currentStatus: ', currentStatus.data);
        setupServerStatusText(currentStatus.data, questionsLength.data.length);
    }

    function setupServerStatusText(Status, length) {
        if(Status == 'Offline'){
            setServerStatusText('Publish Server');
        }else if(Number(Status) + 1 == length){
            setServerStatusText('Close Server');
        }else{
            setServerStatusText('Next Question ['+ (Number(Status) + 1).toString()+ ']');
        }
    }
    //timer
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
        setTime(new Date());
        getStudents();
    }, 1000);
        return () => clearInterval(interval);
    }, []);

    //one time call 
    useEffect(()=>{
        checkCurrentServerStatus();
    }, [])
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
                    <p>Pin: {myGlobalGamePin}</p>
                </div>
            </div>
            <div className='body'>
                <div className='leftSide'>
                    <div className='box1 mainbox'>
                        <h1 className='UserNumber'>251</h1>
                        <h2 className='SubUserText'>Users</h2>
                    </div>
                    <div className='box2 mainbox'>
                    <button className='publishServer' onClick={advanceServer}> {serverStatusText}</button>
                    <button className='EditQuestions' onClick={() => goTo('/questionsPreview')}> Edit Questions</button>
                    <button className='EditServerSettings'> Export Data</button>
                    <button className='MoreSettings'> More Settings </button>
                    </div>
                </div>
                <div className='rightSide'>
                    <div className='box1 mainbox'>
                        
                    <div className='User_medium_info'>

                        {
                            students.map((student, index) => {
                                return (
                                    <MediumUserSize
                                        key={student.StudetPIN} // Using the index as the key
                                        className='user_info'
                                        percentage={student.TotalScore}
                                        studentAvatar={student.Avatar}
                                        username={student.Name}
                                    />
                                );
                            })
                        }
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