import PlayerList from './PlayerList/players_list'
import PlayField from './Playfield/play_field'
import { GameContext } from '../api/GameLogicDataContext'
import React, { useContext, useEffect, useState } from 'react'
import MqttHandler from '../api/MqttHandler'
import { Player } from './Player/player'
import DistanceBar from './DistanceBar/DistanceBar'

const MainScreen = () => {
  const game = useContext(GameContext)
  const [isPlayersReceived, setIsPlayersReceived] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [showPlayers, setShowPlayers] = useState(false)

  function convertPlayers(players: Player[]): Player[] {
    return players.map((player, index): any => {
      return new Player(
        index,
        player.name,
        player.gender,
        player.color,
        player.hair,
      )
    })
  }

  useEffect(() => {
    const mqttHandler = new MqttHandler(
        ['Kegelbahn/Management'],
        'Spiel_1_WAITING_FOR_PLAYERS',
    );

    mqttHandler.connectToBroker()
        .then(() => {
          console.log('MQTT Connection Established');

          mqttHandler.onMessage((topic, message) => {
            if (topic === 'Kegelbahn/Management') {
              console.log("Management message received")
              try {
                const parsePlayers = JSON.parse(message); // Assuming convertPlayers and other necessary functions/logic are defined elsewhere.
                const parsedPlayers = convertPlayers(parsePlayers);

                // Check if the parsed message contains player objects
                if (Array.isArray(parsedPlayers) && parsedPlayers.length > 0) {
                  game?.setPlayers(parsedPlayers); // Update player list
                  setIsPlayersReceived(true); // Set flag to indicate players are received
                  setShowPlayers(false);
                  game?.startGame();
                  setHasStarted(true);
                  mqttHandler.closeConnection(); // Optionally close connection if it's no longer needed
                }
              } catch (error) {
                console.error('Error parsing players:', error);
              }
            }
          });
        })
        .catch(error => {
          console.error('Failed to connect to MQTT Broker:', error);
        });

    // Clean up function to close MQTT connection when the component unmounts
    return () => {
      mqttHandler.closeConnection();
    };
  }, []);

  useEffect(() => {
    // Subscribe to score changes in GameLogic and trigger re-render
    const unsubscribe = game.subscribeToChanges(() => {
      console.log(game.isGameOver())
      if (game.isGameOver()) {
        console.log('Gameover In MainScreen Triggered')
        // Generate final score
        let finalScore = game.calculateScoreTable()
        const mqttHandler = new MqttHandler(
            ['Kegelbahn/Management'],
            'Spiel_1_GAMEOVER'
        )
        mqttHandler.connectToBroker().then(() => {
          mqttHandler.sendMessage(
              'Kegelbahn/Management',
              finalScore
          )
        }).catch(error => {
          console.error('Failed to connect to MQTT broker:', error);
        });

        setIsPlayersReceived(false)
        setHasStarted(false)
        setShowPlayers(false)
      }
    })

    return () => {
      unsubscribe(); // Make sure to unsubscribe when the component unmounts
    };
  }, [game]); // Make sure dependencies are correct

  // Players received trigger
  useEffect(() => {
    if (isPlayersReceived) {
      setIsPlayersReceived(false)
      setShowPlayers(true)
      listenForSensors()
    }
  }, [isPlayersReceived, game])

  function listenForSensors() {
    const mqttHandler = new MqttHandler(['Kegelbahn/Kegel'], 'Spiel_1_STARTED') // Create an instance of MqttHandler
    mqttHandler.connectToBroker()
    mqttHandler.onMessage((topic, message) => {
      if (topic === 'Kegelbahn/Kegel') {
        //{"sensors":[true,true,true,true,true,true,true,true,true],"rounds_played":1,"total_pins_downed":0,"pins_downed":0}
        try {
          const jsonObject = JSON.parse(message)
          const score = jsonObject.pins_downed
          game?.makeMove(score)
        } catch (error) {
          console.error(error)
        }
      }
    })
  }

  return (
    <div>
      <div className={`wrapper ${showPlayers ? '' : 'blurred'}`}>
        <div className="player_list">
          <PlayerList />
        </div>
        <div className="play_field_container">
          <div className="play_field">{hasStarted && <PlayField />}</div>
          <div className="progress_bar">
            <DistanceBar />
          </div>
        </div>
      </div>
      {!showPlayers && (
        <div className="overlay">
          <p>Waiting for players...</p>
        </div>
      )}
    </div>
  )
}

export default MainScreen
