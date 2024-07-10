import { useContext, useState, useEffect } from 'react';

// import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import '../css/main.css';
import '../css/question.css';
import axios from 'axios';
import { useGoTo, useMyContext } from '../MyContext.js';
import Popup from 'reactjs-popup';

function Question() {
    const [question, setQuestion]  = useState('');
    const [questionID, setQuestionID]  = useState(0);
    const [answer1, setAnswer1]  = useState('');
    const [answer2, setAnswer2]  = useState('');
    const [answer3, setAnswer3]  = useState('');
    const [answer4, setAnswer4]  = useState('');
    const { myGlobalGamePin, setMyGamePin, studentPIN } = useMyContext();       
    const [open, setOpen] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [acurateAnswer, setAcurateAnswer] = useState('');
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

    const getQuestions = async () => {

        try{
            const respon = await axios.post('http://localhost:9999/get-questions', {serverPIN: myGlobalGamePin});
            const serverStatus = await axios.post('http://localhost:9999/api/get-server-status', {serverPIN: myGlobalGamePin});
            questionNumber = serverStatus.data;
            if(questionNumber == 'Offline'){ 
                handleNavigation('/waitingRoom');
            }

            console.log("question: ", question, " respndata: ", respon.data[questionNumber].QuestionText);
            if(question != respon.data[questionNumber].QuestionText){
                console.log("Inside the if: question: ", question, " respndata: ", respon.data[questionNumber].QuestionText);
                setQuestion(respon.data[questionNumber].QuestionText);
                setAcurateAnswer(respon.data[questionNumber].CorrectAnswer);
                setQuestionID(respon.data[questionNumber].QuestionPIN);
                const answers = [
                    respon.data[questionNumber].CorrectAnswer,
                    respon.data[questionNumber].IncorrectAnswer1,
                    respon.data[questionNumber].IncorrectAnswer2,
                    respon.data[questionNumber].IncorrectAnswer3
                ];
               // Shuffle the array
               const shuffledAnswers = shuffleArray(answers);

               // Set the shuffled answers to state
               setAnswer1(shuffledAnswers[0]);
               setAnswer2(shuffledAnswers[1]);
               setAnswer3(shuffledAnswers[2]);
               setAnswer4(shuffledAnswers[3]);

                setOpen(false);
            }
        } catch(e){
            console.log("Erorring: ", e);
        }
    }
    const handleStudentScore = async (mark) => {
        try{
            const respon = await axios.post('http://localhost:9999/api/add-question-to-student', {studentID: studentPIN, questionID: questionID, mark: mark});
            const updateScore = await axios.post('http://localhost:9999/api/update-score-for-student', {studentID: studentPIN});

            console.log("Student score: ", respon.data);
        }catch (e){
            console.log("Error: ", e);
        }
    }
    const handleAnswerClick = (answer) => {
        setSelectedAnswer(answer);
        if(answer == acurateAnswer){
            console.log("Correct!!");
            handleStudentScore(1);
        }else{
            console.log("Inorrect :< ");
            handleStudentScore(0);
        }
        setOpen(true);
    }
    //calling a function every second 

    useEffect(() => {
        const interval = setInterval(() => {
            getQuestions();
        }, 1000);

        return () => clearInterval(interval);
    }, [myGlobalGamePin, question, acurateAnswer]);
    //popup screen that shows up when you answer a question and gets hidden when the question changes 

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
        </div>
    );
}
 
export default Question;