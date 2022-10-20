// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import Table from './Component/Table';
import Timer from './Component/Timer';
import ButtonTime from './Component/ButtonTime';
import { Play } from 'react-bootstrap-icons'
function App() {
  const [time, setTime] = useState(10);
  const [history, setHistory] = useState([
    { start: "10:0", duration: "10:0", notes: "notes" },
    { start: "10:0", duration: "10:0", notes: "notes" },
    { start: "10:0", duration: "10:0", notes: "notes" },
    { start: "10:0", duration: "10:0", notes: "notes" },
  ]);
  const addTime = () => {
    setTime(time + 1);
  }
  const minusTime = () => {
    setTime(time - 1);
  }
  console.log(history);
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
                time={time}
              />
            </div>
            <div className="d-flex justify-content-center">
              <ButtonTime addTime={addTime} tanda="+" />
              <ButtonTime minusTime={minusTime} tanda="-" />
              <div className="p-0 d-flex justify-content-center align-self-center" style={{ border: "2px solid rgb(224 241 155)", borderRadius: "40px", backgroundColor: "rgb(224 241 155)", boxShadow: "0px 2px 4px 1px rgba(74,74,74,0.3)" }}>
                <div style={{ padding: "4px 40px", }}>
                  <Play size={40} />
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
