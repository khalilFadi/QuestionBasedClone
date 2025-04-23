import { useContext, useState, useEffect} from 'react';

// import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import '../css/waitingRoom.css';
import '../css/main.css';

import { useGoTo, useMyContext } from '../MyContext.js';

import axios from 'axios';
import { SmallUserSize } from '../components/User.js';
import avatar1 from '../images/Avatar1.png';
import avatar2 from '../images/Avatar2.png';
import avatar3 from '../images/Avatar3.png';
import avatar4 from '../images/Avatar4.png';

// Mock students data
const mockStudents = [
    {
        StudentPIN: "12345",
        Name: "John Doe",
        Avatar: avatar1
    },
    {
        StudentPIN: "23456",
        Name: "Jane Smith",
        Avatar: avatar2
    },
    {
        StudentPIN: "34567",
        Name: "Bob Wilson",
        Avatar: avatar3
    },
    {
        StudentPIN: "45678",
        Name: "Alice Brown",
        Avatar: avatar4
    }
];

// Mock server status
let mockServerStatus = 'Offline';

function WaitingRoom() {
    const [studentPINs, setStudentPINs] = useState([]);
    const { myGlobalGamePin, setMyGamePin } = useMyContext();   
    const [playerCount, setPlayerCount] = useState(0);
    const [isGameStarting, setIsGameStarting] = useState(false);

    const goTo = useGoTo();

    const handleNavigation = (path) => {
        goTo(path);
    };

    const checkingStatus = () => {
        // Simulate random server status changes
        if (Math.random() < 0.1) { // 10% chance to change status
            mockServerStatus = mockServerStatus === 'Offline' ? '0' : 'Offline';
        }
        
        if(mockServerStatus !== 'Offline'){
            handleNavigation('/question');
        }
        updateStudents();
    }

    const updateStudents = () => {
        // Simulate players joining gradually
        if (playerCount < mockStudents.length && Math.random() < 0.3) { // 30% chance to add a player
            setPlayerCount(prev => prev + 1);
            setStudentPINs(mockStudents.slice(0, playerCount + 1));
        }
    }

    // Timer for updating the waiting room
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
            checkingStatus();
        }, 1000);
        return () => clearInterval(interval);
    }, [playerCount]);

    const handleStartGame = () => {
        setIsGameStarting(true);
        mockServerStatus = '0'; // Start the game
        handleNavigation('/question');
    };

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
                <div className='playerNumber'>{playerCount}</div>
                
                <div className='ActivePlayers'>
                    {studentPINs.length > 0 ? (
                        studentPINs.map((student, index) => (
                            <SmallUserSize
                                key={index}
                                studentName={student.Name}
                                studentAvatar={student.Avatar}
                            />
                        ))
                    ) : (
                        <div className='findingPlayers'>
                            <h2>Waiting for players...</h2>
                        </div>
                    )}
                </div>
                <div className='startButton'>Start</div>
                
            
            </div>

            
        </div>
    );
}
 
export default WaitingRoom;