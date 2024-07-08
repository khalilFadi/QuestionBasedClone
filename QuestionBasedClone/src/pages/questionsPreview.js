import { useState, useEffect} from 'react';

// import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import '../css/dashboard.css';
import closeButton from '../images/XWhitebackgroundPurpleCenter.png';
import Popup from 'reactjs-popup';

import questionsPreview from '../css/questionPreview.css';
import QuestionsEditPanel from '../components/questionEdit.js';
import { useGoTo, useMyContext } from '../MyContext.js';
import axios from 'axios';
function QuestionsPreview() {
    const { myGlobalGamePin, setMyGamePin } = useMyContext();       
    const [questions, SetQuestions] = useState([]);

    const [questionText, setQuestionText] = useState('');
    const [answer1, SetAnswer1] = useState('');
    const [answer2, SetAnswer2] = useState('');
    const [answer3, SetAnswer3] = useState('');
    const [answer4, SetAnswer4] = useState('');
    const creatingQuestion = async () => {
        const response = await axios.post('http://localhost:9999/add-question', {questionText2: questionText, ServerPIN: myGlobalGamePin, correctChoice: answer1, choice2: answer2, choice3: answer3, choice4: answer4});
        console.log("added Question", response.data);
        findQuestions(); 
    }

    const findQuestions = async () => {  
        const questionsResp = await axios.post('http://localhost:9999/get-questions', {serverPIN: myGlobalGamePin});
        SetQuestions(questionsResp.data);
        
    }
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
                    averageScore={question.averageScore}/>
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
            </div>
        </div>
    );
}
 
export default QuestionsPreview;