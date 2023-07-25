import "./App.css";
import { useState } from "react";
import React from "react";

function App() {
  const [displayTime, setDisplayTime] = React.useState(2 * 6);
  const [breakTime, setBreakTime] = React.useState(5 * 6);
  const [sessionTime, setSessionTime] = React.useState(2 * 6);
  const [timerOn, setTimerOn] = React.useState(false);
  const [onBreak, setOnBreak] = React.useState(false);
  const [breakAudio, setBreakAudio] = useState(new Audio("breakTime.mp3"));
  const interval = React.useRef();

  const playBreakAudio = () => {
    breakAudio.currentTime = 0;
    breakAudio.play();
  };

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };

  const changeTime = (amount, type) => {
    if (type == "break") {
      if (breakTime <= 60 && amount < 0) {
        return;
      }
      setBreakTime((prev) => prev + amount);
    } else {
      if (sessionTime <= 60 && amount < 0) {
        return;
      }
      setSessionTime((prev) => prev + amount);
      if (!timerOn) {
        setDisplayTime(sessionTime + amount);
      }
    }
  };
  const controlTime = () => {
    let second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;
    let onBreakVar = onBreak;
    if (!timerOn) {
      interval.current = setInterval(() => {
        date = new Date().getTime();
        if (date > nextDate) {
          setDisplayTime((prev) => {
            if (prev <= 0 && !onBreakVar) {
              //playBreakAudio();
              onBreakVar = true;
              setOnBreak(true);
              nextDate = new Date().getTime() + second;
              return breakTime;
            } else if (prev <= 0 && onBreakVar) {
              //playBreakAudio();
              onBreakVar = false;
              setOnBreak(false);
              nextDate = new Date().getTime() + second;
              return sessionTime;
            }
            return prev - 1;
          });
          nextDate += second;
        }
      }, 30);
    }
    if (timerOn) {
      clearInterval(interval.current);
    }
    setTimerOn(!timerOn);
  };
  const resetTime = () => {
    setDisplayTime(25 * 60);
    setBreakTime(5 * 60);
    setSessionTime(25 * 60);
    setTimerOn(false);
  };
  return (
    <div className="clock">
      <h1>Pomodoro Clock</h1>
      <div className="container">
        <Length
          title={"break length"}
          changeTime={changeTime}
          type={"break"}
          time={breakTime}
          formatTime={formatTime}
        />
        <Length
          title={"session length"}
          changeTime={changeTime}
          type={"session"}
          time={sessionTime}
          formatTime={formatTime}
        />
      </div>
      <h3>{onBreak ? "Break" : "Session"}</h3>
      <h3>{formatTime(displayTime)}</h3>
      <div className="timeButtons">
        <button onClick={controlTime} className="timeButtons">
          {timerOn ? (
            <i className="material-icons">pause</i>
          ) : (
            <i className="material-icons">play_arrow</i>
          )}
        </button>
        <button className="timeButtons">
          <i className="material-icons" onClick={resetTime}>
            autorenew
          </i>
        </button>
      </div>
    </div>
  );
}

function Length({ title, changeTime, type, time, formatTime }) {
  return (
    <div>
      <h3>{title}</h3>
      <div className="time-sets">
        <button
          className="btn-small deep-purple"
          onClick={() => changeTime(-60, type)}
        >
          <i className="material-icons">arrow_downward</i>'
        </button>
        <h3>{formatTime(time)}</h3>
        <button
          className="btn-small deep-purple"
          onClick={() => changeTime(60, type)}
        >
          <i className="material-icons">arrow_upward</i>'
        </button>
      </div>
    </div>
  );
}

export default App;
