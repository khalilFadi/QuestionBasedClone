import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Question from './pages/question';
import WaitingRoom from './pages/waitingRoom';
import { useMyContext } from './MyContext.js';
import { MyProvider } from './MyContext'; // Adjust the path as needed
import CreateServer from './pages/createServer.js';
import Dashboard from './pages/dashboard.js';
import QuestionsPreview from './pages/questionsPreview.js';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <MyProvider>
  <React.StrictMode>
    <Router>
          <Routes>
          <Route path="/" element={<App/>} />
          <Route path="/waitingRoom" element={<WaitingRoom/>} />
          <Route path="/question" element={<Question />} />
          <Route path="/createServer" element={<CreateServer/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/questionsPreview' element={<QuestionsPreview/>}/>
          </Routes>
    </Router>

  </React.StrictMode>
  </MyProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
