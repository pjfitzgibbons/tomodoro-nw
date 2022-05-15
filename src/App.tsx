import logo from './assets/Tomatotorrent-256.png';
import './App.css';
import { useState } from 'react';
import { timerStore } from './stores/Timer';
import { Task, taskStore } from './stores/TaskStore';
import { taskTimerStore } from './stores/TaskTimer';
import { DateTime } from 'luxon';
import map from 'lodash/map'
import sortBy from 'lodash/sortBy'
import { reverse } from 'lodash';

import { useObservable } from 'react-rx';

export const App = () => {

  const timer = useObservable(timerStore.timeRemaining, 0)

  const [taskName, updateTaskName] = useState('InitialTask')

  const tasks = useObservable(taskStore.tasks, [])
  taskStore.tasks.subscribe(console.log)

  const sortedTasks = reverse(sortBy(tasks, ['id']))

  const currentTask = (): Task | null => {
    
    const result = sortedTasks[0]
    console.log("current task", result)
    return result
  }

  const displayTime = () => DateTime.fromMillis(timer)
    .toFormat('mm:ss.u')


  function taskLabelDisplay(): string {
    return timer! > 0 ? 'display' : 'hide'
  }

  function taskInputDisplay(): string {
    return timer! > 0 ? 'hide' : 'display'
  }

  const start = () => {
    taskTimerStore.startNewTimer(taskName)
  }

  function endDateDisplay(task: Task) {
    return task.endDate?.toISOTime() || "Current"
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
