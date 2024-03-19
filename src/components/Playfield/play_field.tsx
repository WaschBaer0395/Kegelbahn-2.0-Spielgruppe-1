import React, {useContext, useEffect, useState} from "react";
import {GameContext} from "../../api/GameLogicDataContext";
import '../../styles/PlayField.css'


const PlayField: React.FC = () => {
    const game = useContext(GameContext);
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "ArrowLeft") {
                // Decrease scroll position on left arrow press
                setScrollPosition(prevScrollPosition => prevScrollPosition - 10);
            } else if (event.key === "ArrowRight") {
                // Increase scroll position on right arrow press
                setScrollPosition(prevScrollPosition => prevScrollPosition + 10);
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    useEffect(() => {
        const unsubscribe = game.subscribeToScoreChanges(() => {
            const newScrollPosition =
                game.getPlayers()[game.currentPlayer].scores[game.currentRound] * 10;
            setScrollPosition(newScrollPosition);
        });

        return () => {
            unsubscribe();
        };
    }, [game]);

    return (
        <div className="parallax">
            <img className="layerBack" src={"src/sprites/Background/Background_Layer_Mountains_widened.png"} style={{ left: `${-scrollPosition * 0.5}px` }}></img>
            <img className="layerMiddle" src={"src/sprites/Background/Background_Layer_Clouds_widened.png"} style={{ left: `${-scrollPosition}px` }}></img>
            <img className="layerDefault" src={"src/sprites/Background/Background_Layer_Ground_widened.png"} style={{ left: `${-scrollPosition * 0.3}px` }}></img>
            <img className="layerFront" src={"src/sprites/Background/Background_Layer_Flowers_horz.png"} style={{ left: `${-scrollPosition * 0.1}px` }}></img>
        </div>
    );
}

export default PlayField