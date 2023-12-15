import React from 'react'
import '../styles/App.css'
import MqttComponent from '../api/mqtt'

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <div className="player_list">Players</div>
        <div className="play_field">
          <MqttComponent />
        </div>
        <div className="progress_bar">Distance</div>
        <div className="settings_menu">Settings</div>
      </div>
    </div>
  )
}

export default App
