// import logo from './logo.svg';
import { useEffect, useState } from 'react';
// import './App.css';
// Component
import Table from './Component/Table';
import Timer from './Component/Timer';
import ButtonTime from './Component/ButtonTime';
// Icons
import { Play, Pause, CloudDownload, Trash3 } from 'react-bootstrap-icons'

// Lib to Save file
import FileSaver from 'file-saver';

function App() {
  // State Pomodoro
  const [start, setStart] = useState(false);
  // state Button
  const [disabledButton, setDisabledButton] = useState(false);
  // Pomodoro Timer
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  // Log Information
  const [duration, setDuration] = useState(0);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [notes, setNotes] = useState("");
  const [startTime, setStartTime] = useState("");
  const [logPomodoro, setLogPomodoro] = useState();

  const addTime = () => {
    if (!start) {
      setMinutes(minutes + 1);
    }
  }
  const minusTime = () => {
    if (!disabledButton && !start) {
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
  const deleteLog = () => {
    localStorage.removeItem('logPomodoro');
    setLogPomodoro();
  }
  const downloadLog = () => {
    let log = localStorage.getItem('logPomodoro');
    let objekLog = JSON.parse(log);
    // console.log(objekLog[0]);
    let tempLog = [];
    for (let i = 0; i < objekLog.length; i++) {
      let baris = [];
      for (let j = 0; j < objekLog[i].length; j++) {
        baris.push(objekLog[i][j])
        if (j === 2) {
          baris.push("\n");
        }
      }
      tempLog.push(baris);
    }
    console.log(tempLog)
    let blob = new Blob(tempLog, {
      type: "text/plain;charset=utf-8"
    });
    FileSaver.saveAs(blob, "Log Pomodoro App.txt");
  }
  const getStartTimePomodoro = (date) => {
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
    return breakTime;
  }
  const saveLog = (startTime, focusTime, duration, notes) => {
    let logBefore = localStorage.getItem('logPomodoro');
    let minuteTime = Math.floor(focusTime / 60);
    let secondsTime = focusTime % 60;
    let log = [
      startTime,
      `${clock(minuteTime)} : ${clock(secondsTime)} / ${duration} : 00`,
      notes,
    ]
    if (logBefore) {
      let logTemp = JSON.parse(logBefore);
      logTemp.push(log);
      localStorage.setItem('logPomodoro', JSON.stringify(logTemp));
      setLogPomodoro(logTemp);
    }
    else {
      localStorage.setItem('logPomodoro', JSON.stringify([log]));
      setLogPomodoro([log])
    }

    setStartTime("");
    setDurationSeconds(0);
    setDuration(minutes);
    setNotes("");
  }
  const buttonTimer = () => {
    if (start) {
      setStart(false)
      setMinutes(25)
      setSeconds(0)
      setNotes("")
      saveLog(startTime, durationSeconds, duration, notes);
    } else {
      if (!disabledButton) {
        setStart(true);
        setStartTime(getStartTimePomodoro(new Date()));
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
        setDurationSeconds(durationSeconds + 1)
      }, 1000)
      return () => clearInterval(interval);
    }
  }, [seconds, minutes, start, durationSeconds])
  useEffect(() => {
    if (minutes === 0) {
      return setDisabledButton(true);
    }
    return setDisabledButton(false);
  }, [minutes])
  useEffect(() => {
    let logBefore = localStorage.getItem('logPomodoro');
    if (logBefore) {
      let objekLog = JSON.parse(logBefore);
      setLogPomodoro(objekLog)
    }
  }, [])
  return (
    <div className="App">
      <div className="container">
        <div className="row mt-5">
          <div className="col-sm-12 col-md-12 col-lg-5 mb-5">
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
            <div className='text-center mb-5'>
              <label className='pe-2'>
                Notes
              </label>
              <input value={notes} onChange={(e) => onChangeNotes(e.target.value)} type="text" />
            </div>
            <div className="d-flex justify-content-center">
              <ButtonTime addTime={addTime} tanda="+" />
              <ButtonTime disabled={disabledButton} minusTime={minusTime} tanda="-" />
              <button onClick={() => buttonTimer()} disabled={disabledButton} className="p-0 d-flex justify-content-center align-self-center" style={{ border: "2px solid rgb(224 241 155)", borderRadius: "40px", backgroundColor: "rgb(224 241 155)", boxShadow: "0px 2px 4px 1px rgba(74,74,74,0.3)" }}>
                <div style={{ padding: "4px 40px", }}>
                  {
                    start ? <Pause size={40} /> : <Play size={40} />
                  }
                </div>
              </button>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-7">
            {/* <h1>Test</h1> */}
            <div className='d-flex justify-content-end'>
              <button onClick={() => downloadLog()} className="me-3 p-0 d-flex justify-content-center align-self-center" style={{ border: "2px solid rgb(224 241 155)", borderRadius: "40px", backgroundColor: "rgb(224 241 155)", boxShadow: "0px 2px 4px 1px rgba(74,74,74,0.3)" }}>
                <div className='px-3 py-1'>
                  <CloudDownload /> Download Log
                </div>
              </button>
              <button onClick={() => deleteLog()} className="p-0 d-flex justify-content-center align-self-center" style={{ border: "2px solid rgb(224 241 155)", borderRadius: "40px", backgroundColor: "rgb(224 241 155)", boxShadow: "0px 2px 4px 1px rgba(74,74,74,0.3)" }}>
                <div className='px-3 py-1'>
                  <Trash3 /> Delete Log
                </div>
              </button>
            </div>
            <Table
              durationSeconds={durationSeconds}
              logPomodoro={logPomodoro}
              clock={clock}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
