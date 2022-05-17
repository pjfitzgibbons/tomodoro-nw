import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {App} from './App';
import reportWebVitals from './reportWebVitals';
import { timerStore } from './stores/Timer';
import 'bootstrap/dist/css/bootstrap.min.css';

function setTimeoutOption() {
  const tomodoroTimeArg = nw.App.argv.find(a => a.match('tomodoroTime'))
  if (tomodoroTimeArg) {
    const [_, timeSecs] = tomodoroTimeArg.split('=')
    const secs = parseInt(timeSecs)
    if (isNaN(secs)) return

    timerStore.setPomodoroInterval(secs)
  }
}
setTimeoutOption()

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
