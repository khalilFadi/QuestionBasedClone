import { useState } from 'react';

// import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import '../css/waitingRoom.css';
import '../css/main.css';
import { useMyContext } from '../MyContext.js';


function WaitingRoom() {
    const { myGlobalGamePin, setMyGamePin } = useMyContext();

    return (
        <div className="WaitingRoom">
            <div className='header'>
            <div className='joinKahoottextHeader'>
                <div style={{width:'40%', alignItems: 'center'}}> 
                    <h2>Join with the link QuestionKahoot.com</h2>
                </div>
                <div className='triangleRight'> </div>
                <div style={{width:'60%', alignItems: 'center'}}>

                <p>PIN: {myGlobalGamePin}</p>
                </div>
            </div>
            </div>
            <div className='body'>
            <div className="circle"></div>
            <div className="square"></div>
                <h1> Kahoot !</h1>
                <div className='playerNumber'>0</div>
                <div className='findingPlayers'>
                    <h2>Waiting for players...</h2>
                </div>
                <div className='startButton'>Start</div>
                
            
            </div>

            
        </div>
    );
}
 
export default WaitingRoom;