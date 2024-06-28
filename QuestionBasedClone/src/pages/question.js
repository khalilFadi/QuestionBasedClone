import { useState } from 'react';

// import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import '../css/main.css';
import '../css/question.css';

function Question() {
    
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
                    <h1>some question bluh bluh</h1>
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
                <button className='red button'><div className='shape'><div className='circle' ></div></div><div>First choice in red</div></button>
                <button className='blue button'><div className='shape'><div className='square' ></div></div><div>First choice in red</div></button>
                <button className='yellow button'><div className='shape'><div className='arrow-up' style={{width: 0, height: 0, borderBottomWidth: '25px'}}></div></div><div>First choice in red</div></button>
                <button className='green button'><div className='shape'><div className='rhombus'></div></div><div>First choice in red</div></button>
            </div>
        </div>
    );
}
 
export default Question;