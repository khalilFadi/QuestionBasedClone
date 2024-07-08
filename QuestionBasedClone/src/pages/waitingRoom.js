import { useContext, useState, useEffect} from 'react';

// import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import '../css/waitingRoom.css';
import '../css/main.css';

import { useGoTo, useMyContext } from '../MyContext.js';

import axios from 'axios';
import { SmallUserSize } from '../components/User.js';
import avatar1 from '../images/Avatar1.png';

function WaitingRoom() {
    const [studentPINs, setStudentPINs] = useState([<div className='findingPlayers'>
        <h2>Waiting for players...</h2>
    </div>]);
    const { myGlobalGamePin, setMyGamePin } = useMyContext();   

    const goTo = useGoTo();

    const handleNavigation = (path) => {
        goTo(path);
    };

    const checkingStatus = async () =>{
        const serverStatus = await axios.post('http://localhost:9999/api/get-server-status', {serverPIN: myGlobalGamePin});
        if(serverStatus.data != 'Offline'){
            handleNavigation('/question');
        }
        studentsInServer();
        console.log("server Status: ", serverStatus.data);
    }
    const studentsInServer = async () =>{
        const students = await axios.post('http://localhost:9999/get-students-in-server', {serverPIN: Number(myGlobalGamePin)});
        const filteredStudents = students.data.map(student => {
            return {
              StudentPIN: student.StudentPIN,
              Name: student.Name,
              Avatar: student.Avatar
        };
          });
        if(filteredStudents.length > 0){

        }
        setStudentPINs(filteredStudents);
        console.log("students: ", studentPINs);
    }
    //calling a function every second 
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
        setTime(new Date());
        checkingStatus();
        }, 1000);
        return () => clearInterval(interval);
    }, []);


    return (
        <div className="WaitingRoom">
            <div className='header'>
            <div className='joinKahoottextHeader'>
                <div style={{width:'40%', alignItems: 'center'}}> 
                    <h2>Join with the link QuestionKahoot.com</h2>
                </div>
                <div className='triangleRight'> </div>
                <div style={{width:'60%', alignItems: 'center'}}>

                <p>PIN: {myGlobalGamePin}</p>
                </div>
            </div>
            </div>
            <div className='body'>
            <div className="circle"></div>
            <div className="square"></div>
                <h1> Kahoot !</h1>
                <div className='playerNumber'>0</div>
                
                <div className='ActivePlayers'>
                    {studentPINs.map((student, index) => {
                        return(
                        <SmallUserSize
                        key={index}
                        studentName={student.Name}
                        studentAvatar={student.Avatar}/>)
                    })
                    }
                </div>
                <div className='startButton'>Start</div>
                
            
            </div>

            
        </div>
    );
}
 
export default WaitingRoom;