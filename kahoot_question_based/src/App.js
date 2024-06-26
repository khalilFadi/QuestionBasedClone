import { useState } from 'react'
import './css/home.css';
function App() {
    const [gamePin, setGamePin] = useState("");
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
    }
    return (
        <>
            {/* <h1>This is React WebApp </h1>
            <form action="">
                <input type="text" placeholder="name"
                value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="email"
                value={email} onChange={(e) => setEmail(e.target.value)} />
                <button type="submit"
                onClick={handleOnSubmit}>submit</button>
            </form> */}
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
        </>
    );
}
 
export default App;