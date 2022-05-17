import logo from './assets/Tomatotorrent-256.png';
import './App.css';
import { useState } from 'react';
import { timerStore } from './stores/Timer';
import { taskStore } from './stores/TaskStore';
import { taskTimerStore } from './stores/TaskTimer';
import map from 'lodash/map'
import sortBy from 'lodash/sortBy'
import { reverse } from 'lodash';

import { useObservable } from 'react-rx';
import { Task } from './database/entities/Task';

export const App = () => {

  const timer = useObservable(timerStore.timeRemaining, 0)

  const [taskName, updateTaskName] = useState('InitialTask')

  const tasks = useObservable(taskStore.tasks, [])

  const sortedTasks = reverse(sortBy(tasks, ['id']))

  const currentTask = (): Task | null => {
    const result = sortedTasks[0]
    return result
  }

  const displayTime = () => countdownFormatter.format(new Date(timer))

  function taskLabelDisplay(): string {
    return timer! > 0 ? 'display' : 'hide'
  }

  function taskInputDisplay(): string {
    return timer! > 0 ? 'hide' : 'display'
  }

  const start = () => {
    taskTimerStore.startNewTimer(taskName)
  }

  const dateFormatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'short', timeStyle: 'medium' });
  const countdownFormatter = new Intl.DateTimeFormat('en-US', { minute:"2-digit", second:"2-digit", fractionalSecondDigits:3 });

  function endDateDisplay(task: Task) {
    return dateFormatter.format(task.endDate!) || "Current"
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Tomodoro! The Task-based Productivity Timer
        </p>
      </header>
      <div className="controls">
        <button id="start" onClick={start}>Start</button>
        <button id="pause" onClick={timerStore.togglePause}>Pause</button>
        <button id="cancel">Cancel</button>
      </div>
      <div className="timer">
        <span>{`Time Left ${displayTime()}`}</span>
      </div>
      <div className={taskLabelDisplay()} >
        Task : <span>{currentTask()?.name}</span>
      </div>
      <div className={taskInputDisplay()} >
        <input value={taskName} onChange={e => updateTaskName(e.target.value)}></input>
      </div>
      <div>
        <ul>
          {map(sortedTasks, function (task: Task) {
            console.log("render task", task)
            return (<div key={task.id}>
              <span>{task.id}</span><span>{task.name}</span><span>{endDateDisplay(task)}</span>
            </div>)
          }
          )}
        </ul>
      </div>
    </div>
  )
}


export default App;
