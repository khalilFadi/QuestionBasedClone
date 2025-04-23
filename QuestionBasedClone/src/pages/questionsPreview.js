import { useState, useEffect} from 'react';

// import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import '../css/dashboard.css';
import closeButton from '../images/XWhitebackgroundPurpleCenter.png';
import Popup from 'reactjs-popup';

import questionsPreview from '../css/questionPreview.css';
import QuestionsEditPanel from '../components/questionEdit.js';
import { useGoTo, useMyContext } from '../MyContext.js';

// Mock questions data
const mockQuestions = [
    {
        QuestionPIN: "1",
        QuestionText: "Should you share your password with friends?",
        CorrectAnswer: "No, never",
        IncorrectAnswer1: "Yes, if they're close friends",
        IncorrectAnswer2: "Yes, if they ask nicely",
        IncorrectAnswer3: "Yes, if they promise not to tell",
        averageScore: 85
    },
    {
        QuestionPIN: "2",
        QuestionText: "What should you do if someone asks for your personal information online?",
        CorrectAnswer: "Don't share and tell a trusted adult",
        IncorrectAnswer1: "Share if they seem nice",
        IncorrectAnswer2: "Share if they're your age",
        IncorrectAnswer3: "Share if they promise to keep it secret",
        averageScore: 75
    },
    {
        QuestionPIN: "3",
        QuestionText: "Is it safe to meet someone you only know online?",
        CorrectAnswer: "No, it's not safe",
        IncorrectAnswer1: "Yes, if they seem nice",
        IncorrectAnswer2: "Yes, if they're your age",
        IncorrectAnswer3: "Yes, if they're from your area",
        averageScore: 90
    },
    {
        QuestionPIN: "4",
        QuestionText: "What should you do if you see cyberbullying?",
        CorrectAnswer: "Report it and tell a trusted adult",
        IncorrectAnswer1: "Ignore it",
        IncorrectAnswer2: "Join in to fit in",
        IncorrectAnswer3: "Keep it to yourself",
        averageScore: 80
    }
];

function QuestionsPreview() {
    const { myGlobalGamePin, setMyGamePin } = useMyContext();       
    const [questions, SetQuestions] = useState(mockQuestions);
    const [questionText, setQuestionText] = useState('');
    const [answer1, SetAnswer1] = useState('');
    const [answer2, SetAnswer2] = useState('');
    const [answer3, SetAnswer3] = useState('');
    const [answer4, SetAnswer4] = useState('');
    const [openQuestionInfo, setOpenQuestionInfo] = useState(false);
    const [questionToEdit, setQuestionToEdit] = useState(null);

    const creatingQuestion = () => {
        const newQuestion = {
            QuestionPIN: (questions.length + 1).toString(),
            QuestionText: questionText,
            CorrectAnswer: answer1,
            IncorrectAnswer1: answer2,
            IncorrectAnswer2: answer3,
            IncorrectAnswer3: answer4,
            averageScore: 0
        };
        SetQuestions([...questions, newQuestion]);
        setQuestionText('');
        SetAnswer1('');
        SetAnswer2('');
        SetAnswer3('');
        SetAnswer4('');
    }

    const findQuestions = () => {  
        SetQuestions(mockQuestions);   
    }
    
    const preUpdatingQuestion = (question) => {
        setOpenQuestionInfo(true);
        setQuestionToEdit(question);
        setQuestionText(question.QuestionText);
        SetAnswer1(question.CorrectAnswer);
        SetAnswer2(question.IncorrectAnswer1);
        SetAnswer3(question.IncorrectAnswer2);
        SetAnswer4(question.IncorrectAnswer3);
    }

    const updatingQuestion = () => {
        const updatedQuestions = questions.map(q => {
            if (q.QuestionPIN === questionToEdit.QuestionPIN) {
                return {
                    ...q,
                    QuestionText: questionText,
                    CorrectAnswer: answer1,
                    IncorrectAnswer1: answer2,
                    IncorrectAnswer2: answer3,
                    IncorrectAnswer3: answer4
                };
            }
            return q;
        });
        SetQuestions(updatedQuestions);
        setOpenQuestionInfo(false);
    };

    useEffect(() => {
        findQuestions();
    }, []);

    return (
        <div className="questionsPreview">
            <h1> Questions</h1>
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
            { questions.map((question, index) => {
                return (
                <QuestionsEditPanel 
                    quesitonNumber={index + 1} 
                    questionText={question.QuestionText}
                    averageScore={question.averageScore}
                    onClick={() => {preUpdatingQuestion(question)}}/>
                );
            })}
            
            <Popup trigger=
                {<button className='createNewQuestion'>
                    <h1>Create a new question</h1>
                </button>} 
                modal nested>
                {
                    close => (
                        <div className='CreatingQuestionBody'>

<div>
                                    <label className='label'>Question:</label>
                                    <input className='input' type='text' value={questionText} onChange={(e) => setQuestionText(e.target.value)} />
                                    <label className='label'>Right Answer</label>
                                    <input className='input' type='text' value={answer1} onChange={(e) => SetAnswer1(e.target.value)} />
                                    <label className='label'>Option 2</label>
                                    <input className='input' type='text' value={answer2} onChange={(e) => SetAnswer2(e.target.value)} />
                                    <label className='label'>Option 3</label>
                                    <input className='input' type='text' value={answer3} onChange={(e) => SetAnswer3(e.target.value)} />
                                    <label className='label'>Option 4</label>
                                    <input className='input' type='text' value={answer4} onChange={(e) => SetAnswer4(e.target.value)} />
                                    <button className='creatingQuestinButton' onClick={() => { close(); creatingQuestion(); }}>
                                        Add Question
                                    </button>
                                </div>
                        </div>
                    )
                }
            </Popup>
            <Popup open={openQuestionInfo} onClose={() => setOpenQuestionInfo(false)}>
                <div className='CreatingQuestionBody'>

                    <div>
                        <label className='label'>Question:</label>
                        <input className='input'  type='text' value={questionText} onChange={(e) => setQuestionText(e.target.value)} />
                        <label className='label'>Right Answer</label>
                        <input className='input' type='text' value={answer1} onChange={(e) => SetAnswer1(e.target.value)} />
                        <label className='label'>Option 2</label>
                        <input className='input' type='text' value={answer2} onChange={(e) => SetAnswer2(e.target.value)} />
                        <label className='label'>Option 3</label>
                        <input className='input' type='text' value={answer3} onChange={(e) => SetAnswer3(e.target.value)} />
                        <label className='label'>Option 4</label>
                        <input className='input' type='text' value={answer4} onChange={(e) => SetAnswer4(e.target.value)} />
                        <button className='creatingQuestinButton' onClick={() => { updatingQuestion() }}>
                            Update Question
                        </button>
                    </div>
                </div>
            </Popup>
            </div>
        </div>
    );
}
 
export default QuestionsPreview;