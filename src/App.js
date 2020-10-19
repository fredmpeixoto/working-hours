import React from 'react';
import logo from './logo.svg';
import './App.scss';
import ManagerHours from "./manager-hours/manager-hours";
import TimeClock from "./time-clock/time-clock";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TimeClock />
        <ManagerHours />
      </header>
    </div>
  );
}


export default App;
