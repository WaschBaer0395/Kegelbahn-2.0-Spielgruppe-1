// PlayerTable.tsx
import React from 'react';

interface PlayerTableProps {
    data: number[][];
}

const PlayerScores: React.FC<PlayerTableProps> = ({ data }) => {
    let totalDistance = 0
    let playerScoresFinal = [[1, 2], [2, 2], [3, 3], [4, 4]]


    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            if (data[i][j] % 2 == 0 && data[i][j] != 0) {
                totalDistance -= data[i][j] // even round negative throws
            } else {
                totalDistance += data[i][j] // odd round positive throws
            }
        }
    }
    if (totalDistance <= 0) totalDistance = 0
    const rowData = (
        <td>
            <div>{totalDistance} meter</div>
        </td>
    )

    return (
        <table className="playerScores">
            <tbody>
            <tr>{rowData}</tr>
            </tbody>
        </table>
    )
}

export default PlayerScores;