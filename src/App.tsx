import logo from './assets/Tomatotorrent-256.png';
import './App.css';
import { useEffect, useState } from 'react';
import { timerStore } from './stores/Timer';
import { Task, taskStore } from './stores/Task';
import { observer } from 'mobx-react-lite';
import { DateTime } from 'luxon';
import { startMessenger, tickMessenger } from './stores/bus';
import { cleanup } from '@testing-library/react';
import { spy } from 'mobx'
spy(event => {
  if (event.type === "action") {
      console.log(`${event.name} with args: ${event.arguments}`)
  }
})

export const App = observer(() => {

  const [taskName, updateTaskName] = useState('')
  const [taskId, updateTaskId] = useState(0)

  useEffect(() => {
    
  })
  const displayTime = () => {
    return DateTime.fromMillis(timerStore.timeSeconds * 1000).toFormat('mm:ss');
  }


  function taskLabelDisplay():string {
    return timerStore.timeSeconds > 0 ? 'display': 'hide'
  }

  function taskInputDisplay():string {
    return timerStore.timeSeconds > 0 ? 'hide' : 'display'
  }

  const now = () => DateTime.now().toMillis()

  const start = () => {
    updateTaskId(taskStore.addTask(taskName))
    startMessenger.next(taskId)
  }

  function endDateDisplay(task:Task) {
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
          Task : <span>{taskName}</span>
        </div>
        <div className={taskInputDisplay()} >
          <input value={taskName} onChange={e => updateTaskName(e.target.value)}></input>
        </div>
        <div>
          <ul>
            {taskStore.tasks.map((task) => 
              <div key={task.id}>
              <span>{task.id}</span><span>{task.name}</span><span>{endDateDisplay(task)}</span>
              </div>
            )}
          </ul>
        </div>
      </div>
  )
})


export default App;
