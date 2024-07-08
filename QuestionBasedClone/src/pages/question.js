import { useContext, useState, useEffect } from 'react';

// import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import '../css/main.css';
import '../css/question.css';
import axios from 'axios';
import { useGoTo, useMyContext } from '../MyContext.js';

function Question() {
    const [question, SetQuestion]  = useState('');
    const [answer1, SetAnswer1]  = useState('');
    const [answer2, SetAnswer2]  = useState('');
    const [answer3, SetAnswer3]  = useState('');
    const [answer4, SetAnswer4]  = useState('');
    const { myGlobalGamePin, setMyGamePin } = useMyContext();       
    let questionNumber = 0;

    const goTo = useGoTo();

    const handleNavigation = (path) => {
        goTo(path);
    };


    const getQuestions = async () => {

        try{
            console.log("get Questions has been called");
            const respon = await axios.post('http://localhost:9999/get-questions', {serverPIN: myGlobalGamePin});
            console.log('Respon data ', respon.data);
            const serverStatus = await axios.post('http://localhost:9999/api/get-server-status', {serverPIN: myGlobalGamePin});
            console.log('server Status Data: ', serverStatus.data);
            questionNumber = serverStatus.data;
            console.log('quesiton number value: ', questionNumber);
            if(questionNumber == 'Offline'){ 
                handleNavigation('/waitingRoom');
            }

            SetQuestion(respon.data[questionNumber].QuestionText);
            SetAnswer1(respon.data[questionNumber].CorrectAnswer);
            SetAnswer2(respon.data[questionNumber].IncorrectAnswer1);
            SetAnswer3(respon.data[questionNumber].IncorrectAnswer2);
            SetAnswer4(respon.data[questionNumber].IncorrectAnswer3);
        } catch(e){
            console.log("Erorring: ", e);
        }
    }
    //calling a function every second 
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
        setTime(new Date());
        getQuestions();
    }, 1000);
        return () => clearInterval(interval);
    }, []);


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
                <button className='red button'><div className='shape'><div className='circle' ></div></div><div>{answer1}</div></button>
                <button className='blue button'><div className='shape'><div className='square' ></div></div><div>{answer2}</div></button>
                <button className='yellow button'><div className='shape'><div className='arrow-up' style={{width: 0, height: 0, borderBottomWidth: '25px'}}></div></div><div>{answer3}</div></button>
                <button className='green button'><div className='shape'><div className='rhombus'></div></div><div>{answer4}</div></button>
            </div>
        </div>
    );
}
 
export default Question;