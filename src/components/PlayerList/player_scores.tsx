// PlayerTable.tsx
import React from 'react';

interface PlayerTableProps {
    data: number[];
}

const PlayerScores: React.FC<PlayerTableProps> = ({ data }) => {
    let totalDistance = 0
    for (let i = 0; i == data.length; i++) {
        if (data[i] % 2 == 0 && data[i] != 0) {
            totalDistance -= data[i] // even round negative throws
        }
        else {
            totalDistance += data[i] // odd round positive throws
        }
    }
    const rowData = (
        <td><div>{totalDistance} meter</div></td>
    );

    return (
        <table className="playerScores">
            <tbody>
                <tr>{rowData}</tr>
            </tbody>
        </table>
    );
};

export default PlayerScores;