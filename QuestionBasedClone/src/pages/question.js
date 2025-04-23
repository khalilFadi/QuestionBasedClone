import { useContext, useState, useEffect } from 'react';

// import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import '../css/main.css';
import '../css/question.css';
import { useGoTo, useMyContext } from '../MyContext.js';
import Popup from 'reactjs-popup';
import { LongUserSize } from '../components/User.js';
import avatar1 from '../images/Avatar1.png';
import avatar2 from '../images/Avatar2.png';
import avatar3 from '../images/Avatar3.png';
import avatar4 from '../images/Avatar4.png';

// Mock questions data
const mockQuestions = [
    {
        QuestionPIN: "1",
        QuestionText: "Should you share your password with friends?",
        CorrectAnswer: "No, never",
        IncorrectAnswer1: "Yes, if they're close friends",
        IncorrectAnswer2: "Yes, if they ask nicely",
        IncorrectAnswer3: "Yes, if they promise not to tell"
    },
    {
        QuestionPIN: "2",
        QuestionText: "What should you do if someone asks for your personal information online?",
        CorrectAnswer: "Don't share and tell a trusted adult",
        IncorrectAnswer1: "Share if they seem nice",
        IncorrectAnswer2: "Share if they're your age",
        IncorrectAnswer3: "Share if they promise to keep it secret"
    },
    {
        QuestionPIN: "3",
        QuestionText: "Is it safe to meet someone you only know online?",
        CorrectAnswer: "No, it's not safe",
        IncorrectAnswer1: "Yes, if they seem nice",
        IncorrectAnswer2: "Yes, if they're your age",
        IncorrectAnswer3: "Yes, if they're from your area"
    },
    {
        QuestionPIN: "4",
        QuestionText: "What should you do if you see cyberbullying?",
        CorrectAnswer: "Report it and tell a trusted adult",
        IncorrectAnswer1: "Ignore it",
        IncorrectAnswer2: "Join in to fit in",
        IncorrectAnswer3: "Keep it to yourself"
    }
];

// Mock students data
const mockStudents = [
    {
        Name: "John Doe",
        Avatar: avatar1,
        TotalScore: 100
    },
    {
        Name: "Jane Smith",
        Avatar: avatar2,
        TotalScore: 75
    },
    {
        Name: "Bob Wilson",
        Avatar: avatar3,
        TotalScore: 50
    },
    {
        Name: "Alice Brown",
        Avatar: avatar4,
        TotalScore: 25
    }
];

function Question() {
    const [question, setQuestion] = useState('');
    const [questionID, setQuestionID] = useState(0);
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');
    const [answer3, setAnswer3] = useState('');
    const [answer4, setAnswer4] = useState('');
    const { myGlobalGamePin, setMyGamePin, studentPIN } = useMyContext();       
    const [startTime, setStartTime] = useState(null);
    const [open, setOpen] = useState(false);
    const [openPodium, setPodiumOpen] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [acurateAnswer, setAcurateAnswer] = useState('');
    const [students, setStudents] = useState(mockStudents);
    let questionNumber = 0;

    const goTo = useGoTo();

    const handleNavigation = (path) => {
        goTo(path);
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }

    const podiumAnimation = async () => {
        setPodiumOpen(true);
        setStudents(mockStudents);
        await timeout(2000);
        setPodiumOpen(false);
        setOpen(false);
    }

    const getQuestions = () => {
        questionNumber = Math.min(questionNumber, mockQuestions.length - 1);
        
        if(questionNumber >= mockQuestions.length) {
            handleNavigation('/waitingRoom');
            return;
        }

        if(question !== mockQuestions[questionNumber].QuestionText) {
            if(questionNumber !== 0) {
                podiumAnimation();
            }
            setStartTime(Date.now());
            setQuestion(mockQuestions[questionNumber].QuestionText);
            setAcurateAnswer(mockQuestions[questionNumber].CorrectAnswer);
            setQuestionID(mockQuestions[questionNumber].QuestionPIN);
            
            const answers = [
                mockQuestions[questionNumber].CorrectAnswer,
                mockQuestions[questionNumber].IncorrectAnswer1,
                mockQuestions[questionNumber].IncorrectAnswer2,
                mockQuestions[questionNumber].IncorrectAnswer3
            ];
            
            const shuffledAnswers = shuffleArray(answers);
            setAnswer1(shuffledAnswers[0]);
            setAnswer2(shuffledAnswers[1]);
            setAnswer3(shuffledAnswers[2]);
            setAnswer4(shuffledAnswers[3]);
        }
    }

    const handleAnswerClick = (answer) => {
        const endTime = Date.now();
        const timeTaken = (endTime - startTime) / 1000;
        setSelectedAnswer(answer);
        setOpen(true);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            getQuestions();
        }, 1000);
        return () => clearInterval(interval);
    }, [myGlobalGamePin, question, acurateAnswer]);

    return (
        <div className="question">
            <div className='instructions'>
            <h2>Get out your calculator! </h2>
            </div>
            <div className='question'>
                <div className='time'>
                    <div className='circle'><h2>120</h2></div>
                </div>
                <div className='questiondiv'>
                    <div>
                    <h1>{question}</h1>
                    </div>
                </div>
                <div className='answerCountDiv'>
                    <div>
                    <h2 className='answeCountNumber'>0</h2>
                    <h2>Answers</h2>
                    </div>
                </div>
            </div>
            <div className='choices'>
                <button className='red button' onClick={() => handleAnswerClick(answer1)}>
                    <div className='shape'><div className='circle' ></div></div><div>{answer1}</div>
                </button>
                <button className='blue button' onClick={() => handleAnswerClick(answer2)}>
                    <div className='shape'><div className='square' ></div></div><div>{answer2}</div>
                </button>
                <button className='yellow button' onClick={() => handleAnswerClick(answer3)}>
                    <div className='shape'><div className='arrow-up' style={{width: 0, height: 0, borderBottomWidth: '25px'}}></div></div><div>{answer3}</div>
                </button>
                <button className='green button' onClick={() => handleAnswerClick(answer4)}>
                    <div className='shape'><div className='rhombus'></div></div><div>{answer4}</div>
                </button>
            </div>
            <Popup open={open} onClose={() => setOpen(false)}>
                <div className="question-popup-content">
                    <h2>You selected:</h2>
                    <p>{selectedAnswer}</p>
                </div>
            </Popup>

            <Popup open={openPodium} onClose={() => setPodiumOpen(false)}>
                <div className="question-popup-content-podium">
                    <div className='circle'/>
                    <div className='square'/>
                    <div className='scoreBoard'> Scoreboard</div>
                    <div className='users'>
                    {students.sort((a, b) => b.TotalScore - a.TotalScore)
                    .map((student, index) => {
                        return (
                            <LongUserSize 
                            index={student.TotalScore}
                            studentName={student.Name} 
                            studentAvatar={student.Avatar} 
                            score={student.TotalScore}/>
                        )}
                    )}
                    </div>
                </div>
            </Popup>
        </div>
    );
}
 
export default Question;