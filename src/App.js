// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import Table from './Component/Table';
import Timer from './Component/Timer';
import ButtonTime from './Component/ButtonTime';
import { Play, Pause } from 'react-bootstrap-icons'
function App() {
  const [start, setStart] = useState(false);
  let [minutes, setMinutes] = useState(25);
  let [seconds, setSeconds] = useState(0);
  let [duration, setDuration] = useState(0);
  let [durationTime, setDurationTime] = useState(0);
  let [notes, setNotes] = useState("");
  const [disabledButton, setDisabledButton] = useState(false);
  const [history, setHistory] = useState([]);
  localStorage.setItem('key', JSON.stringify(history));
  const addTime = () => {
    setMinutes(minutes + 1);
  }
  const minusTime = () => {
    if (!disabledButton) {
      setMinutes(minutes - 1);
    }
  }
  const clock = (number) => {
    if (number < 10) {
      return "0" + parseInt(number);
    }
    return number;
  }
  const onChangeNotes = (value) => {
    setNotes(value)
  }
  const getDateDay = (date) => {
    let day = date.getDay();
    let month = date.getMonth() + 1;
    let time = date.toLocaleTimeString();
    let tanggal = date.getDate();
    let today;
    switch (day) {
      case 0:
        today = "Senin";
        break;
      case 1:
        today = "Selasa";
        break;
      case 2:
        today = "Rabu";
        break;
      case 3:
        today = "Kamis";
        break;
      case 4:
        today = "Jumat";
        break;
      case 5:
        today = "Sabtu";
        break;
      case 6:
        today = "Minggu";
        break;
      default:
        today = "Missing Day"
        break;
    }
    let thisMonth
    switch (month) {
      case 1:
        thisMonth = "Januari"
        break;
      case 10:
        thisMonth = "Oktober"
        break;
      default:
        break;
    }
    let breakTime = `${time}, ${thisMonth} ${tanggal}, ${today}`;
    history.push({
      start: breakTime,
      duration: `${clock(minutes)}:${clock(seconds)}`,
      notes: notes,
    });
  }

  const buttonTimer = () => {
    if (start) {
      setStart(false)
      setMinutes(25)
      setSeconds(0)
      setNotes("")
    } else {
      if (!disabledButton) {
        setStart(true);
        getDateDay(new Date());
        setDuration(minutes);
      }
    }
  }
  useEffect(() => {
    if (start) {
      if (seconds === 0 && minutes === 0) {
        return setStart(false);
      }
      if (seconds < 0) {
        setMinutes(minutes - 1)
        setSeconds(59);
      }
      const interval = setInterval(() => {
        setSeconds(seconds - 1);
        setDurationTime(durationTime + 1)
      }, 1000)
      return () => clearInterval(interval);
    }
  }, [seconds, minutes, start, durationTime])
  useEffect(() => {
    if (minutes === 0) {
      return setDisabledButton(true);
    }
    return setDisabledButton(false);
  }, [minutes])
  return (
    <div className="App">
      <div className="container">
        <div className="row mt-5">
          <div className="col-5 ">
            <div className="d-flex justify-content-center mb-4">
              <Timer
                circle1="180px"
                circle2="230px"
                circle3="270px"
                minutes={minutes}
                seconds={seconds}
                clock={clock}
              />
            </div>
            <div className='mb-5'>
              <label className='pe-2'>
                Notes
              </label>
              <input value={notes} onChange={(e) => onChangeNotes(e.target.value)} type="text" />
            </div>
            <div className="d-flex justify-content-center">
              <ButtonTime addTime={addTime} tanda="+" />
              <ButtonTime disabled={disabledButton} minusTime={minusTime} tanda="-" />
              <button disabled={disabledButton} className="p-0 d-flex justify-content-center align-self-center" style={{ border: "2px solid rgb(224 241 155)", borderRadius: "40px", backgroundColor: "rgb(224 241 155)", boxShadow: "0px 2px 4px 1px rgba(74,74,74,0.3)" }}>
                <div style={{ padding: "4px 40px", }}>
                  <div onClick={() => buttonTimer()}>
                    {
                      start ? <Pause size={40} /> : <Play size={40} />
                    }
                  </div>
                </div>
              </button>
            </div>
          </div>
          <div className="col-7">
            {/* <h1>Test</h1> */}
            <button>
              Download Log
            </button>
            <button>
              Delete Log
            </button>
            <Table
              durationTime={durationTime}
              history={history}
              clock={clock}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
