import { useState } from 'react';
import './css/home.css';
// import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import {useNavigate} from 'react-router-dom';


import Question from './pages/question';
function App() {
    const [gamePin, setGamePin] = useState("");
    // const navigate = useNavigate()
    const navigate = useNavigate();
    const WaitingRoom = () => {
      // Now you can navigate programmatically to other pages using navigate
      navigate('/waitingRoom');
    };
    const handleOnSubmit = async (e) => {

        e.preventDefault();
        
        let result = await fetch(
        'http://localhost:9999/register', {
            method: "post",
            body: JSON.stringify({ gamePin }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.warn(result);
        if (result) {
            alert("Data saved succesfully");
            setGamePin("");
        }
        WaitingRoom();
    }
    return (
        <div className="App">
            <h1 className="title" id="title">Kahoot?</h1>
          <div className="box">
            <form action="">
              <div>
                <input value={gamePin} onChange={(e)=>setGamePin(e.target.value)} type="text" className="Entrybox" id="PIN" placeholder="GamePIN"/>
              </div>
              <br/>
              <button className="EnterButton" type="submit" onClick={handleOnSubmit}>Enter</button>
            </form>
          </div>
          <div className="circle"></div>
          <div className="square"></div>
        </div>
    );
}
 
export default App;