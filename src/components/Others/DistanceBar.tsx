import React from 'react';
import { useGameContext } from '../../api/GameLogicDataContext';

type DistanceBarProps = {}

export default function DistanceBar({ }: DistanceBarProps) {
  const { players, setPlayers } = useGameContext()
  var distanceLength: number = 10;
  const distance: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var calculateScoreOnce: number;
  return (
    <div>
      <div className='DistanceBarHead'>Distance</div>
      <div className='DistanceBarBody'>
        <table>

          {players.map((player, index) => (
            <tr>
              {calculateScoreOnce = player.getTotalScore()}
              {/* {player.scores.map((score, scoreIndex) => (
                <td>{((calculateScoreOnce == scoreIndex) ?
                  player.getPlayerIcon() : ""
                )}</td>
              ))} */}
              {distance.map((distanceMeter, indexMeter) => (
                index == distanceMeter ? player.getPlayerIcon() : `\t`
              ))}
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
