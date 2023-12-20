// PlayerTable.tsx
import React from 'react';

interface PlayerTableProps {
    data: number[];
}

const PlayerScores: React.FC<PlayerTableProps> = ({ data }) => {
    const rowData = (
            data.map((value, index) => (
                <td key={index}>
                    {value}
                </td>
            ))
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