import { useEffect, useState } from 'react';
import './css/home.css';
// import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import axios from 'axios';

import {useNavigate} from 'react-router-dom';


import Question from './pages/question';
function App() {

    // const navigate = useNavigate()
    const navigate = useNavigate();
    const WaitingRoom = () => {
      // Now you can navigate programmatically to other pages using navigate
      const GamePin = '1234';
      navigate('/waitingRoom');
    };

    const [gamePin, setGamePin] = useState('');

    //Checking if a server Pin exists 
    const lookForElement = async (e) => {
      e.preventDefault();

      try {
        const response = await axios.post('http://localhost:9999/api/check-server', { gamePin });
        if (response.data.exists) {
          alert(`Server with Game PIN ${gamePin} exists!`);
          WaitingRoom();
        } else {
          alert(`Server with Game PIN ${gamePin} does not exist.`);
        }
      } catch (error) {
        console.error('Error checking server:', error);
        alert('Failed to check server. Please try again.');
      }
    };

    //Creating a new server Pin 
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
              {/* <button className="EnterButton" type="submit" onClick={handleOnSubmit}>Enter</button> */}
              <button className="EnterButton" type="submit" onClick={lookForElement}>Look</button>
              
            </form>
          </div>
          <div className="circle"></div>
          <div className="square"></div>
        </div>
    );
}
 
export default App;