import { useState, useEffect } from 'react';

// import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import '../css/dashboard.css';
import closeButton from '../images/XWhitebackgroundPurpleCenter.png';
import MediumUserSize from '../components/User.js';
import {useNavigate} from 'react-router-dom';
import { useMyContext } from '../MyContext.js';
import Popup from 'reactjs-popup';
import {QuestionMedium} from '../components/questionEdit.js';
import { sideMenu } from '../components/menu.js';
import avatar1 from '../images/Avatar1.png';
import avatar2 from '../images/Avatar2.png';
import avatar3 from '../images/Avatar3.png';
import avatar4 from '../images/Avatar4.png';

// Mock data for students
const mockStudents = [
    {
        _id: "1",
        StudentPIN: "12345",
        ServerPIN: "67890",
        UserID: "user1",
        Name: "John Doe",
        Avatar: avatar1,
        QuestionsList: [
            {
                question: "What is 2+2?",
                answer: "4",
                time: "10s",
                score: 100
            },
            {
                question: "What is the capital of France?",
                answer: "Paris",
                time: "15s",
                score: 100
            }
        ],
        TotalTime: "25s",
        TotalScore: 100,
        DateofTest: "2024-03-19"
    },
    {
        _id: "2",
        StudentPIN: "23456",
        ServerPIN: "67890",
        UserID: "user2",
        Name: "Jane Smith",
        Avatar: avatar2,
        QuestionsList: [
            {
                question: "What is 2+2?",
                answer: "4",
                time: "8s",
                score: 100
            },
            {
                question: "What is the capital of France?",
                answer: "London",
                time: "12s",
                score: 0
            }
        ],
        TotalTime: "20s",
        TotalScore: 50,
        DateofTest: "2024-03-19"
    },
    {
        _id: "3",
        StudentPIN: "34567",
        ServerPIN: "67890",
        UserID: "user3",
        Name: "Bob Wilson",
        Avatar: avatar3,
        QuestionsList: [
            {
                question: "What is 2+2?",
                answer: "4",
                time: "9s",
                score: 100
            },
            {
                question: "What is the capital of France?",
                answer: "Paris",
                time: "14s",
                score: 100
            }
        ],
        TotalTime: "23s",
        TotalScore: 100,
        DateofTest: "2024-03-19"
    },
    {
        _id: "4",
        StudentPIN: "45678",
        ServerPIN: "67890",
        UserID: "user4",
        Name: "Alice Brown",
        Avatar: avatar4,
        QuestionsList: [
            {
                question: "What is 2+2?",
                answer: "4",
                time: "7s",
                score: 100
            },
            {
                question: "What is the capital of France?",
                answer: "London",
                time: "11s",
                score: 0
            }
        ],
        TotalTime: "18s",
        TotalScore: 50,
        DateofTest: "2024-03-19"
    }
];

// Mock server status
let mockServerStatus = 'Offline';
let mockQuestionsLength = 2;

function Dashboard() {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [chosenStudent, setChosenStudent] = useState({
        _id: "",
        StudentPIN: "",
        ServerPIN: "",
        UserID: "",
        Name: "",
        Avatar: "",
        QuestionsList: [],
        TotalTime: 0,
        TotalScore: 0,
        DateofTest: ""
    });
    const { myGlobalGamePin, setMyGamePin } = useMyContext();
    const [showStudentInfo, setShowStudentInfo] = useState(false);
    const [serverStatusText, setServerStatusText] = useState('Publish Server');
    const [studentQuestions, setStudentQuestions] = useState([]);

    // Mock function to get students
    const getStudents = () => {
        setStudents(mockStudents);
    }

    const goTo = (link) => {
        navigate(link);
    }

    // Mock function to advance server
    const advanceServer = () => {
        if(mockServerStatus === 'Offline'){
            mockServerStatus = '0';
        } else if(Number(mockServerStatus) + 1 >= mockQuestionsLength){
            mockServerStatus = 'Offline';
        } else {
            mockServerStatus = (Number(mockServerStatus) + 1).toString();
        }
        setupServerStatusText(mockServerStatus, mockQuestionsLength);
    }

    // Mock function to check server status
    const checkCurrentServerStatus = () => {
        setupServerStatusText(mockServerStatus, mockQuestionsLength);
    }

    function setupServerStatusText(Status, length) {
        if(Status === 'Offline'){
            setServerStatusText('Publish Server');
        } else if(Number(Status) + 1 === length){
            setServerStatusText('Close Server');
        } else {
            setServerStatusText('Next Question ['+ (Number(Status) + 1).toString()+ ']');
        }
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    // Timer
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
            getStudents();
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    
    const handleUserClicked = (student) => {
        setChosenStudent(student);
        setShowStudentInfo(true);
    };

    // One time call 
    useEffect(() => {
        checkCurrentServerStatus();
    }, []);

    const closePopup = () => {
        setShowStudentInfo(false);
    };

    return (
        <div className="Dashboard">
            
            <sideMenu/>
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
                                        onClick={() => handleUserClicked(student)}
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
                <Popup className='popup'  open={showStudentInfo} onClose={closePopup}>
                    <div className="studentInfo">
                        <div className='StudentPersonalInfo'>
                            <div className='image'>
                                <img src={chosenStudent.Avatar}/>
                            </div>
                            <div className='mainInfo'>
                                <h1>{chosenStudent.Name}</h1>       
                                <h2>{chosenStudent.UserID}</h2>
                                <h3>{chosenStudent.TotalScore}%</h3>
                            </div>
                            <div className='rightSide'>
                                <h3>{chosenStudent.TotalTime}</h3>
                                <h2>{formatDate(chosenStudent.DateofTest)}</h2>
                            </div>
                        </div>
                        <div className='questions'>
                            {
                            chosenStudent.QuestionsList.map((questionx, index)  => {
                                return (
                                    <QuestionMedium
                                        question={questionx}/>
                                );
                            })
                        }
                        </div>
                        <button onClick={closePopup}>Close</button>
                    </div>
                </Popup>
        </div>
    );
}
 
export default Dashboard;