// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import Table from './Component/Table';
import Timer from './Component/Timer';
import ButtonTime from './Component/ButtonTime';
import { Play } from 'react-bootstrap-icons'
function App() {
  const [start, setStart] = useState(false);
  let [minutes, setMinutes] = useState(1);
  let [seconds, setSeconds] = useState(3);
  const [history, setHistory] = useState([
    { start: "10:0", duration: "10:0", notes: "notes" },
    { start: "10:0", duration: "10:0", notes: "notes" },
    { start: "10:0", duration: "10:0", notes: "notes" },
    { start: "10:0", duration: "10:0", notes: "notes" },
  ]);
  const addTime = () => {
    setMinutes(minutes + 1);
  }
  const minusTime = () => {
    setMinutes(minutes - 1);
  }
  const buttonTimer = () => {
    if (start) {
      setStart(false)
    } else {
      setStart(true);
    }
  }
  useEffect(() => {
    if (start) {
      if (seconds < 0) {
        if (minutes === 0) {
          setStart(false);
          return
          // console.log("test")
        }
        setMinutes(minutes - 1)
        setSeconds(59);
      }
      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1)
        }
      }, 1000)
      return () => clearInterval(interval);
    }
    return
  }, [seconds, minutes, start])
  // console.log(history);
  localStorage.setItem('key', JSON.stringify(history));
  return (
    <div className="App">
      <div className="container">
        <div className="row mt-5">
          <div className="col-6 ">
            <div className="d-flex justify-content-center mb-4">
              <Timer
                circle1="180px"
                circle2="230px"
                circle3="270px"
                minutes={minutes}
                seconds={seconds}
              />
            </div>
            <div className="d-flex justify-content-center">
              <ButtonTime addTime={addTime} tanda="+" />
              <ButtonTime minusTime={minusTime} tanda="-" />
              <div className="p-0 d-flex justify-content-center align-self-center" style={{ border: "2px solid rgb(224 241 155)", borderRadius: "40px", backgroundColor: "rgb(224 241 155)", boxShadow: "0px 2px 4px 1px rgba(74,74,74,0.3)" }}>
                <div style={{ padding: "4px 40px", }}>
                  <Play onClick={() => buttonTimer()} size={40} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            {/* <h1>Test</h1> */}
            <Table history={history} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
