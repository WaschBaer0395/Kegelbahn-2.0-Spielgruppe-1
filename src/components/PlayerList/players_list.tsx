import React, { useContext, useEffect, useState } from 'react'
import '../../styles/PlayerList.css'
import { GameContext } from '../../api/GameLogicDataContext'

const PlayerList: React.FC = () => {
  const game = useContext(GameContext)
  const [currentTurn, setCurrentTurn] = useState(game.turn); // State to hold current turn
  const [currentPlayer, setCurrentPlayer] = useState(game.currentPlayer)
  // Subscribe to changes in game.turn
  useEffect(() => {
    const unsubscribe = game.subscribeToChanges(() => {
      if(game.turn == 2){
        setCurrentTurn(1)
        if(game.currentPlayer == game.players.length){
          setCurrentPlayer(0)
        }
        else{
          setCurrentPlayer(game.currentPlayer+1)
        }
      }
      else if (game.turn == 1){
        setCurrentTurn(2)
      }

    });

    return () => {
      unsubscribe();
    };
  }, [game]);

  return (
    <div className="playerListMain">
      <div className={`playerListContainer`}>
        {game.getPlayers().map((player, index) => (
          <div
            key={index}
            className={`grid-item ${index == currentPlayer ? 'current-player' : ''}`}
            style={{
              borderColor:
                index == currentPlayer && currentTurn == 1
                  ? '#3333cc'
                  : index == currentPlayer && currentTurn == 2
                    ? '#ff5050'
                    : 'black',
            }}
          >
            <div className="playerInfo">
              <div className="playerSprite">{player?.playerIcon}</div>
              <div className="playerName">{player?.name}</div>
              <div className="playerScores">
                Distanz: {player?.getTotalScore() * 10}m
              </div>
              {currentTurn == 1 && (
                <div
                  className="positiveThrow"
                  style={{
                    visibility:
                        currentPlayer == index ? 'visible' : 'hidden',
                  }}
                >
                  nächster Wurf positiv!
                </div>
              )}
              {currentTurn == 2 && (
                <div
                    className="negativeThrow"
                    style={{
                      visibility:
                          currentPlayer == index ? 'visible' : 'hidden',
                    }}
                >
                  nächster Wurf negativ!
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlayerList
