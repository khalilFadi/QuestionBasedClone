import { useState } from 'react';

// import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import '../css/dashboard.css';
import closeButton from '../images/XWhitebackgroundPurpleCenter.png';
import Popup from 'reactjs-popup';

import questionsPreview from '../css/questionPreview.css';
import QuestionsEditPanel from '../components/questionEdit.js';
function creatingQuestion(){

}
function QuestionsPreview() {
    
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
                    <p>Pin: 5432</p>
                </div>
            </div>
            <div className='body'>
            <QuestionsEditPanel quesitonNumber={1} questionText='the actual text of the question' averageScore={'40'}/>
            <QuestionsEditPanel quesitonNumber={2} questionText='the actual text of the question' averageScore={'100'}/>
            <QuestionsEditPanel quesitonNumber={3} questionText='the actual text of the question' averageScore={'60'}/>
            <QuestionsEditPanel quesitonNumber={4} questionText='the actual text of the question' averageScore={'25'}/>
            
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
                                <input className='input' type='text' />
                                <label className='label'>Right Answer</label>
                                <input className='input' type='text' />
                                <label className='label'>Option 2</label>
                                <input className='input' type='text' />
                                <label className='label'>Option 3</label>
                                <input className='input' type='text' /> <label className='label'>Option 4</label>
                                <input className='input' type='text' />
                                <button className='creatingQuestinButton' onClick=
                                    {() => {close(); creatingQuestion()}}>
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