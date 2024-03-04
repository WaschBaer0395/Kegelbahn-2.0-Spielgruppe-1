import React, { useEffect, useState } from 'react';
import { useGameContext } from '../../api/GameLogicDataContext';

type DistanceBarProps = {}

export default function DistanceBar({ }: DistanceBarProps) {
  const game = useGameContext()
  var distanceLength: number = 100;
  const distance: number[] = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  var calculateScoreOnce: number;

  const [updateFlag, setUpdateFlag] = useState(false);

  useEffect(() => {
    // Subscribe to score changes in GameLogic and trigger re-render
    const unsubscribe = game.subscribeToScoreChanges(() => {
      setUpdateFlag(prevFlag => !prevFlag);
    });

    return () => {
      unsubscribe();
    };
  }, [game]);

  return (
    <div>
      <div className='DistanceBarHead'>Distance</div>
      <div className='DistanceBarBody'>
        <table>

          {game.players.map((player, index) => (
            <tr>
              {/* {player.scores.map((score, scoreIndex) => (
                <td>{((calculateScoreOnce == scoreIndex) ?
                  player.getPlayerIcon() : ""
                  )}</td>
                ))} */}
              {calculateScoreOnce = player.getTotalScore() * 10}
              {/* {distance.map((distanceMeter, indexMeter) => (
                calculateScoreOnce == distanceMeter ? player.name : `\t`
              ))} */}
              {("\t").repeat(calculateScoreOnce)}
              {player.name}
            </tr>
          )
          )}

        </table>
      </div>
    </div>
  )
  // // Annahme: Zielfortschrittslänge beträgt 100 Meter
  // const zielfortschrittsLänge = 100;

  // return (
  //   <div style={{ position: 'relative', height: '20px', width: '100%', backgroundColor: '#ccc' }}>
  //     {players.map((player) => (
  //       <div
  //         key={player.id}
  //         style={{
  //           position: 'absolute',
  //           height: '100%',
  //           width: `${(player.getTotalScore() / zielfortschrittsLänge) * 100}%`, // Prozentualer Fortschritt
  //           backgroundColor: 'blue',
  //           color: 'white',
  //           textAlign: 'center',
  //           lineHeight: '20px',
  //         }}
  //       >
  //         {player.name}
  //       </div>
  //     ))}
  //   </div>
  // )

}
